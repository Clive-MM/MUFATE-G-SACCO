import React from "react";
import { Box } from "@mui/material";

const AboutHero = () => {
  const HERO_IMAGE =
    "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: "260px", sm: "340px", md: "500px", lg: "550px" },
        backgroundColor: "#02150F",
      }}
    >
      {/* ✅ Blurred full-width background (fills empty space) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(18px)",
          transform: "scale(1.15)", // prevents blur edges
          opacity: 0.35,
        }}
      />

      {/* ✅ Main image fully visible (no crop) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          zIndex: 1,
        }}
      />

      {/* ✅ Top navbar readability overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: { xs: "90px", md: "140px" },
          background:
            "linear-gradient(to bottom, rgba(2,21,15,0.95), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ✅ Bottom blend overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "22%",
          background: "linear-gradient(to top, #02150F, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default AboutHero;
