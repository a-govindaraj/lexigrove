import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TodayIcon from '@mui/icons-material/Today';
import CategoryIcon from '@mui/icons-material/Category';
import QuizIcon from '@mui/icons-material/Quiz';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Logo from './Logo';
import { APP_NAME, BRAND_GRADIENT } from '../config/brand';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Word of the Day', icon: <TodayIcon />, path: '/word-of-the-day' },
  { text: 'Browse Words', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Quiz', icon: <QuizIcon />, path: '/quiz' },
  { text: 'My Progress', icon: <HistoryIcon />, path: '/history' },
  { text: 'Subscribe', icon: <NotificationsActiveIcon />, path: '/subscribe' },
];

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const mobileDrawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          p: 2,
          background: BRAND_GRADIENT,
          color: 'white',
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {APP_NAME}
        </Typography>
      </Box>
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ px: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  background: BRAND_GRADIENT,
                  color: 'white',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: location.pathname === item.path ? 'white' : 'primary.main',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: BRAND_GRADIENT,
          boxShadow: '0 4px 20px rgba(31, 77, 56, 0.25)',
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Logo sx={{ fontSize: 56, mr: 1.5 }} />
            <Typography variant="h6" component="div" fontWeight={700} sx={{ mr: 4 }}>
              {APP_NAME}
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    px: 2,
                    py: 1,
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundColor: location.pathname === item.path 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {mobileDrawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          background: BRAND_GRADIENT,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            onClick={() => navigate('/about')}
            sx={{ 
              color: 'white', 
              fontSize: '0.875rem',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            About
          </Button>
          <Button
            onClick={() => navigate('/contact')}
            sx={{ 
              color: 'white', 
              fontSize: '0.875rem',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            Contact
          </Button>
          <Button
            onClick={() => navigate('/privacy')}
            sx={{ 
              color: 'white', 
              fontSize: '0.875rem',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            Privacy Policy
          </Button>
          <Button
            onClick={() => navigate('/terms')}
            sx={{ 
              color: 'white', 
              fontSize: '0.875rem',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            Terms of Service
          </Button>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;
