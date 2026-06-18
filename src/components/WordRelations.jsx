import { Box, Chip, Stack, Typography } from '@mui/material';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';

// Synonyms (similar) vs antonyms (opposite), clearly separated by colour + a
// plain-English hint. Green = same meaning, terracotta = opposite meaning.
const PANELS = {
  syn: {
    label: 'Synonyms',
    hint: 'similar meaning',
    color: '#2E6B4F',
    bg: 'rgba(46,107,79,0.07)',
    icon: <LinkRoundedIcon sx={{ fontSize: 16 }} />,
  },
  ant: {
    label: 'Antonyms',
    hint: 'opposite meaning',
    color: '#C25E45',
    bg: 'rgba(224,122,95,0.10)',
    icon: <CompareArrowsRoundedIcon sx={{ fontSize: 16 }} />,
  },
};

function RelationPanel({ variant, items }) {
  const cfg = PANELS[variant];
  if (!items || items.length === 0) return null;
  return (
    <Box sx={{ flex: 1, minWidth: 0, p: 1.5, borderRadius: '8px', bgcolor: cfg.bg, borderLeft: `3px solid ${cfg.color}` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1, color: cfg.color }}>
        {cfg.icon}
        <Typography variant="caption" fontWeight={700} sx={{ letterSpacing: 0.5 }}>
          {cfg.label.toUpperCase()}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          · {cfg.hint}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.6, flexWrap: 'wrap' }}>
        {items.map((it) => (
          <Chip
            key={it}
            label={it}
            size="small"
            sx={{ bgcolor: 'background.paper', color: cfg.color, border: `1px solid ${cfg.color}40`, fontWeight: 600 }}
          />
        ))}
      </Box>
    </Box>
  );
}

// `direction`: 'row' shows the two panels side-by-side (stacks on mobile);
// 'column' always stacks them. Defaults to responsive row.
function WordRelations({ synonyms, antonyms, direction }) {
  const dir = direction || { xs: 'column', sm: 'row' };
  return (
    <Stack direction={dir} spacing={1.5} sx={{ width: '100%' }}>
      <RelationPanel variant="syn" items={synonyms} />
      <RelationPanel variant="ant" items={antonyms} />
    </Stack>
  );
}

export default WordRelations;
