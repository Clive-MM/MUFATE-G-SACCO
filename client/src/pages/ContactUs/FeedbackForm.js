import React, { useState,useEffect } from 'react';
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
            const response = await fetch('http://localhost:5000/feedback', {
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
                px: { xs: 2, md: 8 },
                pt: { xs: 3, md: 3 },
                pb: { xs: 3, md: 4 },
                mt: 0,
                minHeight: '75vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Vertical Colored Bars (Right) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: { xs: '4px', sm: '16px', md: '80px' },
                    display: 'flex',
                    flexDirection: 'row',
                    gap: { xs: '4px', sm: '12px', md: '50px' },
                    zIndex: 0,
                }}
            >
                {['#003B49', '#2E7D32', '#F9A825', '#00695C', '#000'].map((color, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: { xs: '10px', sm: '20px', md: '90px' },
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
                }}
            >
                We Value Your Feedback
            </Typography>

            {/* Feedback Form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    zIndex: 1,
                    maxWidth: { xs: '100%', md: '600px' },
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
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
