import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import Logo from '../components/Logo';
import TrackIcon from '../components/TrackIcon';
import WordPackCTA from '../components/WordPackCTA';
import { getAllTracks, getPrimaryTrack, getWordOfTheDay } from '../services/wordService';
import { APP_NAME, APP_TAGLINE, BRAND_GRADIENT } from '../config/brand';

const pronounce = (word) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }
};

const benefits = [
  { icon: <AccessTimeRoundedIcon />, title: 'Two minutes a day', description: 'One carefully chosen word — no overwhelm, no screen-time guilt.' },
  { icon: <CompareArrowsRoundedIcon />, title: 'Synonyms & antonyms', description: 'Exactly how 11+ verbal reasoning tests vocabulary.' },
  { icon: <AutoStoriesRoundedIcon />, title: 'Used in a sentence', description: 'Every word shown in context so it actually sticks.' },
];

// Consistent section heading used across the page for a steady rhythm.
function SectionHeading({ title, subtitle }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Typography variant="h4" align="center">{title}</Typography>
      {subtitle && (
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mt: 1, maxWidth: 620, mx: 'auto' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function Home() {
  const navigate = useNavigate();
  const primary = getPrimaryTrack();
  const todaysWord = getWordOfTheDay(primary.id);
  const otherTracks = getAllTracks().filter((t) => !t.primary);

  const SECTION = { mb: { xs: 6, md: 9 } };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: { xs: 3, md: 5 } }}>
        {/* Hero */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
            ...SECTION,
          }}
        >
          <Box>
            <Chip
              icon={<SpaRoundedIcon />}
              label="Built for the 11+ exam"
              sx={{ mb: 2.5, bgcolor: 'rgba(46,107,79,0.10)', color: 'primary.dark', fontWeight: 600, '& .MuiChip-icon': { color: 'primary.main' } }}
            />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.4rem' }, lineHeight: 1.05, mb: 2 }}>
              {APP_TAGLINE}.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, color: 'text.secondary', mb: 3.5, maxWidth: 520 }}>
              {APP_NAME} gives your child one exam-ready word a day — meaning, synonyms, antonyms,
              and an example sentence. A small daily habit that adds up by exam day.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large" startIcon={<TodayRoundedIcon />} onClick={() => navigate('/word-of-the-day')} sx={{ px: 4 }}>
                See today's word
              </Button>
              <Button variant="outlined" size="large" color="secondary" onClick={() => navigate('/categories')} sx={{ px: 4 }}>
                Browse the words
              </Button>
            </Stack>
          </Box>

          {/* Featured daily word */}
          {todaysWord && (
            <Card sx={{ borderRadius: '10px', overflow: 'hidden', boxShadow: 7 }}>
              <Box sx={{ background: BRAND_GRADIENT, color: 'white', px: 3, py: 1.75, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Logo sx={{ fontSize: 32 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.85, display: 'block', lineHeight: 1.2 }}>
                    Today's 11+ word
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={700}>{todaysWord.date}</Typography>
                </Box>
              </Box>
              <CardContent sx={{ p: { xs: 3, md: 3.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Typography variant="h3" sx={{ color: 'primary.dark' }}>{todaysWord.word}</Typography>
                  <Button onClick={() => pronounce(todaysWord.word)} sx={{ minWidth: 0, p: 1, borderRadius: '50%' }} aria-label="pronounce">
                    <VolumeUpRoundedIcon color="primary" />
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 1.5 }}>
                  {todaysWord.partOfSpeech}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{todaysWord.meaning}</Typography>
                <Box sx={{ display: 'flex', gap: 0.7, flexWrap: 'wrap', mb: 2 }}>
                  {todaysWord.synonyms.slice(0, 3).map((s) => (
                    <Chip key={s} label={s} size="small" variant="outlined" color="primary" />
                  ))}
                </Box>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '8px', bgcolor: 'rgba(46,107,79,0.05)', borderColor: 'rgba(46,107,79,0.15)' }}>
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>“{todaysWord.sentence}”</Typography>
                </Paper>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Benefits */}
        <Box sx={SECTION}>
          <SectionHeading
            title="A vocabulary habit that sticks"
            subtitle="Designed around how children actually remember words — little and often, with context."
          />
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 }, flexWrap: 'nowrap' }}>
            {benefits.map((b) => (
              <Card key={b.title} sx={{ flex: 1, minWidth: 0 }}>
                <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, sm: 2.5 } }}>
                  <Box sx={{ display: 'inline-flex', p: 1.25, borderRadius: '8px', bgcolor: 'rgba(46,107,79,0.10)', color: 'primary.main', mb: 1.5 }}>
                    {b.icon}
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>{b.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{b.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Word pack */}
        <Box sx={SECTION}>
          <SectionHeading title="Go further than the daily word" subtitle="Want the whole list to revise from? Grab the printable pack." />
          <WordPackCTA />
        </Box>

        {/* More tracks */}
        <Box>
          <SectionHeading title="More growing in the grove" subtitle="The same daily-word habit is expanding to other learners." />
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 }, flexWrap: 'nowrap' }}>
            {otherTracks.map((track) => (
              <Card key={track.id} sx={{ flex: 1, minWidth: 0 }}>
                <CardContent sx={{ textAlign: 'center', p: { xs: 1.5, sm: 2.5 } }}>
                  <Box sx={{ display: 'inline-flex', p: 1.25, borderRadius: '8px', bgcolor: `${track.color}1a`, color: track.color, mb: 1.5 }}>
                    <TrackIcon name={track.icon} sx={{ fontSize: 24 }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography variant="subtitle1" fontWeight={700}>{track.name}</Typography>
                    {track.comingSoon && <Chip label="soon" size="small" sx={{ height: 18, fontSize: '0.6rem' }} />}
                  </Box>
                  <Typography variant="body2" color="text.secondary">{track.tagline}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
