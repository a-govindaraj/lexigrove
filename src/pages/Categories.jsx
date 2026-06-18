import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import { getAllTracks, getTrackWords } from '../services/wordService';
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

function WordRow({ word, color, expanded, onToggle }) {
  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded}
      onChange={onToggle}
      sx={{
        '&:before': { display: 'none' },
        borderBottom: '1px solid rgba(46,107,79,0.10)',
        bgcolor: 'transparent',
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} sx={{ px: { xs: 1.5, sm: 2 }, '& .MuiAccordionSummary-content': { my: 1.25 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            gap: { xs: 0.25, md: 1.5 },
            width: '100%',
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0, minWidth: { md: 160 } }}>
            <Typography variant="h6" fontWeight={700} sx={{ color }}>
              {word.word}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              {word.partOfSpeech}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: { xs: 'normal', md: 'nowrap' },
              display: { xs: '-webkit-box', md: 'block' },
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {word.meaning}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: { xs: 1, sm: 2 }, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Typography variant="body1">{word.meaning}</Typography>
          <IconButton size="small" onClick={() => pronounce(word.word)} aria-label="pronounce" sx={{ color }}>
            <VolumeUpRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
        <WordRelations synonyms={word.synonyms} antonyms={word.antonyms} />
        {word.sentence && (
          <Paper elevation={0} sx={{ mt: 1.5, p: 1.5, bgcolor: 'rgba(46,107,79,0.05)', borderRadius: '8px', display: 'flex', gap: 1 }}>
            <FormatQuoteRoundedIcon sx={{ color, opacity: 0.6 }} />
            <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
              {word.sentence}
            </Typography>
          </Paper>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

function Categories() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tracks = getAllTracks();
  const [activeTrackId, setActiveTrackId] = useState(tracks[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedWord, setExpandedWord] = useState(null);

  const activeTrack = tracks.find((t) => t.id === activeTrackId);
  const words = getTrackWords(activeTrackId).filter((w) =>
    `${w.word} ${w.meaning}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const switchTrack = (id) => {
    setActiveTrackId(id);
    setSearchTerm('');
    setExpandedWord(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box sx={{ mb: 3, p: { xs: 3, md: 3.5 }, background: BRAND_GRADIENT, borderRadius: '10px', color: 'white' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Browse the words
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92 }}>
            Pick a track, then tap any word to see its meaning, synonyms, antonyms and an example.
          </Typography>
        </Box>

        {/* Track tabs */}
        <Tabs
          value={activeTrackId}
          onChange={(e, v) => switchTrack(v)}
          variant={isMobile ? 'fullWidth' : 'scrollable'}
          scrollButtons="auto"
          sx={{
            mb: 2,
            borderBottom: '1px solid rgba(46,107,79,0.12)',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: { xs: 60, sm: 52 },
              minWidth: 0,
              px: { xs: 0.5, sm: 2 },
              fontSize: { xs: '0.78rem', sm: '0.875rem' },
            },
            '& .Mui-selected': { color: `${activeTrack.color} !important` },
            '& .MuiTabs-indicator': { backgroundColor: activeTrack.color, height: 3 },
          }}
        >
          {tracks.map((track) => (
            <Tab
              key={track.id}
              value={track.id}
              iconPosition={isMobile ? 'top' : 'start'}
              icon={<TrackIcon name={track.icon} sx={{ fontSize: isMobile ? 18 : 20 }} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {track.short}
                  {track.comingSoon && (
                    <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'warning.main', flexShrink: 0 }} />
                  )}
                </Box>
              }
            />
          ))}
        </Tabs>

        {/* Preview note for non-primary tracks */}
        {activeTrack.comingSoon && (
          <Alert severity="info" sx={{ mb: 2, borderRadius: '8px' }}>
            This is a preview track — a few sample words. The full {activeTrack.name} list is on the way.
          </Alert>
        )}

        {/* Search + count */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1, flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            {words.length} word{words.length === 1 ? '' : 's'}
          </Typography>
          <TextField
            size="small"
            placeholder={`Search ${activeTrack.short}…`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: { xs: '100%', sm: 260 }, bgcolor: 'background.paper' }}
          />
        </Box>

        {/* Word list */}
        <Paper elevation={0} sx={{ border: '1px solid rgba(46,107,79,0.12)', borderRadius: '10px', overflow: 'hidden' }}>
          {words.map((w) => (
            <WordRow
              key={w.word}
              word={w}
              color={activeTrack.color}
              expanded={expandedWord === w.word}
              onToggle={() => setExpandedWord(expandedWord === w.word ? null : w.word)}
            />
          ))}
          {words.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="body1" color="text.secondary">
                No words matching “{searchTerm}”
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Categories;
