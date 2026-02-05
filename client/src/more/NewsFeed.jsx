import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Typography, Container, Grid, Card, CardContent, CardMedia,
    Tabs, Tab, Stack, TextField, Button, CardActionArea, CircularProgress
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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

    const PostCard = ({ post }) => {
    const [expanded, setExpanded] = useState(false);
    
    // Strict check for the Financial Reports tab (Index 1)
    const isReport = activeTab === 1;

    return (
        <Grid item xs={12} sm={6} xl={4}>
            <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <Card sx={{
                    maxWidth: { xs: '100%', md: 420 },
                    width: '100%',
                    bgcolor: BRAND.cardBg,
                    borderRadius: '16px',
                    border: `1.5px solid rgba(236, 155, 20, 0.15)`,
                    height: 'auto',
                    mx: 'auto',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        borderColor: BRAND.gold,
                        boxShadow: `0 0 20px ${BRAND.gold}44`
                    }
                }}>
                    <CardActionArea 
                        onClick={() => !isReport && setExpanded(!expanded)} 
                        sx={{ alignItems: 'flex-start' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                height: { xs: 300, sm: 280, md: 370 },
                                objectFit: 'cover',
                                p: 0,
                                bgcolor: 'rgba(255,255,255,0.03)',
                                objectPosition: 'center'
                            }}
                            image={post.CoverImage || 'https://via.placeholder.com/320x140'}
                        />
                        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                            <Typography variant="h6" sx={{
                                color: '#FFF',
                                fontWeight: 800,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                mb: 1.5
                            }}>
                                {post.Title}
                            </Typography>

                            <Typography variant="body2" sx={{
                                color: BRAND.textMuted,
                                fontSize: '0.85rem',
                                lineHeight: 1.6,
                                mb: 1,
                                display: (expanded || isReport) ? 'block' : '-webkit-box',
                                WebkitLineClamp: expanded ? 'none' : 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            }}>
                                {post.Content.replace(/<[^>]*>/g, '')}
                            </Typography>

                            {/* Conditional Download Functionality for Reports */}
                            {isReport ? (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    href={post.CoverImage} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                    sx={{
                                        bgcolor: BRAND.gold,
                                        color: BRAND.dark,
                                        fontWeight: 900,
                                        my: 2,
                                        '&:hover': { bgcolor: '#FFF' },
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Download Report
                                </Button>
                            ) : (
                                <Typography sx={{ 
                                    color: BRAND.gold, 
                                    fontSize: '0.75rem', 
                                    fontWeight: 800, 
                                    mb: 3,
                                    cursor: 'pointer',
                                    textTransform: 'uppercase'
                                }}>
                                    {expanded ? "Show Less ▲" : "Read More ▼"}
                                </Typography>
                            )}

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
    );
};

    return (
        <Container maxWidth="xl" sx={{ pb: 10, mt: 4, px: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        '& .MuiTabs-indicator': { display: 'none' },
                        '& .MuiTab-root': {
                            color: '#FFF', border: '1px solid rgba(255,255,255,0.2)',
                            mr: 1.5, borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem',
                            minHeight: '40px',
                            '&.Mui-selected': { bgcolor: BRAND.gold, color: BRAND.dark, borderColor: BRAND.gold }
                        }
                    }}
                >
                    {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                </Tabs>
            </Box>

            {/* Layout Change: Column on mobile (xs), Row on Desktop (lg) */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Grid container spacing={3}>
                        <AnimatePresence mode="popLayout">
                            {posts.map((post) => (
                                <PostCard key={post.PostID} post={post} />
                            ))}
                        </AnimatePresence>
                    </Grid>
                </Box>

                {/* Sidebar: Sticky on desktop, static full-width on mobile */}
                <Box sx={{
                    width: { xs: '100%', lg: '320px' },
                    minWidth: { lg: '260px' },
                    position: { xs: 'relative', lg: 'sticky' },
                    top: 20,
                    mb: { xs: 4, lg: 0 }
                }}>
                    <Box sx={{
                        p: 3,
                        borderRadius: '16px',
                        bgcolor: BRAND.gold,
                        color: BRAND.dark,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: { xs: 'auto', lg: '480px' },
                        minHeight: { xs: '350px', lg: '480px' },
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

                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem', lineHeight: 1.5, my: 2 }}>
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
                        fontSize: { xs: '0.8rem', md: '1.35rem' }
                    }}
                >
                    GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
                </Typography>
            </Box>
        </Container>
    );
};

export default NewsFeed;