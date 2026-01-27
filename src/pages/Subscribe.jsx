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
  Paper,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [whatsappSubscribed, setWhatsappSubscribed] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleEmailSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSnackbarMessage('Please enter a valid email address');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // In production, this would send to backend API
    console.log('Email subscription:', email);
    setEmailSubscribed(true);
    setSnackbarMessage('Successfully subscribed via Email! 🎉');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setEmail('');
  };

  const handleWhatsAppSubscribe = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setSnackbarMessage('Please enter a valid phone number');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // In production, this would send to backend API
    console.log('WhatsApp subscription:', phone);
    setWhatsappSubscribed(true);
    setSnackbarMessage('Successfully subscribed via WhatsApp! 🎉');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setPhone('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Header Section */}
        <Box 
          sx={{ 
            mb: 6,
            p: 5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
          }}
        >
          <NotificationsActiveIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Subscribe to WordAtWork
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800, mx: 'auto' }}>
            Get your daily word delivered straight to your inbox or WhatsApp. 
            Build your professional vocabulary one word at a time!
          </Typography>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" fontWeight={700} align="center" color="primary" mb={4}>
            What You'll Get
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'nowrap' }}>
            {[
              { title: 'Daily Word', desc: 'A new professional word every day' },
              { title: 'Context Examples', desc: 'Real workplace usage in emails, meetings, and presentations' },
              { title: 'Quick Learning', desc: 'Just 5 minutes a day to expand your vocabulary' },
              { title: 'Progress Tracking', desc: 'Monitor your learning journey and achievements' },
            ].map((benefit, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  width: 250,
                  height: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontSize: '1rem' }}>
                  {benefit.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                  {benefit.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Subscription Cards */}
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {/* Email Subscription */}
          <Grid item xs={12} md={6} sx={{ maxWidth: 600 }}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: emailSubscribed ? '3px solid #4caf50' : '2px solid #667eea',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  <EmailIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>

                <Typography variant="h4" fontWeight={700} align="center" gutterBottom color="primary">
                  Email Subscription <br />(In-progress)
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" paragraph>
                  Receive daily words directly in your inbox. Perfect for starting your morning with a vocabulary boost!
                </Typography>

                {emailSubscribed ? (
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: '#e8f5e9',
                      borderRadius: 2,
                      textAlign: 'center',
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50', mb: 1 }} />
                    <Typography variant="h6" fontWeight={700} color="#4caf50">
                      You're Subscribed!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Check your email for confirmation
                    </Typography>
                  </Box>
                ) : (
                  <form onSubmit={handleEmailSubscribe}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        },
                      }}
                    >
                      Subscribe via Email
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </Grid>

          
        </Grid>

        {/* Privacy Notice */}
        <Box sx={{ mt: 6, p: 3, bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            🔒 Your privacy is important to us. We'll only send you daily words and never share your information with third parties.
            You can unsubscribe anytime.
          </Typography>
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', fontSize: '1rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Subscribe;
