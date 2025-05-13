import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/clients')
            .then((res) => {
                setTestimonials(res.data.clients);
            })
            .catch((err) => {
                console.error('Error loading testimonials:', err);
            });
    }, []);

    return (
        <Box className="testimonials-section">
            <Typography className="testimonial-title">REVIEWS</Typography>
            <Box className="testimonials-grid">
                {testimonials.map((client) => (
                    <Box className="testimonial-card" key={client.ClientID}>
                        <Avatar
                            src={client.LogoURL}
                            alt={client.ClientName}
                            sx={{
                                width: 300,
                                height: 300,
                                objectFit: 'cover',
                                objectPosition: 'top',
                                borderRadius: '50%',
                                border: '4px solid #f2a922',
                                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                                mb: 2,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.06)',
                                },
                            }}
                        />

                        <Typography className="testimonial-quote">“{client.ClientStatistic}”</Typography>
                        <Typography className="testimonial-name">{client.ClientName}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TestimonialsSection;
