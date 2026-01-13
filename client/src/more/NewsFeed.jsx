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
            {/* Main Flex Layout: Ensures Sidebar and Content are side-by-side */}
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>

                {/* LEFT COLUMN: Posts (Flexible Width) */}
                <Box sx={{ flex: 1 }}>

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
                                    mr: 1.5,
                                    borderRadius: '4px',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    '&.Mui-selected': { bgcolor: BRAND.gold, color: BRAND.dark, borderColor: BRAND.gold }
                                }
                            }}
                        >
                            {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                        </Tabs>
                    </Box>

                    {/* Post Grid: Strictly 2 Cards Per Row */}
                    <Grid container spacing={3}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} md={6} key={post.PostID}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <Card sx={{
                                            maxWidth: 320, // Reduced to 3/4 of initial size to ensure sidebar fit
                                            bgcolor: BRAND.cardBg,
                                            borderRadius: '12px',
                                            border: `1px solid rgba(236, 155, 20, 0.2)`,
                                            height: '100%',
                                            transition: '0.3s',
                                            '&:hover': { borderColor: BRAND.gold, transform: 'translateY(-4px)' }
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={post.CoverImage || 'https://via.placeholder.com/320x140'}
                                                    alt={post.Title}
                                                    sx={{
                                                        objectFit: 'contain',
                                                        p: 2,
                                                        bgcolor: 'rgba(0,0,0,0.2)'
                                                    }}
                                                />
                                                <CardContent sx={{ p: 2 }}>
                                                    <Typography gutterBottom variant="h6" sx={{
                                                        color: '#FFF',
                                                        fontWeight: 800,
                                                        fontSize: '0.95rem',
                                                        lineHeight: 1.2,
                                                        height: '2.4em', // Fixed height for 2 lines
                                                        overflow: 'hidden'
                                                    }}>
                                                        {post.Title}
                                                    </Typography>

                                                    <Typography variant="body2" sx={{
                                                        color: BRAND.textMuted,
                                                        fontSize: '0.75rem',
                                                        height: '3em', // Fixed height for 3 lines
                                                        overflow: 'hidden',
                                                        mb: 2
                                                    }}>
                                                        {post.Content.replace(/<[^>]*>/g, '')}
                                                    </Typography>

                                                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ color: BRAND.gold }}>
                                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                                            <AccessTimeIcon sx={{ fontSize: '0.8rem' }} />
                                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>3 min read</Typography>
                                                        </Stack>
                                                        <HomeIcon sx={{ fontSize: '1rem' }} />
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

                {/* RIGHT COLUMN: Narrow Newsletter (Fixed Width) */}
                <Box sx={{
                    width: '260px', // Narrowed width to ensure it fits the margin
                    minWidth: '260px',
                    position: 'sticky',
                    top: 40,
                    zIndex: 10
                }}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.02)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '420px' // Makes it a long vertical rectangle
                    }}>
                        <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 2 }}>
                            NEWSLETTER
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#FFF', fontWeight: 900, mb: 2, fontSize: '1.1rem' }}>
                            SUBSCRIPTION
                        </Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, mb: 4, fontSize: '0.75rem', lineHeight: 1.6 }}>
                            Stay updated with our latest financial tips, official SACCO notices, and upcoming community events.
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
                                '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                bgcolor: BRAND.gold,
                                color: BRAND.dark,
                                fontWeight: 900,
                                mt: 'auto', // Pushes button to bottom of the tall rectangle
                                py: 1.2,
                                fontSize: '0.8rem',
                                '&:hover': { bgcolor: '#d48a12' }
                            }}
                        >
                            SUBSCRIBE NOW
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Container>
    );
};

export default NewsFeed;