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
    cardBg: "rgba(255, 255, 255, 0.03)",
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
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4 }}>
            {/* Parent Grid to keep Content and Sidebar side-by-side */}
            <Grid container spacing={3}>

                {/* LEFT SIDE: POSTS (75% width on desktop) */}
                <Grid item xs={12} md={8} lg={9}>

                    {/* Category Tabs */}
                    <Box sx={{ mb: 3 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            variant="scrollable"
                            sx={{
                                '& .MuiTabs-indicator': { display: 'none' },
                                '& .MuiTab-root': {
                                    color: '#FFF',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    mr: 1,
                                    borderRadius: '4px',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    minHeight: '36px',
                                    '&.Mui-selected': { bgcolor: BRAND.gold, color: BRAND.dark, borderColor: BRAND.gold }
                                }
                            }}
                        >
                            {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                        </Tabs>
                    </Box>

                    {/* Posts Small Square Grid */}
                    <Grid container spacing={2}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} sm={6} key={post.PostID}>
                                    <Card sx={{
                                        bgcolor: BRAND.cardBg,
                                        borderRadius: '12px',
                                        border: `1px solid rgba(236, 155, 20, 0.3)`,
                                        display: 'flex', // Horizontal layout for smaller cards
                                        height: '160px', // Fixed height for uniformity
                                        overflow: 'hidden',
                                        '&:hover': { borderColor: BRAND.gold }
                                    }}>
                                        {/* Small Square Image - No Cropping */}
                                        <Box sx={{ width: '140px', minWidth: '140px', p: 1, bgcolor: 'rgba(0,0,0,0.2)' }}>
                                            <CardMedia
                                                component="img"
                                                image={post.CoverImage || 'https://via.placeholder.com/150'}
                                                alt={post.Title}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain', // Entire image fits inside
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </Box>

                                        {/* Compact Content */}
                                        <CardContent sx={{ p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{
                                                    color: '#FFF',
                                                    fontWeight: 800,
                                                    fontSize: '0.85rem',
                                                    lineHeight: 1.2,
                                                    mb: 0.5,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {post.Title}
                                                </Typography>
                                                <Typography variant="caption" sx={{
                                                    color: BRAND.textMuted,
                                                    fontSize: '0.7rem',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {post.Content.replace(/<[^>]*>/g, '')}
                                                </Typography>
                                            </Box>

                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: BRAND.gold }}>
                                                    <AccessTimeIcon sx={{ fontSize: '0.8rem' }} />
                                                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 600 }}>3 min read</Typography>
                                                </Stack>
                                                <HomeIcon sx={{ color: BRAND.gold, fontSize: '1rem' }} />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Grid>

                {/* RIGHT SIDE: SIDEBAR (25% width on desktop) */}
                <Grid item xs={12} md={4} lg={3}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        position: 'sticky', // Keeps it visible while scrolling posts
                        top: '20px'
                    }}>
                        <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 2 }}>Newsletter</Typography>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 900, fontSize: '1.2rem', mb: 1 }}>SUBSCRIPTION</Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.75rem', mb: 3 }}>
                            Stay updated with our latest financial tips and official notices.
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Email or Phone"
                            sx={{
                                bgcolor: '#FFF',
                                borderRadius: '4px',
                                mb: 2,
                                '& .MuiOutlinedInput-root': { height: '40px', fontSize: '0.8rem' }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: BRAND.gold,
                                color: BRAND.dark,
                                fontWeight: 900,
                                fontSize: '0.8rem',
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