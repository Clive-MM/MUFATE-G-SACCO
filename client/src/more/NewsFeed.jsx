import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, CardActionArea
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const BRAND = {
    gold: "#EC9B14",
    dark: "#02150F",
    cardBg: "rgba(255, 255, 255, 0.05)",
    textMuted: "rgba(244, 244, 244, 0.8)",
};

const CATEGORIES = ["Latest News", "Financial Reports", "Announcements", "Calendar"];

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        fetchPosts(CATEGORIES[activeTab]);
    }, [activeTab]);

    const fetchPosts = (category) => {
        axios.get(`https://mufate-g-sacco.onrender.com/posts?category=${category}`)
            .then(res => setPosts(res.data.posts || []))
            .catch(err => console.error(err));
    };

    // Helper to format date as DDMMYYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "01012024";
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = date.getFullYear();
        return `${d}${m}${y}`;
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4 }}>
            {/* Category Tabs */}
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
                            '&.Mui-selected': { bgcolor: BRAND.gold, color: BRAND.dark, borderColor: BRAND.gold }
                        }
                    }}
                >
                    {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                </Tabs>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>

                {/* LEFT COLUMN: Posts */}
                <Box sx={{ flex: 1 }}>
                    <Grid container spacing={3}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} md={6} key={post.PostID}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <Card sx={{
                                            maxWidth: 400, // Slightly wider to feel more "Full"
                                            bgcolor: BRAND.cardBg,
                                            borderRadius: '12px',
                                            border: `1.5px solid rgba(236, 155, 20, 0.1)`,
                                            height: '100%',
                                            overflow: 'hidden',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            '&:hover': {
                                                borderColor: BRAND.gold,
                                                boxShadow: `0px 0px 20px 2px rgba(236, 155, 20, 0.25)`, // Glow Effect
                                            }
                                        }}>
                                            <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                {/* Image Container with Zoom-Out Animation */}
                                                <Box sx={{ width: '100%', overflow: 'hidden', height: 180 }}>
                                                    <motion.div
                                                        whileHover={{ scale: 1 }}
                                                        initial={{ scale: 1.15 }}
                                                        transition={{ duration: 0.6 }}
                                                        style={{ width: '100%', height: '100%' }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            height="100%"
                                                            image={post.CoverImage || 'https://via.placeholder.com/400x180'}
                                                            sx={{
                                                                objectFit: 'cover', // Fills the whole landscape area
                                                            }}
                                                        />
                                                    </motion.div>
                                                </Box>

                                                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                                    {/* Full Title - No cropping */}
                                                    <Typography variant="h6" sx={{
                                                        color: '#FFF',
                                                        fontWeight: 800,
                                                        fontSize: '1.1rem',
                                                        lineHeight: 1.3,
                                                        mb: 2
                                                    }}>
                                                        {post.Title}
                                                    </Typography>

                                                    {/* Full Content - No cropping */}
                                                    <Typography variant="body2" sx={{
                                                        color: BRAND.textMuted,
                                                        fontSize: '0.9rem',
                                                        lineHeight: 1.6,
                                                        mb: 3
                                                    }}>
                                                        {post.Content.replace(/<[^>]*>/g, '')}
                                                    </Typography>

                                                    {/* Footer: Date Only */}
                                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: BRAND.gold }}>
                                                        <CalendarTodayIcon sx={{ fontSize: '1rem' }} />
                                                        <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                                                            {formatDate(post.CreatedAt || new Date())}
                                                        </Typography>
                                                    </Stack>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Box>

                {/* RIGHT COLUMN: Gold Newsletter Pillar */}
                <Box sx={{ width: '280px', minWidth: '280px', position: 'sticky', top: 20 }}>
                    <Box sx={{
                        p: 3.5,
                        borderRadius: '16px',
                        bgcolor: BRAND.gold,
                        color: BRAND.dark,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '520px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                    }}>
                        <Box>
                            <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 2, opacity: 0.8 }}>
                                STAY INFORMED
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 900, mt: 1, lineHeight: 1, fontSize: '1.8rem' }}>
                                JOIN OUR <br /> FEED
                            </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4 }}>
                            Get instant updates on financial policies and Sacco events directly in your inbox.
                        </Typography>

                        <Box>
                            <TextField
                                fullWidth
                                placeholder="Enter Email or Phone"
                                variant="standard"
                                sx={{
                                    mb: 4,
                                    '& .MuiInput-underline:before': { borderBottomColor: BRAND.dark },
                                    '& input': { fontWeight: 800, color: BRAND.dark }
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: BRAND.dark,
                                    color: BRAND.gold,
                                    fontWeight: 900,
                                    py: 2,
                                    fontSize: '0.9rem',
                                    borderRadius: '8px',
                                    '&:hover': { bgcolor: '#000' }
                                }}
                            >
                                SUBSCRIBE NOW
                            </Button>
                        </Box>

                        <Typography variant="caption" sx={{ textAlign: 'center', fontWeight: 800, opacity: 0.6 }}>
                            OFFICIAL MUFATE-G COMMUNICATION
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Container>
    );
};

export default NewsFeed;