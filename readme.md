# WordAtWork - Workplace Vocabulary Tool

A daily vocabulary tool designed for busy professionals to improve workplace communication. Built with React, Material-UI, and Vite.

## Features

- **Word of the Day**: Get a new workplace vocabulary word daily with practical examples
- **Categories**: Explore words organized by context (Meetings, Presentations, Leadership, Emails, etc.)
- **Learning History**: Track your vocabulary learning progress over time
- **Ready-to-Use Examples**: Each word includes usage examples for emails, chats, and speaking
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** - UI library
- **Vite 5** - Build tool and dev server
- **Material-UI (MUI)** - Component library and styling
- **React Router** - Client-side routing
- **Emotion** - CSS-in-JS styling

## Getting Started

### Prerequisites

- Node.js 20.11 or higher
- npm 10.x or higher

### Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
WordAtWork/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with navigation
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── WordOfTheDay.jsx    # Daily word display
│   │   ├── Categories.jsx      # Category browser
│   │   └── History.jsx         # Learning history tracker
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Home Page
- Introduction to WordAtWork
- Quick access to all features
- Benefits overview

### Word of the Day
- Daily vocabulary word with pronunciation
- Detailed meaning and synonyms
- Context-specific usage examples (Email, Chat, Speaking)
- Category tagging

### Categories
- Browse words by workplace context:
  - Meetings
  - Presentations
  - Leadership
  - Emails
  - Business Strategy
  - General Professional

### Learning History
- Track all learned words
- Search functionality
- Progress statistics
- Learning success rate

## Future Enhancements

- Integration with WhatsApp/Telegram/Email for daily delivery
- User authentication and personalized learning
- API integration for dynamic word content
- Spaced repetition for better retention
- Quiz and practice features
- Export learning history
- Dark mode support
- Multi-language support

## Contributing

This is a proof-of-concept project. For suggestions or improvements, please open an issue or submit a pull request.

## License

This project is open source and available for educational purposes.

---

Built with ❤️ for professionals looking to enhance their workplace communication skills.
