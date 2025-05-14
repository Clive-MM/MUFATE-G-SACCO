import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Link,
    Stack,
    Paper,
    Tooltip,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/products', label: 'Products' },
        { to: '/services', label: 'Services' },
        { to: '/resources', label: 'Resources' },
        { to: '/careers', label: 'Careers' },
        { to: '/membership', label: 'Membership' },
        { to: '/faqs', label: 'FAQs' },
        { to: '/news', label: 'News' },
    ];

    return (
        <AppBar
            position="static"
            component={Paper}
            elevation={3}
            sx={{
                backgroundColor: 'background.paper',
                borderBottom: '3px solid',
                borderColor: 'primary.main',
                color: 'text.primary',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <Link component={RouterLink} to="/" sx={{ display: 'inline-block' }}>
                        <img
                            src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
                            alt="MUFATE G SACCO logo"
                            loading="lazy"
                            style={{
                                height: isMobile ? '80px' : '120px',
                                objectFit: 'contain',
                            }}
                        />
                    </Link>
                </Box>

                {isMobile ? (
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <MenuIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                ) : (
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ flex: 3, justifyContent: 'center', fontSize: '16px', fontWeight: 500 }}
                    >
                        {navLinks.map((item) => (
                            <Link
  key={item.to}
  component={RouterLink}
  to={item.to}
  underline="none"
  color={location.pathname === item.to ? 'primary.main' : 'inherit'}
  sx={{
    fontWeight: location.pathname === item.to ? 'bold' : 500,
    textShadow: location.pathname === item.to
      ? '0 0 8px rgba(100, 221, 23, 0.8)'
      : 'none',
    transform: location.pathname === item.to ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: 'primary.main',
      transform: 'translateY(-3px) scale(1.1)',
    },
  }}
>
  {item.label}
</Link>

                        ))}
                    </Stack>
                )}

                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                    {!isMobile && (
                        <Button
                            component={RouterLink}
                            to="/contact"
                            variant="contained"
                            startIcon={<PhoneIcon />}
                            sx={{
                                background: 'linear-gradient(to right, #64dd17, #76ff03)',
                                color: '#fff',
                                fontWeight: 'bold',
                                px: 3,
                                py: 1.2,
                                borderRadius: '30px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(100, 221, 23, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(to right, #76ff03, #64dd17)',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 6px 20px rgba(100, 221, 23, 0.5)',
                                },
                            }}
                        >
                            Contact Us
                        </Button>
                    )}
                </Box>
            </Toolbar>

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 250 }}>
                    {navLinks.map((item) => (
                        <ListItem
                            button
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            onClick={() => setDrawerOpen(false)}
                            selected={location.pathname === item.to}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === item.to ? 'bold' : 'normal',
                                    color: location.pathname === item.to ? 'primary.main' : 'text.primary',
                                }}
                            />
                        </ListItem>
                    ))}
                    <ListItem
                        button
                        component={RouterLink}
                        to="/contact"
                        onClick={() => setDrawerOpen(false)}
                        selected={location.pathname === '/contact'}
                    >
                        <ListItemText
                            primary="Contact Us"
                            primaryTypographyProps={{
                                fontWeight: location.pathname === '/contact' ? 'bold' : 'normal',
                                color: location.pathname === '/contact' ? 'primary.main' : 'text.primary',
                            }}
                        />
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
