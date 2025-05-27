import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const instructions = [
    'Get the membership application form (from the office or website).',
    'Fill in the form with your correct details.',
    'Attach a copy of your ID/Passport, and a passport-size photo.',
    'Pay the registration fee of Kshs 100.',
    'Deposit the minimum operating balance of Kshs 1,000.',
    'Pay Bank plate cards processing fee of Kshs 200.',
    'Open a savings account and start making deposits.',
];

const JoiningInstructions = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(to bottom, #ffffff, #d6d6d6)',
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                px: { xs: 2, md: 8 },
                py: { xs: 5, md: 6 },
                mt: 0,
                overflow: 'hidden',
            }}
        >
            <Grid container spacing={12}>
                {/* ✅ Text Section */}
                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#003B49',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                mb: 3,
                                letterSpacing: '1px',
                            }}
                        >
                            Joining Instructions
                        </Typography>

                        <Box component="ul" sx={{ pl: 2, mb: 4 }}>
                            {instructions.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.4 }}
                                    style={{
                                        listStyle: 'none',
                                        marginBottom: '12px',
                                        padding: '10px 15px',
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '8px',
                                        color: '#333',
                                        fontSize: '1rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                        cursor: 'default',
                                    }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#003B49',
                                color: '#fff',
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                borderRadius: 1,
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',
                                '&:hover': {
                                    backgroundColor: '#005a6c',
                                },
                            }}
                        >
                            Application form
                        </Button>
                    </motion.div>
                </Grid>

                {/* ✅ Color Bars Section */}
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        ml: { md: 53 }, 
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            pr: { md: 2 },
                            height: '120%',
                            alignItems: 'flex-end',
                        }}
                    >
                        {['#002B3D', '#2E7D32', '#F9B233', '#144F50'].map((color, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    width: '70px',
                                    height: '140%', // bars extend below the section

                                    backgroundColor: color,
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                                }}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JoiningInstructions;
