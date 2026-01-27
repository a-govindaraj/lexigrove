import { Box, Container, Typography, Paper, Grid, Chip } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';

function About() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Box 
          sx={{ 
            mb: 6,
            p: 5,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <WorkIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            About WordAtWork
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95, maxWidth: 800, mx: 'auto' }}>
            Empowering professionals to communicate with confidence and clarity
          </Typography>
        </Box>

        {/* Mission Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            WordAtWork was created to help busy professionals expand their workplace vocabulary in just a few minutes a day. 
            We believe that effective communication is the cornerstone of professional success, and the right words at the right 
            time can make all the difference.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Our platform provides practical, context-aware vocabulary that you can immediately apply in emails, meetings, 
            presentations, and everyday workplace conversations.
          </Typography>
        </Paper>

        {/* What We Offer */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary" mb={4}>
            What We Offer
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />,
                title: 'Daily Vocabulary',
                description: 'Get a new professional word every day with real workplace examples'
              },
              {
                icon: <GroupsIcon sx={{ fontSize: 40 }} />,
                title: '11+ Categories',
                description: 'Browse words by topic: Leadership, Meetings, Presentations, and more'
              },
              {
                icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
                title: 'Contextual Learning',
                description: 'See how words are used in emails, chats, and speaking contexts'
              },
              {
                icon: <WorkIcon sx={{ fontSize: 40 }} />,
                title: 'Workplace-Focused',
                description: 'Every word and example is tailored for professional environments'
              },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* How It Works */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
            How It Works
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              1. Visit Daily
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Check out the Word of the Day - a new professional vocabulary word every 24 hours.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom>
              2. Explore Categories
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Browse our categorized word lists to find vocabulary relevant to your specific needs.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom>
              3. Learn in Context
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              Each word comes with definitions, pronunciation guides, and real workplace examples.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom>
              4. Apply Immediately
            </Typography>
            <Typography variant="body1" paragraph>
              Use the provided examples as templates for your own emails, messages, and presentations.
            </Typography>
          </Box>
        </Paper>

        {/* Beta Notice */}
        <Paper elevation={2} sx={{ p: 4, background: '#fff3e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip label="BETA" color="warning" />
            <Typography variant="h5" fontWeight={700}>
              We're Growing!
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            WordAtWork is currently in beta. We're actively working on new features and improvements based on user feedback. 
            Your suggestions and experiences help us build a better learning platform.
          </Typography>
          <Typography variant="body1">
            Have ideas or feedback? We'd love to hear from you on our Contact page!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default About;
