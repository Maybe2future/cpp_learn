/* ===== C++ 全栈教程 - 交互逻辑 ===== */

class CppTutorialApp {
  constructor() {
    this.currentChapter = 0;
    this.chapters = [];
    this.theme = localStorage.getItem('theme') || 'light';
    this.sidebarOpen = false;
    this.init();
  }

  init() {
    this.applyTheme();
    this.bindEvents();
    this.loadChapters();
    this.highlightCurrentChapter();
  }

  bindEvents() {
    // 主题切换
    document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());

    // 搜索
    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => this.handleSearch(e.target.value));

    // 返回顶部
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
    });
    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 移动端菜单
    document.getElementById('menuToggle')?.addEventListener('click', () => this.toggleSidebar());

    // 代码复制
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('copy-btn')) {
        this.copyCode(e.target);
      }
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
      // 默认显示首页或第一章
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

    // 绑定点击事件
    sidebar.querySelectorAll('.chapter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx);
        this.showChapter(idx);
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
        <p>从零基础到现代 C++20，系统掌握 C++ 编程语言。包含 15 章完整内容、丰富的代码示例和实用技巧。</p>
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
      card.addEventListener('click', () => {
        this.showChapter(parseInt(card.dataset.idx));
      });
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

    container.innerHTML = `
      <div class="content">
        <h1 class="chapter-title">${ch.icon || '📄'} ${ch.title}</h1>
        <p class="chapter-subtitle">${ch.summary || ''}</p>
        ${ch.content}
      </div>
      <div class="bottom-nav" id="bottomNav"></div>
    `;

    this.highlightCurrentChapter();
    this.updateBottomNav();
    this.applyCodeHighlight();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.hash = ch.id;
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
    // 简单的语法高亮
    document.querySelectorAll('.code-block pre code').forEach(block => {
      let html = block.innerHTML;
      const keywords = ['auto', 'break', 'case', 'catch', 'class', 'const', 'constexpr', 'continue', 'default', 'delete', 'do', 'else', 'enum', 'explicit', 'export', 'extern', 'false', 'for', 'friend', 'goto', 'if', 'inline', 'mutable', 'namespace', 'new', 'noexcept', 'nullptr', 'operator', 'private', 'protected', 'public', 'register', 'reinterpret_cast', 'return', 'sizeof', 'static', 'static_assert', 'static_cast', 'struct', 'switch', 'template', 'this', 'thread_local', 'throw', 'true', 'try', 'typedef', 'typeid', 'typename', 'union', 'using', 'virtual', 'void', 'volatile', 'while', 'and', 'and_eq', 'bitand', 'bitor', 'compl', 'not', 'not_eq', 'or', 'or_eq', 'xor', 'xor_eq'];
      const types = ['bool', 'char', 'char8_t', 'char16_t', 'char32_t', 'double', 'float', 'int', 'long', 'short', 'signed', 'unsigned', 'void', 'wchar_t', 'size_t', 'string', 'vector', 'map', 'set', 'array', 'list', 'deque', 'queue', 'stack', 'priority_queue', 'unordered_map', 'unordered_set', 'pair', 'tuple', 'unique_ptr', 'shared_ptr', 'weak_ptr', 'make_unique', 'make_shared', 'optional', 'variant', 'any'];
      const functions = ['main', 'cout', 'cin', 'printf', 'scanf', 'malloc', 'free', 'new', 'delete', 'sizeof', 'alignof', 'alignas', 'decltype', 'forward', 'move', 'swap', 'sort', 'find', 'for_each', 'transform', 'accumulate', 'count', 'max', 'min', 'abs', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'log', 'exp', 'rand', 'srand', 'time', 'strlen', 'strcpy', 'strcmp', 'strcat', 'memset', 'memcpy', 'memcmp', 'getline', 'push_back', 'emplace_back', 'pop_back', 'begin', 'end', 'front', 'back', 'insert', 'erase', 'clear', 'empty', 'size', 'resize', 'reserve', 'capacity', 'at', 'find', 'count', 'lower_bound', 'upper_bound', 'make_pair', 'get', 'to_string', 'stoi', 'stod', 'stof'];
      const macros = ['#include', '#define', '#ifdef', '#ifndef', '#endif', '#pragma', '#if', '#else', '#elif', 'NULL', 'EOF', 'INT_MAX', 'INT_MIN', 'UINT_MAX', 'LONG_MAX', 'LLONG_MAX'];

      keywords.forEach(kw => {
        const re = new RegExp(`\\b${kw}\\b`, 'g');
        html = html.replace(re, `<span class="hl-keyword">${kw}</span>`);
      });

      types.forEach(t => {
        const re = new RegExp(`\\b${t}\\b`, 'g');
        html = html.replace(re, `<span class="hl-type">${t}</span>`);
      });

      functions.forEach(fn => {
        const re = new RegExp(`\\b${fn}\\b(?=\s*\()`, 'g');
        html = html.replace(re, `<span class="hl-function">${fn}</span>`);
      });

      macros.forEach(m => {
        const re = new RegExp(`${m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
        html = html.replace(re, `<span class="hl-macro">${m}</span>`);
      });

      // 字符串
      html = html.replace(/"[^"]*"/g, m => `<span class="hl-string">${m}</span>`);
      html = html.replace(/'[^']*'/g, m => `<span class="hl-string">${m}</span>`);

      // 数字
      html = html.replace(/\b\d+(\.\d+)?\b/g, m => `<span class="hl-number">${m}</span>`);

      // 注释
      html = html.replace(/\/\/.*/g, m => `<span class="hl-comment">${m}</span>`);
      html = html.replace(/\/\*[\s\S]*?\*\//g, m => `<span class="hl-comment">${m}</span>`);

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
    if (!q) {
      document.querySelectorAll('.chapter-item').forEach(item => item.style.display = '');
      return;
    }

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
