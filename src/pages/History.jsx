import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { Link as RouterLink } from 'react-router-dom';
import { getLearnedList, getStats } from '../services/progressService';
import { BRAND_GRADIENT } from '../config/brand';

function StatBlock({ value, label }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={700} sx={{ textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
        {value}
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.95, mt: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}

function History() {
  const [searchQuery, setSearchQuery] = useState('');

  // Read progress once per render from localStorage.
  const learned = useMemo(() => getLearnedList(), []);
  const stats = useMemo(() => getStats(), []);

  const filtered = learned.filter((item) =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (d) =>
    new Date(`${d}T00:00:00`).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            mb: 5,
            p: 4,
            background: BRAND_GRADIENT,
            borderRadius: '12px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            My Progress
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Your streak and every word you've marked as learned
          </Typography>
        </Box>

        {/* Stats */}
        <Card
          sx={{
            mb: 4,
            borderRadius: '12px',
            background: BRAND_GRADIENT,
            color: 'white',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <StatBlock
                value={
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                    <LocalFireDepartmentRoundedIcon sx={{ fontSize: 40 }} />
                    {stats.currentStreak}
                  </Box>
                }
                label="Day Streak"
              />
              <StatBlock value={stats.learnedCount} label="Words Learned" />
              <StatBlock value={stats.longestStreak} label="Best Streak" />
            </Box>
          </CardContent>
        </Card>

        {/* Empty state */}
        {learned.length === 0 ? (
          <Card sx={{ textAlign: 'center', py: 6, px: 3 }}>
            <Typography variant="h6" gutterBottom>
              No words learned yet 🌱
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Open today's word and tap “Mark as learned” to start growing your grove.
            </Typography>
            <Button component={RouterLink} to="/word-of-the-day" variant="contained">
              Go to Word of the Day
            </Button>
          </Card>
        ) : (
          <>
            <TextField
              fullWidth
              placeholder="Search your learned words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Card>
              <List>
                {filtered.map((item, index) => (
                  <ListItem key={`${item.trackId}-${item.word}`} divider={index < filtered.length - 1}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="h6">{item.word}</Typography>
                          {item.partOfSpeech && (
                            <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                              {item.partOfSpeech}
                            </Typography>
                          )}
                          <Chip label={item.trackName} size="small" color="primary" variant="outlined" />
                          <Chip label="✓ Learned" size="small" color="success" />
                        </Box>
                      }
                      secondary={
                        <>
                          {item.meaning && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                              {item.meaning}
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            Learned on {formatDate(item.date)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Card>

            {filtered.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No learned words match "{searchQuery}"
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default History;
