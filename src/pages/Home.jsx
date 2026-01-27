import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Fade,
  Grow,
  Stack,
  Divider,
  Paper,
  Chip,
  keyframes,
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import ForumIcon from '@mui/icons-material/Forum';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import Logo from '../components/Logo';

// Define keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
`;

function Home() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [titleText, setTitleText] = useState('');
  const fullText = 'Build confidence in workplace communication';
  const fullTitle = 'Word at Work';
  
  // Typing animation effect for subtitle
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  // Typing animation effect for title
  useEffect(() => {
    let index = 0;
    let typingTimer;
    let pauseTimer;
    
    const typeText = () => {
      typingTimer = setInterval(() => {
        if (index <= fullTitle.length) {
          setTitleText(fullTitle.slice(0, index));
          index++;
        } else {
          clearInterval(typingTimer);
          // Pause for 2 seconds before restarting
          pauseTimer = setTimeout(() => {
            index = 0;
            setTitleText('');
            typeText();
          }, 2000);
        }
      }, 150); // Slower typing speed
    };
    
    typeText();
    
    return () => {
      clearInterval(typingTimer);
      clearTimeout(pauseTimer);
    };
  }, []);

  const features = [
    {
      title: 'Word of the Day',
      description: 'Get a new workplace vocabulary word every day with practical examples.',
      icon: <TodayIcon sx={{ fontSize: 60, color: 'white' }} />,
      action: () => navigate('/word-of-the-day'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Categories',
      description: 'Explore words by category: Meetings, Presentations, Leadership, and more.',
      icon: <CategoryIcon sx={{ fontSize: 60, color: 'white' }} />,
      action: () => navigate('/categories'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    // {
    //   title: 'Learning History',
    //   description: 'Review all the words you\'ve learned and track your progress.',
    //   icon: <HistoryIcon sx={{ fontSize: 60, color: 'white' }} />,
    //   action: () => navigate('/history'),
    //   gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    // },
  ];

  const benefits = [
    {
      icon: <SpeedIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Time-Saving',
      description: 'Just 1-2 minutes per day to build your vocabulary effectively',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Workplace-Focused',
      description: 'Real examples for emails, meetings, and presentations',
    },
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Actionable',
      description: 'Ready-to-use phrases you can apply immediately',
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Track Progress',
      description: 'Monitor your learning journey and stay motivated',
    },
  ];

  const useCases = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Professional Emails',
      description: 'Write clear, confident emails that get results',
    },
    {
      icon: <ForumIcon sx={{ fontSize: 40 }} />,
      title: 'Team Meetings',
      description: 'Contribute effectively in discussions and presentations',
    },
    {
      icon: <RecordVoiceOverIcon sx={{ fontSize: 40 }} />,
      title: 'Client Calls',
      description: 'Communicate with clarity and professionalism',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 8,
              p: { xs: 4, md: 8 },
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              color: 'white',
              boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                animation: `${shimmer} 3s infinite`,
              }
            }}
          >
            <Box sx={{ 
              animation: `${float} 3s ease-in-out infinite`,
              position: 'relative',
              zIndex: 1,
            }}>
              <Logo sx={{ fontSize: { xs: 100, md: 140 }, mb: 3, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }} />
            </Box>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                fontSize: { xs: '2.5rem', md: '3.75rem' },
                position: 'relative', 
                zIndex: 1,
                minHeight: '1.2em',
              }}
            >
              {titleText}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1em',
                  bgcolor: 'white',
                  animation: `${pulse} 1s ease-in-out infinite`,
                  ml: 0.5,
                }}
              />
            </Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: 'auto', opacity: 0.9, mb: 4, fontSize: '1.1rem', position: 'relative', zIndex: 1 }}>
              Enhance your professional vocabulary with daily words and ready-to-use examples
              for emails, chats, and meetings. Perfect for busy professionals who want to communicate
              with clarity and confidence.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/word-of-the-day')}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                  '&:hover': {
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px) scale(1.02)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                  animation: `${pulse} 2s ease-in-out infinite`,
                }}
              >
                Get Today's Word
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate('/categories')}
                sx={{ 
                  px: 4,
                  py: 1.5,
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderWidth: 2,
                  },
                }}
              >
                Explore Categories
              </Button>
            </Stack>
          </Box>
        </Fade>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight={700} color="primary" mb={2}>
            Start Your Journey
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={6} maxWidth={800} mx="auto">
            Choose how you want to learn and improve your workplace vocabulary
          </Typography>
          
          <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ minWidth: { xs: '300px', md: 'auto' } }}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: 3,
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      animation: `${fadeInUp} 0.6s ease-out`,
                      animationDelay: `${index * 0.2}s`,
                      animationFillMode: 'both',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 16px 48px rgba(102, 126, 234, 0.25)',
                      },
                      '&:hover .feature-icon': {
                        animation: `${bounce} 0.6s ease-in-out`,
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                      <Box 
                        className="feature-icon"
                        sx={{ 
                          mb: 3,
                          p: 3,
                          display: 'inline-flex',
                          borderRadius: '20px',
                          background: feature.gradient,
                          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h2" gutterBottom fontWeight={700} color="text.primary">
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3, minHeight: 60 }}>
                        {feature.description}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={feature.action}
                        fullWidth
                        sx={{ 
                          mt: 'auto',
                          py: 1.5,
                          background: feature.gradient,
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                          fontWeight: 600,
                          fontSize: '1rem',
                          '&:hover': {
                            opacity: 0.9,
                            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.4)',
                          },
                        }}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Benefits Section - Why, How, What */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight={700} color="primary" mb={6}>
            Why WordAtWork?
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 4,
            '@media (max-width: 900px)': {
              gridTemplateColumns: '1fr',
            },
          }}>
            {/* WHY Card */}
            <Box sx={{ position: 'relative' }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  background: 'white',
                  borderRadius: 4,
                  overflow: 'visible',
                  position: 'relative',
                  border: '2px solid #667eea',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(255, 107, 107, 0.4)',
                    }}
                  >
                    <LightbulbIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  
                  <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Chip 
                      label="WHY" 
                      sx={{ 
                        mb: 2, 
                        bgcolor: '#667eea', 
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        borderRadius: 2,
                      }} 
                    />
                    <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
                      We Exist
                    </Typography>
                    
                    <Box sx={{ textAlign: 'left', px: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • <strong>Confident communication</strong> is the cornerstone of professional success
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • Every professional deserves the vocabulary to <strong>express ideas clearly</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • Bridge the gap between <strong>knowing and communicating</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        • Speak and write with the <strong>confidence your expertise deserves</strong>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* HOW Card */}
            <Box sx={{ position: 'relative' }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  background: 'white',
                  borderRadius: 4,
                  overflow: 'visible',
                  position: 'relative',
                  border: '2px solid #f093fb',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(240, 147, 251, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(79, 172, 254, 0.4)',
                    }}
                  >
                    <RocketLaunchIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  
                  <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Chip 
                      label="HOW" 
                      sx={{ 
                        mb: 2, 
                        bgcolor: '#f093fb', 
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        borderRadius: 2,
                      }} 
                    />
                    <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
                      We Do It
                    </Typography>
                    
                    <Box sx={{ textAlign: 'left', px: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • <strong>Contextual learning</strong> through real workplace scenarios
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • Learn from <strong>emails, presentations, meetings</strong>, and strategy discussions
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • <strong>Smart algorithm</strong> delivers relevant words when you need them
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        • Make learning <strong>seamless and immediately applicable</strong>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* WHAT Card */}
            <Box sx={{ position: 'relative' }}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  background: 'white',
                  borderRadius: 4,
                  overflow: 'visible',
                  position: 'relative',
                  border: '2px solid #764ba2',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(118, 75, 162, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(255, 216, 155, 0.4)',
                    }}
                  >
                    <AutoAwesomeIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  
                  <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Chip 
                      label="WHAT" 
                      sx={{ 
                        mb: 2, 
                        bgcolor: '#764ba2', 
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        borderRadius: 2,
                      }} 
                    />
                    <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
                      We Offer
                    </Typography>
                    
                    <Box sx={{ textAlign: 'left', px: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • Professional vocabulary tool for <strong>busy professionals</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • Master vocabulary in just <strong>5 minutes a day</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                        • Categories: <strong>Leadership, Business Strategy, Emails, Presentations, Meetings</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        • Context-rich examples with <strong>real-world usage scenarios</strong>
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Benefits Cards Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight={700} color="primary" mb={6}>
            Key Benefits
          </Typography>
          <Grid container spacing={3} sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={3} md={3} key={index} sx={{ minWidth: { xs: '280px', sm: 'auto' } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight={700}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Use Cases Section */}
        <Fade in timeout={1500}>
          <Box 
            sx={{ 
              mb: 8, 
              p: { xs: 4, md: 6 }, 
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white', 
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(240, 147, 251, 0.4)',
            }}
          >
            <Typography variant="h3" gutterBottom fontWeight={700} textAlign="center" mb={5}>
              Perfect For Every Situation
            </Typography>
            <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
              {useCases.map((useCase, index) => (
                <Grid item xs={12} md={4} key={index} sx={{ minWidth: { xs: '280px', md: 'auto' } }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box 
                      sx={{ 
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.2)',
                        mb: 2,
                      }}
                    >
                      {useCase.icon}
                    </Box>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {useCase.title}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95 }}>
                      {useCase.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* CTA Section */}
        <Box 
          sx={{ 
            textAlign: 'center',
            p: { xs: 4, md: 6 },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            color: 'white',
            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)',
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Ready to Transform Your Communication?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.95, mb: 4 }}>
            Start learning today and build your professional vocabulary
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/word-of-the-day')}
            sx={{ 
              px: 5,
              py: 2,
              bgcolor: 'white',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: '1.2rem',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'scale(1.05)',
                boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Start Learning Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
