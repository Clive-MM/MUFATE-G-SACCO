import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const MobileBanking = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                px: { xs: 2, md: 10 },
                py: 10,
                gap: 6,
                backgroundColor: '#fff',
                overflow: 'hidden',
                minHeight: { md: '480px' },
            }}
        >
            {/* ✅ Green Background Patch Behind Phones */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: { xs: '100%', md: '50%' }, // <-- Increased from 42% to 55%
                    height: '240px',
                    backgroundColor: '#004d40',
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                    zIndex: 0,
                }}
            />


            {/* ✅ Left Text Content */}
            <Box sx={{ flex: 1, zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#003b2f',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            mb: 2,
                        }}
                    >
                        M-Banking Services
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.1rem',
                            lineHeight: 2,
                            color: '#333',
                            maxWidth: '90%',
                            mb: 2,
                        }}
                    >
                        Experience the ease of banking from anywhere with Mufate G’s M-Banking services.
                        From checking balances and transferring funds to paying bills and accessing mini-statements,
                        our mobile platform puts the power of banking in your hands — securely and conveniently.
                        Use <strong>*882*51#</strong> to access your account.
                    </Typography>


                </motion.div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: 4,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    zIndex: 2,
                }}
            >
                {[
                    "https://res.cloudinary.com/djydkcx01/image/upload/v1746212408/Withdraw_Money_euixjq.png",
                    "https://res.cloudinary.com/djydkcx01/image/upload/v1746212284/Money_Deposit_ftr3ov.png",
                ].map((src, idx) => (
                    <motion.img
                        key={idx}
                        src={src}
                        alt={`phone-${idx}`}
                        style={{
                            width: '250px',
                            height: 'auto',
                            borderRadius: '20px',
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.3 }}
                        whileHover={{ scale: 1.05 }}
                    />
                ))}
            </Box>

        </Box>
    );
};

export default MobileBanking;
