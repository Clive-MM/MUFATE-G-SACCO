import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Subject: '',
        Message: '',
    });
    const [alert, setAlert] = useState({ type: '', message: '' });

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ type: '', message: '' });
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({ type: '', message: '' });

        try {
            const response = await fetch('https://mufate-g-sacco.onrender.com/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.status === 201) {
                setAlert({ type: 'success', message: result.message });
                setFormData({ Email: '', Subject: '', Message: '' });
            } else {
                setAlert({ type: 'error', message: result.message });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
    };

    return (
        <Box
            sx={{
                position: 'relative',
                background: 'linear-gradient(to bottom, rgb(189, 225, 237), rgb(233, 241, 250))',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                px: { xs: 2, md: 8 }, // Padding horizontal
                pt: { xs: 3, md: 3 }, // Padding top
                pb: { xs: 3, md: 4 }, // Padding bottom
                mt: 0,
                minHeight: '75vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Keeps content centered vertically
                overflow: 'hidden', // Ensures bars don't cause horizontal scroll if they go out
            }}
        >
            {/* Vertical Colored Bars (Right) - REMOVED FOR SMALLER SCREENS */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: { md: '80px' }, // Only defined for md and up
                    // Hide bars on xs and sm screens, display only on md and larger
                    display: { xs: 'none', md: 'flex' }, // Key change here!
                    flexDirection: 'row',
                    gap: { md: '50px' }, // Only defined for md and up
                    zIndex: 0,
                }}
            >
                {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: { md: '90px' }, // Only defined for md and up
                            backgroundColor: color,
                        }}
                    />
                ))}
            </Box>

            {/* Heading */}
            <Typography
                variant="h4"
                sx={{
                    color: '#003B49',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: { xs: '1.4rem', md: '2rem' },
                    mb: 3,
                    zIndex: 1, // Ensure text is above any potential background elements
                }}
            >
                We Value Your Feedback
            </Typography>

            {/* Feedback Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    zIndex: 1, // Ensure form is above any potential background elements
                    maxWidth: { xs: '100%', md: '600px' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    // No need for margin-right on form if bars are hidden on small screens
                    // mr: { xs: '15px', sm: '30px', md: 0 }, // This line can be removed or set to 0
                }}
            >
                {alert.message && (
                    <Alert severity={alert.type} sx={{ mb: 1 }}>
                        {alert.message}
                    </Alert>
                )}

                <TextField
                    label="Email"
                    name="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                />
                <TextField
                    label="Subject"
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    required
                />
                <TextField
                    label="Message"
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SendIcon />}
                    sx={{
                        backgroundColor: '#2E7D32',
                        color: '#fff',
                        fontWeight: 'bold',
                        px: { xs: 2, sm: 3, md: 4 },
                        py: { xs: 1, sm: 1.25 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                        textTransform: 'uppercase',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.6)',
                        '&:hover': {
                            backgroundColor: '#1B5E20',
                            boxShadow: '0 0 15px 3px rgba(255, 215, 0, 0.8)',
                        },
                        alignSelf: 'flex-start',
                        mt: 2,
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default FeedbackForm;