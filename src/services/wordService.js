// Track-based vocabulary service.
//
// All content is curated in src/config/tracks.js, so the app works instantly and
// offline — no flaky third-party API calls. Each track supplies its own word list
// and example format.

import { TRACKS, getTrackById } from '../config/tracks';

const capitalise = (w) => w.charAt(0).toUpperCase() + w.slice(1);

// Build Email / Chat / Speaking examples for the workplace track from templates.
const buildWorkplaceExamples = (word, meaning, partOfSpeech) => {
  const lower = word.toLowerCase();
  if (partOfSpeech === 'verb') {
    return {
      email: `Hi team, I suggest we ${lower} this in the next sprint so we stay on track. Happy to discuss.`,
      chat: `Can we ${lower} this before Friday? 🙌`,
      speaking: `Moving forward, I'd like us to ${lower} this more consistently — it directly supports our goals.`,
    };
  }
  if (partOfSpeech === 'noun') {
    return {
      email: `Hi team, I'd like to align on the ${lower} before we proceed. Could we set up 15 minutes?`,
      chat: `Quick one — what's our ${lower} on this? 👀`,
      speaking: `In today's update, I want to highlight the ${lower}, as it shapes our priorities this quarter.`,
    };
  }
  // adjective / default
  return {
    email: `Hi team, this is a ${lower} opportunity for us. I've shared the details for your review.`,
    chat: `That's a really ${lower} approach — nice one! 👏`,
    speaking: `We're taking a ${lower} stance here, and I believe it sets us up well for the months ahead.`,
  };
};

// Turn a raw curated entry into the display object the UI expects.
const buildDisplayWord = (track, entry) => {
  const base = {
    word: capitalise(entry.word),
    partOfSpeech: entry.partOfSpeech,
    pronunciation: '',
    meaning: entry.meaning,
    synonyms: entry.synonyms || [],
    antonyms: entry.antonyms || [],
    sentence: entry.sentence,
    category: track.name,
    trackId: track.id,
    trackColor: track.color,
    exampleFormat: track.exampleFormat,
  };

  if (track.exampleFormat === 'workplace') {
    base.examples = buildWorkplaceExamples(entry.word, entry.meaning, entry.partOfSpeech);
  } else {
    base.examples = {
      sentence: entry.sentence,
      synonyms: (entry.synonyms || []).join(', '),
      antonyms: (entry.antonyms || []).join(', '),
    };
  }
  return base;
};

// Deterministic "word of the day" index based on the calendar day.
const dayIndex = (length) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
  return dayOfYear % length;
};

export const getFormattedDate = () =>
  new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// Track metadata + word counts (for the Browse / Home pages).
// The primary track (11+) is always returned first.
export const getAllTracks = () =>
  TRACKS.map((t) => ({
    id: t.id,
    name: t.name,
    short: t.short,
    audience: t.audience,
    tagline: t.tagline,
    icon: t.icon,
    color: t.color,
    exampleFormat: t.exampleFormat,
    wordCount: t.words.length,
    primary: Boolean(t.primary),
    comingSoon: Boolean(t.comingSoon),
  })).sort((a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0));

// The lead track (11+) — used for the hero / featured word.
export const getPrimaryTrack = () => getAllTracks().find((t) => t.primary) || getAllTracks()[0];

// Today's word for a single track.
export const getWordOfTheDay = (trackId) => {
  const track = getTrackById(trackId);
  if (!track || track.words.length === 0) return null;
  const entry = track.words[dayIndex(track.words.length)];
  return { ...buildDisplayWord(track, entry), date: getFormattedDate() };
};

// Today's word for every track (primary track first).
export const getDailyWordsForAllTracks = () =>
  TRACKS.map((track) => ({
    track: {
      id: track.id,
      name: track.name,
      short: track.short,
      tagline: track.tagline,
      icon: track.icon,
      color: track.color,
      primary: Boolean(track.primary),
      comingSoon: Boolean(track.comingSoon),
    },
    word: getWordOfTheDay(track.id),
  })).sort((a, b) => (b.track.primary ? 1 : 0) - (a.track.primary ? 1 : 0));

// Word list for a track, with full detail so the browse list can expand inline.
export const getTrackWords = (trackId) => {
  const track = getTrackById(trackId);
  if (!track) return [];
  return track.words.map((entry) => ({
    word: capitalise(entry.word),
    partOfSpeech: entry.partOfSpeech,
    meaning: entry.meaning,
    synonyms: entry.synonyms || [],
    antonyms: entry.antonyms || [],
    sentence: entry.sentence,
  }));
};

// Full detail for one word in a track (for the dialog).
export const getWordDetail = (trackId, word) => {
  const track = getTrackById(trackId);
  if (!track) return null;
  const entry = track.words.find(
    (e) => e.word.toLowerCase() === word.toLowerCase()
  );
  return entry ? buildDisplayWord(track, entry) : null;
};

export default {
  getAllTracks,
  getWordOfTheDay,
  getDailyWordsForAllTracks,
  getTrackWords,
  getWordDetail,
  getFormattedDate,
};
