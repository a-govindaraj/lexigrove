import { Box, Container, Typography, Paper, TextField, Button, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { BRAND_GRADIENT } from '../config/brand';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // For MVP, you can use a service like Formspree, EmailJS, or just mailto
    alert('Thank you for your message! For now, please email us directly at: contact@lexigrove.com');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            mb: 6,
            p: 5,
            background: BRAND_GRADIENT,
            borderRadius: '10px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <EmailIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            We'd love to hear from you!
          </Typography>
        </Box>

      
        <Paper elevation={1} sx={{ p: 3, mt: 4, bgcolor: '#e9e3f5' }}>
          <Typography variant="body2" color="text.secondary" align="center">
             Send us a Message : govindaraj.aravind@outlook.com
          </Typography>
        </Paper>

        {/* Response Time Notice */}
        <Paper elevation={1} sx={{ p: 3, mt: 4, bgcolor: '#f5f5f5' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            📧 We typically respond within 24-48 hours. Thank you for your patience!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default Contact;
