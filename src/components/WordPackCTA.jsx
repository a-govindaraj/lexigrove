import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import { WORDPACK, BRAND_GRADIENT } from '../config/brand';

// The first monetisation surface: a one-time, printable 11+ word pack.
function WordPackCTA() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid rgba(46,107,79,0.15)',
        background: '#FFFDF8',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Visual side */}
        <Box
          sx={{
            background: BRAND_GRADIENT,
            color: 'white',
            p: { xs: 4, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minWidth: { md: 260 },
          }}
        >
          <PictureAsPdfRoundedIcon sx={{ fontSize: 64, mb: 1, opacity: 0.95 }} />
          <Typography variant="h3" fontWeight={700}>
            {WORDPACK.price}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            one-time • printable PDF
          </Typography>
        </Box>

        {/* Content side */}
        <Box sx={{ p: { xs: 4, md: 5 }, flexGrow: 1 }}>
          <Chip
            label="For parents"
            size="small"
            color="secondary"
            sx={{ mb: 1.5, color: 'white' }}
          />
          <Typography variant="h4" gutterBottom>
            {WORDPACK.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
            {WORDPACK.subtitle}
          </Typography>

          <Stack spacing={1.2} sx={{ mb: 3 }}>
            {WORDPACK.points.map((point) => (
              <Box key={point} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircleRoundedIcon sx={{ color: 'primary.main', fontSize: 20, mt: '2px' }} />
                <Typography variant="body2">{point}</Typography>
              </Box>
            ))}
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              href={WORDPACK.available ? WORDPACK.url : undefined}
              target={WORDPACK.available ? '_blank' : undefined}
              rel="noopener"
              disabled={!WORDPACK.available}
              sx={{ color: 'white', px: 4 }}
            >
              {WORDPACK.available ? `Get the pack — ${WORDPACK.price}` : 'Coming soon'}
            </Button>
            {!WORDPACK.available && (
              <Typography variant="caption" color="text.secondary">
                Launching shortly — the daily word is free to use now.
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default WordPackCTA;
