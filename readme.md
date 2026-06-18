# Lexigrove — One Word a Day for Every Learner

A daily vocabulary portal with **multiple tracks** for different kinds of learners — working professionals, 11+ exam students, and English-prep students and adults. One engine, one daily-word habit, content tailored per audience. Built with React, Material-UI, and Vite.

## Tracks

The portal shows all tracks side-by-side; users pick whichever matches their goal:

| Track | For | Example format |
|---|---|---|
| **Working Professional** | Professionals at work | Email / Chat / Speaking |
| **11+ Exam** | Children preparing for the 11+ | In a Sentence / Synonyms / Antonyms |
| **English Prep · Students** | Students improving their English | In a Sentence / Synonyms / Antonyms |
| **English Prep · Professionals** | Adults strengthening their English | In a Sentence / Synonyms / Antonyms |

Each word includes its meaning, part of speech, synonyms, antonyms, and a track-appropriate example.

## Features

- **Word of the Day** — today's word for every track, side-by-side
- **Browse by Track** — explore each track's full word list and word details
- **Synonyms & Antonyms** — word families the way exams test them
- **Pronunciation** — built-in speech synthesis for every word
- **Responsive** — works on desktop and mobile

## Content

All vocabulary is curated in [src/config/tracks.js](src/config/tracks.js) — the app is fully self-contained and works offline (no third-party word API). To add words, append entries to any track's `words` array:

```js
{
  word: 'example',
  partOfSpeech: 'noun',
  meaning: 'a thing that illustrates a rule.',
  synonyms: ['instance', 'sample', 'illustration'],
  antonyms: ['exception'],
  sentence: 'This is an example sentence.',
}
```

To add a whole new track, add a new object to the `TRACKS` array (with an `exampleFormat` of `'workplace'` or `'exam'`).

## Branding

The app name lives in one place — [src/config/brand.js](src/config/brand.js). Change `APP_NAME` to rebrand the entire UI.

## Tech Stack

- **React 19**, **Vite 5**, **Material-UI (MUI)**, **React Router**, **Emotion**

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the build
```

## Project Structure

```
src/
├── config/
│   ├── brand.js          # App name + taglines (single source of truth)
│   └── tracks.js         # All tracks and their curated word lists
├── components/
│   ├── Layout.jsx        # Navigation + footer
│   └── TrackIcon.jsx     # Maps a track's icon name to a MUI icon
├── pages/
│   ├── Home.jsx          # Landing page with track cards
│   ├── WordOfTheDay.jsx  # Today's word for every track, side-by-side
│   ├── Categories.jsx    # Browse by track
│   ├── About.jsx / Contact.jsx / PrivacyPolicy.jsx / TermsOfService.jsx
├── services/
│   └── wordService.js    # Track-based vocabulary logic (curated, offline)
└── App.jsx               # Routing
```

## Roadmap (commercialisation)

- Daily **email delivery** per track (the habit that drives retention)
- User accounts + **subscription** (Stripe / Razorpay), gating premium features
- **Spaced repetition** and quizzes
- Progress tracking and streaks
- Expanded, exam-aligned word banks per track

## License

Proof-of-concept project for educational use.
