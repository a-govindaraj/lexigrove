import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Grid,
  Snackbar,
  Alert,
  InputAdornment,
  MenuItem,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getAllTracks } from '../services/wordService';
import { SUBSCRIBE_ENDPOINT, isSubscribeConfigured } from '../config/integrations';

const BENEFITS = [
  'A new word for your track, every day',
  'Meanings, synonyms, antonyms & usage in context',
  'Just five minutes — a habit that compounds',
  'Build a streak and track what you’ve learned',
];

function Subscribe() {
  const tracks = getAllTracks();
  const [email, setEmail] = useState('');
  const [trackId, setTrackId] = useState(tracks[0]?.id || '');
  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const notify = (message, severity = 'success') => setSnackbar({ open: true, message, severity });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      notify('Please enter a valid email address', 'error');
      return;
    }
    if (!isSubscribeConfigured()) {
      notify('Email sign-up is launching soon — check back shortly!', 'info');
      return;
    }

    setStatus('loading');
    try {
      const trackName = tracks.find((t) => t.id === trackId)?.name || trackId;
      // text/plain keeps this a "simple" request so the browser skips the CORS
      // preflight that Google Apps Script can't respond to. The script reads the
      // raw body and JSON.parses it.
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ email, track: trackId, trackName, source: 'lexigrove-web' }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      notify('You’re on the list! 🎉 Your daily words are on the way soon.', 'success');
      setEmail('');
    } catch {
      setStatus('idle');
      notify('Something went wrong. Please try again in a moment.', 'error');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left: pitch + benefits */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" fontWeight={700} color="primary" gutterBottom>
              Get a word a day
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Pick your track and we’ll deliver one carefully chosen word to your inbox each morning.
            </Typography>
            <List dense disablePadding>
              {BENEFITS.map((b) => (
                <ListItem key={b} disableGutters sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={b} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Right: form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '12px', border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 3 }}>
                {status === 'success' ? (
                  <Box sx={{ py: 2, textAlign: 'center' }}>
                    <CheckCircleIcon sx={{ fontSize: 44, color: 'success.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight={700} color="success.main">
                      You’re on the list!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We’ll start sending your daily word soon.
                    </Typography>
                  </Box>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                      Subscribe free
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Your track"
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      sx={{ mb: 2 }}
                    >
                      {tracks.map((t) => (
                        <MenuItem key={t.id} value={t.id}>
                          {t.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={status === 'loading'}
                      startIcon={status === 'loading' ? <CircularProgress size={18} color="inherit" /> : null}
                      sx={{ fontWeight: 700 }}
                    >
                      {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                    </Button>
                    <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 1.5 }}>
                      {isSubscribeConfigured()
                        ? '🔒 No spam. Unsubscribe anytime.'
                        : 'Email delivery is launching soon.'}
                    </Typography>
                  </form>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Subscribe;
