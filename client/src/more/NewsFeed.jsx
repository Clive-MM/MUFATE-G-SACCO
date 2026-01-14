import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, CardActionArea, CircularProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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

    // --- NEW STATE FOR FUNCTIONALITY ---
    const [contact, setContact] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        fetchPosts(CATEGORIES[activeTab]);
    }, [activeTab]);

    const fetchPosts = (category) => {
        axios.get(`https://mufate-g-sacco.onrender.com/posts?category=${category}`)
            .then(res => setPosts(res.data.posts || []))
            .catch(err => console.error(err));
    };

    // --- NEW HANDLER FOR SUBSCRIPTION ---
    const handleSubscribe = async () => {
        if (!contact.trim()) return;
        setIsSubmitting(true);
        setStatusMessage("");

        try {
            const res = await axios.post('https://mufate-g-sacco.onrender.com/subscribe', {
                contact: contact.trim()
            });
            setStatusMessage(res.data.message);
            setContact(""); // Clear field on success
        } catch (err) {
            setStatusMessage(err.response?.data?.message || "❌ Failed to subscribe.");
        } finally {
            setIsSubmitting(false);
            // Clear status message after 5 seconds
            setTimeout(() => setStatusMessage(""), 5000);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4 }}>
            {/* Category Tabs at the Top */}
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

            {/* Content Area */}
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>

                {/* LEFT COLUMN: 2 Cards per Row */}
                <Box sx={{ flex: 1 }}>
                    <Grid container spacing={3}>
                        <AnimatePresence mode="wait">
                            {posts.map((post) => (
                                <Grid item xs={12} md={6} key={post.PostID}>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <Card sx={{
                                            maxWidth: 320,
                                            bgcolor: BRAND.cardBg,
                                            borderRadius: '16px',
                                            border: `1.5px solid rgba(236, 155, 20, 0.15)`,
                                            height: '100%',
                                            '&:hover': { borderColor: BRAND.gold }
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={post.CoverImage || 'https://via.placeholder.com/320x140'}
                                                    sx={{ objectFit: 'contain', p: 2, bgcolor: 'rgba(255,255,255,0.03)' }}
                                                />
                                                <CardContent sx={{ p: 2.5 }}>
                                                    <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.95rem', height: '2.4em', overflow: 'hidden', mb: 1 }}>
                                                        {post.Title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.75rem', height: '3em', overflow: 'hidden', mb: 2 }}>
                                                        {post.Content.replace(/<[^>]*>/g, '')}
                                                    </Typography>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: BRAND.gold }}>
                                                            <AccessTimeIcon sx={{ fontSize: '0.8rem' }} />
                                                            <Typography variant="caption" sx={{ fontWeight: 700 }}>3 min read</Typography>
                                                        </Stack>
                                                        <HomeIcon sx={{ fontSize: '1rem', color: BRAND.gold }} />
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

                {/* RIGHT COLUMN: The Full Gold Newsletter Pillar */}
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
                            
                            {/* Notification Message */}
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

            {/* FOOTER */}
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