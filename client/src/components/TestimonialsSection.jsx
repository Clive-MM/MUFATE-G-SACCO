
import React, { useEffect, useState, useRef } from "react";

import {
  Box,
  Typography,
  Alert,
  Skeleton,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import axios from "axios";
import { motion } from "framer-motion";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import StarIcon from "@mui/icons-material/Star";

const API = "https://mufate-g-sacco.onrender.com/clients";

const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  green: "#1F4F2E",
  dark: "#02150F",
  white: "#F4F4F4",
  muted: "rgba(244,244,244,0.85)",
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const scrollRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // FETCH MEMBER TESTIMONIALS
  useEffect(() => {
    let isMounted = true;

    axios
      .get(API)
      .then((res) => {
        if (isMounted) {
          setTestimonials(res.data?.clients ?? []);
        }
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);

        if (isMounted) {
          setError(
            "Could not load member reviews. Please try again later."
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // SCROLL TO A PARTICULAR TESTIMONIAL
  const scrollToTestimonial = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const bubble = container.children[index];
    if (!bubble) return;

    const left =
      bubble.offsetLeft -
      (container.clientWidth - bubble.clientWidth) / 2;

    container.scrollTo({
      left,
      behavior: "smooth",
    });

    setActiveStep(index);
  };

  // AUTOMATIC MOBILE TESTIMONIAL SLIDER
  useEffect(() => {
    if (
      !isMobile ||
      loading ||
      testimonials.length <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((previous) => {
        const next = (previous + 1) % testimonials.length;

        scrollToTestimonial(next);

        return next;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isMobile, loading, testimonials.length]);

  // UPDATE ACTIVE INDICATOR WHEN USER SWIPES
  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container || !isMobile) return;

    const containerCenter =
      container.getBoundingClientRect().left +
      container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const rect = child.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;

      const distance = Math.abs(
        containerCenter - cardCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveStep((previous) =>
      previous === closestIndex ? previous : closestIndex
    );
  };

  // REUSABLE FIVE-STAR RATING
  const StarRating = () => (
    <Stack
      direction="row"
      spacing={0.3}
      justifyContent="center"
      sx={{ mb: 2.5 }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          sx={{
            color: BRAND.gold,
            fontSize: {
              xs: 23,
              md: 28,
            },
          }}
        />
      ))}
    </Stack>
  );

  // SPEECH BUBBLE DESIGN
  const SpeechBubble = ({ client, index }) => {
    const isActive = activeStep === index;

    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "relative",
          pb: 2.5,
        }}
      >
        <Box
          component={motion.article}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            delay: index * 0.12,
          }}
          whileHover={!isMobile ? { y: -7 } : {}}
          sx={{
            width: "100%",
            minHeight: {
              xs: 350,
              sm: 360,
              md: 390,
            },

            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            px: {
              xs: 3,
              sm: 3.5,
              md: 3,
            },

            py: {
              xs: 4,
              md: 4.5,
            },

            textAlign: "center",

            bgcolor: BRAND.dark,

            border: `2px solid ${
              isActive
                ? BRAND.gold
                : "rgba(236,155,20,0.65)"
            }`,

            borderRadius: "48% 48% 48% 48% / 40% 40% 40% 40%",

            boxShadow: isActive
              ? "0 0 24px rgba(236,155,20,0.22), inset 0 0 22px rgba(236,155,20,0.035)"
              : "0 8px 25px rgba(0,0,0,0.16)",

            transition: "all 0.4s ease",

            "&:hover": {
              borderColor: BRAND.lightGold,
              boxShadow:
                "0 0 24px rgba(236,155,20,0.18)",
            },

            // SPEECH BUBBLE TAIL
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -17,
              left: "16%",

              width: 30,
              height: 30,

              bgcolor: BRAND.dark,

              borderLeft: `2px solid ${
                isActive
                  ? BRAND.gold
                  : "rgba(236,155,20,0.65)"
              }`,

              borderBottom: `2px solid ${
                isActive
                  ? BRAND.gold
                  : "rgba(236,155,20,0.65)"
              }`,

              transform: "rotate(-45deg)",
              zIndex: 2,
            },
          }}
        >

          {/* FIVE-STAR RATING */}
          <StarRating />

          {/* TESTIMONIAL TEXT */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 390,
              mb: 2.5,
            }}
          >

            {/* OPENING QUOTATION MARK */}
            <Typography
              component="span"
              sx={{
                color: BRAND.gold,
                fontSize: {
                  xs: "2.3rem",
                  md: "2.8rem",
                },
                fontWeight: 900,
                lineHeight: 0,
                mr: 0.5,
                verticalAlign: "-0.2em",
              }}
            >
              “
            </Typography>

            <Typography
              component="span"
              sx={{
                color: BRAND.white,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                  md: "1.08rem",
                },
                lineHeight: 1.8,
                overflowWrap: "break-word",
              }}
            >
              {client.ClientStatistic}
            </Typography>

            {/* CLOSING QUOTATION MARK */}
            <Typography
              component="span"
              sx={{
                color: BRAND.gold,
                fontSize: {
                  xs: "2.3rem",
                  md: "2.8rem",
                },
                fontWeight: 900,
                lineHeight: 0,
                ml: 0.3,
                verticalAlign: "-0.2em",
              }}
            >
              ”
            </Typography>
          </Box>

          {/* MEMBER NAME */}
          <Typography
            component="h3"
            sx={{
              color: BRAND.gold,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: {
                xs: "0.04em",
                md: "0.07em",
              },
              fontSize: {
                xs: "0.78rem",
                sm: "0.85rem",
                md: "0.92rem",
              },
              lineHeight: 1.5,
              overflowWrap: "break-word",
            }}
          >
            — {client.ClientName}
          </Typography>

        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        bgcolor: BRAND.dark,
        py: {
          xs: 8,
          md: 13,
        },
      }}
    >

      {/* SUBTLE GOLD BACKGROUND GLOW */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-8%",
          width: {
            xs: 180,
            md: 350,
          },
          height: {
            xs: 180,
            md: 350,
          },
          bgcolor: BRAND.gold,
          filter: "blur(150px)",
          opacity: 0.035,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >

        <Stack
          spacing={{
            xs: 5,
            md: 7,
          }}
          alignItems="center"
        >

          {/* SECTION HEADING */}
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >

            {/* CHAT ICON */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ChatBubbleOutlineIcon
                sx={{
                  color: BRAND.gold,
                  fontSize: {
                    xs: 42,
                    md: 60,
                  },
                  mb: 1,
                }}
              />
            </motion.div>

            {/* GOLDEN VOICES */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                component="h2"
                sx={{
                  fontWeight: 900,
                  textTransform: "uppercase",
                  fontSize: {
                    xs: "2.1rem",
                    sm: "2.8rem",
                    md: "4rem",
                  },
                  lineHeight: 1.1,
                  letterSpacing: {
                    xs: "0.02em",
                    md: "0.045em",
                  },
                  color: BRAND.white,
                }}
              >
                GOLDEN{" "}
                <Box
                  component="span"
                  sx={{ color: BRAND.gold }}
                >
                  VOICES
                </Box>
              </Typography>

              {/* SUBTITLE */}
              <Typography
                sx={{
                  color: BRAND.white,
                  fontWeight: 600,
                  fontSize: {
                    xs: "0.75rem",
                    md: "1rem",
                  },
                  letterSpacing: {
                    xs: "0.17em",
                    md: "0.28em",
                  },
                  mt: 1.5,
                }}
              >
                WHAT OUR MEMBERS SAY
              </Typography>
            </motion.div>

            {/* SHORT GOLD ACCENT */}
            <Box
              sx={{
                width: 55,
                height: 3,
                bgcolor: BRAND.gold,
                mx: "auto",
                mt: 2.5,
                borderRadius: 2,
              }}
            />
          </Box>


          {/* ERROR MESSAGE */}
          {error && (
            <Container maxWidth="sm">
              <Alert
                severity="error"
                sx={{
                  bgcolor: "rgba(211,47,47,0.1)",
                  color: "#ff8a80",
                }}
              >
                {error}
              </Alert>
            </Container>
          )}


          {/* TESTIMONIALS */}
          <Box
            ref={scrollRef}
            onScroll={handleScroll}
            sx={{
              width: "100%",
              maxWidth: 1450,
              mx: "auto",

              display: isMobile ? "flex" : "grid",

              flexDirection: isMobile ? "row" : "unset",

              gridTemplateColumns: {
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },

              gap: {
                xs: 2.5,
                md: 3,
              },

              overflowX: isMobile ? "auto" : "visible",

              scrollSnapType: isMobile
                ? "x mandatory"
                : "none",

              scrollBehavior: "smooth",

              alignItems: "center",

              px: {
                xs: 1,
                md: 0,
              },

              pt: 1,
              pb: 4,

              "&::-webkit-scrollbar": {
                display: "none",
              },

              scrollbarWidth: "none",
            }}
          >

            {/* LOADING SKELETONS */}
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      minWidth: isMobile ? "88%" : "auto",
                      scrollSnapAlign: "center",
                      pb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        minHeight: 390,
                        border: "1px solid rgba(236,155,20,0.4)",
                        borderRadius: "48%",
                        bgcolor: BRAND.dark,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width="55%"
                        height={35}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                          mb: 2,
                        }}
                      />

                      <Skeleton
                        variant="text"
                        width="90%"
                        height={30}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />

                      <Skeleton
                        variant="text"
                        width="80%"
                        height={30}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                        }}
                      />

                      <Skeleton
                        variant="text"
                        width="65%"
                        height={30}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                          mb: 3,
                        }}
                      />

                      <Skeleton
                        variant="text"
                        width="50%"
                        height={30}
                        sx={{
                          bgcolor: "rgba(236,155,20,0.15)",
                        }}
                      />
                    </Box>
                  </Box>
                ))

              : testimonials.map((client, index) => (
                  <Box
                    key={client.ClientID ?? index}
                    sx={{
                      minWidth: isMobile ? "88%" : "auto",
                      flexShrink: 0,
                      display: "flex",
                      scrollSnapAlign: "center",
                    }}
                  >
                    <SpeechBubble
                      client={client}
                      index={index}
                    />
                  </Box>
                ))}

          </Box>


          {/* MOBILE SLIDER INDICATORS */}
          {isMobile &&
            !loading &&
            testimonials.length > 1 && (
              <Stack
                direction="row"
                spacing={1.3}
                justifyContent="center"
                sx={{ mt: -3 }}
              >
                {testimonials.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() =>
                      scrollToTestimonial(index)
                    }
                    sx={{
                      width:
                        activeStep === index ? 26 : 8,
                      height: 8,
                      borderRadius: 5,

                      bgcolor:
                        activeStep === index
                          ? BRAND.gold
                          : "rgba(236,155,20,0.3)",

                      cursor: "pointer",
                      transition: "all 0.35s ease",
                    }}
                  />
                ))}
              </Stack>
            )}

        </Stack>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
