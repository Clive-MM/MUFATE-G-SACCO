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
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4 }}>
            <Grid container spacing={3} justifyContent="space-between">

                {/* LEFT AREA: 2 Cards Per Row */}
                <Grid item xs={12} lg={8.5}>
                    {/* Tabs */}
                    <Box sx={{ mb: 4 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            variant="scrollable"
                            sx={{
                                '& .MuiTabs-indicator': { display: 'none' },
                                '& .MuiTab-root': {
                                    color: '#FFF', border: '1px solid rgba(255,255,255,0.2)',
                                    mr: 1.5, borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem',
                                    '&.Mui-selected': { bgcolor: BRAND.gold, color: BRAND.dark }
                                }
                            }}
                        >
                            {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                        </Tabs>
                    </Box>

                    {/* Grid for 2 Cards Per Row */}
                    <Grid container spacing={3}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} md={6} key={post.PostID}> {/* Changed to 6 for 2 per row */}
                                    <Card sx={{
                                        maxWidth: 345, // Keeping your preferred size
                                        bgcolor: BRAND.cardBg,
                                        borderRadius: '12px',
                                        border: `1px solid rgba(236, 155, 20, 0.2)`,
                                        height: '100%',
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={post.CoverImage || 'https://via.placeholder.com/345x160'}
                                                alt={post.Title}
                                                sx={{ objectFit: 'contain', p: 2, bgcolor: 'rgba(0,0,0,0.2)' }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" sx={{ color: '#FFF', fontWeight: 800, fontSize: '1rem', mb: 1 }}>
                                                    {post.Title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.8rem', mb: 2 }}>
                                                    {post.Content.replace(/<[^>]*>/g, '').substring(0, 80)}...
                                                </Typography>
                                                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: BRAND.gold }}>
                                                    <AccessTimeIcon sx={{ fontSize: '0.9rem' }} />
                                                    <Typography variant="caption">3 min read</Typography>
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Grid>

                {/* RIGHT AREA: Narrow Rectangular Sidebar */}
                <Grid item xs={12} lg={3}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        position: 'sticky',
                        top: 40,
                        maxWidth: '280px', // Forces it to be a narrow rectangle
                        ml: 'auto', // Pushes it to the far right margin
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '400px' // Makes it vertically long/rectangular
                    }}>
                        <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 2 }}>
                            NEWSLETTER
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 900, mb: 1, fontSize: '1.2rem' }}>
                            SUBSCRIPTION
                        </Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, mb: 4, fontSize: '0.75rem' }}>
                            Stay updated with our latest financial tips and official notices.
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Email or Phone"
                            variant="outlined"
                            size="small"
                            sx={{
                                bgcolor: '#FFF', borderRadius: '4px', mb: 2,
                                '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900,
                                mt: 'auto', // Pushes button to bottom of the rectangle
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