import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { Box, Typography, Button } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link as RouterLink } from 'react-router-dom';


const HomepageSlider = () => {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/slider/view')
            .then(response => setSlides(response.data.sliders))
            .catch(error => console.error('Error fetching sliders:', error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    };

    return (
        <Box sx={{ mt: 0 }}>
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            height: '80vh',
                            width: '100%',
                            backgroundImage: `url(${slide.ImagePath})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            position: 'relative',
                        }}
                    >
                        {/* Overlay */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }}
                        />

                        {/* Centered Content */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                color: '#fff',
                                zIndex: 2,
                                maxWidth: '90%',
                                px: 2,
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    textShadow: '1px 1px 6px rgba(0,0,0,0.8)',
                                }}
                            >
                                {slide.Title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 3,
                                    textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
                                    maxWidth: '600px',
                                    mx: 'auto'
                                }}
                            >
                                {slide.Description}
                            </Typography>
                            <Button
                                component={RouterLink}
                                to="/membership"
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: '#64dd17',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    px: 4,
                                    py: 1.4,
                                    borderRadius: '30px',
                                    fontSize: '1rem',
                                    transition: 'all 0.4s ease-in-out',
                                    boxShadow: '0 0 8px #64dd17',
                                    '&:hover': {
                                        backgroundColor: '#76ff03',
                                        transform: 'scale(1.08)',
                                        boxShadow: '0 0 25px #76ff03',
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                        boxShadow: '0 0 20px #76ff03',
                                    },
                                }}
                            >
                                Register Here
                            </Button>

                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default HomepageSlider;
