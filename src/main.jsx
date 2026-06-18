import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './index.css';

// Lexigrove — "a grove of words". Botanical, literary, calm.
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E6B4F', // evergreen
      light: '#4E9070',
      dark: '#1F4D38',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E07A5F', // warm terracotta — friendly accent / CTAs
      light: '#ED9A83',
      dark: '#C25E45',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F7F4ED', // warm parchment
      paper: '#FFFFFF',
    },
    text: {
      primary: '#243027', // forest ink
      secondary: '#5A6B5F',
    },
    success: { main: '#4E9070' },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: '-0.5px' },
    h2: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: '-0.5px' },
    h3: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, letterSpacing: '-0.3px' },
    h4: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h5: { fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 8 },
  shadows: [
    'none',
    '0 2px 8px rgba(31, 77, 56, 0.06)',
    '0 4px 14px rgba(31, 77, 56, 0.08)',
    '0 6px 18px rgba(31, 77, 56, 0.09)',
    '0 8px 24px rgba(31, 77, 56, 0.10)',
    '0 12px 32px rgba(31, 77, 56, 0.12)',
    '0 16px 40px rgba(31, 77, 56, 0.14)',
    '0 20px 48px rgba(31, 77, 56, 0.16)',
    '0 24px 56px rgba(31, 77, 56, 0.18)',
    '0 1px 2px rgba(31, 77, 56, 0.05)',
    '0 2px 4px rgba(31, 77, 56, 0.06)',
    '0 3px 6px rgba(31, 77, 56, 0.07)',
    '0 4px 8px rgba(31, 77, 56, 0.08)',
    '0 5px 10px rgba(31, 77, 56, 0.09)',
    '0 6px 12px rgba(31, 77, 56, 0.10)',
    '0 7px 14px rgba(31, 77, 56, 0.11)',
    '0 8px 16px rgba(31, 77, 56, 0.12)',
    '0 9px 18px rgba(31, 77, 56, 0.13)',
    '0 10px 20px rgba(31, 77, 56, 0.14)',
    '0 11px 22px rgba(31, 77, 56, 0.15)',
    '0 12px 24px rgba(31, 77, 56, 0.16)',
    '0 13px 26px rgba(31, 77, 56, 0.17)',
    '0 14px 28px rgba(31, 77, 56, 0.18)',
    '0 15px 30px rgba(31, 77, 56, 0.19)',
    '0 16px 32px rgba(31, 77, 56, 0.20)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: '10px 26px', fontSize: '1rem' },
        contained: {
          boxShadow: '0 6px 16px rgba(31, 77, 56, 0.18)',
          '&:hover': { boxShadow: '0 8px 22px rgba(31, 77, 56, 0.26)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 10, boxShadow: '0 6px 22px rgba(31, 77, 56, 0.08)' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 999, fontWeight: 600 } },
    },
    MuiAppBar: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
