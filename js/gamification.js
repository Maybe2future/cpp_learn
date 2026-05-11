/* ===== C++ 全栈教程 - 游戏化激励系统 ===== */

/**
 * 成就定义
 * condition 函数接收 progressData，返回 boolean
 */
const ACHIEVEMENTS = [
  { id: 'first_step', name: '第一步', desc: '完成第一章阅读', icon: '\u{1F680}', condition: (p) => Object.values(p.chapters).some(c => c.read) },
  { id: 'quiz_master', name: '答题达人', desc: '单次测验获得满分', icon: '\u{1F3AF}', condition: (p) => Object.values(p.chapters).some(c => c.quizScore === 100) },
  { id: 'code_runner', name: '代码执行者', desc: '首次运行 Wasm 编辑器代码', icon: '\u{25B6}\u{FE0F}', condition: (p) => p.achievements.includes('code_runner') },
  { id: 'streak_3', name: '三日连击', desc: '连续学习3天', icon: '\u{1F525}', condition: (p) => p.streakDays >= 3 },
  { id: 'streak_7', name: '周常学者', desc: '连续学习7天', icon: '\u{1F525}', condition: (p) => p.streakDays >= 7 },
  { id: 'streak_30', name: '月度达人', desc: '连续学习30天', icon: '\u{1F4C5}', condition: (p) => p.streakDays >= 30 },
  { id: 'memory_explorer', name: '内存探险家', desc: '使用内存可视化工具', icon: '\u{1F9E0}', condition: (p) => p.achievements.includes('memory_explorer') },
  { id: 'halfway', name: '半程英雄', desc: '完成50%的教程内容', icon: '\u{26A1}', condition: (p) => getOverallProgressPercent(p) >= 50 },
  { id: 'completionist', name: '完美收官', desc: '完成全部教程内容', icon: '\u{1F451}', condition: (p) => getOverallProgressPercent(p) >= 100 },
  { id: 'night_owl', name: '夜猫子', desc: '在22:00后学习', icon: '\u{1F989}', condition: (p) => p.achievements.includes('night_owl') },
  { id: 'early_bird', name: '早起鸟', desc: '在06:00-08:00学习', icon: '\u{1F426}', condition: (p) => p.achievements.includes('early_bird') },
  { id: 'format_expert', name: '格式化专家', desc: '掌握 std::format 用法', icon: '\u{1F4DD}', condition: (p) => p.achievements.includes('format_expert') },
  { id: 'module_pioneer', name: '模块先锋', desc: '使用 import std 编写代码', icon: '\u{1F4E6}', condition: (p) => p.achievements.includes('module_pioneer') },
  { id: 'quiz_rookie', name: '答题新手', desc: '完成第一次测验', icon: '\u{1F4DA}', condition: (p) => Object.values(p.chapters).some(c => c.quizScore !== null) },
  { id: 'code_warrior', name: '代码战士', desc: '完成5个章节的代码练习', icon: '\u{1F4BB}', condition: (p) => Object.values(p.chapters).filter(c => c.codeCompleted).length >= 5 },
  { id: 'diligent_reader', name: '勤学苦读', desc: '累计学习时长超过10小时', icon: '\u{23F3}', condition: (p) => {
    let total = 0;
    for (const m of Object.values(p.dailyStudyMinutes || {})) total += m;
    for (const c of Object.values(p.chapters)) if (c.timeSpent) total += Math.floor(c.timeSpent / 60);
    return total >= 600;
  }},
];

/** 从 progressData 计算总进度百分比 */
function getOverallProgressPercent(p) {
  const totalChapters = 16;
  if (totalChapters === 0) return 0;
  let completed = 0;
  for (const c of Object.values(p.chapters || {})) {
    if (c.read && c.quizScore !== null && c.quizScore >= 60) completed++;
  }
  return Math.round((completed / totalChapters) * 100);
}

/**
 * GamificationSystem - 游戏化系统主类
 * 负责成就检测、UI 渲染和交互
 */
class GamificationSystem {
  constructor(progressManager) {
    this.pm = progressManager;
    this._achievementPopupQueue = [];
    this._isShowingPopup = false;
  }

  /* ---------- 成就检测 ---------- */

  checkAllAchievements() {
    const newlyUnlocked = [];
    for (const ach of ACHIEVEMENTS) {
      if (!this.pm.hasAchievement(ach.id) && ach.condition(this.pm.data)) {
        if (this.pm.addAchievement(ach.id)) {
          newlyUnlocked.push(ach);
        }
      }
    }
    // 显示成就弹窗（逐个）
    newlyUnlocked.forEach(a => this._queueAchievementPopup(a));
    return newlyUnlocked;
  }

  triggerAchievement(achievementId) {
    if (!this.pm.hasAchievement(achievementId)) {
      const ach = ACHIEVEMENTS.find(a => a.id === achievementId);
      if (ach) {
        this.pm.addAchievement(achievementId);
        this._queueAchievementPopup(ach);
        return ach;
      }
    }
    return null;
  }

  /* ---------- 成就弹窗 ---------- */

  _queueAchievementPopup(achievement) {
    this._achievementPopupQueue.push(achievement);
    if (!this._isShowingPopup) this._showNextPopup();
  }

  _showNextPopup() {
    if (this._achievementPopupQueue.length === 0) {
      this._isShowingPopup = false;
      return;
    }
    this._isShowingPopup = true;
    const ach = this._achievementPopupQueue.shift();
    this._renderAchievementPopup(ach);
    setTimeout(() => this._showNextPopup(), 3000);
  }

  _renderAchievementPopup(ach) {
    let el = document.getElementById('achievementPopup');
    if (!el) {
      el = document.createElement('div');
      el.id = 'achievementPopup';
      el.style.cssText = 'position:fixed; top:80px; right:24px; z-index:3000; transform:translateX(120%); transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1); max-width:320px;';
      document.body.appendChild(el);
    }
    el.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px; padding:16px 20px; background:var(--bg-primary); border:1px solid var(--accent); border-radius:var(--radius-lg); box-shadow:0 8px 24px rgba(45,127,249,0.25);">
        <div style="font-size:2.5rem; animation:achBounce 0.6s ease;">${ach.icon}</div>
        <div>
          <div style="font-size:0.75rem; font-weight:600; color:var(--accent); text-transform:uppercase; letter-spacing:1px;">解锁成就</div>
          <div style="font-size:1.05rem; font-weight:700; color:var(--text-primary);">${ach.name}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary);">${ach.desc}</div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      el.style.transform = 'translateX(0)';
    });
    setTimeout(() => {
      el.style.transform = 'translateX(120%)';
    }, 2500);
  }

  /* ---------- 环形进度条（SVG） ---------- */

  renderProgressRing(containerId, percent) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const size = 120;
    const stroke = 8;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    container.innerHTML = `
      <div style="position:relative; width:${size}px; height:${size}px; margin:0 auto;">
        <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform:rotate(-90deg);">
          <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="var(--border)" stroke-width="${stroke}"/>
          <circle id="progressCircle" cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="var(--accent)" stroke-width="${stroke}"
            stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"
            style="transition:stroke-dashoffset 1.5s cubic-bezier(0.34,1.56,0.64,1);"/>
        </svg>
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span id="progressPercent" style="font-size:1.5rem; font-weight:700; color:var(--accent); font-family:var(--font-code);">0%</span>
          <span style="font-size:0.65rem; color:var(--text-muted);">总进度</span>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      const circle = container.querySelector('#progressCircle');
      const label = container.querySelector('#progressPercent');
      if (circle) circle.style.strokeDashoffset = offset;
      // 数字动画
      this._animateNumber(label, 0, percent, 1500, '%');
    });
  }

  _animateNumber(el, from, to, duration, suffix = '') {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(from + (to - from) * eased);
      if (el) el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- 热力图 ---------- */

  renderHeatmap(containerId, dailyData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const weeks = 53;
    const days = 7;
    const cellSize = 14;
    const gap = 3;

    // 计算级别（0-4）
    const maxMinutes = Math.max(...dailyData.map(d => d.minutes), 1);
    const getLevel = (m) => {
      if (m === 0) return 0;
      if (m < 15) return 1;
      if (m < 30) return 2;
      if (m < 60) return 3;
      return 4;
    };

    const levelColors = [
      'var(--heatmap-0, var(--bg-tertiary))',
      'var(--heatmap-1, #9be9a8)',
      'var(--heatmap-2, #40c463)',
      'var(--heatmap-3, #30a14e)',
      'var(--heatmap-4, #216e39)',
    ];

    const levelColorsDark = [
      'var(--heatmap-0, #1E293B)',
      'rgba(96,165,250,0.2)',
      'rgba(96,165,250,0.4)',
      'rgba(96,165,250,0.7)',
      '#60A5FA',
    ];

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = isDark ? levelColorsDark : levelColors;

    let html = `<div style="display:flex; flex-wrap:wrap; gap:2px; justify-content:center;">`;

    // 按周组织数据
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (weeks * 7 - 1));

    for (let w = 0; w < weeks; w++) {
      html += `<div style="display:flex; flex-direction:column; gap:${gap}px;">`;
      for (let d = 0; d < days; d++) {
        const idx = w * 7 + d;
        const data = dailyData[idx] || { date: '', minutes: 0 };
        const level = getLevel(data.minutes);
        const color = colors[level];
        const tooltip = `${data.date}: ${data.minutes > 0 ? data.minutes + ' 分钟' : '无记录'}`;
        html += `<div style="width:${cellSize}px; height:${cellSize}px; border-radius:3px; background:${color}; cursor:pointer; transition:transform 0.15s;" title="${tooltip}"
          onmouseover="this.style.transform='scale(1.3)'; this.style.boxShadow='0 0 4px rgba(45,127,249,0.4)';"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';"></div>`;
      }
      html += `</div>`;
    }

    // 图例
    html += `</div><div style="display:flex; align-items:center; gap:6px; justify-content:flex-end; margin-top:12px; font-size:0.75rem; color:var(--text-muted);">
      <span>少</span>
      ${[0,1,2,3,4].map(l => `<div style="width:${cellSize}px; height:${cellSize}px; border-radius:3px; background:${colors[l]};"></div>`).join('')}
      <span>多</span>
    </div>`;

    container.innerHTML = html;
  }

  /* ---------- 成就徽章面板 ---------- */

  renderAchievements(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const unlocked = this.pm.getUnlockedAchievements();
    const overallProgress = this.pm.getOverallProgress();
    const streakDays = this.pm.getStudyStreak();

    let html = `<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:12px;">`;
    for (const ach of ACHIEVEMENTS) {
      const isUnlocked = unlocked.includes(ach.id);
      const shouldUnlock = !isUnlocked && ach.condition(this.pm.data);
      const displayUnlocked = isUnlocked || shouldUnlock;
      const glowClass = displayUnlocked ? 'achievement-glow' : '';
      const bg = displayUnlocked
        ? 'linear-gradient(135deg, rgba(45,127,249,0.08), rgba(16,185,129,0.08))'
        : 'var(--bg-secondary)';
      const borderColor = displayUnlocked ? 'var(--accent)' : 'var(--border)';
      const textColor = displayUnlocked ? 'var(--text-primary)' : 'var(--text-muted)';
      const iconOpacity = displayUnlocked ? '1' : '0.3';
      const lockIcon = !displayUnlocked ? '<div style="position:absolute; top:8px; right:8px; font-size:0.75rem; opacity:0.5;">🔒</div>' : '';

      html += `
        <div class="achievement-card ${glowClass}" data-aid="${ach.id}" style="position:relative; padding:16px; border:1px solid ${borderColor}; border-radius:var(--radius-lg); background:${bg}; cursor:pointer; transition:all 0.25s ease; display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center;"
          onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='var(--shadow-md)';"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          ${lockIcon}
          <div style="font-size:2rem; opacity:${iconOpacity}; transition:all 0.3s ease;">${ach.icon}</div>
          <div style="font-weight:600; font-size:0.85rem; color:${textColor};">${ach.name}</div>
          <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.4;">${ach.desc}</div>
        </div>
      `;
    }
    html += `</div>`;
    container.innerHTML = html;

    // 绑定点击事件
    container.querySelectorAll('.achievement-card').forEach(card => {
      card.addEventListener('click', () => {
        const aid = card.dataset.aid;
        const ach = ACHIEVEMENTS.find(a => a.id === aid);
        if (ach) this._showAchievementDetail(ach, this.pm.hasAchievement(aid));
      });
    });
  }

  _showAchievementDetail(achievement, unlocked) {
    let modal = document.getElementById('achievementDetailModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'achievementDetailModal';
      modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:2500; display:flex; align-items:center; justify-content:center;';
      document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div style="background:var(--bg-primary); padding:32px; border-radius:var(--radius-lg); max-width:380px; width:90%; border:1px solid var(--border); box-shadow:var(--shadow-md); text-align:center;">
        <div style="font-size:4rem; margin-bottom:12px; opacity:${unlocked ? '1' : '0.3'};">${achievement.icon}</div>
        <h2 style="margin-bottom:8px; color:var(--text-primary);">${achievement.name}</h2>
        <p style="color:var(--text-secondary); margin-bottom:12px;">${achievement.desc}</p>
        <div style="display:inline-block; padding:6px 16px; border-radius:20px; font-size:0.85rem; font-weight:600; ${unlocked ? 'background:rgba(45,127,249,0.12); color:var(--accent);' : 'background:var(--bg-tertiary); color:var(--text-muted);'}">
          ${unlocked ? '✅ 已解锁' : '🔒 未解锁'}
        </div>
        <div style="margin-top:20px;">
          <button onclick="document.getElementById('achievementDetailModal').style.display='none';" style="padding:8px 24px; border-radius:var(--radius); border:1px solid var(--border); background:var(--bg-secondary); color:var(--text-primary); cursor:pointer;">关闭</button>
        </div>
      </div>
    `;
    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = 'none';
    };
  }

  /* ---------- 学习统计面板 ---------- */

  renderStats(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const totalTime = this.pm.getTotalStudyTime();
    const hours = Math.floor(totalTime / 60);
    const mins = totalTime % 60;
    const streak = this.pm.getStudyStreak();
    const unlocked = this.pm.getUnlockedAchievements();
    const chapters = this.pm.data.chapters || {};
    let readCount = 0;
    let quizTotal = 0;
    let quizCount = 0;
    for (const c of Object.values(chapters)) {
      if (c.read) readCount++;
      if (c.quizScore !== null) { quizTotal += c.quizScore; quizCount++; }
    }
    const avgScore = quizCount > 0 ? Math.round(quizTotal / quizCount) : 0;

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:16px;">
        <div class="stat-card" style="padding:20px; border-radius:var(--radius-lg); background:var(--bg-secondary); border:1px solid var(--border); text-align:center; transition:all 0.25s;"
          onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          <div style="font-size:1.75rem; font-weight:700; color:var(--accent); font-family:var(--font-code);">${hours}<span style="font-size:0.9rem;">h</span> ${mins}<span style="font-size:0.9rem;">m</span></div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">总学习时长</div>
        </div>
        <div class="stat-card" style="padding:20px; border-radius:var(--radius-lg); background:var(--bg-secondary); border:1px solid var(--border); text-align:center; transition:all 0.25s;"
          onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          <div style="font-size:1.75rem; font-weight:700; color:var(--success); font-family:var(--font-code);">${readCount} <span style="font-size:0.9rem; color:var(--text-muted);">/ 16</span></div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">已完成章节</div>
        </div>
        <div class="stat-card" style="padding:20px; border-radius:var(--radius-lg); background:var(--bg-secondary); border:1px solid var(--border); text-align:center; transition:all 0.25s;"
          onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          <div style="font-size:1.75rem; font-weight:700; color:var(--warning); font-family:var(--font-code);">${avgScore}</div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">平均测验分数</div>
        </div>
        <div class="stat-card" style="padding:20px; border-radius:var(--radius-lg); background:var(--bg-secondary); border:1px solid var(--border); text-align:center; transition:all 0.25s;">
          <div style="font-size:1.75rem; font-weight:700; color:var(--danger); font-family:var(--font-code);">
            <span style="display:inline-block; ${streak >= 3 ? 'animation:flame 0.8s ease-in-out infinite alternate;' : ''}">${streak >= 3 ? '\u{1F525}' : '\u{1F4DA}'}</span> ${streak}
          </div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">连续学习天数</div>
        </div>
        <div class="stat-card" style="padding:20px; border-radius:var(--radius-lg); background:var(--bg-secondary); border:1px solid var(--border); text-align:center; transition:all 0.25s;"
          onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
          <div style="font-size:1.75rem; font-weight:700; color:var(--accent); font-family:var(--font-code);">${unlocked.length} <span style="font-size:0.9rem; color:var(--text-muted);">/ ${ACHIEVEMENTS.length}</span></div>
          <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">已解锁成就</div>
        </div>
      </div>
    `;
  }

  /* ---------- 连击侧边栏显示 ---------- */

  renderStreakBadge(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const streak = this.pm.getStudyStreak();
    if (streak <= 0) {
      container.innerHTML = '';
      return;
    }
    const flameAnim = streak >= 3 ? 'animation:flame 0.8s ease-in-out infinite alternate;' : '';
    container.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px; padding:8px 14px; background:linear-gradient(135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.08)); border-radius:var(--radius); border:1px solid rgba(245,158,11,0.2); cursor:pointer; transition:all 0.2s;"
        onmouseover="this.style.transform='scale(1.03)';" onmouseout="this.style.transform='scale(1)';"
        onclick="app.showDashboard();"
        title="连续学习 ${streak} 天">
        <span style="font-size:1.2rem; ${flameAnim}">\u{1F525}</span>
        <span style="font-weight:700; color:var(--warning); font-size:0.9rem;">${streak} 天连击</span>
      </div>
    `;
  }

  /* ---------- 个人面板 ---------- */

  renderDashboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
      <div style="max-width:900px; margin:0 auto;">
        <div style="text-align:center; padding:32px 0;">
          <div style="font-size:3.5rem; margin-bottom:12px;">\u{1F3AE}</div>
          <h1 style="font-size:1.8rem; font-weight:700; color:var(--text-primary); margin-bottom:8px;">学习仪表盘</h1>
          <p style="color:var(--text-secondary); font-size:0.95rem;">追踪你的 C++ 学习之旅</p>
        </div>

        <!-- 统计概览 -->
        <div style="margin-bottom:32px;">
          <h2 style="font-size:1.2rem; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <span>\u{1F4CA}</span> 学习统计
          </h2>
          <div id="dashStats"></div>
        </div>

        <!-- 环形进度 -->
        <div style="margin-bottom:32px; text-align:center;">
          <h2 style="font-size:1.2rem; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:8px; justify-content:center;">
            <span>\u{1F3C6}</span> 总进度
          </h2>
          <div id="dashProgressRing"></div>
        </div>

        <!-- 热力图 -->
        <div style="margin-bottom:32px;">
          <h2 style="font-size:1.2rem; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <span>\u{1F5D3}\u{FE0F}</span> 学习热力图
          </h2>
          <div id="dashHeatmap" style="padding:16px; border:1px solid var(--border); border-radius:var(--radius-lg); background:var(--bg-secondary); overflow-x:auto;"></div>
        </div>

        <!-- 成就徽章 -->
        <div style="margin-bottom:32px;">
          <h2 style="font-size:1.2rem; font-weight:600; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            <span>\u{1F3C5}</span> 成就徽章
          </h2>
          <div id="dashAchievements"></div>
        </div>

        <!-- 数据管理 -->
        <div style="margin-bottom:32px; padding:20px; border:1px solid var(--border); border-radius:var(--radius-lg); background:var(--bg-secondary);">
          <h3 style="font-size:1rem; font-weight:600; margin-bottom:12px;">\u{1F4BE} 数据管理</h3>
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <button onclick="app.exportProgress()" style="padding:8px 18px; border:1px solid var(--accent); border-radius:var(--radius); background:var(--accent); color:white; cursor:pointer; font-size:0.85rem; transition:all 0.2s;"
              onmouseover="this.style.background='var(--accent-hover)';" onmouseout="this.style.background='var(--accent)';">📥 导出数据</button>
            <button onclick="app.importProgress()" style="padding:8px 18px; border:1px solid var(--accent); border-radius:var(--radius); background:transparent; color:var(--accent); cursor:pointer; font-size:0.85rem; transition:all 0.2s;"
              onmouseover="this.style.background='var(--accent-light)';" onmouseout="this.style.background='transparent';">📤 导入数据</button>
            <button onclick="app.resetProgress()" style="padding:8px 18px; border:1px solid var(--danger); border-radius:var(--radius); background:transparent; color:var(--danger); cursor:pointer; font-size:0.85rem; transition:all 0.2s;"
              onmouseover="this.style.background='rgba(239,68,68,0.1)';" onmouseout="this.style.background='transparent';">\u{1F5D1}\u{FE0F} 重置进度</button>
          </div>
          <input type="file" id="importFileInput" accept=".json" style="display:none;" onchange="app.handleImportFile(this)">
        </div>
      </div>
    `;

    // 渲染子组件
    this.renderStats('dashStats');
    this.renderProgressRing('dashProgressRing', this.pm.getOverallProgress());
    this.renderHeatmap('dashHeatmap', this.pm.getDailyData(365));
    this.renderAchievements('dashAchievements');
  }

  /* ---------- 章节锁定提示 ---------- */

  showLockAlert(prevChapterTitle) {
    let modal = document.getElementById('lockAlertModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'lockAlertModal';
      modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:2500; display:flex; align-items:center; justify-content:center;';
      document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div style="background:var(--bg-primary); padding:28px; border-radius:var(--radius-lg); max-width:360px; width:90%; border:1px solid var(--border); box-shadow:var(--shadow-md); text-align:center;">
        <div style="font-size:3rem; margin-bottom:8px;">\u{1F512}</div>
        <h2 style="margin-bottom:8px; color:var(--text-primary);">章节未解锁</h2>
        <p style="color:var(--text-secondary); margin-bottom:20px;">请先完成 <strong style="color:var(--accent);">${prevChapterTitle}</strong> 的阅读和测验（≥60分）以解锁此章节。</p>
        <button onclick="document.getElementById('lockAlertModal').style.display='none';" style="padding:8px 24px; border-radius:var(--radius); border:1px solid var(--border); background:var(--accent); color:white; cursor:pointer; font-weight:500;">知道了</button>
      </div>
    `;
    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = 'none';
    };
  }

  /* ---------- 章节解锁动画 ---------- */

  playUnlockAnimation(chapterTitle) {
    this._queueAchievementPopup({
      id: '_unlock',
      name: '章节解锁',
      desc: `${chapterTitle} 已解锁！`,
      icon: '\u{1F513}'
    });
  }
}

/* ===== CSS 动画注入 ===== */
(function injectStyles() {
  if (document.getElementById('gamificationStyles')) return;
  const style = document.createElement('style');
  style.id = 'gamificationStyles';
  style.textContent = `
    @keyframes achBounce {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.15); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes flame {
      0% { transform: scale(1) rotate(-3deg); }
      100% { transform: scale(1.15) rotate(3deg); }
    }
    @keyframes unlockPulse {
      0% { box-shadow: 0 0 0 0 rgba(45,127,249,0.4); }
      70% { box-shadow: 0 0 0 12px rgba(45,127,249,0); }
      100% { box-shadow: 0 0 0 0 rgba(45,127,249,0); }
    }
    @keyframes slideInRight {
      from { transform: translateX(120%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(45,127,249,0.2); }
      50% { box-shadow: 0 0 20px rgba(45,127,249,0.4); }
    }
    .achievement-glow {
      animation: glow 2s ease-in-out infinite;
    }
    .chapter-btn.locked {
      opacity: 0.5;
      cursor: not-allowed;
      position: relative;
    }
    .chapter-btn.locked::after {
      content: "\\1F512";
      position: absolute;
      right: 12px;
      font-size: 0.75rem;
      opacity: 0.6;
    }
    .chapter-btn.unlocked-recently {
      animation: unlockPulse 1s ease 2;
    }
    .achievement-card {
      user-select: none;
    }
    .stat-card {
      user-select: none;
    }
    #achievementPopup, #achievementDetailModal, #lockAlertModal {
      backdrop-filter: blur(4px);
    }
  `;
  document.head.appendChild(style);
})();
