import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  Tab,
  Tabs,
  Button,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { getWordsList, getAllCategories, fetchWordDefinition } from '../services/wordService';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordsList, setWordsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingWord, setLoadingWord] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Load words list and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const words = await getWordsList();
        const cats = await getAllCategories();
        setWordsList(words);
        
        // Build category objects with counts
        const categoryData = cats.map(cat => {
          const categoryWords = words.filter(w => w.category === cat);
          const icons = {
            'Meetings': <GroupsIcon />,
            'Presentations': <PresentToAllIcon />,
            'Leadership': <EmojiPeopleIcon />,
            'Collaboration': <EmailIcon />,
          };
          const colors = {
            'Meetings': '#1976d2',
            'Presentations': '#2e7d32',
            'Leadership': '#ed6c02',
            'Collaboration': '#9c27b0',
          };
          
          return {
            name: cat,
            description: `Professional vocabulary for ${cat.toLowerCase()}`,
            icon: icons[cat] || <BusinessCenterIcon />,
            color: colors[cat] || '#0288d1',
            wordCount: categoryWords.length,
          };
        });
        
        setCategories(categoryData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadData();
  }, []);
  const [tabValue, setTabValue] = useState(0);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm('');
  };

  const handleCloseDetail = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };

  const handleCloseWordDialog = () => {
    setSelectedWord(null);
    setTabValue(0);
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

  const getFilteredWords = () => {
    if (!selectedCategory) return [];
    const words = wordsList.filter(w => w.category === selectedCategory).map(w => ({
      word: w.word.charAt(0).toUpperCase() + w.word.slice(1),
      difficulty: w.difficulty || 'Intermediate',
    }));
    if (!searchTerm) return words;
    return words.filter(w => 
      w.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Fetch full word details when clicked
  const handleWordClick = async (wordItem) => {
    setLoadingWord(true);
    try {
      const wordData = await fetchWordDefinition(wordItem.word);
      if (wordData) {
        setSelectedWord({
          ...wordData,
          category: selectedCategory,
        });
      } else {
        setSnackbarMessage(`Sorry, definition not found for "${wordItem.word}". Try another word.`);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error fetching word details:', error);
      setSnackbarMessage(`Unable to load "${wordItem.word}". Please try again.`);
      setSnackbarOpen(true);
    } finally {
      setLoadingWord(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return '#4caf50';
      case 'Intermediate': return '#ff9800';
      case 'Advanced': return '#f44336';
      default: return '#757575';
    }
  };

  return (
    <Container maxWidth="xl">
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
            Explore Categories
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.95 }}>
            Choose a category to explore workplace vocabulary tailored for specific contexts
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 2,
          '@media (max-width: 900px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 600px)': {
            gridTemplateColumns: '1fr',
          },
        }}>
          {categories.map((category, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: 2,
                  background: 'white',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  border: selectedCategory === category.name ? `3px solid ${category.color}` : '1px solid rgba(102, 126, 234, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${category.color}40`,
                    border: `2px solid ${category.color}`,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleCategoryClick(category.name)}
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    width: '100%',
                    flex: 1,
                  }}>
                    <Box 
                      sx={{ 
                        mb: 1.5,
                        p: 1.5,
                        display: 'inline-flex',
                        alignSelf: 'center',
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${category.color}ee 0%, ${category.color} 100%)`,
                        boxShadow: `0 4px 12px ${category.color}50`,
                        color: 'white',
                      }}
                    >
                      <Box sx={{ fontSize: 36 }}>{category.icon}</Box>
                    </Box>
                    <Typography variant="subtitle1" component="h2" fontWeight={700} color="text.primary" sx={{ mb: 0.5, fontSize: '1.1rem' }}>
                      {category.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 1.5,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        fontSize: '0.813rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {category.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-block',
                        alignSelf: 'center',
                        px: 1.5,
                        py: 0.4,
                        bgcolor: `${category.color}15`,
                        borderRadius: 2,
                        border: `1px solid ${category.color}40`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          color: category.color,
                        }}
                      >
                        {category.wordCount} words
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Detailed Category View */}
        {selectedCategory && (
          <Box sx={{ mt: 6 }}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 4,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: 3,
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {selectedCategory}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95 }}>
                    {categories.find(c => c.name === selectedCategory)?.description}
                  </Typography>
                </Box>
                <IconButton 
                  onClick={handleCloseDetail}
                  sx={{ 
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Paper>

            <TextField
              fullWidth
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Grid container spacing={2}>
              {getFilteredWords().map((wordData, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      },
                    }}
                    onClick={() => handleWordClick(wordData)}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 1 }}>
                        {wordData.word}
                      </Typography>
                      
                      <Chip 
                        label={wordData.difficulty} 
                        size="small"
                        sx={{ 
                          bgcolor: `${getDifficultyColor(wordData.difficulty)}15`,
                          color: getDifficultyColor(wordData.difficulty),
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          mb: 1
                        }}
                      />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
                        Click to view definition
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {getFilteredWords().length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No words found matching "{searchTerm}"
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Word Detail Dialog */}
        <Dialog 
          open={Boolean(selectedWord)} 
          onClose={handleCloseWordDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedWord && (
            <>
              <DialogTitle sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4" fontWeight={700}>
                      {selectedWord.word}
                    </Typography>
                    <IconButton 
                      onClick={() => handlePronounce(selectedWord.word)}
                      sx={{ 
                        color: 'white',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                      }}
                      size="small"
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {selectedWord.pronunciation && `/${selectedWord.pronunciation}/`} {selectedWord.partOfSpeech}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseWordDialog} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              
              <DialogContent sx={{ mt: 3 }}>
                {loadingWord ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <Typography>Loading word details...</Typography>
                  </Box>
                ) : (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip 
                          label={selectedWord.category || 'Professional'}
                          sx={{ 
                            bgcolor: '#e3f2fd',
                            color: '#1976d2',
                            fontWeight: 700
                          }}
                        />
                      </Box>
                      
                      <Typography variant="h6" gutterBottom fontWeight={600} color="text.primary">
                        Definition
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {selectedWord.meaning}
                      </Typography>

                      {selectedWord.synonyms && selectedWord.synonyms.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                            Synonyms
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {selectedWord.synonyms.map((synonym, idx) => (
                              <Chip key={idx} label={synonym} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                      <Typography variant="h6" gutterBottom fontWeight={600} color="text.primary" sx={{ mb: 2 }}>
                        Usage Examples
                      </Typography>
                      
                      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
                        <Tab label="Email" />
                        <Tab label="Chat" />
                        <Tab label="Speaking" />
                      </Tabs>

                      <Paper elevation={0} sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        {tabValue === 0 && (
                          <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>
                            {selectedWord.examples?.email || `Use "${selectedWord.word.toLowerCase()}" in your professional emails to communicate effectively.`}
                          </Typography>
                        )}
                        {tabValue === 1 && (
                          <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>
                            {selectedWord.examples?.chat || `Try using "${selectedWord.word.toLowerCase()}" in team conversations and chats.`}
                          </Typography>
                        )}
                        {tabValue === 2 && (
                          <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8 }}>
                            {selectedWord.examples?.speaking || `Incorporate "${selectedWord.word.toLowerCase()}" in your presentations and meetings.`}
                          </Typography>
                        )}
                      </Paper>
                    </Box>
                  </>
                )}
              </DialogContent>
            </>
          )}
        </Dialog>
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Categories;
