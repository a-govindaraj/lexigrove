// Local progress tracking — streaks and learned words, persisted in localStorage.
//
// No backend and no accounts: a visitor's progress lives in their own browser.
// Everything is namespaced under `lexigrove.v1.*` and guarded so a disabled or
// full localStorage never crashes the app.

const NS = 'lexigrove.v1';
const KEY_STREAK = `${NS}.streak`;
const KEY_LEARNED = `${NS}.learned`;

// --- low-level storage helpers (safe in private mode / SSR) ---
const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full — fail silently, progress just won't persist.
  }
};

// --- date helpers (local calendar day) ---
const toDayString = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const today = () => toDayString(new Date());

// Whole-day difference between two YYYY-MM-DD strings (a - b).
const dayDiff = (a, b) => {
  const da = new Date(`${a}T00:00:00`);
  const db = new Date(`${b}T00:00:00`);
  return Math.round((da - db) / 86400000);
};

const learnedKey = (trackId, word) => `${trackId}::${word.toLowerCase()}`;

// --- streak ---

// Record a visit for today and return the updated streak.
// Visiting on consecutive days grows the streak; a gap resets it to 1.
export const recordVisit = () => {
  const streak = read(KEY_STREAK, { current: 0, longest: 0, lastDate: null });
  const now = today();

  if (streak.lastDate === now) return streak; // already counted today

  const gap = streak.lastDate ? dayDiff(now, streak.lastDate) : null;
  if (gap === 1) {
    streak.current += 1; // consecutive day
  } else {
    streak.current = 1; // first visit or a missed day
  }
  streak.longest = Math.max(streak.longest, streak.current);
  streak.lastDate = now;

  write(KEY_STREAK, streak);
  return streak;
};

export const getStreak = () =>
  read(KEY_STREAK, { current: 0, longest: 0, lastDate: null });

// --- learned words ---

export const getLearned = () => read(KEY_LEARNED, {});

export const isLearned = (trackId, word) =>
  Boolean(getLearned()[learnedKey(trackId, word)]);

// Toggle a word's learned state. `entry` carries enough to render history later.
// Returns the new learned state (true = now learned).
export const toggleLearned = (entry) => {
  const learned = getLearned();
  const key = learnedKey(entry.trackId, entry.word);
  if (learned[key]) {
    delete learned[key];
    write(KEY_LEARNED, learned);
    return false;
  }
  learned[key] = {
    word: entry.word,
    trackId: entry.trackId,
    trackName: entry.trackName,
    partOfSpeech: entry.partOfSpeech || '',
    meaning: entry.meaning || '',
    date: today(),
  };
  write(KEY_LEARNED, learned);
  return true;
};

// Learned words as a list, most recent first.
export const getLearnedList = () =>
  Object.values(getLearned()).sort((a, b) => (a.date < b.date ? 1 : -1));

export const getStats = () => {
  const learnedList = getLearnedList();
  const streak = getStreak();
  return {
    learnedCount: learnedList.length,
    currentStreak: streak.current,
    longestStreak: streak.longest,
  };
};
