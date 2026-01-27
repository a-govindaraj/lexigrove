import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9cef',
      dark: '#5568d3',
    },
    secondary: {
      main: '#764ba2',
      light: '#9166b8',
      dark: '#5f3c82',
    },
    background: {
      default: '#f8f9ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.05)',
    '0 4px 12px rgba(0,0,0,0.08)',
    '0 6px 16px rgba(0,0,0,0.1)',
    '0 8px 24px rgba(0,0,0,0.12)',
    '0 12px 32px rgba(0,0,0,0.15)',
    '0 16px 40px rgba(0,0,0,0.18)',
    '0 20px 48px rgba(0,0,0,0.2)',
    '0 24px 56px rgba(0,0,0,0.22)',
    '0 1px 2px rgba(0,0,0,0.04)',
    '0 2px 4px rgba(0,0,0,0.06)',
    '0 3px 6px rgba(0,0,0,0.08)',
    '0 4px 8px rgba(0,0,0,0.1)',
    '0 5px 10px rgba(0,0,0,0.12)',
    '0 6px 12px rgba(0,0,0,0.14)',
    '0 7px 14px rgba(0,0,0,0.16)',
    '0 8px 16px rgba(0,0,0,0.18)',
    '0 9px 18px rgba(0,0,0,0.2)',
    '0 10px 20px rgba(0,0,0,0.22)',
    '0 11px 22px rgba(0,0,0,0.24)',
    '0 12px 24px rgba(0,0,0,0.26)',
    '0 13px 26px rgba(0,0,0,0.28)',
    '0 14px 28px rgba(0,0,0,0.3)',
    '0 15px 30px rgba(0,0,0,0.32)',
    '0 16px 32px rgba(0,0,0,0.34)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
