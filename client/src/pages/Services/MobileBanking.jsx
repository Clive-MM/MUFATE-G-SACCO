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
                backgroundColor: '#011407',           // 🌑 Deep green brand background
                overflow: 'hidden',
                minHeight: { md: '480px' },
            }}
        >

            {/* ✅ Right-side deep-green → gold gradient background patch */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: { xs: '100%', md: '50%' },
                    height: '240px',
                    background: 'linear-gradient(135deg, #01240F, #014d1d)', // 🌑 Deep greens
                    borderTopLeftRadius: '30px',
                    borderBottomLeftRadius: '30px',
                    zIndex: 0,
                }}
            />

            {/* ✅ Gold soft glow overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    right: '25%',
                    top: '50%',
                    transform: 'translate(50%, -50%)',
                    width: 300,
                    height: 300,
                    backgroundColor: 'rgba(255,215,0,0.20)',  // 🌟 Soft gold glow
                    borderRadius: '50%',
                    filter: 'blur(70px)',
                    zIndex: 1,
                }}
            />

            {/* ================= LEFT TEXT ================= */}
            <Box sx={{ flex: 1, zIndex: 2 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >

                    {/* TITLE */}
                    <Typography
                        variant="h4"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            mb: 3,
                            background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',         // ✨ Gold gradient title
                            textShadow: '0 0 12px rgba(255,215,0,0.3)',
                        }}
                    >
                        <SmartphoneIcon sx={{ mr: 1, color: '#FFD700' }} /> {/* Gold icon */}
                        M-Banking Services
                    </Typography>

                    {/* TEXT */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.1rem',
                            lineHeight: 2,
                            color: '#FFF4B5',             // Soft gold text
                            maxWidth: '90%',
                            mb: 2,
                            textShadow: '0 0 10px rgba(0,0,0,0.6)',
                        }}
                    >
                        Experience the ease of banking from anywhere with Golden Generation DT Sacco’s
                        M-Banking services. From checking balances and transferring funds to paying bills
                        and accessing mini-statements, our mobile platform puts the power of banking in
                        your hands — securely and conveniently.
                        Use <strong style={{ color: '#FFD700' }}>*882*51#</strong> to access your account.
                        Deposit money using Paybill <strong style={{ color: '#FFD700' }}>506492</strong>.
                    </Typography>
                </motion.div>
            </Box>

            {/* ================= PHONE IMAGES ================= */}
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
                            boxShadow: '0 10px 25px rgba(0,0,0,0.35)', // Slightly stronger shadow for dark bg
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
