import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, CardActionArea
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';

const BRAND = {
    gold: "#EC9B14",
    dark: "#02150F",
    cardBg: "rgba(255, 255, 255, 0.05)",
    textMuted: "rgba(244, 244, 244, 0.7)",
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

    return (
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4 }}>
            {/* Flex row ensures Sidebar and Content share the same horizontal plane */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>

                {/* LEFT COLUMN: Main Feed (Takes up available space) */}
                <Box sx={{ flex: 1, minWidth: 0 }}>

                    {/* Category Tabs */}
                    <Box sx={{ mb: 4 }}>
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

                    {/* Post Grid: 3 Cards Per Row */}
                    <Grid container spacing={2}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} sm={6} md={4} key={post.PostID}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card sx={{
                                            maxWidth: 260, // 3/4 Size of the initial design
                                            margin: '0 auto', // Centers card in its grid slot
                                            bgcolor: BRAND.cardBg,
                                            borderRadius: '10px',
                                            border: `1px solid rgba(236, 155, 20, 0.2)`,
                                            height: '100%',
                                            '&:hover': { borderColor: BRAND.gold }
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="120" // Shorter height for compact look
                                                    image={post.CoverImage || 'https://via.placeholder.com/260x120'}
                                                    alt={post.Title}
                                                    sx={{
                                                        objectFit: 'contain',
                                                        p: 1.5,
                                                        bgcolor: 'rgba(0,0,0,0.2)'
                                                    }}
                                                />
                                                <CardContent sx={{ p: 1.5 }}>
                                                    <Typography variant="subtitle2" sx={{
                                                        color: '#FFF',
                                                        fontWeight: 800,
                                                        fontSize: '0.85rem',
                                                        lineHeight: 1.2,
                                                        mb: 1,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        height: '2.4em'
                                                    }}>
                                                        {post.Title}
                                                    </Typography>

                                                    <Typography variant="caption" sx={{
                                                        color: BRAND.textMuted,
                                                        fontSize: '0.7rem',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        mb: 2,
                                                        height: '2.8em'
                                                    }}>
                                                        {post.Content.replace(/<[^>]*>/g, '')}
                                                    </Typography>

                                                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ color: BRAND.gold }}>
                                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                                            <AccessTimeIcon sx={{ fontSize: '0.75rem' }} />
                                                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.65rem' }}>3 min read</Typography>
                                                        </Stack>
                                                        <HomeIcon sx={{ fontSize: '0.9rem' }} />
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

                {/* RIGHT COLUMN: Ultra-Narrow Sidebar (Fixed Width) */}
                <Box sx={{
                    width: '240px', // Narrowest width to ensure it stays on the far right
                    minWidth: '240px',
                    position: 'sticky',
                    top: 24,
                    zIndex: 10
                }}>
                    <Box sx={{
                        p: 2.5,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(8px)',
                        minHeight: '400px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 1, fontSize: '0.65rem' }}>
                            NEWSLETTER
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 900, mb: 1.5, fontSize: '1rem' }}>
                            SUBSCRIPTION
                        </Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, mb: 3, fontSize: '0.7rem', lineHeight: 1.5 }}>
                            Stay updated with our latest financial tips and notices.
                        </Typography>

                        <TextField
                            fullWidth
                            placeholder="Email or Phone"
                            variant="outlined"
                            size="small"
                            sx={{
                                bgcolor: '#FFF',
                                borderRadius: '4px',
                                mb: 2,
                                '& .MuiOutlinedInput-root': { fontSize: '0.75rem', height: '38px' }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: BRAND.gold,
                                color: BRAND.dark,
                                fontWeight: 900,
                                fontSize: '0.75rem',
                                py: 1,
                                mt: 'auto',
                                '&:hover': { bgcolor: '#d48a12' }
                            }}
                        >
                            SUBSCRIBE
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Container>
    );
};

export default NewsFeed;