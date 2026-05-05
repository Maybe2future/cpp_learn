/* ===== C++ 全栈教程 - 交互逻辑 v2（含习题系统） ===== */

class CppTutorialApp {
  constructor() {
    this.currentChapter = -1;
    this.chapters = [];
    this.theme = localStorage.getItem('theme') || 'light';
    this.sidebarOpen = false;
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
    this.loadChapters();
  }

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
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    const icon = document.getElementById('themeToggle');
    if (icon) icon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  loadChapters() {
    if (typeof CHAPTERS !== 'undefined') {
      this.chapters = CHAPTERS;
      this.renderSidebar();
      const hash = window.location.hash.slice(1);
      if (hash) {
        const idx = this.chapters.findIndex(c => c.id === hash);
        if (idx >= 0) this.showChapter(idx);
      } else {
        this.showHome();
      }
    }
  }

  renderSidebar() {
    const sidebar = document.getElementById('chapterList');
    if (!sidebar) return;
    sidebar.innerHTML = this.chapters.map((ch, idx) => `
      <div class="chapter-item">
        <button class="chapter-btn ${idx === this.currentChapter ? 'active' : ''}" data-idx="${idx}">
          <span class="icon">${ch.icon || '📄'}</span>
          <span class="title">${ch.title}</span>
          ${ch.version ? `<span class="badge">${ch.version}</span>` : ''}
        </button>
      </div>
    `).join('');
    sidebar.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.showChapter(parseInt(e.currentTarget.dataset.idx));
        this.closeSidebar();
      });
    });
  }

  showHome() {
    this.currentChapter = -1;
    const container = document.getElementById('contentArea');
    if (!container) return;
    container.innerHTML = `
      <div class="home-hero">
        <h1>C++ 全栈教程</h1>
        <p>从零基础到现代 C++20，系统掌握 C++ 编程语言。15+ 章完整内容、丰富概念讲解、互动练习与 Make/CMake 构建系统。</p>
        <div style="margin-top:16px;">
          <span class="badge" style="background:var(--accent);color:white;">15 章教程</span>
          <span class="badge" style="background:var(--success);color:white;">互动练习</span>
          <span class="badge" style="background:var(--warning);color:white;">构建系统</span>
        </div>
      </div>
      <div class="chapter-cards">
        ${this.chapters.map((ch, idx) => `
          <div class="chapter-card" data-idx="${idx}">
            <h3>${ch.icon || '📄'} ${ch.title}</h3>
            <p>${ch.summary || ''}</p>
            <div class="card-meta">
              ${ch.topics?.slice(0, 3).map(t => `<span class="badge">${t}</span>`).join('') || ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    container.querySelectorAll('.chapter-card').forEach(card => {
      card.addEventListener('click', () => this.showChapter(parseInt(card.dataset.idx)));
    });
    this.highlightCurrentChapter();
    this.updateBottomNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showChapter(idx) {
    if (idx < 0 || idx >= this.chapters.length) return;
    this.currentChapter = idx;
    const ch = this.chapters[idx];
    const container = document.getElementById('contentArea');
    if (!container) return;

    let exercisesHTML = '';
    if (ch.exercises && ch.exercises.length > 0) {
      exercisesHTML = `
        <div class="exercise-section">
          <h2 style="margin-top:48px; padding-top:24px; border-top:2px solid var(--border);">
            📝 ${ch.title.replace(/第\d+章[：:]/, '').trim()} — 练习
          </h2>
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = ch.id;
  }

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
    const next = this.currentChapter < this.chapters.length - 1 ? this.chapters[this.currentChapter + 1] : null;
    nav.innerHTML = `
      ${prev ? `<a class="nav-btn" href="#${prev.id}" onclick="app.showChapter(${this.currentChapter - 1}); return false;">← ${prev.title}</a>` : '<span></span>'}
      ${next ? `<a class="nav-btn" href="#${next.id}" onclick="app.showChapter(${this.currentChapter + 1}); return false;">${next.title} →</a>` : '<span></span>'}
    `;
  }

  applyCodeHighlight() {
    const keywords = ['auto', 'break', 'case', 'catch', 'class', 'const', 'constexpr', 'continue', 'default', 'delete', 'do', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'for', 'friend', 'goto', 'if', 'inline', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'return', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'using', 'virtual', 'void', 'volatile', 'while', 'and', 'and_eq', 'bitand', 'bitor', 'compl', 'not', 'not_eq', 'or', 'or_eq', 'xor', 'xor_eq'];
    const types = ['bool', 'char', 'char8_t', 'char16_t', 'char32_t', 'double', 'float', 'int', 'long', 'short', 'signed', 'unsigned', 'void', 'wchar_t', 'size_t', 'string', 'vector', 'map', 'set', 'array', 'list', 'deque', 'queue', 'stack', 'priority_queue', 'unordered_map', 'unordered_set', 'pair', 'tuple', 'unique_ptr', 'shared_ptr', 'weak_ptr', 'make_unique', 'make_shared', 'optional', 'variant', 'any'];
    const macros = ['#include', '#define', '#ifdef', '#ifndef', '#endif', '#pragma', '#if', '#else', '#elif'];

    document.querySelectorAll('.code-block pre code').forEach(block => {
      let html = block.textContent;
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
      html = html.replace(/"[^"]*"/g, m => `<span class="hl-string">${m}</span>`);
      html = html.replace(/'[^']*'/g, m => `<span class="hl-string">${m}</span>`);
      html = html.replace(/\\b\\d+(\\.\\d+)?\\b/g, m => `<span class="hl-number">${m}</span>`);
      html = html.replace(/\/\/.*/g, m => `<span class="hl-comment">${m}</span>`);
      block.innerHTML = html;
    });
  }

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
