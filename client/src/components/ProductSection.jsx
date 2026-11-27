
import React, { useState, useRef } from 'react';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { motion } from 'framer-motion';

import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LayersIcon from '@mui/icons-material/Layers';

import { Link as RouterLink } from 'react-router-dom';

const BRAND = {
  gold: '#EC9B14',
  lightGold: '#FFC25F',
  green: '#1F4F2E',
  dark: '#02150F',
  white: '#F4F4F4',
  muted: 'rgba(244,244,244,0.82)',
};

const products = [
  {
    id: 0,
    title: 'Loan Products',
    description:
      'Access affordable and flexible financing for personal growth, business expansion, and emergencies with member-friendly terms.',
    icon: <AccountBalanceIcon />,
    link: '/products/fosa',
  },
  {
    id: 1,
    title: 'Savings Products',
    description:
      'Achieve financial stability with tailored savings plans designed to help you grow your wealth and prepare for future goals.',
    icon: <SavingsIcon />,
    link: '/products/savings',
  },
  {
    id: 2,
    title: 'Investment Solutions',
    description:
      'Multiply your earnings through secure, high-yield investment opportunities that empower members to build long-term success.',
    icon: <TrendingUpIcon />,
    link: '/products/bosa',
  },
];

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const scrollRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Update active product when mobile slider moves
  const handleScroll = () => {
    if (!scrollRef.current || !isMobile) return;

    const container = scrollRef.current;
    const cards = Array.from(container.children);

    const containerCenter =
      container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;

      const distance = Math.abs(
        containerCenter - cardCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setSelectedProduct(closestIndex);
  };

  const scrollToProduct = (index) => {
    setSelectedProduct(index);

    const card = scrollRef.current?.children[index];

    card?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: BRAND.dark,
        py: { xs: 8, md: 12 },
      }}
    >

      {/* SUBTLE GOLD BACKGROUND GLOW */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          right: '-8%',
          width: { xs: 180, md: 350 },
          height: { xs: 180, md: 350 },
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
              width: '100%',
              textAlign: 'center',
            }}
          >

            {/* PRODUCT EMBLEM */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: { xs: 2, md: 4 },
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 45, md: 130 },
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

                <Box
                  sx={{
                    width: { xs: 48, md: 65 },
                    height: { xs: 48, md: 65 },
                    border: `1px solid ${BRAND.gold}`,
                    borderRadius: '7px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: BRAND.gold,
                    backgroundColor: BRAND.dark,
                    boxShadow: '0 0 15px rgba(236,155,20,0.08)',
                  }}
                >
                  <LayersIcon
                    sx={{
                      fontSize: { xs: 30, md: 42 },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: { xs: 45, md: 130 },
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
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: {
                    xs: '2.2rem',
                    sm: '3rem',
                    md: '4rem',
                  },
                  lineHeight: 1.15,
                  letterSpacing: {
                    xs: '0.025em',
                    md: '0.07em',
                  },
                  color: BRAND.white,
                }}
              >
                Our{' '}
                <Box
                  component="span"
                  sx={{ color: BRAND.gold }}
                >
                  Products
                </Box>
              </Typography>
            </motion.div>

            {/* SUPPORTING TEXT */}
            <Typography
              sx={{
                color: BRAND.muted,
                fontSize: {
                  xs: '0.9rem',
                  md: '1.15rem',
                },
                mt: 2,
                px: 2,
                lineHeight: 1.6,
              }}
            >
              Financial solutions designed for your growth,
              security, and long-term success.
            </Typography>

            {/* GOLD ACCENT */}
            <Box
              sx={{
                width: { xs: 85, md: 140 },
                height: 3,
                bgcolor: BRAND.gold,
                mx: 'auto',
                mt: 2.5,
                borderRadius: 5,
              }}
            />
          </Box>


          {/* PRODUCT CARDS */}
          <Box
            ref={scrollRef}
            onScroll={handleScroll}
            sx={{
              width: '100%',
              maxWidth: 1250,
              mx: 'auto',

              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'row' : 'unset',

              gridTemplateColumns: {
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },

              gap: { xs: 2, md: 3 },

              overflowX: isMobile ? 'auto' : 'visible',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',

              pb: isMobile ? 2 : 0,

              '&::-webkit-scrollbar': {
                display: 'none',
              },

              scrollbarWidth: 'none',
            }}
          >

            {products.map((product, index) => {
              const isSelected = selectedProduct === index;

              return (
                <Box
                  key={product.id}
                  sx={{
                    minWidth: isMobile ? '78%' : 'auto',
                    flexShrink: 0,
                    display: 'flex',
                    scrollSnapAlign: 'center',
                  }}
                >

                  <Card
                    component={motion.div}
                    whileHover={!isMobile ? { y: -9 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 250,
                      damping: 22,
                    }}
                    elevation={0}
                    sx={{
                      width: '100%',
                      minHeight: {
                        xs: 370,
                        sm: 390,
                        md: 430,
                      },

                      position: 'relative',
                      overflow: 'hidden',
                      isolation: 'isolate',

                      display: 'flex',

                      bgcolor: BRAND.dark,

                      borderRadius: {
                        xs: '14px',
                        md: '18px',
                      },

                      border: `1px solid ${
                        isSelected
                          ? BRAND.gold
                          : 'rgba(236,155,20,0.48)'
                      }`,

                      boxShadow: isSelected
                        ? '0 0 22px rgba(236,155,20,0.12)'
                        : '0 8px 25px rgba(0,0,0,0.18)',

                      transition: 'all 0.35s ease',

                      '&:hover': {
                        borderColor: BRAND.gold,
                        boxShadow: '0 0 25px rgba(236,155,20,0.14)',
                      },
                    }}
                  >

                    {/* DIAGONAL GOLD CORNER ACCENT */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: { xs: 42, md: 58 },
                        height: { xs: 42, md: 58 },
                        background: `
                          linear-gradient(
                            135deg,
                            ${BRAND.lightGold},
                            ${BRAND.gold}
                          )
                        `,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                        zIndex: 2,
                        pointerEvents: 'none',
                      }}
                    />

                    <CardActionArea
                      component={RouterLink}
                      to={product.link}
                      sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        height: '100%',
                        minHeight: 'inherit',
                      }}
                    >

                      <CardContent
                        sx={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          px: { xs: 2.5, md: 3 },
                          py: { xs: 4, md: 4.5 },

                          '&:last-child': {
                            pb: { xs: 4, md: 4.5 },
                          },
                        }}
                      >

                        {/* SQUARE GOLD ICON FRAME */}
                        <Box
                          sx={{
                            width: { xs: 68, md: 86 },
                            height: { xs: 68, md: 86 },

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            border: `2px solid ${BRAND.gold}`,
                            borderRadius: '12px',

                            color: BRAND.gold,
                            bgcolor: BRAND.dark,

                            boxShadow: `
                              0 0 15px rgba(236,155,20,0.08),
                              inset 0 0 12px rgba(236,155,20,0.04)
                            `,

                            mb: 2.5,

                            transition: 'all 0.35s ease',

                            '& svg': {
                              fontSize: {
                                xs: 36,
                                md: 46,
                              },
                            },

                            '&:hover': {
                              boxShadow: '0 0 20px rgba(236,155,20,0.18)',
                            },
                          }}
                        >
                          {product.icon}
                        </Box>


                        {/* PRODUCT TITLE */}
                        <Typography
                          component="h3"
                          sx={{
                            color: BRAND.gold,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            fontSize: {
                              xs: '1.1rem',
                              md: '1.4rem',
                            },
                            lineHeight: 1.3,
                            mb: 1.5,
                            minHeight: {
                              md: 55,
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {product.title}
                        </Typography>


                        {/* DESCRIPTION ACCENT */}
                        <Box
                          sx={{
                            width: 65,
                            height: 3,
                            bgcolor: BRAND.gold,
                            borderRadius: 5,
                            mb: 2,
                          }}
                        />


                        {/* PRODUCT DESCRIPTION */}
                        <Typography
                          sx={{
                            color: BRAND.muted,
                            lineHeight: 1.65,
                            fontSize: {
                              xs: '0.88rem',
                              md: '0.98rem',
                            },
                            fontWeight: 400,
                            maxWidth: 340,
                            mx: 'auto',
                            mb: 3,
                          }}
                        >
                          {product.description}
                        </Typography>


                        {/* EXPLORE BUTTON */}
                        <Box
                          sx={{
                            mt: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,

                            border: `1px solid ${BRAND.gold}`,
                            borderRadius: '6px',

                            px: 3,
                            py: 1,

                            color: BRAND.gold,
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            letterSpacing: '0.06em',

                            transition: 'all 0.3s ease',

                            '&:hover': {
                              bgcolor: BRAND.gold,
                              color: BRAND.dark,
                            },
                          }}
                        >
                          EXPLORE

                          <ArrowForwardIcon
                            sx={{ fontSize: 19 }}
                          />
                        </Box>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              );
            })}

          </Box>


          {/* MOBILE SLIDER INDICATORS */}
          {isMobile && (
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="center"
              sx={{ mt: -2 }}
            >
              {products.map((product, index) => (
                <Box
                  key={product.id}
                  onClick={() => scrollToProduct(index)}
                  sx={{
                    width: selectedProduct === index ? 25 : 8,
                    height: 8,
                    borderRadius: 5,

                    bgcolor: selectedProduct === index
                      ? BRAND.gold
                      : 'rgba(236,155,20,0.3)',

                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </Stack>
          )}


          {/* VIEW ALL PRODUCTS BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              component={RouterLink}
              to="/products/bosa"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: BRAND.gold,
                color: BRAND.dark,

                fontWeight: 900,

                px: { xs: 4, md: 7 },
                py: { xs: 1.8, md: 2.2 },

                borderRadius: '6px',

                fontSize: {
                  xs: '0.8rem',
                  md: '1rem',
                },

                letterSpacing: {
                  xs: '0.08em',
                  md: '0.15em',
                },

                textTransform: 'uppercase',

                boxShadow: '0 10px 25px rgba(0,0,0,0.25)',

                '&:hover': {
                  bgcolor: BRAND.lightGold,
                  boxShadow: '0 0 25px rgba(236,155,20,0.22)',
                },

                '& .MuiButton-endIcon': {
                  ml: 1.5,
                },
              }}
            >
              View All Products
            </Button>
          </motion.div>

        </Stack>
      </Container>
    </Box>
  );
};

export default ProductsSection;
