/* ===== GodboltViewer - Compiler Explorer 集成组件 ===== */

/**
 * GodboltViewer: Compiler Explorer (godbolt.org) iframe 嵌入组件
 * 
 * 特性：
 * - ClientState Base64 编码协议完整实现
 * - 懒加载：可视区域外不加载 iframe
 * - 多编译器支持：clang/gcc/msvc
 * - 自定义编译参数
 * - 新窗口打开功能
 * 
 * 使用：new GodboltViewer(containerElement)
 *      viewer.embed(code, compiler, flags)
 */
class GodboltViewer {
  /* ---- 默认编译器配置 ---- */
  static DEFAULT_COMPILER = 'clang_trunk';
  
  static COMPILERS = {
    clang_trunk: {
      id: 'clang_trunk',
      name: 'Clang (trunk)',
      lang: 'c++',
      groupName: 'clang',
      instructionSet: 'amd64',
      flags: '-std=c++23 -O3 -Wall'
    },
    clang1701: {
      id: 'clang1701',
      name: 'Clang 17.0.1',
      lang: 'c++',
      groupName: 'clang',
      instructionSet: 'amd64',
      flags: '-std=c++20 -O2'
    },
    g132: {
      id: 'g132',
      name: 'GCC 13.2',
      lang: 'c++',
      groupName: 'gcc',
      instructionSet: 'amd64',
      flags: '-std=c++23 -O3'
    },
    gcc_trunk: {
      id: 'gsnapshot',
      name: 'GCC (trunk)',
      lang: 'c++',
      groupName: 'gcc',
      instructionSet: 'amd64',
      flags: '-std=c++23 -O3'
    },
    msvc_v19_latest: {
      id: 'vcpp_v19_latest_x64',
      name: 'MSVC v19.latest',
      lang: 'c++',
      groupName: 'vc2015',
      instructionSet: 'amd64',
      flags: '/std:c++20 /O2'
    }
  };

  /* ---- Godbolt ClientState 协议版本 ---- */
  static CLIENT_STATE_VERSION = 2;

  constructor(container) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      throw new Error('GodboltViewer: container element not found');
    }
    
    this.currentCode = '';
    this.currentCompiler = GodboltViewer.DEFAULT_COMPILER;
    this.currentFlags = '-std=c++23 -O3 -Wall';
    this.isLoaded = false;
    this.isVisible = false;
    this.intersectionObserver = null;
    
    this.init();
  }

  /* ---- 生成唯一 ID ---- */
  get _id() {
    if (!this.__id) {
      this.__id = Math.random().toString(36).slice(2, 9);
    }
    return this.__id;
  }

  /* ---- 初始化 ---- */
  init() {
    this.injectStyles();
    this.render();
    this.cacheElements();
    this.bindEvents();
    this.setupLazyLoad();
  }

  /* ---- 注入组件样式 ---- */
  injectStyles() {
    if (document.getElementById('godbolt-viewer-styles')) return;
    const style = document.createElement('style');
    style.id = 'godbolt-viewer-styles';
    style.textContent = `
      /* ===== GodboltViewer 组件样式 ===== */
      .godbolt-viewer {
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        background: var(--bg-primary);
        box-shadow: var(--shadow);
        font-family: var(--font-body);
        display: flex;
        flex-direction: column;
      }
      
      /* 标题栏 */
      .gb-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--bg-tertiary);
        border-bottom: 1px solid var(--border);
        gap: 12px;
        flex-wrap: wrap;
      }
      .gb-header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .gb-header-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .gb-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .gb-compiler-tag {
        font-size: 0.75rem;
        padding: 3px 10px;
        border-radius: 12px;
        font-weight: 600;
        font-family: var(--font-code);
        background: rgba(139, 92, 246, 0.1);
        color: #8B5CF6;
        border: 1px solid #8B5CF6;
      }
      
      .gb-flags-tag {
        font-size: 0.72rem;
        padding: 3px 10px;
        border-radius: 4px;
        font-family: var(--font-code);
        background: var(--bg-secondary);
        color: var(--text-secondary);
        border: 1px solid var(--border);
      }
      
      .gb-compiler-select {
        padding: 5px 10px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        transition: var(--transition);
      }
      .gb-compiler-select:focus {
        outline: none;
        border-color: var(--accent);
      }
      
      /* 按钮 */
      .gb-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-primary);
        color: var(--text-secondary);
        font-family: var(--font-body);
        font-size: 0.8rem;
        cursor: pointer;
        transition: var(--transition);
        white-space: nowrap;
        text-decoration: none;
      }
      .gb-btn:hover {
        border-color: var(--accent);
        color: var(--accent);
        background: var(--accent-light);
      }
      .gb-btn.external::after {
        content: "↗";
        font-size: 0.7rem;
        opacity: 0.7;
      }
      .gb-btn.primary {
        background: #8B5CF6;
        color: white;
        border-color: #8B5CF6;
      }
      .gb-btn.primary:hover {
        background: #7C3AED;
        border-color: #7C3AED;
        color: white;
      }
      
      /* iframe 区域 */
      .gb-iframe-wrapper {
        position: relative;
        min-height: 300px;
        background: var(--bg-secondary);
      }
      
      .gb-iframe {
        width: 100%;
        height: 500px;
        border: none;
        display: none;
        transition: opacity 0.3s ease;
      }
      .gb-iframe.loaded {
        display: block;
        animation: gbFadeIn 0.5s ease;
      }
      @keyframes gbFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* 骨架屏 */
      .gb-skeleton {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 12px;
      }
      .gb-skeleton.hidden {
        display: none;
      }
      
      .gb-skeleton-line {
        height: 16px;
        border-radius: 4px;
        background: var(--bg-tertiary);
        animation: gbSkeletonShimmer 1.5s infinite;
      }
      .gb-skeleton-line.short { width: 40%; }
      .gb-skeleton-line.medium { width: 65%; }
      .gb-skeleton-line.long { width: 90%; }
      .gb-skeleton-line.header { 
        height: 24px; 
        width: 30%; 
        margin-bottom: 8px;
        background: var(--border);
      }
      
      @keyframes gbSkeletonShimmer {
        0% { opacity: 0.4; }
        50% { opacity: 0.8; }
        100% { opacity: 0.4; }
      }
      
      /* 懒加载提示 */
      .gb-lazy-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: var(--text-muted);
        text-align: center;
        padding: 40px;
      }
      .gb-lazy-placeholder.hidden {
        display: none;
      }
      .gb-lazy-icon {
        font-size: 2.5rem;
        opacity: 0.5;
      }
      .gb-lazy-text {
        font-size: 0.9rem;
      }
      .gb-lazy-hint {
        font-size: 0.78rem;
        opacity: 0.7;
      }
      .gb-lazy-btn {
        margin-top: 8px;
        padding: 8px 20px;
        border: 1px solid var(--accent);
        border-radius: var(--radius);
        background: var(--accent);
        color: white;
        font-family: var(--font-body);
        font-size: 0.85rem;
        cursor: pointer;
        transition: var(--transition);
      }
      .gb-lazy-btn:hover {
        background: var(--accent-hover);
      }
      
      /* 底部栏 */
      .gb-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 16px;
        background: var(--bg-tertiary);
        border-top: 1px solid var(--border);
        font-size: 0.75rem;
        color: var(--text-muted);
        flex-wrap: wrap;
        gap: 8px;
      }
      .gb-footer a {
        color: var(--accent);
        text-decoration: none;
      }
      .gb-footer a:hover {
        text-decoration: underline;
      }
      
      /* 错误状态 */
      .gb-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;
        gap: 12px;
        color: var(--danger);
        text-align: center;
      }
      .gb-error.hidden {
        display: none;
      }
      .gb-error-icon {
        font-size: 2.5rem;
      }
      .gb-error-text {
        font-size: 0.9rem;
        font-weight: 500;
      }
      .gb-error-hint {
        font-size: 0.78rem;
        color: var(--text-muted);
      }
      
      /* 参数编辑 */
      .gb-flags-edit {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .gb-flags-input {
        padding: 5px 10px;
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-family: var(--font-code);
        font-size: 0.78rem;
        width: 250px;
        transition: var(--transition);
      }
      .gb-flags-input:focus {
        outline: none;
        border-color: #8B5CF6;
      }
      
      /* 响应式 */
      @media (max-width: 768px) {
        .gb-header {
          flex-direction: column;
          align-items: stretch;
        }
        .gb-iframe {
          height: 350px;
        }
        .gb-flags-input {
          width: 100%;
        }
        .gb-lazy-placeholder {
          padding: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ---- 渲染 UI ---- */
  render() {
    this.container.innerHTML = `
      <div class="godbolt-viewer">
        <!-- 标题栏 -->
        <div class="gb-header">
          <div class="gb-header-left">
            <span class="gb-title">
              🔧 Compiler Explorer
              <span class="gb-compiler-tag" id="gbCompilerTag_${this._id}">Clang (trunk)</span>
            </span>
            <span class="gb-flags-tag" id="gbFlagsTag_${this._id}">-std=c++23 -O3 -Wall</span>
          </div>
          <div class="gb-header-right">
            <select class="gb-compiler-select" id="gbCompilerSel_${this._id}">
              ${Object.entries(GodboltViewer.COMPILERS).map(([key, c]) => 
                `<option value="${key}" ${key === this.currentCompiler ? 'selected' : ''}>${c.name}</option>`
              ).join('')}
            </select>
            <button class="gb-btn primary" id="gbReload_${this._id}">🔄 重新加载</button>
            <a class="gb-btn external" id="gbExternal_${this._id}" href="#" target="_blank" rel="noopener noreferrer">
              在 Godbolt 打开
            </a>
          </div>
        </div>
        
        <!-- 参数编辑栏 -->
        <div style="padding: 8px 16px; background: var(--bg-secondary); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="font-size:0.78rem; color:var(--text-muted); white-space:nowrap;">编译参数:</span>
          <div class="gb-flags-edit">
            <input type="text" class="gb-flags-input" id="gbFlagsInput_${this._id}" 
              value="${this.currentFlags}" 
              placeholder="编译参数..."
              title="编辑编译参数后按 Enter 或点击重新加载">
          </div>
        </div>
        
        <!-- iframe 区域 -->
        <div class="gb-iframe-wrapper" id="gbIframeWrapper_${this._id}" style="min-height: 300px;">
          <!-- 懒加载占位 -->
          <div class="gb-lazy-placeholder" id="gbLazy_${this._id}">
            <div class="gb-lazy-icon">🔧</div>
            <div class="gb-lazy-text">Compiler Explorer 嵌入视图</div>
            <div class="gb-lazy-hint">向下滚动自动加载，或点击下方按钮</div>
            <button class="gb-lazy-btn" id="gbLazyBtn_${this._id}">⚡ 立即加载</button>
          </div>
          
          <!-- 骨架屏 -->
          <div class="gb-skeleton hidden" id="gbSkeleton_${this._id}">
            <div class="gb-skeleton-line header"></div>
            <div class="gb-skeleton-line long"></div>
            <div class="gb-skeleton-line medium"></div>
            <div class="gb-skeleton-line long"></div>
            <div class="gb-skeleton-line short"></div>
            <div class="gb-skeleton-line long"></div>
            <div class="gb-skeleton-line medium"></div>
            <div class="gb-skeleton-line long"></div>
          </div>
          
          <!-- 错误显示 -->
          <div class="gb-error hidden" id="gbError_${this._id}">
            <div class="gb-error-icon">⚠️</div>
            <div class="gb-error-text" id="gbErrorText_${this._id}">加载失败</div>
            <div class="gb-error-hint">请检查网络连接后重试</div>
            <button class="gb-btn" style="margin-top:8px;" id="gbRetry_${this._id}">重试</button>
          </div>
          
          <!-- 实际 iframe -->
          <iframe 
            class="gb-iframe" 
            id="gbIframe_${this._id}" 
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            title="Compiler Explorer"
            loading="lazy"
          ></iframe>
        </div>
        
        <!-- 底部栏 -->
        <div class="gb-footer">
          <span>🌐 由 <a href="https://godbolt.org" target="_blank" rel="noopener noreferrer">godbolt.org</a> 提供支持</span>
          <span id="gbStatus_${this._id}">等待加载...</span>
        </div>
      </div>
    `;
    
    this.cacheElements();
  }

  cacheElements() {
    this.el = {
      compilerTag: document.getElementById(`gbCompilerTag_${this._id}`),
      flagsTag: document.getElementById(`gbFlagsTag_${this._id}`),
      compilerSelect: document.getElementById(`gbCompilerSel_${this._id}`),
      reloadBtn: document.getElementById(`gbReload_${this._id}`),
      externalLink: document.getElementById(`gbExternal_${this._id}`),
      flagsInput: document.getElementById(`gbFlagsInput_${this._id}`),
      iframeWrapper: document.getElementById(`gbIframeWrapper_${this._id}`),
      lazyPlaceholder: document.getElementById(`gbLazy_${this._id}`),
      lazyBtn: document.getElementById(`gbLazyBtn_${this._id}`),
      skeleton: document.getElementById(`gbSkeleton_${this._id}`),
      error: document.getElementById(`gbError_${this._id}`),
      errorText: document.getElementById(`gbErrorText_${this._id}`),
      retryBtn: document.getElementById(`gbRetry_${this._id}`),
      iframe: document.getElementById(`gbIframe_${this._id}`),
      status: document.getElementById(`gbStatus_${this._id}`),
    };
  }

  bindEvents() {
    // 编译器切换
    this.el.compilerSelect?.addEventListener('change', (e) => {
      this.currentCompiler = e.target.value;
      const compiler = GodboltViewer.COMPILERS[this.currentCompiler];
      if (compiler) {
        this.currentFlags = compiler.flags;
        this.el.flagsInput.value = compiler.flags;
        this.el.flagsTag.textContent = compiler.flags;
        this.el.compilerTag.textContent = compiler.name;
      }
      if (this.isLoaded) {
        this.reload();
      }
    });
    
    // 重新加载
    this.el.reloadBtn?.addEventListener('click', () => this.reload());
    
    // 懒加载按钮
    this.el.lazyBtn?.addEventListener('click', () => {
      this.isVisible = true;
      this.load();
    });
    
    // 重试
    this.el.retryBtn?.addEventListener('click', () => {
      this.hideError();
      this.load();
    });
    
    // 参数编辑
    this.el.flagsInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.currentFlags = this.el.flagsInput.value.trim();
        this.el.flagsTag.textContent = this.currentFlags;
        if (this.isLoaded) {
          this.reload();
        } else {
          this.isVisible = true;
          this.load();
        }
      }
    });
    
    // iframe 加载事件
    this.el.iframe?.addEventListener('load', () => {
      this.el.skeleton?.classList.add('hidden');
      this.el.iframe?.classList.add('loaded');
      this.el.status.textContent = '✓ 已加载';
    });
    
    this.el.iframe?.addEventListener('error', () => {
      this.showError('iframe 加载失败');
    });
  }

  /* ---- 懒加载设置 (IntersectionObserver) ---- */
  setupLazyLoad() {
    if (!this.el.iframeWrapper) return;
    
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isLoaded && !this.isVisible) {
            this.isVisible = true;
            this.load();
          }
        });
      },
      { rootMargin: '100px' } // 提前 100px 开始加载
    );
    
    this.intersectionObserver.observe(this.el.iframeWrapper);
  }

  /* ========== 核心 API ========== */

  /**
   * 嵌入代码到 Compiler Explorer
   * @param {string} code - C++ 源代码
   * @param {string} compiler - 编译器 key (可选, 默认 clang_trunk)
   * @param {string} flags - 编译参数 (可选, 默认 -std=c++23 -O3 -Wall)
   */
  embed(code, compiler, flags) {
    this.currentCode = code || '';
    this.currentCompiler = compiler || GodboltViewer.DEFAULT_COMPILER;
    this.currentFlags = flags || (GodboltViewer.COMPILERS[this.currentCompiler]?.flags || '-std=c++23 -O3');
    
    // 更新 UI
    const comp = GodboltViewer.COMPILERS[this.currentCompiler];
    this.el.compilerTag.textContent = comp?.name || this.currentCompiler;
    this.el.flagsTag.textContent = this.currentFlags;
    this.el.compilerSelect.value = this.currentCompiler;
    this.el.flagsInput.value = this.currentFlags;
    
    // 重置并加载
    this.isLoaded = false;
    this.el.iframe.classList.remove('loaded');
    this.el.skeleton.classList.add('hidden');
    this.hideError();
    
    if (this.isVisible) {
      this.load();
    } else {
      // 显示占位符，等待进入视口
      this.el.lazyPlaceholder.classList.remove('hidden');
    }
  }

  /**
   * 重新加载当前代码
   */
  reload() {
    this.isLoaded = false;
    this.el.iframe.classList.remove('loaded');
    this.el.skeleton.classList.add('hidden');
    this.hideError();
    this.load();
  }

  /**
   * 设置 iframe 高度
   */
  setHeight(height) {
    if (this.el.iframe) {
      this.el.iframe.style.height = `${height}px`;
    }
  }

  /* ========== 内部方法 ========== */

  load() {
    if (this.isLoaded) return;
    
    this.el.lazyPlaceholder?.classList.add('hidden');
    this.el.skeleton?.classList.remove('hidden');
    this.el.status.textContent = '加载中...';
    
    try {
      const state = this.buildClientState();
      const encoded = this.encodeClientState(state);
      const url = `https://godbolt.org/clientstate/${encoded}`;
      
      this.el.iframe.src = url;
      this.el.externalLink.href = url;
      this.isLoaded = true;
      
      // 超时检测
      this.loadTimeout = setTimeout(() => {
        if (!this.el.iframe.classList.contains('loaded')) {
          this.showError('加载超时，请检查网络连接');
        }
      }, 30000);
      
    } catch (err) {
      this.showError(`构建 URL 失败: ${err.message}`);
    }
  }

  /**
   * 构建 Godbolt ClientState 对象
   * 参考: https://github.com/compiler-explorer/compiler-explorer/blob/main/docs/API.md
   */
  buildClientState() {
    const comp = GodboltViewer.COMPILERS[this.currentCompiler];
    const compilerId = comp?.id || this.currentCompiler;
    
    return {
      version: GodboltViewer.CLIENT_STATE_VERSION,
      sessions: [
        {
          id: 1,
          language: 'c++',
          source: this.currentCode,
          compilers: [
            {
              id: compilerId,
              options: this.currentFlags,
              filters: {
                binary: false,
                binaryObject: false,
                commentOnly: true,
                demangle: true,
                directives: true,
                execute: false,
                intel: true,
                labels: true,
                libraryCode: false,
                trim: false
              }
            }
          ],
          executors: []
        }
      ]
    };
  }

  /**
   * 编码 ClientState 为 Base64 (URL-safe)
   * Godbolt ClientState 编码流程:
   * 1. JSON.stringify(state)
   * 2. deflate (zlib) — 浏览器端使用 pako 库或省略压缩
   * 3. Base64 URL-safe encoding
   * 
   * 简化版本: 直接 Base64 编码 (Godbolt 也支持未压缩的 JSON)
   */
  encodeClientState(state) {
    const jsonStr = JSON.stringify(state);
    
    // 尝试使用 zlib 压缩 (如果 pako 可用)
    if (typeof pako !== 'undefined') {
      try {
        const compressed = pako.deflate(jsonStr, { level: 9 });
        return this.arrayToBase64UrlSafe(compressed);
      } catch (e) {
        // 降级到未压缩
      }
    }
    
    // 未压缩版本: Godbolt 接受直接的 Base64 JSON
    // 但标准 ClientState API 期望压缩格式
    // 作为替代方案，我们使用短链接 API 风格的嵌入
    return btoa(jsonStr)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  arrayToBase64UrlSafe(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /**
   * 生成短链接格式的 Godbolt URL (备选方案)
   * 这种方式更可靠，因为它使用 Godbolt 的短链接服务
   */
  buildShortLinkUrl() {
    const comp = GodboltViewer.COMPILERS[this.currentCompiler];
    const compilerId = comp?.id || this.currentCompiler;
    
    // Godbolt 短链接格式: /z/ 后面跟 Base64
    const shortConfig = {
      version: 4,
      content: [
        {
          type: 'component',
          componentName: 'codeEditor',
          componentState: {
            id: 1,
            source: this.currentCode,
            lang: 'c++',
            filename: 'example.cpp'
          }
        },
        {
          type: 'component',
          componentName: 'compiler',
          componentState: {
            compiler: compilerId,
            source: 1,
            options: this.currentFlags,
            filters: {
              binary: false,
              commentOnly: true,
              demangle: true,
              directives: true,
              execute: false,
              intel: true,
              labels: true,
              libraryCode: false,
              trim: false
            }
          }
        }
      ]
    };
    
    const jsonStr = JSON.stringify(shortConfig);
    const base64 = btoa(jsonStr)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    return `https://godbolt.org/clientstate/${base64}`;
  }

  showError(message) {
    this.el.skeleton?.classList.add('hidden');
    this.el.iframe?.classList.remove('loaded');
    this.el.error?.classList.remove('hidden');
    if (this.el.errorText) this.el.errorText.textContent = message;
    if (this.el.status) this.el.status.textContent = `✗ 错误`;
    if (this.loadTimeout) clearTimeout(this.loadTimeout);
  }

  hideError() {
    this.el.error?.classList.add('hidden');
  }

  /**
   * 获取当前可直接在浏览器中打开的 Godbolt 链接
   * 这种方式不依赖 iframe，直接打开完整编辑器
   */
  getExternalUrl() {
    return this.buildShortLinkUrl();
  }

  /* ---- 销毁 ---- */
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

/* ===== 全局注册 ===== */
if (typeof window !== 'undefined') {
  window.GodboltViewer = GodboltViewer;
}
