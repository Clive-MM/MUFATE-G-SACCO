
import React, { useState, useEffect, useRef } from 'react';

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// ICONS
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaymentsIcon from '@mui/icons-material/Payments';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BRAND = {
  gold: '#EC9B14',
  lightGold: '#FFC25F',
  green: '#1F4F2E',
  dark: '#02150F',
  white: '#F4F4F4',
  textMuted: 'rgba(244,244,244,0.78)',
};

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const scrollRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const services = [
    {
      title: 'Smart Savings & Investment Solutions',
      desc: 'Build your financial future through disciplined savings and rewarding investment accounts. From goal-based savings and fixed deposits to dividend-earning investments, our products help you grow your money safely while earning competitive returns.',
      icon: <SavingsIcon />,
    },
    {
      title: 'Tailored & Affordable Loans',
      desc: 'Built on the strength of our members’ savings and shared trust, we offer tailored loan products to meet diverse needs — from development and agribusiness support to business expansion, education, and emergencies. Enjoy affordable rates, flexible terms, and quick access to credit when you need it most.',
      icon: <AccountBalanceIcon />,
    },
    {
      title: 'Asset Financing',
      desc: 'Acquire the equipment, machinery, or tools you need today through our flexible asset financing. We fund your purchase and use the asset as security while you repay in affordable installments — giving you full ownership once the loan is cleared.',
      icon: <PrecisionManufacturingIcon />,
    },
    {
      title: 'Mobile Banking & Digital Lending',
      desc: 'Enjoy secure 24/7 access to your SACCO account through our USSD and mobile platforms. Deposit, withdraw, transfer funds, and even apply for loans instantly — anytime, anywhere, right from your phone.',
      icon: <PhoneIphoneIcon />,
    },
    {
      title: 'Benevolent Funeral Cover',
      desc: 'We believe in standing by our members when it matters most. Our Benevolent Fund offers a helping hand with funeral expenses for active contributors and their families.',
      icon: <FavoriteIcon />,
    },
    {
      title: 'Timely Salary Processing',
      desc: 'We provide a reliable payroll and check-off platform that ensures tea farmers, teachers, civil servants, and institutional employees receive their payments on time. Once funds or cheques are received, we promptly process and credit accounts to guarantee timely and seamless salary disbursement.',
      icon: <PaymentsIcon />,
    },
  ];

  // AUTOMATIC SCROLL LOGIC FOR MOBILE
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setSelectedCard((prev) => {
        const next = (prev + 1) % services.length;

        if (scrollRef.current) {
          const card = scrollRef.current.children[next];

          if (card) {
            card.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          }
        }

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile, services.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Box
      sx={{
        bgcolor: BRAND.dark,
        py: { xs: 8, md: 12 },
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      {/* SUBTLE GOLD BACKGROUND GLOW */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: { xs: 180, md: 400 },
          height: { xs: 180, md: 400 },
          bgcolor: BRAND.gold,
          filter: 'blur(150px)',
          opacity: 0.035,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack
          spacing={{ xs: 5, md: 7 }}
          alignItems="center"
        >

          {/* SECTION HEADING */}
          <Box
            sx={{
              textAlign: 'center',
              width: '100%',
              px: 2,
            }}
          >

            {/* HANDSHAKE EMBLEM AND DECORATIVE LINES */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 2, md: 4 },
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 45, sm: 90, md: 150 },
                    height: 2,
                    background: `
                      linear-gradient(
                        90deg,
                        transparent,
                        ${BRAND.gold}
                      )
                    `,
                  }}
                />

                <HandshakeIcon
                  sx={{
                    fontSize: { xs: 38, md: 58 },
                    color: BRAND.gold,
                    filter: 'drop-shadow(0 0 10px rgba(236,155,20,0.25))',
                  }}
                />

                <Box
                  sx={{
                    width: { xs: 45, sm: 90, md: 150 },
                    height: 2,
                    background: `
                      linear-gradient(
                        90deg,
                        ${BRAND.gold},
                        transparent
                      )
                    `,
                  }}
                />
              </Box>
            </motion.div>

            {/* MAIN TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                component="h2"
                sx={{
                  color: BRAND.gold,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: {
                    xs: '2rem',
                    sm: '3rem',
                    md: '4.2rem',
                  },
                  letterSpacing: {
                    xs: '0.035em',
                    md: '0.08em',
                  },
                  lineHeight: 1.15,
                }}
              >
                Why Choose Us
              </Typography>
            </motion.div>

            {/* GOLD UNDERLINE */}
            <Box
              sx={{
                width: { xs: 100, md: 180 },
                height: 4,
                mx: 'auto',
                mt: 2,
                borderRadius: 5,
                background: `
                  linear-gradient(
                    90deg,
                    transparent,
                    ${BRAND.gold},
                    ${BRAND.lightGold},
                    ${BRAND.gold},
                    transparent
                  )
                `,
              }}
            />
          </Box>


          {/* SERVICES GRID / MOBILE SLIDER */}
          <Box
            ref={scrollRef}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-100px',
            }}
            sx={{
              width: '100%',
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'row' : 'unset',
              overflowX: isMobile ? 'auto' : 'visible',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',

              gridTemplateColumns: {
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },

              gap: { xs: 2, md: 3 },

              perspective: '1500px',

              pb: isMobile ? 3 : 0,

              '&::-webkit-scrollbar': {
                display: 'none',
              },

              scrollbarWidth: 'none',
            }}
          >

            {services.map((service, index) => {
              const isSelected = selectedCard === index;
              const isHovered = hoveredCard === index;

              return (
                <Box
                  key={index}
                  component={motion.div}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    minWidth: isMobile ? '88%' : 'auto',
                    scrollSnapAlign: 'center',
                    height: '100%',
                  }}
                >

                  {/* SERVICE CARD */}
                  <Card
                    component={motion.div}
                    whileHover={!isMobile ? {
                      y: -7,
                    } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 22,
                    }}
                    elevation={0}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      isolation: 'isolate',

                      height: '100%',
                      minHeight: {
                        xs: 270,
                        md: 255,
                      },

                      bgcolor: BRAND.dark,

                      borderRadius: {
                        xs: '20px',
                        md: '26px',
                      },

                      border: `1px solid ${
                        isSelected || isHovered
                          ? BRAND.gold
                          : 'rgba(236,155,20,0.42)'
                      }`,

                      boxShadow: isSelected || isHovered
                        ? `
                          0 0 18px rgba(236,155,20,0.13),
                          0 10px 25px rgba(0,0,0,0.25)
                        `
                        : '0 8px 25px rgba(0,0,0,0.18)',

                      transition: 'all 0.35s ease',

                      '&:hover': {
                        borderColor: BRAND.gold,
                      },
                    }}
                  >

                    {/* GOLD CORNER ACCENT */}
                    <Box
                      sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: { xs: 45, md: 65 },
                        height: { xs: 35, md: 48 },
                        background: `
                          linear-gradient(
                            135deg,
                            ${BRAND.lightGold},
                            ${BRAND.gold}
                          )
                        `,
                        borderTopLeftRadius: '100%',
                        borderBottomRightRadius: {
                          xs: '19px',
                          md: '25px',
                        },
                        zIndex: 0,
                        pointerEvents: 'none',
                      }}
                    />

                    <CardActionArea
                      onClick={() => setSelectedCard(index)}
                      sx={{
                        position: 'relative',
                        zIndex: 1,
                        height: '100%',
                        minHeight: {
                          xs: 270,
                          md: 255,
                        },
                        p: {
                          xs: 2.5,
                          md: 2.5,
                        },
                        display: 'flex',
                        alignItems: 'stretch',
                      }}
                    >

                      {/* HORIZONTAL ICON + CONTENT LAYOUT */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          gap: { xs: 1.5, md: 2 },
                        }}
                      >

                        {/* ICON AREA */}
                        <Box
                          sx={{
                            width: {
                              xs: 75,
                              sm: 90,
                              md: 105,
                            },
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                          }}
                        >

                          {/* GOLD ICON CIRCLE */}
                          <Box
                            sx={{
                              width: {
                                xs: 58,
                                md: 76,
                              },
                              height: {
                                xs: 58,
                                md: 76,
                              },
                              borderRadius: '50%',
                              border: `2px solid ${BRAND.gold}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: BRAND.dark,
                              boxShadow: `
                                0 0 14px rgba(236,155,20,0.10),
                                inset 0 0 12px rgba(236,155,20,0.05)
                              `,
                              color: BRAND.gold,
                              transition: 'all 0.35s ease',

                              '& svg': {
                                fontSize: {
                                  xs: 31,
                                  md: 42,
                                },
                              },

                              ...(isHovered && {
                                transform: 'scale(1.07)',
                                boxShadow: `
                                  0 0 18px rgba(236,155,20,0.2)
                                `,
                              }),
                            }}
                          >
                            {service.icon}
                          </Box>
                        </Box>

                        {/* VERTICAL GOLD DIVIDER */}
                        <Box
                          sx={{
                            width: '1px',
                            alignSelf: 'stretch',
                            minHeight: 130,
                            background: `
                              linear-gradient(
                                180deg,
                                transparent,
                                rgba(236,155,20,0.8),
                                transparent
                              )
                            `,
                            flexShrink: 0,
                          }}
                        />

                        {/* SERVICE CONTENT */}
                        <CardContent
                          component={motion.div}
                          animate={{
                            x: isHovered ? 3 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                          }}
                          sx={{
                            flex: 1,
                            minWidth: 0,
                            p: 0,
                            pl: { xs: 0.5, md: 1 },

                            '&:last-child': {
                              pb: 0,
                            },
                          }}
                        >

                          {/* SERVICE TITLE */}
                          <Typography
                            component="h3"
                            sx={{
                              fontWeight: 900,
                              color: BRAND.gold,
                              textTransform: 'uppercase',
                              fontSize: {
                                xs: '0.85rem',
                                sm: '0.95rem',
                                md: '1.05rem',
                              },
                              lineHeight: 1.35,
                              letterSpacing: '0.055em',
                              mb: 1.5,
                            }}
                          >
                            {service.title}
                          </Typography>

                          {/* SERVICE DESCRIPTION */}
                          <Typography
                            sx={{
                              color: BRAND.textMuted,
                              fontSize: {
                                xs: '0.76rem',
                                sm: '0.82rem',
                                md: '0.86rem',
                              },
                              lineHeight: 1.55,
                              fontWeight: 400,
                            }}
                          >
                            {service.desc}
                          </Typography>

                        </CardContent>
                      </Box>

                    </CardActionArea>

                    {/* SMALL GOLD ACCENT */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 65,
                        height: 3,
                        borderRadius: 5,
                        bgcolor: BRAND.gold,
                        opacity: 0.8,
                        pointerEvents: 'none',
                      }}
                    />

                  </Card>
                </Box>
              );
            })}

          </Box>


          {/* MOBILE SLIDER INDICATORS */}
          {isMobile && (
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ mt: -3 }}
            >
              {services.map((service, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setSelectedCard(index);

                    const card = scrollRef.current?.children[index];

                    card?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center',
                    });
                  }}
                  sx={{
                    width: selectedCard === index ? 24 : 7,
                    height: 7,
                    borderRadius: 5,
                    bgcolor: selectedCard === index
                      ? BRAND.gold
                      : 'rgba(236,155,20,0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Stack>
          )}


          {/* DISCOVER MORE BUTTON */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button
              component={RouterLink}
              to="/about/who-we-are"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: BRAND.gold,
                color: BRAND.dark,
                fontWeight: 900,

                px: {
                  xs: 5,
                  md: 8,
                },

                py: {
                  xs: 1.8,
                  md: 2.2,
                },

                borderRadius: '7px',

                fontSize: {
                  xs: '0.85rem',
                  md: '1rem',
                },

                letterSpacing: '0.16em',
                textTransform: 'uppercase',

                boxShadow: `
                  0 10px 25px rgba(0,0,0,0.3)
                `,

                transition: 'all 0.35s ease',

                '&:hover': {
                  bgcolor: BRAND.lightGold,
                  boxShadow: `
                    0 0 22px rgba(236,155,20,0.25)
                  `,
                },

                '& .MuiButton-endIcon': {
                  ml: 1.5,
                },
              }}
            >
              Discover More
            </Button>
          </motion.div>

        </Stack>
      </Container>


      {/* BOTTOM GOLD AND GREEN WAVES */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: { xs: 45, md: 75 },
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <path
            d="M0,45 C260,110 420,120 690,75 C960,30 1160,0 1440,30 L1440,120 L0,120 Z"
            fill={BRAND.green}
            opacity="0.25"
          />

          <path
            d="M0,45 C260,110 420,120 690,75 C960,30 1160,0 1440,30"
            fill="none"
            stroke={BRAND.gold}
            strokeWidth="2"
          />
        </svg>
      </Box>

    </Box>
  );
};

export default AboutSection;
