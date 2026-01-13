import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent,
    Tabs, Tab, Stack, TextField, Button, IconButton
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';

const BRAND = {
    gold: "#EC9B14",
    dark: "#02150F",
    cardBg: "rgba(2, 21, 15, 0.6)",
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
            <Grid container spacing={4}>
                {/* Main Content Area */}
                <Grid item xs={12} lg={9}>
                    {/* Tabs Navigation */}
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-start' }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            variant="scrollable"
                            sx={{
                                '& .MuiTabs-indicator': { display: 'none' }, // Remove default line
                                '& .MuiTab-root': {
                                    color: '#FFF',
                                    bgcolor: 'transparent',
                                    border: '1px solid #FFF',
                                    mr: 2,
                                    borderRadius: '4px',
                                    fontWeight: 700,
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

                    {/* Posts Grid */}
                    <Grid container spacing={3}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} md={6} key={post.PostID}>
                                    <Card sx={{
                                        bgcolor: BRAND.cardBg,
                                        borderRadius: '20px',
                                        border: `2px solid ${BRAND.gold}66`,
                                        position: 'relative',
                                        height: '100%'
                                    }}>
                                        <IconButton sx={{ position: 'absolute', top: 10, right: 10, color: BRAND.gold }}>
                                            <HomeIcon />
                                        </IconButton>
                                        <CardContent sx={{ p: 4 }}>
                                            <Box sx={{ bgcolor: BRAND.gold, color: BRAND.dark, px: 1, py: 0.5, display: 'inline-block', fontWeight: 900, mb: 2, borderRadius: '4px', fontSize: '0.7rem' }}>
                                                {post.Category.toUpperCase()}
                                            </Box>
                                            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 700, mb: 2 }}>
                                                {post.Title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: BRAND.textMuted, mb: 3 }}>
                                                {post.Content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={1} sx={{ color: BRAND.gold }}>
                                                <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                                                <Typography variant="caption">3 min read</Typography>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Grid>

                {/* Sidebar (Newsletter) */}
                <Grid item xs={12} lg={3}>
                    <Box sx={{
                        p: 4,
                        borderRadius: '15px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.02)'
                    }}>
                        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, mb: 1 }}>NEWSLETTER</Typography>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 900, mb: 2 }}>SUBSCRIPTION</Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, mb: 3 }}>
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
                                '& .MuiOutlinedInput-root': { height: '45px' }
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: BRAND.gold,
                                color: BRAND.dark,
                                fontWeight: 900,
                                py: 1.5,
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