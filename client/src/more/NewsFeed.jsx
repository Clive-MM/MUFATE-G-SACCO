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
        <Container maxWidth="xl" sx={{ pb: 10, mt: 2, px: { xs: 2, lg: 4 } }}>
            <Grid container spacing={3} wrap="nowrap"> {/* wrap="nowrap" prevents sidebar dropping */}

                {/* MAIN FEED AREA */}
                <Grid item sx={{ flexGrow: 1, width: 'calc(100% - 300px)' }}>
                    <Box sx={{ mb: 3 }}>
                        <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            sx={{ '& .MuiTab-root': { color: '#FFF', fontWeight: 700, fontSize: '0.75rem' } }}
                        >
                            {CATEGORIES.map((cat, i) => <Tab key={i} label={cat} />)}
                        </Tabs>
                    </Box>

                    <Grid container spacing={2}>
                        {posts.map((post) => (
                            <Grid item xs={12} sm={6} md={4} key={post.PostID}>
                                <Card sx={{
                                    maxWidth: 260, // 3/4 of initial 345px size
                                    bgcolor: BRAND.cardBg,
                                    border: `1px solid rgba(236, 155, 20, 0.2)`,
                                    borderRadius: '10px'
                                }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="120" // Reduced height
                                            image={post.CoverImage || 'https://via.placeholder.com/260x120'}
                                            sx={{ objectFit: 'contain', p: 1, bgcolor: 'rgba(0,0,0,0.1)' }}
                                        />
                                        <CardContent sx={{ p: 1.5 }}>
                                            <Typography variant="subtitle2" sx={{ color: '#FFF', fontWeight: 700, fontSize: '0.85rem' }}>
                                                {post.Title}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: BRAND.textMuted, display: 'block', mb: 1 }}>
                                                {post.Content.replace(/<[^>]*>/g, '').substring(0, 50)}...
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ color: BRAND.gold }}>
                                                <AccessTimeIcon sx={{ fontSize: '0.7rem' }} />
                                                <Typography variant="caption">3 min read</Typography>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* NARROW SIDEBAR */}
                <Grid item sx={{ width: '280px', minWidth: '280px' }}>
                    <Box sx={{
                        p: 2.5,
                        borderRadius: '12px',
                        bgcolor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        position: 'sticky',
                        top: 20
                    }}>
                        <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.9rem' }}>NEWSLETTER</Typography>
                        <Typography variant="body2" sx={{ color: BRAND.textMuted, fontSize: '0.7rem', mb: 2 }}>
                            Get the latest updates directly.
                        </Typography>
                        <TextField fullWidth size="small" placeholder="Email" sx={{ bgcolor: '#FFF', borderRadius: '4px', mb: 1 }} />
                        <Button fullWidth variant="contained" sx={{ bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900 }}>
                            SUBSCRIBE
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </Container>
    );
};