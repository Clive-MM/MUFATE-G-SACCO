import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, CardActionArea
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const BRAND = {
    gold: "#EC9B14",
    dark: "#02150F",
    cardBg: "rgba(255, 255, 255, 0.05)",
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
        <Container maxWidth="xl" sx={{ pb: 10, mt: 2 }}>
            <Grid container spacing={2}>

                {/* LEFT COLUMN: Post Grid (Takes 9 units out of 12) */}
                <Grid item xs={12} lg={9}>

                    {/* 1. Category Tabs */}
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
                                    mr: 1, borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem',
                                    '&.Mui-selected': { bgcolor: BRAND.gold, color: BRAND.dark }
                                }
                            }}
                        >
                            {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                        </Tabs>
                    </Box>

                    {/* 2. Small Card Grid (3 cards per row on desktop) */}
                    <Grid container spacing={2}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} sm={6} md={4} key={post.PostID}>
                                    <Card sx={{
                                        maxWidth: 345, // EXACT size from your example
                                        height: '100%',
                                        bgcolor: BRAND.cardBg,
                                        border: `1px solid rgba(236, 155, 20, 0.2)`,
                                        borderRadius: '8px',
                                        transition: '0.3s',
                                        '&:hover': { borderColor: BRAND.gold }
                                    }}>
                                        <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <CardMedia
                                                component="img"
                                                height="140" // EXACT size from your example
                                                image={post.CoverImage || 'https://via.placeholder.com/345x140'}
                                                alt={post.Title}
                                                sx={{ objectFit: 'contain', p: 1, bgcolor: 'rgba(0,0,0,0.2)' }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" sx={{ color: '#FFF', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
                                                    {post.Title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.8rem', mb: 2 }}>
                                                    {post.Content.replace(/<[^>]*>/g, '').substring(0, 80)}...
                                                </Typography>
                                                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: BRAND.gold }}>
                                                    <AccessTimeIcon sx={{ fontSize: '0.8rem' }} />
                                                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>3 min read</Typography>
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Grid>

                {/* RIGHT COLUMN: Sidebar (Takes 3 units out of 12) */}
                <Grid item xs={12} lg={3}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        position: 'sticky',
                        top: 20
                    }}>
                        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.9rem' }}>NEWSLETTER</Typography>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 900, fontSize: '1.2rem', mb: 2 }}>SUBSCRIPTION</Typography>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Email or Phone"
                            sx={{ bgcolor: '#FFF', borderRadius: '4px', mb: 2 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900 }}
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