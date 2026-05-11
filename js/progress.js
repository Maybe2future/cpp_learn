/* ===== C++ 全栈教程 - 进度管理引擎 ===== */

/**
 * ProgressManager - 用户学习进度追踪与数据持久化
 * 使用 LocalStorage 存储所有进度数据
 */
class ProgressManager {
  constructor() {
    this.key = 'cpp_learn_progress';
    this.data = this.load();
    this._ensureDefaults();
  }

  /* ---------- 数据持久化 ---------- */

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('[ProgressManager] 读取 localStorage 失败:', e);
    }
    return {};
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.data));
    } catch (e) {
      console.warn('[ProgressManager] 写入 localStorage 失败:', e);
    }
  }

  _ensureDefaults() {
    if (!this.data.chapters) this.data.chapters = {};
    if (!this.data.totalScore) this.data.totalScore = 0;
    if (!this.data.streakDays) this.data.streakDays = 0;
    if (!this.data.lastStudyDate) this.data.lastStudyDate = null;
    if (!this.data.dailyStudyMinutes) this.data.dailyStudyMinutes = {};
    if (!this.data.achievements) this.data.achievements = [];
    if (!this.data.theme) this.data.theme = 'light';
    if (!this.data.editorPreference) this.data.editorPreference = 'cpp23';
    if (!this.data.chapterEnterTime) this.data.chapterEnterTime = null;
    this.save();
  }

  _getToday() {
    return new Date().toISOString().split('T')[0];
  }

  _getChapterData(chapterId) {
    if (!this.data.chapters[chapterId]) {
      this.data.chapters[chapterId] = {
        read: false,
        quizScore: null,
        codeCompleted: false,
        timeSpent: 0,
        quizAttempts: 0,
        quizCorrect: 0
      };
    }
    return this.data.chapters[chapterId];
  }

  /* ---------- 章节进度 ---------- */

  markChapterRead(chapterId) {
    const ch = this._getChapterData(chapterId);
    ch.read = true;
    this.save();
  }

  setQuizScore(chapterId, score) {
    const ch = this._getChapterData(chapterId);
    ch.quizScore = score;
    ch.quizAttempts = (ch.quizAttempts || 0) + 1;
    if (score === 100) ch.quizCorrect = (ch.quizCorrect || 0) + 1;
    ch.read = true; // Mark chapter as read when quiz is submitted
    this._updateTotalScore();
    this.save();
  }

  setCodeCompleted(chapterId, completed = true) {
    const ch = this._getChapterData(chapterId);
    ch.codeCompleted = completed;
    this.save();
  }

  addTimeSpent(chapterId, seconds) {
    const ch = this._getChapterData(chapterId);
    ch.timeSpent = (ch.timeSpent || 0) + seconds;
    this.save();
  }

  /* ---------- 全局统计 ---------- */

  _updateTotalScore() {
    let total = 0;
    for (const ch of Object.values(this.data.chapters)) {
      if (ch.quizScore !== null) total += ch.quizScore;
      if (ch.read) total += 10;
      if (ch.codeCompleted) total += 20;
    }
    this.data.totalScore = total;
  }

  getOverallProgress() {
    const totalChapters = 16;
    if (totalChapters === 0) return 0;
    let completed = 0;
    for (const ch of Object.values(this.data.chapters)) {
      if (ch.read && ch.quizScore !== null && ch.quizScore >= 60) {
        completed++;
      }
    }
    return Math.round((completed / totalChapters) * 100);
  }

  getChapterProgress(chapterId) {
    const ch = this._getChapterData(chapterId);
    let progress = 0;
    if (ch.read) progress += 40;
    if (ch.quizScore !== null) progress += 30;
    if (ch.codeCompleted) progress += 30;
    return {
      read: ch.read,
      quizScore: ch.quizScore,
      codeCompleted: ch.codeCompleted,
      timeSpent: ch.timeSpent || 0,
      progressPercent: progress,
      quizAttempts: ch.quizAttempts || 0
    };
  }

  isChapterUnlocked(chapterIndex, chapters) {
    if (chapterIndex === 0) return true;
    const prevChapter = chapters[chapterIndex - 1];
    if (!prevChapter) return true;
    const prevData = this.data.chapters[prevChapter.id];
    if (!prevData) return false;
    return prevData.read && prevData.quizScore !== null && prevData.quizScore >= 60;
  }

  /* ---------- 每日记录 ---------- */

  recordStudySession(minutes) {
    const today = this._getToday();
    this.data.dailyStudyMinutes[today] = (this.data.dailyStudyMinutes[today] || 0) + minutes;
    this._updateStreak();
    this.save();
  }

  _updateStreak() {
    const today = this._getToday();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (this.data.lastStudyDate === today) {
      // 今天已记录，不更新 streak
      return;
    }

    if (this.data.lastStudyDate === yesterday) {
      // 连续学习
      this.data.streakDays = (this.data.streakDays || 0) + 1;
    } else {
      // 中断了，重新计算
      this.data.streakDays = 1;
    }

    this.data.lastStudyDate = today;
  }

  getStudyStreak() {
    const today = this._getToday();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    // 如果今天或昨天没有学习记录，streak 应该显示为 0
    if (this.data.lastStudyDate !== today && this.data.lastStudyDate !== yesterday) {
      return 0;
    }
    return this.data.streakDays || 0;
  }

  getTotalStudyTime() {
    let total = 0;
    for (const minutes of Object.values(this.data.dailyStudyMinutes)) {
      total += minutes;
    }
    // Add per-chapter time as well
    for (const ch of Object.values(this.data.chapters)) {
      if (ch.timeSpent) total += Math.floor(ch.timeSpent / 60);
    }
    return total;
  }

  getDailyData(days = 365) {
    const result = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const minutes = this.data.dailyStudyMinutes[dateStr] || 0;
      result.push({ date: dateStr, minutes });
    }
    return result;
  }

  /* ---------- 成就 ---------- */

  hasAchievement(id) {
    return this.data.achievements.includes(id);
  }

  addAchievement(id) {
    if (!this.hasAchievement(id)) {
      this.data.achievements.push(id);
      this.save();
      return true;
    }
    return false;
  }

  getUnlockedAchievements() {
    return [...this.data.achievements];
  }

  /* ---------- 会话时间管理 ---------- */

  startChapterSession(chapterId) {
    this.data.chapterEnterTime = { chapterId, start: Date.now() };
  }

  endChapterSession() {
    if (!this.data.chapterEnterTime) return;
    const { chapterId, start } = this.data.chapterEnterTime;
    const elapsed = Math.floor((Date.now() - start) / 1000);
    if (elapsed > 0) {
      this.addTimeSpent(chapterId, elapsed);
      this.recordStudySession(Math.ceil(elapsed / 60));
    }
    this.data.chapterEnterTime = null;
  }

  /* ---------- 导入/导出 ---------- */

  exportData() {
    this._updateTotalScore();
    return JSON.stringify(this.data, null, 2);
  }

  importData(json) {
    try {
      const parsed = JSON.parse(json);
      // 验证必要字段
      if (!parsed.chapters || typeof parsed.chapters !== 'object') {
        throw new Error('无效的数据格式：缺少 chapters 字段');
      }
      this.data = parsed;
      this._ensureDefaults();
      this.save();
      return true;
    } catch (e) {
      console.error('[ProgressManager] 导入数据失败:', e);
      return false;
    }
  }

  reset() {
    this.data = {};
    this._ensureDefaults();
    this.save();
  }
}
