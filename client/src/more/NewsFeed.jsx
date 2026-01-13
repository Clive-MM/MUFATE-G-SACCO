import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, IconButton
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';

const BRAND = {
    gold: "#EC9B14",
    dark: "#02150F",
    cardBg: "rgba(255, 255, 255, 0.03)", // Subtle dark glass
    textMuted: "rgba(244, 244, 244, 0.7)",
};

const CATEGORIES = ["Latest News", "Financial Reports", "Announcements", "Calendar"];

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        fetchPosts(CATEGORIES[activeTab]);
    }, [activeTab]);

    const fetchPosts = (category) => {
        setLoading(true);
        axios.get(`https://mufate-g-sacco.onrender.com/posts?category=${category}`)
            .then(res => {
                setPosts(res.data.posts || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 10 }}>
            <Grid container spacing={4} alignItems="flex-start">

                {/* Main Content Area: Now using md=8 or 9 to keep sidebar on the right */}
                <Grid item xs={12} md={8} lg={9}>

                    {/* Tabs Navigation */}
                    <Box sx={{ mb: 4 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            variant="scrollable"
                            sx={{
                                '& .MuiTabs-indicator': { display: 'none' },
                                '& .MuiTab-root': {
                                    color: '#FFF',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    mr: 1.5,
                                    mb: 1,
                                    borderRadius: '4px',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    minWidth: 'auto',
                                    transition: '0.3s',
                                    '&.Mui-selected': {
                                        bgcolor: BRAND.gold,
                                        color: BRAND.dark,
                                        borderColor: BRAND.gold
                                    }
                                }
                            }}
                        >
                            {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                        </Tabs>
                    </Box>

                    {/* Posts Grid: Using md=4 to create 3 cards per row in the main area */}
                    <Grid container spacing={2}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} sm={6} md={4} key={post.PostID}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card sx={{
                                            bgcolor: BRAND.cardBg,
                                            borderRadius: '12px',
                                            border: `1px solid rgba(236, 155, 20, 0.2)`,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            '&:hover': { borderColor: BRAND.gold }
                                        }}>
                                            {/* Square Image container with objectFit: contain to avoid cropping */}
                                            <Box sx={{ p: 1, width: '100%', aspectRatio: '1/1', overflow: 'hidden' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={post.CoverImage || 'https://via.placeholder.com/300'}
                                                    alt={post.Title}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain', // Fits the image without cropping
                                                        borderRadius: '8px',
                                                        bgcolor: 'rgba(0,0,0,0.2)'
                                                    }}
                                                />
                                            </Box>

                                            <CardContent sx={{ p: 2, flexGrow: 1 }}>
                                                <Typography variant="subtitle1" sx={{
                                                    color: '#FFF',
                                                    fontWeight: 700,
                                                    lineHeight: 1.3,
                                                    mb: 1,
                                                    fontSize: '0.95rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {post.Title}
                                                </Typography>

                                                <Typography variant="body2" sx={{
                                                    color: BRAND.textMuted,
                                                    fontSize: '0.8rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    mb: 2
                                                }}>
                                                    {post.Content.replace(/<[^>]*>/g, '')}
                                                </Typography>

                                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: BRAND.gold }}>
                                                        <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                                                        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>3 min read</Typography>
                                                    </Stack>
                                                    <IconButton size="small" sx={{ color: BRAND.gold, p: 0 }}>
                                                        <HomeIcon sx={{ fontSize: '1.1rem' }} />
                                                    </IconButton>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Grid>

                {/* Sidebar: Now properly aligned on the right for desktop (lg=3) */}
                <Grid item xs={12} md={4} lg={3} sx={{ position: { md: 'sticky' }, top: 20 }}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.03)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.9rem', mb: 0.5 }}>NEWSLETTER</Typography>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 900, fontSize: '1.2rem', mb: 2 }}>SUBSCRIPTION</Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, mb: 3, fontSize: '0.8rem' }}>
                            Stay updated with our latest financial tips and official notices.
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Email or Phone"
                            variant="outlined"
                            sx={{
                                bgcolor: '#FFF',
                                borderRadius: '4px',
                                mb: 2,
                                '& .MuiOutlinedInput-root': { height: '40px', fontSize: '0.85rem' }
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: BRAND.gold,
                                color: BRAND.dark,
                                fontWeight: 900,
                                fontSize: '0.85rem',
                                py: 1,
                                '&:hover': { bgcolor: '#d48a12' }
                            }}
                        >
                            SUBSCRIBE
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    );
};

export default NewsFeed;