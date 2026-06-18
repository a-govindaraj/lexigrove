import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  IconButton,
} from '@mui/material';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { getDailyWordsForAllTracks, getFormattedDate } from '../services/wordService';
import TrackIcon from '../components/TrackIcon';
import WordRelations from '../components/WordRelations';
import { BRAND_GRADIENT } from '../config/brand';

const pronounce = (word) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }
};

const getTabs = (word) => {
  if (word.exampleFormat === 'workplace') {
    return [
      { label: 'Email', content: word.examples.email },
      { label: 'Chat', content: word.examples.chat },
      { label: 'Speaking', content: word.examples.speaking },
    ];
  }
  return [
    { label: 'In a Sentence', content: word.examples.sentence },
    { label: 'Synonyms', content: word.examples.synonyms || '—' },
    { label: 'Antonyms', content: word.examples.antonyms || '—' },
  ];
};

// Large horizontal hero card for the lead (11+) word.
function FeaturedWord({ track, word }) {
  const [tab, setTab] = useState(0);
  if (!word) return null;
  const tabs = getTabs(word);

  return (
    <Card sx={{ overflow: 'hidden', boxShadow: 6 }}>
      <Box sx={{ px: 3, py: 1.5, background: track.color, color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TrackIcon name={track.icon} sx={{ fontSize: 26 }} />
        <Typography variant="subtitle1" fontWeight={700}>
          Today's 11+ word
        </Typography>
      </Box>
      <Grid container>
        {/* Left: the word */}
        <Grid item xs={12} md={5} sx={{ p: { xs: 3, md: 4 }, borderRight: { md: '1px solid rgba(0,0,0,0.06)' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="h2" sx={{ color: track.color, fontSize: { xs: '2.4rem', md: '3rem' }, wordBreak: 'break-word' }}>
              {word.word}
            </Typography>
            <IconButton onClick={() => pronounce(word.word)} size="small" aria-label="pronounce">
              <VolumeUpRoundedIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 1.5 }}>
            {word.partOfSpeech}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, mb: 2 }}>
            {word.meaning}
          </Typography>
          <WordRelations synonyms={word.synonyms} antonyms={word.antonyms} direction="column" />
        </Grid>
        {/* Right: examples */}
        <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 4 } }}>
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 40,
              mb: 1.5,
              '& .MuiTab-root': { minHeight: 40, fontWeight: 600, textTransform: 'none' },
              '& .Mui-selected': { color: track.color },
              '& .MuiTabs-indicator': { backgroundColor: track.color },
            }}
          >
            {tabs.map((t) => (
              <Tab key={t.label} label={t.label} />
            ))}
          </Tabs>
          <Paper elevation={0} sx={{ p: 3, bgcolor: `${track.color}0f`, borderRadius: '8px', minHeight: 120, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 400, lineHeight: 1.7 }}>
              {tabs[tab].content}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
}

// Compact card for the secondary tracks.
function CompactWord({ track, word }) {
  if (!word) return null;
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ px: 2, py: 1, background: track.color, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrackIcon name={track.icon} sx={{ fontSize: 18 }} />
        <Typography variant="caption" fontWeight={700} sx={{ flexGrow: 1 }}>
          {track.name}
        </Typography>
        {track.comingSoon && (
          <Chip label="preview" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.25)', color: 'white', height: 18, fontSize: '0.6rem' }} />
        )}
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h6" fontWeight={700} sx={{ color: track.color }}>
            {word.word}
          </Typography>
          <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            {word.partOfSpeech}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 40 }}>
          {word.meaning}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          “{word.sentence}”
        </Typography>
      </CardContent>
    </Card>
  );
}

function WordOfTheDay() {
  const trackWords = getDailyWordsForAllTracks();
  const featured = trackWords.find((t) => t.track.primary) || trackWords[0];
  const rest = trackWords.filter((t) => t.track.id !== featured.track.id);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h3" component="h1">
            Word of the Day
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {getFormattedDate()}
          </Typography>
        </Box>

        <FeaturedWord track={featured.track} word={featured.word} />

        <Divider sx={{ my: 4 }}>
          <Chip label="Also growing in the grove" sx={{ bgcolor: 'rgba(46,107,79,0.08)', color: 'primary.dark' }} />
        </Divider>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          {rest.map(({ track, word }) => (
            <Box key={track.id} sx={{ flex: 1, minWidth: { xs: '100%', sm: 0 } }}>
              <CompactWord track={track} word={word} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default WordOfTheDay;
