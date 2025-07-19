import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SmartphoneIcon from '@mui/icons-material/Smartphone'; 

const MobileBanking = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' }, 
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
            {/* ✅ Gradient Green Background Patch */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: { xs: '100%', md: '50%' },
                    height: '240px',
                    background: 'linear-gradient(135deg, #5cdf0aff, #9ff107)', // ✅ Gradient
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                    zIndex: 0,
                }}
            />

            {/* ✅ Soft Glow Overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    right: '25%',
                    top: '50%',
                    transform: 'translate(50%, -50%)',
                    width: 300,
                    height: 300,
                    backgroundColor: '#ffffff33',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    zIndex: 1,
                }}
            />

            {/* ✅ Left Text Content */}
            <Box sx={{ flex: 1, zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 800,
                            color: '#64dd17',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            mb: 3,
                        }}
                    >
                        <SmartphoneIcon sx={{ mr: 1 }} />
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
                        Use <strong>*882*51#</strong> to access your account.Use Lipa na MPESA service to deposit money into your account using the paybillnumber <strong>506492</strong> .
                    </Typography>
                </motion.div>
            </Box>

            {/* ✅ Phones / Illustrations */}
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
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)', 
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
