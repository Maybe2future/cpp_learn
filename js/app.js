/* ===== C++ 全栈教程 - 交互逻辑 v3（含进度追踪与游戏化系统） ===== */

class CppTutorialApp {
  constructor() {
    this.currentChapter = -1;
    this.chapters = [];
    this.theme = localStorage.getItem('theme') || 'light';
    this.sidebarOpen = false;
    this.progress = new ProgressManager();
    this.gamify = new GamificationSystem(this.progress);
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
    this.loadChapters();
    this._recordVisit();
    this.gamify.checkAllAchievements();
  }

  /* ---------- 主题 ---------- */

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const icon = document.getElementById('themeToggle');
    if (icon) icon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    this.progress.data.theme = this.theme;
    this.progress.save();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    // 如果在仪表盘页，重新渲染热力图以更新颜色
    if (this.currentChapter === -2) {
      this.gamify.renderHeatmap('dashHeatmap', this.progress.getDailyData(365));
    }
  }

  /* ---------- 事件绑定 ---------- */

  bindEvents() {
    document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTop?.classList.toggle('visible', window.scrollY > 300);
    });
    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.getElementById('menuToggle')?.addEventListener('click', () => this.toggleSidebar());
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('copy-btn')) this.copyCode(e.target);
      if (e.target.classList.contains('quiz-option')) this.selectQuizOption(e.target);
      if (e.target.classList.contains('quiz-submit')) this.submitQuiz(e.target);
      if (e.target.classList.contains('quiz-reset')) this.resetQuiz(e.target);
      if (e.target.classList.contains('fill-blank-check')) this.checkFillBlank(e.target);
    });
    // 页面关闭时记录会话时长
    window.addEventListener('beforeunload', () => {
      this.progress.endChapterSession();
    });
  }

  /* ---------- 章节加载 ---------- */

  loadChapters() {
    if (typeof CHAPTERS !== 'undefined') {
      this.chapters = CHAPTERS;
      this.renderSidebar();
      const hash = window.location.hash.slice(1);
      if (hash) {
        const idx = this.chapters.findIndex(c => c.id === hash);
        if (idx >= 0) {
          this.showChapter(idx);
        } else if (hash === 'dashboard') {
          this.showDashboard();
        } else {
          this.showHome();
        }
      } else {
        this.showHome();
      }
    }
  }

  /* ---------- 侧边栏 ---------- */

  renderSidebar() {
    const sidebar = document.getElementById('chapterList');
    if (!sidebar) return;

    let html = '';

    // 进度环
    const overallProgress = this.progress.getOverallProgress();
    html += `
      <div class="sidebar-progress" style="padding:16px; border-bottom:1px solid var(--border); text-align:center;">
        <div id="sidebarProgressRing">
          <div class="progress-ring-container" style="position:relative; width:100px; height:100px; margin:0 auto;">
            <svg class="progress-ring-svg" width="100" height="100" viewBox="0 0 100 100" style="transform:rotate(-90deg);">
              <circle class="progress-ring-bg" cx="50" cy="50" r="42" fill="none" stroke="var(--border)" stroke-width="7"/>
              <circle id="sidebarRingCircle" class="progress-ring-fill" cx="50" cy="50" r="42" fill="none" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"
                stroke-dasharray="263.89" stroke-dashoffset="263.89" style="transition:stroke-dashoffset 1.5s cubic-bezier(0.34,1.56,0.64,1);"/>
            </svg>
            <div class="progress-ring-text" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
              <span id="sidebarRingPercent" class="progress-ring-percent" style="font-size:1.3rem; font-weight:700; color:var(--accent); font-family:var(--font-code);">0%</span>
              <span class="progress-ring-label">总进度</span>
            </div>
          </div>
        </div>
        <div style="margin-top:10px;">
          <button onclick="app.showDashboard();" style="padding:5px 14px; border:1px solid var(--accent); border-radius:var(--radius); background:var(--accent-light); color:var(--accent); cursor:pointer; font-size:0.8rem; font-weight:500; transition:all 0.2s;"
            onmouseover="this.style.background='var(--accent)'; this.style.color='white';" onmouseout="this.style.background='var(--accent-light)'; this.style.color='var(--accent');">
            📊 仪表盘
          </button>
        </div>
      </div>
    `;

    // 连击徽章
    html += `<div id="streakBadge" style="padding:10px 16px;"></div>`;

    // 章节列表
    html += `<div class="sidebar-header">章节目录</div>`;
    html += this.chapters.map((ch, idx) => {
      const isUnlocked = this.progress.isChapterUnlocked(idx, this.chapters);
      const chData = this.progress.getChapterProgress(ch.id);
      let statusIcon = '';
      if (chData.read && chData.quizScore !== null && chData.quizScore >= 60) {
        statusIcon = '<span style="margin-left:auto; font-size:0.75rem;">✅</span>';
      } else if (chData.read) {
        statusIcon = '<span style="margin-left:auto; font-size:0.75rem;">📖</span>';
      } else if (!isUnlocked) {
        statusIcon = '<span style="margin-left:auto; font-size:0.75rem;">🔒</span>';
      }

      const lockedClass = isUnlocked ? '' : 'locked';
      const activeClass = idx === this.currentChapter ? 'active' : '';

      return `
        <div class="chapter-item">
          <button class="chapter-btn ${activeClass} ${lockedClass}" data-idx="${idx}" data-locked="${!isUnlocked}">
            <span class="icon">${ch.icon || '📄'}</span>
            <span class="title">${ch.title}</span>
            ${ch.version ? `<span class="badge">${ch.version}</span>` : ''}
            ${statusIcon}
          </button>
        </div>
      `;
    }).join('');

    sidebar.innerHTML = html;

    // 绑定章节点击
    sidebar.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnEl = e.currentTarget;
        const idx = parseInt(btnEl.dataset.idx);
        const isLocked = btnEl.dataset.locked === 'true';
        if (isLocked) {
          const prevCh = this.chapters[idx - 1];
          this.gamify.showLockAlert(prevCh ? prevCh.title : '上一章');
          return;
        }
        this.showChapter(idx);
        this.closeSidebar();
      });
    });

    // 更新进度环
    this._updateSidebarRing(overallProgress);
    // 更新连击徽章
    this.gamify.renderStreakBadge('streakBadge');
  }

  _updateSidebarRing(percent) {
    const circle = document.getElementById('sidebarRingCircle');
    const label = document.getElementById('sidebarRingPercent');
    if (!circle || !label) return;
    const circumference = 2 * Math.PI * 42; // r=42
    const offset = circumference - (percent / 100) * circumference;
    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = offset;
    });
    // 数字动画
    this._animateValue(label, 0, percent, 1500, '%');
  }

  _animateValue(el, from, to, duration, suffix = '') {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(from + (to - from) * eased);
      if (el) el.textContent = value + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- 首页 ---------- */

  showHome() {
    this.currentChapter = -1;
    this.progress.endChapterSession();
    const container = document.getElementById('contentArea');
    if (!container) return;
    const overallProgress = this.progress.getOverallProgress();
    const streak = this.progress.getStudyStreak();
    const unlockedCount = this.progress.getUnlockedAchievements().length;

    container.innerHTML = `
      <div class="home-hero">
        <h1>C++ 全栈教程</h1>
        <p>从零基础到现代 C++20，系统掌握 C++ 编程语言。15+ 章完整内容、丰富概念讲解、互动练习与 Make/CMake 构建系统。</p>
        <div style="margin-top:16px;">
          <span class="badge" style="background:var(--accent);color:white;">15 章教程</span>
          <span class="badge" style="background:var(--success);color:white;">互动练习</span>
          <span class="badge" style="background:var(--warning);color:white;">构建系统</span>
        </div>
        ${overallProgress > 0 ? `
        <div style="margin-top:20px; padding:16px; border-radius:var(--radius-lg); background:var(--bg-secondary); border:1px solid var(--border); display:inline-flex; align-items:center; gap:20px; flex-wrap:wrap;">
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:var(--accent); font-family:var(--font-code);">${overallProgress}%</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">学习进度</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:var(--warning); font-family:var(--font-code);">${streak > 0 ? '🔥 ' + streak : '—'}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">连续天数</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:1.5rem; font-weight:700; color:var(--success); font-family:var(--font-code);">${unlockedCount}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">成就数</div>
          </div>
          <button onclick="app.showDashboard();" style="padding:8px 18px; border:1px solid var(--accent); border-radius:var(--radius); background:var(--accent); color:white; cursor:pointer; font-size:0.85rem; font-weight:500; transition:all 0.2s;"
            onmouseover="this.style.background='var(--accent-hover)';" onmouseout="this.style.background='var(--accent)';">
            📊 查看仪表盘
          </button>
        </div>
        ` : ''}
      </div>
      <div class="chapter-cards">
        ${this.chapters.map((ch, idx) => {
          const chData = this.progress.getChapterProgress(ch.id);
          const isUnlocked = this.progress.isChapterUnlocked(idx, this.chapters);
          const completed = chData.read && chData.quizScore !== null && chData.quizScore >= 60;
          let borderStyle = completed
            ? 'border-color:var(--success); box-shadow: 0 0 0 1px var(--success);'
            : '';
          let statusBadge = '';
          if (completed) {
            statusBadge = '<span class="badge" style="background:var(--success);color:white;font-size:0.7rem;">✅ 已完成</span>';
          } else if (chData.read) {
            statusBadge = '<span class="badge" style="background:var(--accent);color:white;font-size:0.7rem;">📖 已读</span>';
          } else if (!isUnlocked) {
            statusBadge = '<span class="badge" style="background:var(--text-muted);color:white;font-size:0.7rem;">🔒 锁定</span>';
            borderStyle = 'opacity:0.7; cursor:not-allowed;';
          }
          return `
            <div class="chapter-card" data-idx="${idx}" data-locked="${!isUnlocked}" style="${borderStyle}">
              <h3>${ch.icon || '📄'} ${ch.title}</h3>
              <p>${ch.summary || ''}</p>
              <div class="card-meta">
                ${ch.topics?.slice(0, 3).map(t => `<span class="badge">${t}</span>`).join('') || ''}
                ${statusBadge}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    container.querySelectorAll('.chapter-card').forEach(card => {
      card.addEventListener('click', () => {
        const isLocked = card.dataset.locked === 'true';
        const idx = parseInt(card.dataset.idx);
        if (isLocked) {
          const prevCh = this.chapters[idx - 1];
          this.gamify.showLockAlert(prevCh ? prevCh.title : '上一章');
          return;
        }
        this.showChapter(parseInt(card.dataset.idx));
      });
    });
    this.highlightCurrentChapter();
    this.updateBottomNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = '';
  }

  /* ---------- 章节展示 ---------- */

  showChapter(idx) {
    if (idx < 0 || idx >= this.chapters.length) return;

    // 结束上一章的计时
    this.progress.endChapterSession();

    this.currentChapter = idx;
    const ch = this.chapters[idx];
    const container = document.getElementById('contentArea');
    if (!container) return;

    // 标记已读并启动计时
    this.progress.markChapterRead(ch.id);
    this.progress.startChapterSession(ch.id);

    // 检查成就
    this.gamify.checkAllAchievements();

    let exercisesHTML = '';
    if (ch.exercises && ch.exercises.length > 0) {
      const chData = this.progress.getChapterProgress(ch.id);
      exercisesHTML = `
        <div class="exercise-section">
          <h2 style="margin-top:48px; padding-top:24px; border-top:2px solid var(--border);">
            📝 ${ch.title.replace(/第\d+章[：:]/, '').trim()} — 练习
          </h2>
          ${chData.quizScore !== null ? `
            <div style="margin-bottom:16px; padding:12px 16px; border-radius:var(--radius); background:var(--bg-secondary); border:1px solid var(--border); font-size:0.9rem; color:var(--text-secondary);">
              上次测验分数：<span style="font-weight:700; color:${chData.quizScore >= 60 ? 'var(--success)' : 'var(--danger)'};">${chData.quizScore} 分</span>
              ${chData.quizScore >= 60 ? '✅ 通过' : '❌ 未通过（需≥60分解锁下一章）'}
            </div>
          ` : ''}
          ${ch.exercises.map((ex, i) => this.renderExercise(ex, i)).join('')}
        </div>
      `;
    }

    container.innerHTML = `
      <div class="content">
        <h1 class="chapter-title">${ch.icon || '📄'} ${ch.title}</h1>
        <p class="chapter-subtitle">${ch.summary || ''}</p>
        ${ch.content}
        ${exercisesHTML}
      </div>
      <div class="bottom-nav" id="bottomNav"></div>
    `;

    this.highlightCurrentChapter();
    this.updateBottomNav();
    this.applyCodeHighlight();
    this.renderSidebar(); // 更新侧边栏进度
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = ch.id;
  }

  /* ---------- 仪表盘 ---------- */

  showDashboard() {
    this.currentChapter = -2;
    this.progress.endChapterSession();
    const container = document.getElementById('contentArea');
    if (!container) return;
    container.innerHTML = `
      <div class="dashboard-header animate-fade-in-up">
        <div class="dashboard-icon">🎮</div>
        <h1>学习仪表盘</h1>
        <p>追踪你的 C++ 学习之旅</p>
      </div>

      <!-- 统计概览 -->
      <div class="animate-fade-in-up" style="margin-bottom:32px;">
        <h2 class="panel-title"><span>📊</span> 学习统计</h2>
        <div id="dashStats" class="stats-grid"></div>
      </div>

      <!-- 环形进度 -->
      <div class="animate-fade-in-up" style="margin-bottom:32px; text-align:center;">
        <h2 class="panel-title" style="justify-content:center;"><span>🏆</span> 总进度</h2>
        <div id="dashProgressRing"></div>
      </div>

      <!-- 热力图 -->
      <div class="animate-fade-in-up" style="margin-bottom:32px;">
        <h2 class="panel-title"><span>🗓️</span> 学习热力图</h2>
        <div id="dashHeatmap" class="heatmap-wrapper">
          <div id="heatmapInner" style="min-height:120px; display:flex; align-items:center; justify-content:center; color:var(--text-muted);">加载中...</div>
        </div>
      </div>

      <!-- 成就徽章 -->
      <div class="animate-fade-in-up" style="margin-bottom:32px;">
        <h2 class="panel-title"><span>🏅</span> 成就徽章</h2>
        <div id="dashAchievements" class="achievements-grid"></div>
      </div>

      <!-- 数据管理 -->
      <div class="animate-fade-in-up" style="margin-bottom:32px; padding:20px; border:1px solid var(--border); border-radius:var(--radius-lg); background:var(--bg-secondary);">
        <h3 style="font-size:1rem; font-weight:600; margin-bottom:12px;">💾 数据管理</h3>
        <div class="data-actions">
          <button class="btn-primary" onclick="app.exportProgress()">📥 导出数据</button>
          <button class="btn-outline" onclick="document.getElementById('importFileInput').click()">📤 导入数据</button>
          <button class="btn-danger" onclick="app.resetProgress()">🗑️ 重置进度</button>
        </div>
        <input type="file" id="importFileInput" accept=".json" style="display:none;" onchange="app.handleImportFile(this)">
      </div>
    `;

    // 渲染子组件
    this.gamify.renderStats('dashStats');
    this.gamify.renderProgressRing('dashProgressRing', this.progress.getOverallProgress());
    this._renderHeatmapInContainer();
    this.gamify.renderAchievements('dashAchievements');

    this.highlightCurrentChapter();
    this.updateBottomNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = 'dashboard';
  }

  _renderHeatmapInContainer() {
    const inner = document.getElementById('heatmapInner');
    if (inner) inner.remove();
    this.gamify.renderHeatmap('dashHeatmap', this.progress.getDailyData(365));
  }

  /* ---------- 数据管理 ---------- */

  exportProgress() {
    const data = this.progress.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cpp_learn_progress_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importProgress() {
    document.getElementById('importFileInput')?.click();
  }

  handleImportFile(input) {
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const success = this.progress.importData(e.target.result);
      if (success) {
        alert('✅ 数据导入成功！');
        this.gamify.checkAllAchievements();
        this.renderSidebar();
        if (this.currentChapter === -2) {
          this.showDashboard();
        }
      } else {
        alert('❌ 数据导入失败，请检查文件格式。');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  resetProgress() {
    if (confirm('⚠️ 确定要重置所有学习进度吗？此操作不可恢复！')) {
      if (confirm('再次确认：你将失去所有学习记录、测验分数和成就。确定继续？')) {
        this.progress.reset();
        this.renderSidebar();
        this.showHome();
        alert('✅ 进度已重置。');
      }
    }
  }

  /* ---------- 访问记录 ---------- */

  _recordVisit() {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 2) {
      this.progress.addAchievement('night_owl');
    }
    if (hour >= 6 && hour <= 8) {
      this.progress.addAchievement('early_bird');
    }
    this.progress.recordStudySession(1); // 记录至少1分钟
  }

  /* ---------- 习题系统 ---------- */

  renderExercise(ex, idx) {
    const qnum = idx + 1;
    if (ex.type === 'choice') {
      return `
        <div class="quiz-card" data-type="choice" data-idx="${idx}" data-answer="${ex.answer}">
          <div class="quiz-question">${qnum}. ${ex.question}</div>
          <div class="quiz-options">
            ${ex.options.map((opt, i) => `
              <button class="quiz-option" data-val="${i}">${String.fromCharCode(65+i)}. ${opt}</button>
            `).join('')}
          </div>
          <div class="quiz-result" id="result-${idx}"></div>
          <button class="quiz-submit" data-idx="${idx}" style="margin-top:12px;">提交答案</button>
        </div>
      `;
    } else if (ex.type === 'fillblank') {
      return `
        <div class="quiz-card" data-type="fillblank" data-idx="${idx}">
          <div class="quiz-question">${qnum}. ${ex.question}</div>
          <div class="fillblank-area">
            <input type="text" class="fillblank-input" id="blank-${idx}" placeholder="填入答案..." style="padding:8px 12px; border:1px solid var(--border); border-radius:6px; width:200px; font-family:var(--font-code);">
            <button class="fillblank-check" data-idx="${idx}" data-answer="${ex.answer}">检查</button>
          </div>
          <div class="quiz-result" id="result-${idx}"></div>
        </div>
      `;
    } else if (ex.type === 'output') {
      return `
        <div class="quiz-card" data-type="output" data-idx="${idx}" data-answer="${ex.answer}">
          <div class="quiz-question">${qnum}. 以下代码的输出是什么？</div>
          <div class="code-block" style="margin:12px 0;">
            <pre><code>${ex.code}</code></pre>
          </div>
          <div class="quiz-options">
            ${ex.options.map((opt, i) => `
              <button class="quiz-option" data-val="${i}">${String.fromCharCode(65+i)}. ${opt}</button>
            `).join('')}
          </div>
          <div class="quiz-result" id="result-${idx}"></div>
          <button class="quiz-submit" data-idx="${idx}">提交答案</button>
        </div>
      `;
    } else if (ex.type === 'truefalse') {
      return `
        <div class="quiz-card" data-type="truefalse" data-idx="${idx}" data-answer="${ex.answer}">
          <div class="quiz-question">${qnum}. ${ex.question}</div>
          <div class="quiz-options">
            <button class="quiz-option" data-val="true">✓ 正确</button>
            <button class="quiz-option" data-val="false">✗ 错误</button>
          </div>
          <div class="quiz-result" id="result-${idx}"></div>
          <button class="quiz-submit" data-idx="${idx}">提交答案</button>
        </div>
      `;
    }
    return '';
  }

  selectQuizOption(btn) {
    const card = btn.closest('.quiz-card');
    card.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }

  submitQuiz(btn) {
    const idx = btn.dataset.idx;
    const card = btn.closest('.quiz-card');
    const selected = card.querySelector('.quiz-option.selected');
    const resultDiv = document.getElementById(`result-${idx}`);
    const answer = card.dataset.answer;

    if (!selected) {
      resultDiv.innerHTML = '<span style="color:var(--warning);">⚠️ 请先选择一个选项</span>';
      return;
    }

    const userAnswer = selected.dataset.val;
    const isCorrect = userAnswer === answer;

    if (isCorrect) {
      resultDiv.innerHTML = '<span style="color:var(--success);font-weight:600;">✅ 正确！</span>';
      selected.style.background = 'var(--success)';
      selected.style.color = 'white';
      selected.style.borderColor = 'var(--success)';
    } else {
      resultDiv.innerHTML = '<span style="color:var(--danger);font-weight:600;">❌ 错误，正确答案是 ' + String.fromCharCode(65 + parseInt(answer)) + '</span>';
      selected.style.background = 'var(--danger)';
      selected.style.color = 'white';
      selected.style.borderColor = 'var(--danger)';
      // Highlight correct answer
      const correctBtn = card.querySelector(`.quiz-option[data-val="${answer}"]`);
      if (correctBtn) {
        correctBtn.style.background = 'var(--success)';
        correctBtn.style.color = 'white';
        correctBtn.style.borderColor = 'var(--success)';
      }
    }

    card.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
    btn.style.display = 'none';

    // Add reset button
    if (!card.querySelector('.quiz-reset')) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'quiz-reset';
      resetBtn.textContent = '重做';
      resetBtn.style.cssText = 'margin-top:8px; padding:4px 16px; border:1px solid var(--border); border-radius:6px; background:var(--bg-secondary); cursor:pointer; font-size:0.85rem;';
      resetBtn.dataset.idx = idx;
      btn.parentNode.appendChild(resetBtn);
    }

    // 记录测验分数
    const currentCh = this.chapters[this.currentChapter];
    if (currentCh) {
      // 计算总体分数（所有题目的正确率）
      const totalQuestions = document.querySelectorAll('.quiz-card').length;
      const allCards = Array.from(document.querySelectorAll('.quiz-card'));
      let correctCount = 0;
      allCards.forEach(c => {
        const sel = c.querySelector('.quiz-option.selected');
        if (sel && sel.dataset.val === c.dataset.answer) correctCount++;
      });
      const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      this.progress.setQuizScore(currentCh.id, score);
      this.gamify.checkAllAchievements();
    }
  }

  checkFillBlank(btn) {
    const idx = btn.dataset.idx;
    const answer = btn.dataset.answer;
    const input = document.getElementById(`blank-${idx}`);
    const resultDiv = document.getElementById(`result-${idx}`);
    const userVal = input.value.trim().toLowerCase().replace(/\s/g, '');
    const correctVal = answer.toLowerCase().replace(/\s/g, '');

    if (userVal === correctVal) {
      resultDiv.innerHTML = '<span style="color:var(--success);font-weight:600;">✅ 正确！</span>';
      input.style.borderColor = 'var(--success)';
    } else {
      resultDiv.innerHTML = `<span style="color:var(--danger);font-weight:600;">❌ 错误，正确答案是：${answer}</span>`;
      input.style.borderColor = 'var(--danger)';
    }
    input.disabled = true;
    btn.style.display = 'none';
  }

  resetQuiz(btn) {
    const idx = btn.dataset.idx;
    const card = btn.closest('.quiz-card');
    card.querySelectorAll('.quiz-option').forEach(b => {
      b.disabled = false;
      b.classList.remove('selected');
      b.style.background = '';
      b.style.color = '';
      b.style.borderColor = '';
    });
    const resultDiv = document.getElementById(`result-${idx}`);
    if (resultDiv) resultDiv.innerHTML = '';
    const submitBtn = card.querySelector('.quiz-submit');
    if (submitBtn) submitBtn.style.display = 'inline-block';
    btn.remove();
  }

  highlightCurrentChapter() {
    document.querySelectorAll('.chapter-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx === this.currentChapter);
    });
  }

  updateBottomNav() {
    const nav = document.getElementById('bottomNav');
    if (!nav) return;
    const prev = this.currentChapter > 0 ? this.chapters[this.currentChapter - 1] : null;
    const next = this.currentChapter < this.chapters.length - 1 && this.currentChapter >= 0 ? this.chapters[this.currentChapter + 1] : null;
    const showNext = next && this.progress.isChapterUnlocked(this.currentChapter + 1, this.chapters);
    const nextLocked = next && !showNext;

    nav.innerHTML = `
      ${prev ? `<a class="nav-btn" href="#${prev.id}" onclick="app.showChapter(${this.currentChapter - 1}); return false;">← ${prev.title}</a>` : '<span></span>'}
      ${next ? (
        showNext
          ? `<a class="nav-btn" href="#${next.id}" onclick="app.showChapter(${this.currentChapter + 1}); return false;">${next.title} →</a>`
          : `<span class="nav-btn disabled" title="请先完成当前章节测验（≥60分）">🔒 ${next.title} →</span>`
      ) : '<span></span>'}
    `;
  }

  /* ---------- 代码高亮 ---------- */

  applyCodeHighlight() {
    const keywords = ['auto', 'break', 'case', 'catch', 'class', 'const', 'constexpr', 'continue', 'default', 'delete', 'do', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'for', 'friend', 'goto', 'if', 'inline', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'return', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'using', 'virtual', 'void', 'volatile', 'while', 'and', 'and_eq', 'bitand', 'bitor', 'compl', 'not', 'not_eq', 'or', 'or_eq', 'xor', 'xor_eq', 'co_await', 'co_return', 'co_yield', 'concept', 'consteval', 'constinit', 'requires'];
    const types = ['bool', 'char', 'char8_t', 'char16_t', 'char32_t', 'double', 'float', 'int', 'long', 'short', 'signed', 'unsigned', 'void', 'wchar_t', 'size_t', 'string', 'vector', 'map', 'set', 'array', 'list', 'deque', 'queue', 'stack', 'priority_queue', 'unordered_map', 'unordered_set', 'pair', 'tuple', 'unique_ptr', 'shared_ptr', 'weak_ptr', 'make_unique', 'make_shared', 'optional', 'variant', 'any', 'span', 'string_view', 'format', 'ranges', 'views'];
    const macros = ['#include', '#define', '#ifdef', '#ifndef', '#endif', '#pragma', '#if', '#else', '#elif'];
    document.querySelectorAll('.code-block pre code').forEach(block => {
      let html = block.textContent;
      // Save string literals first (avoid keyword replacement inside strings)
      const strings = [];
      html = html.replace(/"[^"]*"/g, m => {
        strings.push(m);
        return '\x00STR' + strings.length + '\x00';
      });
      html = html.replace(/'[^']*'/g, m => {
        strings.push(m);
        return '\x00STR' + strings.length + '\x00';
      });
      keywords.forEach(kw => {
        const re = new RegExp('\\b' + kw + '\\b', 'g');
        html = html.replace(re, `<span class="hl-keyword">${kw}</span>`);
      });
      types.forEach(t => {
        const re = new RegExp('\\b' + t + '\\b', 'g');
        html = html.replace(re, `<span class="hl-type">${t}</span>`);
      });
      macros.forEach(m => {
        html = html.split(m).join(`<span class="hl-macro">${m}</span>`);
      });
      html = html.replace(/\b\d+(\.\d+)?\b/g, m => `<span class="hl-number">${m}</span>`);
      html = html.replace(/\/\/.*/g, m => `<span class="hl-comment">${m}</span>`);
      // Restore string literals
      html = html.replace(/\x00STR(\d+)\x00/g, (_, idx) => {
        return `<span class="hl-string">${strings[parseInt(idx)-1]}</span>`;
      });
      // Protect syntax highlight spans, escape raw < > in source code (e.g. <iostream>)
      const hlSpans = [];
      html = html.replace(/<span class="hl-(?:keyword|type|macro|number|string|comment)">[\s\S]*?<\/span>/g, m => {
        hlSpans.push(m);
        return `\x00HL${hlSpans.length}\x00`;
      });
      html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      html = html.replace(/\x00HL(\d+)\x00/g, (_, idx) => hlSpans[parseInt(idx)-1]);
      block.innerHTML = html;
    });
  }

  /* ---------- 工具 ---------- */

  copyCode(btn) {
    const codeBlock = btn.closest('.code-block');
    const code = codeBlock?.querySelector('pre code')?.textContent || '';
    navigator.clipboard.writeText(code).then(() => {
      const original = btn.textContent;
      btn.textContent = '✓ 已复制';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 1500);
    });
  }

  handleSearch(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.chapter-item').forEach((item, idx) => {
      const ch = this.chapters[idx];
      const match = ch && (ch.title.toLowerCase().includes(q) ||
        (ch.summary && ch.summary.toLowerCase().includes(q)) ||
        (ch.topics && ch.topics.some(t => t.toLowerCase().includes(q))));
      item.style.display = match ? '' : 'none';
    });
  }

  toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
  }
  closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
  }
}

const app = new CppTutorialApp();
