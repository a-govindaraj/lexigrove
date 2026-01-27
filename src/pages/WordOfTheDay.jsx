import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { getWordOfTheDay } from '../services/wordService';

function WordOfTheDay() {
  const [tabValue, setTabValue] = useState(0);
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch word of the day on component mount
  useEffect(() => {
    const fetchWord = async () => {
      try {
        setLoading(true);
        const word = await getWordOfTheDay();
        setWordData(word);
      } catch (error) {
        console.error('Error loading word:', error);
        setWordData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePronounce = (word) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1;
      utterance.volume = 1;
      
      // Speak the word
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis not supported in your browser');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (!wordData) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Unable to load word. Please try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  const examples = [
    { label: 'Email', content: wordData.examples.email },
    { label: 'Chat', content: wordData.examples.chat },
    { label: 'Speaking', content: wordData.examples.speaking },
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box 
          sx={{ 
            mb: 4,
            p: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {wordData.date}
          </Typography>
        </Box>

        <Card 
          sx={{ 
            mt: 3,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box 
              sx={{ 
                mb: 4,
                p: 4,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: 3,
                color: 'white',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(240, 147, 251, 0.3)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography 
                  variant="h2" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 700,
                    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {wordData.word}
                </Typography>
                <IconButton 
                  onClick={() => handlePronounce(wordData.word)}
                  sx={{ 
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                  }}
                  size="large"
                >
                  <VolumeUpIcon sx={{ fontSize: 36 }} />
                </IconButton>
              </Box>
              <Typography variant="h6" gutterBottom sx={{ opacity: 0.95, fontStyle: 'italic' }}>
                /{wordData.pronunciation}/ • {wordData.partOfSpeech}
              </Typography>
              <Chip
                label={wordData.category}
                sx={{ 
                  mt: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  px: 2,
                  py: 2.5,
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Meaning
              </Typography>
              <Typography variant="body1" paragraph>
                {wordData.meaning}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Synonyms
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {wordData.synonyms.map((synonym, index) => (
                  <Chip key={index} label={synonym} variant="outlined" />
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="h5" gutterBottom fontWeight={600} color="primary">
                Usage Examples
              </Typography>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                sx={{ 
                  mb: 3,
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    fontSize: '1rem',
                  },
                  '& .Mui-selected': {
                    color: '#667eea',
                  },
                  '& .MuiTabs-indicator': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    height: 3,
                  },
                }}
              >
                {examples.map((example, index) => (
                  <Tab key={index} label={example.label} />
                ))}
              </Tabs>
              <Paper 
                sx={{ 
                  p: 4, 
                  background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                  borderRadius: 2,
                  boxShadow: '0 4px 16px rgba(252, 182, 159, 0.3)',
                  border: '2px solid rgba(255, 236, 210, 0.5)',
                }}
              >
                <Typography variant="h6" sx={{ fontStyle: 'italic', color: 'text.primary', lineHeight: 1.8 }}>
                  "{examples[tabValue].content}"
                </Typography>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default WordOfTheDay;
