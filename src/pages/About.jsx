import { Box, Container, Typography, Paper, Grid, Chip } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import { APP_NAME, BRAND_GRADIENT } from '../config/brand';
import { getAllTracks } from '../services/wordService';

function About() {
  const tracks = getAllTracks();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero */}
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
          <AutoStoriesIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            About {APP_NAME}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.95, maxWidth: 800, mx: 'auto' }}>
            A daily-word habit for the 11+ — with room to grow
          </Typography>
        </Box>

        {/* Mission */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            {APP_NAME} helps children preparing for the 11+ grow their vocabulary in just a couple of minutes a day.
            The 11+ rewards a wide vocabulary, and the surest way to build one is little and often — one well-chosen
            word at a time, with the synonyms and antonyms that verbal reasoning actually tests.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            The same daily-word engine is growing into other tracks too — for working professionals and English
            learners — but the 11+ is our home soil. Each daily word arrives with its meaning, synonyms, antonyms,
            and an example sentence.
          </Typography>
        </Paper>

        {/* Tracks */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary" mb={3}>
            Tracks for Every Learner
          </Typography>
          <Grid container spacing={3}>
            {tracks.map((track) => (
              <Grid item xs={12} sm={6} key={track.id}>
                <Box sx={{ p: 2, borderLeft: `4px solid ${track.color}` }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {track.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {track.tagline}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* What we offer */}
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700} color="primary" mb={4}>
            What We Offer
          </Typography>
          <Grid container spacing={3}>
            {[
              { icon: <EmojiObjectsIcon sx={{ fontSize: 40 }} />, title: 'Daily Vocabulary', description: 'A fresh word every day for each track, with clear meanings.' },
              { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: 'Multiple Tracks', description: 'Workplace, 11+, and English prep — all in one place.' },
              { icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, title: 'Synonyms & Antonyms', description: 'Build word families the way real exams test them.' },
              { icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />, title: 'Real Examples', description: 'See each word used in context, tailored to your track.' },
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
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

        {/* Beta notice */}
        <Paper elevation={2} sx={{ p: 4, background: '#fff3e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Chip label="BETA" color="warning" />
            <Typography variant="h5" fontWeight={700}>
              We're Growing!
            </Typography>
          </Box>
          <Typography variant="body1" paragraph>
            {APP_NAME} is currently in beta. We're actively adding words, tracks, and features based on user feedback.
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
