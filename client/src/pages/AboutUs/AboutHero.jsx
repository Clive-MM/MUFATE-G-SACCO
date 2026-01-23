import React from "react";
import { Box } from "@mui/material";

const AboutHero = () => {
  const HERO_IMAGE =
    "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "55vh", sm: "65vh", md: "75vh" },
        minHeight: { xs: "320px", md: "500px" },
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#02150F",
      }}
    >
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="About us hero"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",        // ✅ fills whole hero
          objectPosition: "center 25%", // ✅ safer for faces
          display: "block",
        }}
      />

      {/* ✅ Navbar visibility overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: { xs: "90px", md: "130px" },
          background:
            "linear-gradient(to bottom, rgba(2,21,15,0.9), transparent)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default AboutHero;
