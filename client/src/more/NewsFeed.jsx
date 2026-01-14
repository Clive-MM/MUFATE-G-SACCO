import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, CardActionArea, CircularProgress
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; // Replaced AccessTime
import HomeIcon from '@mui/icons-material/Home';

const BRAND = {
    gold: "#EC9B14",
    dark: "#02150F",
    cardBg: "rgba(255, 255, 255, 0.05)",
    textMuted: "rgba(244, 244, 244, 0.7)",
};

const CATEGORIES = ["Latest News", "Financial Reports", "Announcement", "Upcoming Event"];

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [contact, setContact] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        fetchPosts(CATEGORIES[activeTab]);
    }, [activeTab]);

    const fetchPosts = (category) => {
        axios.get(`https://mufate-g-sacco.onrender.com/news/posts?category=${category}`)
            .then(res => setPosts(res.data.posts || []))
            .catch(err => console.error(err));
    };

    // Helper to format date as DDMMYYYY
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleSubscribe = async () => {
        if (!contact.trim()) return;
        setIsSubmitting(true);
        setStatusMessage("");
        try {
            const res = await axios.post('https://mufate-g-sacco.onrender.com/subscribe', {
                contact: contact.trim()
            });
            setStatusMessage(res.data.message);
            setContact("");
        } catch (err) {
            setStatusMessage(err.response?.data?.message || "❌ Failed to subscribe.");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatusMessage(""), 5000);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4 }}>
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
                <Box sx={{ flex: 1 }}>
                    <Grid container spacing={3}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} md={6} key={post.PostID}>
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        whileHover={{ scale: 1.03 }} // Zooms out/expands on hover
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card sx={{
                                            maxWidth: 420, 
                                            width: '100%',// Slightly increased width
                                            bgcolor: BRAND.cardBg,
                                            borderRadius: '16px',
                                            border: `1.5px solid rgba(236, 155, 20, 0.15)`,
                                            height: 'auto', // Changed from 100% to allow expansion
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': { 
                                                borderColor: BRAND.gold,
                                                boxShadow: `0 0 20px ${BRAND.gold}44` // Glow effect
                                            }
                                        }}>
                                            <CardActionArea>
    <CardMedia
        component="img"
        /* 1. Increased height from 160 to 220 or 240 for a more vertical/prominent look */
        height="370" 
        image={post.CoverImage || 'https://via.placeholder.com/320x140'}
        sx={{ 
            /* 2. Changed 'contain' to 'cover' to fill the entire space */
            objectFit: 'cover', 
            /* 3. Removed p: 2 (padding) so the image touches the edges of the card */
            p: 0, 
            bgcolor: 'rgba(255,255,255,0.03)',
            /* 4. Optional: ensures the most important part of the image (center) is visible */
            objectPosition: 'center' 
        }}
    />
    <CardContent sx={{ p: 2.5 }}>
        {/* Title */}
        <Typography variant="h6" sx={{ 
            color: '#FFF', 
            fontWeight: 800, 
            fontSize: '1rem', 
            height: 'auto', 
            mb: 1.5 
        }}>
            {post.Title}
        </Typography>

        {/* Content */}
        <Typography variant="body2" sx={{ 
            color: BRAND.textMuted, 
            fontSize: '0.85rem', 
            lineHeight: 1.6,
            height: 'auto', 
            mb: 3 
        }}>
            {post.Content.replace(/<[^>]*>/g, '')}
        </Typography>

        {/* Footer info (Date and Home Icon) */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: BRAND.gold }}>
                <CalendarMonthIcon sx={{ fontSize: '0.9rem' }} />
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
                    {formatDate(post.DatePosted)}
                </Typography>
            </Stack>
            <HomeIcon sx={{ fontSize: '1.1rem', color: BRAND.gold }} />
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

                <Box sx={{
                    width: '260px',
                    minWidth: '260px',
                    position: 'sticky',
                    top: 20,
                    alignSelf: 'stretch'
                }}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '16px',
                        bgcolor: BRAND.gold,
                        color: BRAND.dark,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '480px',
                        boxShadow: '0 10px 30px rgba(236, 155, 20, 0.2)'
                    }}>
                        <Box>
                            <Typography variant="overline" sx={{ fontWeight: 900, letterSpacing: 1.5, color: 'rgba(2, 21, 15, 0.7)' }}>
                                STAY UPDATED
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 900, mt: 1, lineHeight: 1.1, fontSize: '1.4rem' }}>
                                NEWSLETTER <br /> SUBSCRIPTION
                            </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.5 }}>
                            Join our community to receive the latest financial reports, SACCO announcements, and exclusive member tips.
                        </Typography>

                        <Box>
                            <TextField
                                fullWidth
                                placeholder="Email or Phone"
                                variant="standard"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                disabled={isSubmitting}
                                sx={{
                                    mb: 1,
                                    '& .MuiInput-underline:before': { borderBottomColor: BRAND.dark },
                                    '& .MuiInput-underline:after': { borderBottomColor: BRAND.dark },
                                    '& input': { fontWeight: 700, color: BRAND.dark }
                                }}
                            />
                            <Typography sx={{ 
                                fontSize: '0.7rem', 
                                height: '20px', 
                                fontWeight: 800, 
                                mb: 1, 
                                color: statusMessage.includes('❌') ? 'firebrick' : BRAND.dark 
                            }}>
                                {statusMessage}
                            </Typography>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleSubscribe}
                                disabled={isSubmitting || !contact}
                                sx={{
                                    bgcolor: BRAND.dark,
                                    color: BRAND.gold,
                                    fontWeight: 900,
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#010a07' },
                                    '&.Mui-disabled': { bgcolor: 'rgba(2, 21, 15, 0.5)' }
                                }}
                            >
                                {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "SUBSCRIBE NOW"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ py: 6, textAlign: 'center', mt: 4 }}>
                <Typography
                    sx={{
                        color: BRAND.gold,
                        letterSpacing: '3px',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.9rem', md: '1.35rem' }
                    }}
                >
                    GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
                </Typography>
            </Box>
        </Container>
    );
};

export default NewsFeed;