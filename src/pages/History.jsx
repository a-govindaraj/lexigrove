import { useState } from 'react';
import {
  Box,
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

// Sample historical data - in production, this would come from an API or local storage
const sampleHistory = [
  {
    date: '2026-01-26',
    word: 'Synergy',
    category: 'Meetings',
    learned: true,
  },
  {
    date: '2026-01-25',
    word: 'Proactive',
    category: 'Leadership',
    learned: true,
  },
  {
    date: '2026-01-24',
    word: 'Leverage',
    category: 'Business Strategy',
    learned: true,
  },
  {
    date: '2026-01-23',
    word: 'Facilitate',
    category: 'Meetings',
    learned: false,
  },
  {
    date: '2026-01-22',
    word: 'Articulate',
    category: 'Presentations',
    learned: true,
  },
  {
    date: '2026-01-21',
    word: 'Streamline',
    category: 'Business Strategy',
    learned: true,
  },
  {
    date: '2026-01-20',
    word: 'Initiative',
    category: 'Leadership',
    learned: true,
  },
];

function History() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = sampleHistory.filter((item) =>
    item.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const learnedCount = sampleHistory.filter((item) => item.learned).length;
  const totalCount = sampleHistory.length;
  const learningRate = ((learnedCount / totalCount) * 100).toFixed(0);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box 
          sx={{ 
            mb: 5,
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Learning History
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Review and track your vocabulary learning progress
          </Typography>
        </Box>

        <Card 
          sx={{ 
            mb: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={700} textAlign="center" mb={3}>
              Your Progress
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h2" 
                  fontWeight={700}
                  sx={{ 
                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {totalCount}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.95, mt: 1 }}>
                  Total Words
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h2" 
                  fontWeight={700}
                  sx={{ 
                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {learnedCount}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.95, mt: 1 }}>
                  Learned
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h2" 
                  fontWeight={700}
                  sx={{ 
                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {learningRate}%
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.95, mt: 1 }}>
                  Success Rate
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <TextField
          fullWidth
          placeholder="Search words..."
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
            {filteredHistory.map((item, index) => (
              <ListItem
                key={index}
                divider={index < filteredHistory.length - 1}
                sx={{
                  '&:hover': {
                    bgcolor: 'grey.50',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{item.word}</Typography>
                      <Chip
                        label={item.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      {item.learned && (
                        <Chip
                          label="✓ Learned"
                          size="small"
                          color="success"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Card>

        {filteredHistory.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No words found matching "{searchQuery}"
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default History;
