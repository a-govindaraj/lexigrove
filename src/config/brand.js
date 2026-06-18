// Brand configuration
// Change APP_NAME here to rebrand the whole app in one place.
export const APP_NAME = 'Lexigrove';
export const APP_TAGLINE = 'Watch your child’s vocabulary grow';
export const APP_DESCRIPTION =
  'A daily vocabulary habit for the 11+ exam — one carefully chosen word a day, with meanings, synonyms, antonyms, and example sentences. More tracks for professionals and English learners are growing too.';

// Design tokens (so accents stay consistent and on-brand).
export const BRAND_GRADIENT = 'linear-gradient(135deg, #4E9070 0%, #1F4D38 100%)';
export const BRAND_GRADIENT_SOFT = 'linear-gradient(135deg, #2E6B4F 0%, #2A5E6B 100%)';
export const COLORS = {
  primary: '#2E6B4F',
  primaryDark: '#1F4D38',
  primaryLight: '#4E9070',
  accent: '#E07A5F',
  parchment: '#F7F4ED',
  ink: '#243027',
};

// First monetisation: a one-time downloadable 11+ word pack (PDF).
// Replace `url` with your Gumroad / Stripe Payment Link when ready.
export const WORDPACK = {
  title: 'The 11+ Essential Word Pack',
  subtitle: '300 exam-ready words with synonyms, antonyms & example sentences',
  price: '£7',
  url: '#', // TODO: paste your Gumroad / Stripe payment link here
  available: false, // set true once the payment link is live
  points: [
    '300 hand-picked 11+ vocabulary words',
    'Synonyms, antonyms & an example sentence for every word',
    'Printable PDF — revise anywhere, no screen needed',
    'Grouped for easy weekly practice up to exam day',
  ],
};

export default { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND_GRADIENT, COLORS, WORDPACK };
