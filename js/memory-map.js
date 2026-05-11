/* ===== MemoryMap - 内存可视化教学组件 ===== */

/**
 * MemoryMap: C++ 内存状态交互式可视化
 * 
 * 特性：
 * - 栈帧可视化：函数调用栈、压栈/弹栈动画
 * - 堆分配可视化：内存块状态、泄漏检测
 * - 指针映射：指针指向关系、悬空指针检测
 * - 对象布局：类内存布局、字节对齐、vptr 显示
 * 
 * 技术：纯 DOM + CSS 实现，无 Canvas API
 * 
 * 使用：new MemoryMap(containerElement)
 *      memoryMap.visualize(data)
 */
class MemoryMap {
  /* ---- 颜色配置 ---- */
  static COLORS = {
    stack: {
      frame: '#2D7FF9',
      frameBg: 'rgba(45, 127, 249, 0.08)',
      frameBorder: '#2D7FF9',
      varLocal: '#10B981',
      varParam: '#F59E0B',
      arrow: '#2D7FF9',
      callArrow: '#60A5FA'
    },
    heap: {
      allocated: '#2D7FF9',
      allocatedBg: 'rgba(45, 127, 249, 0.12)',
      freed: '#9CA3AF',
      freedBg: 'rgba(156, 163, 175, 0.08)',
      leaked: '#EF4444',
      leakedBg: 'rgba(239, 68, 68, 0.12)',
      orphan: '#F59E0B',
      orphanBg: 'rgba(245, 158, 11, 0.12)'
    },
    pointer: {
      valid: '#2D7FF9',
      dangling: '#EF4444',
      null: '#9CA3AF',
      arrowValid: '#2D7FF9',
      arrowDangling: '#EF4444'
    },
    object: {
      vptr: '#8B5CF6',
      vptrBg: 'rgba(139, 92, 246, 0.15)',
      member: '#10B981',
      inherited: '#F59E0B',
      padding: '#E5E7EB',
      alignment: '#60A5FA'
    }
  };

  /* ---- 模式配置 ---- */
  static MODES = [
    { key: 'stack', label: '调用栈', icon: '📚', desc: '函数调用栈帧可视化' },
    { key: 'heap', label: '堆内存', icon: '🧱', desc: '堆内存分配状态' },
    { key: 'pointers', label: '指针映射', icon: '🔗', desc: '指针与内存关系' },
    { key: 'object', label: '对象布局', icon: '📐', desc: '类内存布局与对齐' }
  ];

  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      throw new Error('MemoryMap: container element not found');
    }
    this.currentMode = 'stack';
    this.animationSpeed = 400;
    this.isAnimating = false;
    this.currentData = null;
    this.frameAnimationQueue = [];
    
    this.init();
  }

  /* ---- 初始化 ---- */
  init() {
    this.injectStyles();
    this.render();
    this.bindEvents();
  }

  /* ---- 生成唯一 ID ---- */
  get _id() {
    if (!this.__id) {
      this.__id = Math.random().toString(36).slice(2, 9);
    }
    return this.__id;
  }

  /* ---- 注入组件样式 ---- */
  injectStyles() {
    if (document.getElementById('memory-map-styles')) return;
    const style = document.createElement('style');
    style.id = 'memory-map-styles';
    style.textContent = `
      /* ===== MemoryMap 组件样式 ===== */
      .memory-map {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--bg-primary);
        box-shadow: var(--shadow);
        font-family: var(--font-body);
      }
      
      /* 标题栏 */
      .mm-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--bg-tertiary);
        border-bottom: 1px solid var(--border);
      }
      .mm-header-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .mm-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .mm-mode-tag {
        font-size: 0.75rem;
        padding: 3px 10px;
        border-radius: 12px;
        font-weight: 600;
        font-family: var(--font-code);
        background: var(--accent-light);
        color: var(--accent);
        border: 1px solid var(--accent);
        transition: var(--transition);
      }
      .mm-mode-tag.mode-stack { background: rgba(45, 127, 249, 0.1); color: #2D7FF9; border-color: #2D7FF9; }
      .mm-mode-tag.mode-heap { background: rgba(16, 185, 129, 0.1); color: #10B981; border-color: #10B981; }
      .mm-mode-tag.mode-pointers { background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-color: #8B5CF6; }
      .mm-mode-tag.mode-object { background: rgba(245, 158, 11, 0.1); color: #F59E0B; border-color: #F59E0B; }
      
      /* 模式切换 */
      .mm-mode-tabs {
        display: flex;
        gap: 2px;
        background: var(--bg-secondary);
        border-radius: var(--radius);
        padding: 3px;
      }
      .mm-mode-tab {
        padding: 5px 12px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--text-secondary);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        transition: var(--transition);
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .mm-mode-tab:hover {
        background: var(--bg-primary);
        color: var(--text-primary);
      }
      .mm-mode-tab.active {
        background: var(--accent);
        color: white;
        font-weight: 600;
        box-shadow: 0 1px 4px rgba(45, 127, 249, 0.3);
      }
      
      /* 画布区域 */
      .mm-canvas {
        padding: 20px;
        min-height: 320px;
        max-height: 500px;
        overflow-y: auto;
        position: relative;
      }
      .mm-canvas::-webkit-scrollbar { width: 6px; }
      .mm-canvas::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      
      .mm-empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: var(--text-muted);
        text-align: center;
      }
      .mm-empty-icon {
        font-size: 3rem;
        margin-bottom: 16px;
        opacity: 0.5;
      }
      .mm-empty-text {
        font-size: 0.9rem;
        margin-bottom: 8px;
      }
      .mm-empty-hint {
        font-size: 0.8rem;
        opacity: 0.7;
      }
      
      /* ===== 栈帧样式 ===== */
      .mm-stack-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
        padding: 10px 0;
      }
      
      .mm-stack-label {
        text-align: center;
        font-family: var(--font-code);
        font-size: 0.75rem;
        color: var(--text-muted);
        margin-bottom: 8px;
        padding: 4px 12px;
        border-radius: 4px;
        background: var(--bg-tertiary);
      }
      
      .mm-stack-frame {
        border: 2px solid ${MemoryMap.COLORS.stack.frameBorder};
        border-radius: var(--radius);
        background: ${MemoryMap.COLORS.stack.frameBg};
        min-width: 320px;
        max-width: 520px;
        margin: 4px 0;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: mmFramePush 0.4s ease-out;
      }
      @keyframes mmFramePush {
        from { opacity: 0; transform: translateY(-20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes mmFramePop {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(20px) scale(0.95); }
      }
      .mm-stack-frame.popping {
        animation: mmFramePop 0.3s ease-in forwards;
      }
      
      .mm-frame-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 14px;
        background: ${MemoryMap.COLORS.stack.frame};
        color: white;
        font-family: var(--font-code);
        font-size: 0.85rem;
        font-weight: 600;
      }
      .mm-frame-retaddr {
        font-size: 0.7rem;
        opacity: 0.8;
        font-weight: 400;
      }
      
      .mm-frame-vars {
        padding: 10px 14px;
      }
      .mm-frame-var {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 6px 0;
        border-bottom: 1px dashed var(--border);
        font-family: var(--font-code);
        font-size: 0.82rem;
      }
      .mm-frame-var:last-child { border-bottom: none; }
      .mm-var-addr {
        font-size: 0.7rem;
        color: var(--text-muted);
        font-family: var(--font-code);
        min-width: 80px;
        user-select: all;
      }
      .mm-var-type {
        font-size: 0.75rem;
        padding: 1px 6px;
        border-radius: 4px;
        background: ${MemoryMap.COLORS.stack.varLocal}22;
        color: ${MemoryMap.COLORS.stack.varLocal};
        font-weight: 600;
        min-width: 55px;
        text-align: center;
      }
      .mm-var-type.param {
        background: ${MemoryMap.COLORS.stack.varParam}22;
        color: ${MemoryMap.COLORS.stack.varParam};
      }
      .mm-var-name {
        color: var(--text-primary);
        font-weight: 500;
        min-width: 60px;
      }
      .mm-var-value {
        color: var(--accent);
        font-weight: 600;
        margin-left: auto;
      }
      .mm-var-pointer {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #8B5CF6;
        font-size: 0.75rem;
        margin-left: auto;
      }
      
      .mm-call-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 0;
        color: ${MemoryMap.COLORS.stack.callArrow};
        font-size: 1.2rem;
        animation: mmBounce 1.5s infinite;
      }
      @keyframes mmBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
      }
      
      /* ===== 堆内存样式 ===== */
      .mm-heap-container {
        padding: 10px 0;
      }
      
      .mm-heap-label {
        text-align: center;
        font-family: var(--font-code);
        font-size: 0.75rem;
        color: var(--text-muted);
        margin-bottom: 16px;
        padding: 4px 12px;
        border-radius: 4px;
        background: var(--bg-tertiary);
      }
      
      .mm-heap-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
        padding: 10px 0;
      }
      
      .mm-heap-block {
        border: 2px solid ${MemoryMap.COLORS.heap.allocated};
        border-radius: var(--radius);
        background: ${MemoryMap.COLORS.heap.allocatedBg};
        padding: 12px;
        text-align: center;
        font-family: var(--font-code);
        transition: all 0.3s ease;
        animation: mmBlockAppear 0.4s ease-out;
        position: relative;
        overflow: hidden;
      }
      @keyframes mmBlockAppear {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      .mm-heap-block.allocated {
        border-color: ${MemoryMap.COLORS.heap.allocated};
        background: ${MemoryMap.COLORS.heap.allocatedBg};
      }
      .mm-heap-block.freed {
        border-color: ${MemoryMap.COLORS.heap.freed};
        background: ${MemoryMap.COLORS.heap.freedBg};
        opacity: 0.6;
      }
      .mm-heap-block.leaked {
        border-color: ${MemoryMap.COLORS.heap.leaked};
        background: ${MemoryMap.COLORS.heap.leakedBg};
        animation: mmBlockAppear 0.4s ease-out, mmLeakPulse 1.5s infinite 0.5s;
      }
      .mm-heap-block.orphan {
        border-color: ${MemoryMap.COLORS.heap.orphan};
        background: ${MemoryMap.COLORS.heap.orphanBg};
        animation: mmBlockAppear 0.4s ease-out, mmOrphanGlow 2s infinite 0.5s;
      }
      @keyframes mmLeakPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
      }
      @keyframes mmOrphanGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.3); }
        50% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
      }
      
      .mm-block-addr {
        font-size: 0.7rem;
        color: var(--text-muted);
        margin-bottom: 6px;
      }
      .mm-block-type {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 4px;
      }
      .mm-block-size {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 10px;
        display: inline-block;
      }
      .mm-heap-block.allocated .mm-block-size { background: ${MemoryMap.COLORS.heap.allocated}33; color: ${MemoryMap.COLORS.heap.allocated}; }
      .mm-heap-block.freed .mm-block-size { background: ${MemoryMap.COLORS.heap.freed}33; color: ${MemoryMap.COLORS.heap.freed}; }
      .mm-heap-block.leaked .mm-block-size { background: ${MemoryMap.COLORS.heap.leaked}33; color: ${MemoryMap.COLORS.heap.leaked}; }
      .mm-heap-block.orphan .mm-block-size { background: ${MemoryMap.COLORS.heap.orphan}33; color: ${MemoryMap.COLORS.heap.orphan}; }
      
      .mm-block-status-icon {
        position: absolute;
        top: 6px;
        right: 6px;
        font-size: 0.8rem;
      }
      
      /* ===== 指针映射样式 ===== */
      .mm-pointer-container {
        padding: 10px 0;
      }
      
      .mm-pointer-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      .mm-pointer-table th {
        background: var(--bg-tertiary);
        padding: 8px 12px;
        text-align: left;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-primary);
        border-bottom: 2px solid var(--border);
      }
      .mm-pointer-table td {
        padding: 10px 12px;
        border-bottom: 1px solid var(--border);
        font-family: var(--font-code);
        font-size: 0.82rem;
      }
      .mm-pointer-table tr:hover {
        background: var(--bg-secondary);
      }
      
      .mm-ptr-tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .mm-ptr-tag.valid { background: rgba(45, 127, 249, 0.12); color: ${MemoryMap.COLORS.pointer.valid}; }
      .mm-ptr-tag.dangling { background: rgba(239, 68, 68, 0.12); color: ${MemoryMap.COLORS.pointer.dangling}; }
      .mm-ptr-tag.null { background: rgba(156, 163, 175, 0.12); color: ${MemoryMap.COLORS.pointer.null}; }
      
      .mm-ptr-var-addr {
        font-size: 0.75rem;
        color: var(--text-muted);
      }
      
      /* 指针可视化区域 */
      .mm-pointer-viz {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 40px;
        padding: 20px;
        min-height: 200px;
      }
      
      .mm-ptr-stack-col, .mm-ptr-heap-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .mm-ptr-col-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 4px;
      }
      
      .mm-ptr-var-box {
        border: 2px solid ${MemoryMap.COLORS.pointer.valid};
        border-radius: var(--radius);
        background: rgba(45, 127, 249, 0.08);
        padding: 8px 14px;
        min-width: 120px;
        text-align: center;
        font-family: var(--font-code);
        font-size: 0.82rem;
        position: relative;
        transition: all 0.3s ease;
      }
      .mm-ptr-var-box.dangling {
        border-color: ${MemoryMap.COLORS.pointer.dangling};
        background: rgba(239, 68, 68, 0.08);
        border-style: dashed;
      }
      .mm-ptr-var-box.null {
        border-color: ${MemoryMap.COLORS.pointer.null};
        background: rgba(156, 163, 175, 0.05);
        opacity: 0.6;
      }
      
      .mm-ptr-var-name {
        font-weight: 600;
        color: var(--text-primary);
      }
      .mm-ptr-var-addr {
        font-size: 0.7rem;
        color: var(--text-muted);
        margin-top: 2px;
      }
      
      /* SVG 箭头连接 */
      .mm-arrow-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10;
      }
      
      /* ===== 对象布局样式 ===== */
      .mm-object-container {
        padding: 10px 0;
      }
      
      .mm-object-header {
        text-align: center;
        margin-bottom: 16px;
      }
      .mm-object-class {
        font-family: var(--font-code);
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-primary);
      }
      .mm-object-meta {
        font-size: 0.8rem;
        color: var(--text-muted);
        margin-top: 4px;
      }
      .mm-object-meta span {
        margin: 0 8px;
      }
      
      /* 内存布局表格 */
      .mm-layout-table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        border-radius: var(--radius);
        overflow: hidden;
      }
      .mm-layout-table th {
        background: var(--bg-tertiary);
        padding: 10px 14px;
        text-align: left;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--text-primary);
        border-bottom: 2px solid var(--border);
      }
      .mm-layout-table td {
        padding: 10px 14px;
        border-bottom: 1px solid var(--border);
        font-family: var(--font-code);
        font-size: 0.82rem;
        transition: all 0.2s ease;
      }
      .mm-layout-table tr:hover td {
        background: var(--bg-secondary);
      }
      
      .mm-layout-row.vptr {
        background: ${MemoryMap.COLORS.object.vptrBg};
      }
      .mm-layout-row.vptr td {
        border-left: 4px solid ${MemoryMap.COLORS.object.vptr};
      }
      .mm-layout-row.inherited td {
        border-left: 4px solid ${MemoryMap.COLORS.object.inherited};
      }
      .mm-layout-row.member td {
        border-left: 4px solid ${MemoryMap.COLORS.object.member};
      }
      .mm-layout-row.padding td {
        border-left: 4px solid ${MemoryMap.COLORS.object.padding};
        opacity: 0.7;
      }
      
      .mm-offset-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        font-family: var(--font-code);
      }
      .mm-offset-badge.vptr { background: ${MemoryMap.COLORS.object.vptr}22; color: ${MemoryMap.COLORS.object.vptr}; }
      .mm-offset-badge.inherited { background: ${MemoryMap.COLORS.object.inherited}22; color: ${MemoryMap.COLORS.object.inherited}; }
      .mm-offset-badge.member { background: ${MemoryMap.COLORS.object.member}22; color: ${MemoryMap.COLORS.object.member}; }
      .mm-offset-badge.padding { background: ${MemoryMap.COLORS.object.padding}44; color: var(--text-muted); }
      
      .mm-type-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        font-family: var(--font-code);
        background: var(--accent-light);
        color: var(--accent);
      }
      
      .mm-size-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 0.72rem;
        font-weight: 600;
        font-family: var(--font-code);
        background: var(--bg-tertiary);
        color: var(--text-secondary);
      }
      
      .mm-vptr-label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        color: ${MemoryMap.COLORS.object.vptr};
        background: ${MemoryMap.COLORS.object.vptr}22;
      }
      
      /* 内存可视化条 */
      .mm-memory-bar {
        display: flex;
        height: 36px;
        border-radius: var(--radius);
        overflow: hidden;
        margin: 16px 0;
        border: 1px solid var(--border);
      }
      .mm-memory-segment {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-code);
        font-size: 0.7rem;
        font-weight: 600;
        color: white;
        min-width: 40px;
        transition: all 0.3s ease;
        position: relative;
      }
      .mm-memory-segment:hover {
        flex-grow: 1.5;
        z-index: 5;
      }
      .mm-memory-segment.vptr { background: ${MemoryMap.COLORS.object.vptr}; }
      .mm-memory-segment.inherited { background: ${MemoryMap.COLORS.object.inherited}; }
      .mm-memory-segment.member { background: ${MemoryMap.COLORS.object.member}; }
      .mm-memory-segment.padding { background: ${MemoryMap.COLORS.object.padding}; color: var(--text-muted); }
      
      /* 警告横幅 */
      .mm-warn-banner {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border-radius: var(--radius);
        margin: 12px 0;
        font-size: 0.85rem;
      }
      .mm-warn-banner.dangling {
        background: rgba(239, 68, 68, 0.08);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: ${MemoryMap.COLORS.pointer.dangling};
      }
      .mm-warn-banner.leak {
        background: rgba(245, 158, 11, 0.08);
        border: 1px solid rgba(245, 158, 11, 0.2);
        color: ${MemoryMap.COLORS.heap.orphan};
      }
      
      /* ===== 图例 ===== */
      .mm-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding: 12px 16px;
        background: var(--bg-tertiary);
        border-top: 1px solid var(--border);
      }
      .mm-legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        color: var(--text-secondary);
      }
      .mm-legend-color {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        border: 1px solid var(--border);
      }
      
      /* 操作按钮区 */
      .mm-actions {
        display: flex;
        gap: 8px;
        padding: 10px 16px;
        background: var(--bg-secondary);
        border-top: 1px solid var(--border);
        flex-wrap: wrap;
      }
      .mm-action-btn {
        padding: 6px 14px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-primary);
        color: var(--text-secondary);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        transition: var(--transition);
      }
      .mm-action-btn:hover {
        border-color: var(--accent);
        color: var(--accent);
        background: var(--accent-light);
      }
      .mm-action-btn.primary {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
      }
      .mm-action-btn.primary:hover {
        background: var(--accent-hover);
      }
      .mm-action-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      /* 步骤控制 */
      .mm-step-info {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-left: auto;
        font-size: 0.8rem;
        color: var(--text-muted);
      }
      
      /* 动画 */
      @keyframes mmSlideIn {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      /* 响应式 */
      @media (max-width: 768px) {
        .mm-header {
          flex-direction: column;
          gap: 10px;
          align-items: stretch;
        }
        .mm-mode-tabs {
          justify-content: center;
        }
        .mm-canvas {
          padding: 12px;
          min-height: 240px;
        }
        .mm-stack-frame {
          min-width: 100%;
        }
        .mm-heap-grid {
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        }
        .mm-pointer-viz {
          flex-direction: column;
          gap: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---- 渲染 UI ---- */
  render() {
    this.container.innerHTML = `
      <div class="memory-map">
        <!-- 标题栏 -->
        <div class="mm-header">
          <div class="mm-header-left">
            <span class="mm-title">
              🧠 内存可视化
              <span class="mm-mode-tag mode-${this.currentMode}" id="mmModeTag_${this._id}">
                ${MemoryMap.MODES.find(m => m.key === this.currentMode)?.label || '调用栈'}
              </span>
            </span>
          </div>
          <div class="mm-mode-tabs" id="mmModeTabs_${this._id}">
            ${MemoryMap.MODES.map(m => `
              <button class="mm-mode-tab ${m.key === this.currentMode ? 'active' : ''}" data-mode="${m.key}">
                <span>${m.icon}</span> ${m.label}
              </button>
            `).join('')}
          </div>
        </div>
        
        <!-- 画布区域 -->
        <div class="mm-canvas" id="mmCanvas_${this._id}">
          <div class="mm-empty-state">
            <div class="mm-empty-icon">🧠</div>
            <div class="mm-empty-text">内存可视化组件已就绪</div>
            <div class="mm-empty-hint">使用 .visualize(data) 方法加载数据，或切换上方模式</div>
          </div>
        </div>
        
        <!-- 图例 -->
        <div class="mm-legend" id="mmLegend_${this._id}"></div>
        
        <!-- 操作区 -->
        <div class="mm-actions" id="mmActions_${this._id}">
          <button class="mm-action-btn" id="mmReset_${this._id}">重置视图</button>
        </div>
      </div>
    `;
    
    this.cacheElements();
    this.updateLegend();
  }

  cacheElements() {
    this.el = {
      modeTag: document.getElementById(`mmModeTag_${this._id}`),
      modeTabs: document.getElementById(`mmModeTabs_${this._id}`),
      canvas: document.getElementById(`mmCanvas_${this._id}`),
      legend: document.getElementById(`mmLegend_${this._id}`),
      actions: document.getElementById(`mmActions_${this._id}`),
      resetBtn: document.getElementById(`mmReset_${this._id}`),
    };
  }

  bindEvents() {
    // 模式切换
    this.el.modeTabs?.addEventListener('click', (e) => {
      const tab = e.target.closest('.mm-mode-tab');
      if (!tab) return;
      this.switchMode(tab.dataset.mode);
    });
    
    // 重置
    this.el.resetBtn?.addEventListener('click', () => this.reset());
  }

  /* ========== 核心 API ========== */

  /**
   * 主可视化入口 - 根据数据类型自动路由
   */
  visualize(data) {
    if (!data || !data.type) {
      this.showError('数据格式错误：缺少 type 字段');
      return;
    }
    
    this.currentData = data;
    this.switchMode(data.type);
    
    switch (data.type) {
      case 'stack':
        this.showStackFrame(data.frames || []);
        break;
      case 'heap':
        this.showHeapAllocation(data.blocks || []);
        break;
      case 'pointers':
        this.showPointerMap(data.pointers || []);
        break;
      case 'object':
        this.showObjectLayout(data.className || 'Unknown', data.layout || {});
        break;
      default:
        this.showError(`未知的数据类型: ${data.type}`);
    }
  }

  /**
   * 显示函数调用栈
   * @param {Array} frames - [{ name, vars: [{name, type, value, addr}] }]
   */
  showStackFrame(frames) {
    this.currentMode = 'stack';
    this.updateModeUI();
    
    if (!frames || frames.length === 0) {
      this.el.canvas.innerHTML = `
        <div class="mm-empty-state">
          <div class="mm-empty-icon">📚</div>
          <div class="mm-empty-text">暂无栈帧数据</div>
          <div class="mm-empty-hint">使用 .showStackFrame(frames) 或 .visualize({type:'stack', frames:[]}) 加载</div>
        </div>
      `;
      return;
    }
    
    let html = `
      <div class="mm-stack-container">
        <div class="mm-stack-label">
          <span>栈顶 (低地址) ↑</span>
        </div>
    `;
    
    frames.forEach((frame, idx) => {
      const retAddr = frame.retAddr || `0x7fff_${(0x1000 + idx * 0x100).toString(16).padStart(4, '0')}`;
      const isTop = idx === 0;
      
      html += `
        <div class="mm-stack-frame ${isTop ? 'top-frame' : ''}" data-idx="${idx}" style="animation-delay: ${idx * 0.1}s">
          <div class="mm-frame-header">
            <span>${frame.name}(${this.formatParams(frame.params)})</span>
            <span class="mm-frame-retaddr">ret → ${retAddr}</span>
          </div>
          <div class="mm-frame-vars">
            ${(frame.vars || []).map(v => `
              <div class="mm-frame-var">
                <span class="mm-var-addr">${v.addr || ''}</span>
                <span class="mm-var-type ${v.isParam ? 'param' : ''}">${v.type}</span>
                <span class="mm-var-name">${v.name}</span>
                ${v.pointsTo ? `
                  <span class="mm-var-pointer">
                    → ${v.pointsTo}
                  </span>
                ` : `<span class="mm-var-value">${v.value !== undefined ? v.value : '?'}</span>`}
              </div>
            `).join('')}
            ${(!frame.vars || frame.vars.length === 0) ? '<div class="mm-frame-var" style="color:var(--text-muted);font-style:italic;">(无局部变量)</div>' : ''}
          </div>
        </div>
        ${idx < frames.length - 1 ? '<div class="mm-call-arrow">↓</div>' : ''}
      `;
    });
    
    html += `
        <div class="mm-stack-label" style="margin-top:8px;">
          <span>↓ 栈底 (高地址)</span>
        </div>
      </div>
    `;
    
    this.el.canvas.innerHTML = html;
    this.updateActions(['push', 'pop', 'clear']);
  }

  /**
   * 显示堆内存分配
   * @param {Array} blocks - [{ addr, size, status, type }]
   */
  showHeapAllocation(blocks) {
    this.currentMode = 'heap';
    this.updateModeUI();
    
    if (!blocks || blocks.length === 0) {
      this.el.canvas.innerHTML = `
        <div class="mm-empty-state">
          <div class="mm-empty-icon">🧱</div>
          <div class="mm-empty-text">暂无堆内存数据</div>
          <div class="mm-empty-hint">使用 .showHeapAllocation(blocks) 或 .visualize({type:'heap', blocks:[]}) 加载</div>
        </div>
      `;
      return;
    }
    
    const statusIcons = {
      allocated: '✓',
      freed: '🗑',
      leaked: '⚠',
      orphan: '🔒'
    };
    
    let html = `
      <div class="mm-heap-container">
        <div class="mm-heap-label">
          <span>堆内存区域 — 已分配 ${blocks.filter(b => b.status === 'allocated').length} 块</span>
          ${blocks.some(b => b.status === 'leaked') ? ' | <span style="color:#EF4444;">⚠ 检测到内存泄漏!</span>' : ''}
        </div>
        <div class="mm-heap-grid">
    `;
    
    blocks.forEach((block, idx) => {
      const status = block.status || 'allocated';
      html += `
        <div class="mm-heap-block ${status}" style="animation-delay: ${idx * 0.08}s">
          <span class="mm-block-status-icon">${statusIcons[status] || '?'}</span>
          <div class="mm-block-addr">${block.addr || '0x?'}</div>
          <div class="mm-block-type">${block.type || 'unknown'}</div>
          <div class="mm-block-size">${block.size || 0} bytes</div>
        </div>
      `;
    });
    
    html += `
        </div>
        ${blocks.some(b => b.status === 'leaked') ? `
          <div class="mm-warn-banner leak" style="margin-top:16px;">
            <span>⚠</span>
            <span>检测到 ${blocks.filter(b => b.status === 'leaked').length} 个泄漏内存块 — 已分配但未释放，且无法被程序访问</span>
          </div>
        ` : ''}
      </div>
    `;
    
    this.el.canvas.innerHTML = html;
    this.updateActions(['clear']);
  }

  /**
   * 显示指针映射
   * @param {Array} pointers - [{ varName, varAddr, targetAddr, isDangling }]
   */
  showPointerMap(pointers) {
    this.currentMode = 'pointers';
    this.updateModeUI();
    
    if (!pointers || pointers.length === 0) {
      this.el.canvas.innerHTML = `
        <div class="mm-empty-state">
          <div class="mm-empty-icon">🔗</div>
          <div class="mm-empty-text">暂无指针数据</div>
          <div class="mm-empty-hint">使用 .showPointerMap(pointers) 或 .visualize({type:'pointers', pointers:[]}) 加载</div>
        </div>
      `;
      return;
    }
    
    // 表格视图
    let html = `
      <div class="mm-pointer-container">
        <table class="mm-pointer-table">
          <thead>
            <tr>
              <th>变量</th>
              <th>变量地址</th>
              <th>状态</th>
              <th>指向地址</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    pointers.forEach(ptr => {
      const status = ptr.isDangling ? 'dangling' : (ptr.targetAddr === '0x0' || ptr.targetAddr === 'nullptr') ? 'null' : 'valid';
      const statusLabels = { valid: '✓ 有效', dangling: '✗ 悬空', null: '∅ 空指针' };
      
      html += `
        <tr>
          <td>
            <span style="font-weight:600;color:var(--text-primary);">${ptr.varName}</span>
            <span class="mm-ptr-var-addr">(${ptr.varAddr})</span>
          </td>
          <td>${ptr.varAddr}</td>
          <td><span class="mm-ptr-tag ${status}">${statusLabels[status]}</span></td>
          <td style="${ptr.isDangling ? 'text-decoration:line-through;color:var(--danger);' : ''}">
            ${ptr.targetAddr}
          </td>
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
        
        <!-- 指针关系图 -->
        <div class="mm-pointer-viz" id="mmPtrViz_${this._id}">
          <div class="mm-ptr-stack-col">
            <div class="mm-ptr-col-label">📚 栈 (指针变量)</div>
            ${pointers.map((ptr, idx) => {
              const status = ptr.isDangling ? 'dangling' : (ptr.targetAddr === '0x0' || ptr.targetAddr === 'nullptr') ? 'null' : 'valid';
              return `
                <div class="mm-ptr-var-box ${status}" data-ptr-idx="${idx}" style="animation-delay: ${idx * 0.1}s">
                  <div class="mm-ptr-var-name">${ptr.varName}</div>
                  <div class="mm-ptr-var-addr">${ptr.varAddr}</div>
                </div>
              `;
            }).join('')}
          </div>
          
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 10px;">
            ${pointers.map(() => `
              <div style="font-size:1.8rem;color:var(--accent);margin:20px 0;">→</div>
            `).join('')}
          </div>
          
          <div class="mm-ptr-heap-col">
            <div class="mm-ptr-col-label">🧱 堆 (目标内存)</div>
            ${pointers.map((ptr, idx) => {
              const status = ptr.isDangling ? 'dangling' : 'valid';
              return `
                <div class="mm-ptr-var-box ${status}" data-target-idx="${idx}" style="animation-delay: ${idx * 0.1}s">
                  <div class="mm-ptr-var-name">${ptr.targetAddr}</div>
                  <div class="mm-ptr-var-addr">${ptr.isDangling ? '✗ 已释放' : '✓ 有效内存'}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
    `;
    
    if (pointers.some(p => p.isDangling)) {
      html += `
        <div class="mm-warn-banner dangling">
          <span>🚨</span>
          <span>检测到悬空指针! 指针指向的内存已被释放，继续使用将导致未定义行为</span>
        </div>
      `;
    }
    
    html += `</div>`;
    
    this.el.canvas.innerHTML = html;
    this.updateActions(['clear']);
  }

  /**
   * 显示对象内存布局
   * @param {string} className - 类名
   * @param {Object} layout - { size, alignment, vptr, members: [{name, type, offset, size, inherited}] }
   */
  showObjectLayout(className, layout) {
    this.currentMode = 'object';
    this.updateModeUI();
    
    const size = layout.size || 0;
    const alignment = layout.alignment || 8;
    const hasVptr = layout.vptr && layout.vptr.size > 0;
    const members = layout.members || [];
    
    let html = `
      <div class="mm-object-container">
        <div class="mm-object-header">
          <div class="mm-object-class">class ${className}</div>
          <div class="mm-object-meta">
            <span>📦 总大小: ${size} bytes</span>
            <span>📐 对齐: ${alignment} bytes</span>
            ${hasVptr ? '<span>🔮 含虚表指针</span>' : ''}
            ${members.some(m => m.inherited) ? '<span>👪 含继承成员</span>' : ''}
          </div>
        </div>
        
        <!-- 内存条可视化 -->
        <div class="mm-memory-bar">
    `;
    
    // vptr segment
    if (hasVptr) {
      const vptrWidth = (layout.vptr.size / size * 100);
      html += `
        <div class="mm-memory-segment vptr" style="width: ${vptrWidth}%;" title="vptr @ offset 0">
          vptr
        </div>
      `;
    }
    
    // member segments
    let lastEnd = hasVptr ? layout.vptr.size : 0;
    members.forEach((m, idx) => {
      // padding segment
      if (m.offset > lastEnd) {
        const padSize = m.offset - lastEnd;
        const padWidth = (padSize / size * 100);
        html += `
          <div class="mm-memory-segment padding" style="width: ${padWidth}%;" title="padding ${padSize} bytes">
            pad
          </div>
        `;
      }
      
      const memberWidth = (m.size / size * 100);
      const segClass = m.inherited ? 'inherited' : 'member';
      html += `
        <div class="mm-memory-segment ${segClass}" style="width: ${memberWidth}%;" title="${m.name} @ offset ${m.offset}">
          ${m.name}
        </div>
      `;
      lastEnd = m.offset + m.size;
    });
    
    // trailing padding
    if (lastEnd < size) {
      const padSize = size - lastEnd;
      const padWidth = Math.max((padSize / size * 100), 5);
      html += `
        <div class="mm-memory-segment padding" style="width: ${padWidth}%;" title="tail padding ${padSize} bytes">
          pad
        </div>
      `;
    }
    
    html += `</div>`;
    
    // 详细表格
    html += `
        <table class="mm-layout-table">
          <thead>
            <tr>
              <th>偏移量</th>
              <th>名称</th>
              <th>类型</th>
              <th>大小</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    // vptr row
    if (hasVptr) {
      html += `
        <tr class="mm-layout-row vptr">
          <td><span class="mm-offset-badge vptr">+${layout.vptr.offset}</span></td>
          <td><span class="mm-vptr-label">🔮 vptr (虚表指针)</span></td>
          <td><span class="mm-type-badge">void**</span></td>
          <td><span class="mm-size-badge">${layout.vptr.size} bytes</span></td>
          <td>指向虚函数表 (vtable)</td>
        </tr>
      `;
    }
    
    // member rows
    let prevEnd = hasVptr ? layout.vptr.offset + layout.vptr.size : 0;
    members.forEach(m => {
      // padding row
      if (m.offset > prevEnd) {
        const padSize = m.offset - prevEnd;
        html += `
          <tr class="mm-layout-row padding">
            <td><span class="mm-offset-badge padding">+${prevEnd}</span></td>
            <td style="color:var(--text-muted);font-style:italic;">(padding)</td>
            <td>—</td>
            <td><span class="mm-size-badge">${padSize} bytes</span></td>
            <td style="color:var(--text-muted);">字节对齐填充</td>
          </tr>
        `;
      }
      
      const rowClass = m.inherited ? 'inherited' : 'member';
      const badgeClass = m.inherited ? 'inherited' : 'member';
      html += `
        <tr class="mm-layout-row ${rowClass}">
          <td><span class="mm-offset-badge ${badgeClass}">+${m.offset}</span></td>
          <td style="font-weight:600;">${m.name}</td>
          <td><span class="mm-type-badge">${m.type}</span></td>
          <td><span class="mm-size-badge">${m.size} bytes</span></td>
          <td>${m.inherited ? '👪 继承自基类' : '✏️ 本类定义'}</td>
        </tr>
      `;
      prevEnd = m.offset + m.size;
    });
    
    // trailing padding
    if (prevEnd < size) {
      const padSize = size - prevEnd;
      html += `
        <tr class="mm-layout-row padding">
          <td><span class="mm-offset-badge padding">+${prevEnd}</span></td>
          <td style="color:var(--text-muted);font-style:italic;">(padding)</td>
          <td>—</td>
          <td><span class="mm-size-badge">${padSize} bytes</span></td>
          <td style="color:var(--text-muted);">尾部填充 (对齐至 ${alignment} bytes)</td>
        </tr>
      `;
    }
    
    html += `
          </tbody>
        </table>
        
        <!-- 内存布局公式 -->
        <div style="margin-top:16px;padding:12px 14px;background:var(--bg-secondary);border-radius:var(--radius);font-family:var(--font-code);font-size:0.82rem;color:var(--text-secondary);">
          <div style="font-weight:600;margin-bottom:8px;color:var(--text-primary);">📐 内存布局公式:</div>
          <div>sizeof(${className}) = ${size} bytes</div>
          <div style="margin-top:4px;opacity:0.8;">
            = ${this.buildSizeFormula(layout)}
          </div>
          <div style="margin-top:8px;font-size:0.78rem;opacity:0.7;">
            alignof(${className}) = ${alignment} bytes — 最大成员对齐要求
          </div>
        </div>
      </div>
    `;
    
    this.el.canvas.innerHTML = html;
    this.updateActions(['clear']);
  }

  /* ---- 压栈动画 ---- */
  async pushFrame(frame) {
    if (!this.currentData || this.currentMode !== 'stack') {
      this.currentData = { type: 'stack', frames: [] };
      this.currentMode = 'stack';
    }
    
    this.currentData.frames = this.currentData.frames || [];
    this.currentData.frames.unshift(frame);
    
    // 重新渲染
    this.showStackFrame(this.currentData.frames);
    
    // 高亮新帧
    await this.delay(100);
    const newFrame = this.el.canvas.querySelector('.mm-stack-frame[data-idx="0"]');
    if (newFrame) {
      newFrame.style.boxShadow = '0 0 0 3px rgba(45, 127, 249, 0.4)';
      await this.delay(800);
      newFrame.style.boxShadow = '';
    }
  }

  /* ---- 弹栈动画 ---- */
  async popFrame() {
    if (!this.currentData?.frames?.length) return;
    
    const topFrame = this.el.canvas.querySelector('.mm-stack-frame[data-idx="0"]');
    if (topFrame) {
      topFrame.classList.add('popping');
      await this.delay(350);
    }
    
    this.currentData.frames.shift();
    this.showStackFrame(this.currentData.frames);
  }

  /* ---- 切换模式 ---- */
  switchMode(mode) {
    if (!MemoryMap.MODES.find(m => m.key === mode)) return;
    this.currentMode = mode;
    this.updateModeUI();
    
    // 如果当前有数据且类型匹配，重新渲染
    if (this.currentData && this.currentData.type === mode) {
      this.visualize(this.currentData);
    } else {
      // 显示空状态
      const modeInfo = MemoryMap.MODES.find(m => m.key === mode);
      this.el.canvas.innerHTML = `
        <div class="mm-empty-state">
          <div class="mm-empty-icon">${modeInfo.icon}</div>
          <div class="mm-empty-text">${modeInfo.label} 模式</div>
          <div class="mm-empty-hint">${modeInfo.desc} — 使用 .visualize() 方法加载数据</div>
        </div>
      `;
    }
    
    this.updateLegend();
    this.updateActions(['clear']);
  }

  /* ---- 重置 ---- */
  reset() {
    this.currentData = null;
    this.isAnimating = false;
    this.frameAnimationQueue = [];
    const modeInfo = MemoryMap.MODES.find(m => m.key === this.currentMode);
    this.el.canvas.innerHTML = `
      <div class="mm-empty-state">
        <div class="mm-empty-icon">${modeInfo.icon}</div>
        <div class="mm-empty-text">已重置</div>
        <div class="mm-empty-hint">使用 .visualize(data) 加载新数据</div>
      </div>
    `;
    this.updateActions(['clear']);
  }

  /* ========== 内部方法 ========== */

  updateModeUI() {
    // 更新标签页
    this.el.modeTabs?.querySelectorAll('.mm-mode-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.mode === this.currentMode);
    });
    
    // 更新模式标签
    const modeInfo = MemoryMap.MODES.find(m => m.key === this.currentMode);
    if (this.el.modeTag && modeInfo) {
      this.el.modeTag.className = `mm-mode-tag mode-${this.currentMode}`;
      this.el.modeTag.textContent = modeInfo.label;
    }
  }

  updateLegend() {
    const legends = {
      stack: [
        { color: MemoryMap.COLORS.stack.frame, label: '栈帧' },
        { color: MemoryMap.COLORS.stack.varLocal, label: '局部变量' },
        { color: MemoryMap.COLORS.stack.varParam, label: '参数' },
        { color: MemoryMap.COLORS.stack.callArrow, label: '调用链' },
      ],
      heap: [
        { color: MemoryMap.COLORS.heap.allocated, label: '已分配' },
        { color: MemoryMap.COLORS.heap.freed, label: '已释放' },
        { color: MemoryMap.COLORS.heap.leaked, label: '泄漏 (闪烁)' },
        { color: MemoryMap.COLORS.heap.orphan, label: '孤儿块' },
      ],
      pointers: [
        { color: MemoryMap.COLORS.pointer.valid, label: '有效指针' },
        { color: MemoryMap.COLORS.pointer.dangling, label: '悬空指针 (虚线)' },
        { color: MemoryMap.COLORS.pointer.null, label: '空指针' },
      ],
      object: [
        { color: MemoryMap.COLORS.object.vptr, label: 'vptr 虚表指针' },
        { color: MemoryMap.COLORS.object.member, label: '本类成员' },
        { color: MemoryMap.COLORS.object.inherited, label: '继承成员' },
        { color: MemoryMap.COLORS.object.padding, label: '对齐填充' },
      ]
    };
    
    const items = legends[this.currentMode] || [];
    this.el.legend.innerHTML = items.map(item => `
      <div class="mm-legend-item">
        <div class="mm-legend-color" style="background: ${item.color};"></div>
        <span>${item.label}</span>
      </div>
    `).join('');
  }

  updateActions(actions) {
    const actionHTML = actions.map(a => {
      switch(a) {
        case 'push': return `<button class="mm-action-btn primary" id="mmPush_${this._id}">📥 压栈</button>`;
        case 'pop': return `<button class="mm-action-btn" id="mmPop_${this._id}">📤 弹栈</button>`;
        case 'clear': return `<button class="mm-action-btn" id="mmClear_${this._id}">🗑 清空</button>`;
        default: return '';
      }
    }).join('');
    
    this.el.actions.innerHTML = actionHTML + `
      <div class="mm-step-info" id="mmStepInfo_${this._id}"></div>
    `;
    
    // 重新绑定
    if (actions.includes('push')) {
      document.getElementById(`mmPush_${this._id}`)?.addEventListener('click', () => {
        // 示例压栈
        this.pushFrame({
          name: 'new_func',
          vars: [
            { name: 'local_var', type: 'int', value: Math.floor(Math.random() * 100), addr: `0x7ffd_${Math.floor(Math.random()*0xFFFF).toString(16).padStart(4,'0')}` }
          ]
        });
      });
    }
    if (actions.includes('pop')) {
      document.getElementById(`mmPop_${this._id}`)?.addEventListener('click', () => this.popFrame());
    }
    if (actions.includes('clear')) {
      document.getElementById(`mmClear_${this._id}`)?.addEventListener('click', () => this.reset());
    }
  }

  formatParams(params) {
    if (!params || params.length === 0) return '';
    return params.map(p => `${p.type} ${p.name}`).join(', ');
  }

  buildSizeFormula(layout) {
    const parts = [];
    if (layout.vptr?.size) parts.push(`vptr(${layout.vptr.size})`);
    (layout.members || []).forEach(m => {
      parts.push(`${m.name}(${m.size})`);
    });
    
    // 计算 padding
    let total = (layout.vptr?.size || 0);
    layout.members?.forEach(m => total += m.size);
    const padding = (layout.size || 0) - total;
    if (padding > 0) parts.push(`padding(${padding})`);
    
    return parts.join(' + ');
  }

  showError(message) {
    this.el.canvas.innerHTML = `
      <div class="mm-empty-state">
        <div class="mm-empty-icon" style="color:var(--danger);">❌</div>
        <div class="mm-empty-text" style="color:var(--danger);">${message}</div>
      </div>
    `;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ---- 销毁 ---- */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

/* ===== 全局注册 ===== */
if (typeof window !== 'undefined') {
  window.MemoryMap = MemoryMap;
}
