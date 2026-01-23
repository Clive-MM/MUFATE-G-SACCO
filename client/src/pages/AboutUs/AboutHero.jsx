import React from "react";
import { Box, keyframes } from "@mui/material";

// 1. Define the entrance animations
const revealImage = keyframes`
  0% { transform: scale(1.1); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        backgroundColor: "#02150F",
        overflow: "hidden", // Keeps the zoom animation contained
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 2. THE IMAGE LAYER with Animation */}
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="Golden Generation DT SACCO Team"
        sx={{
          width: "100%",
          height: "auto", 
          display: "block",
          // Animation: subtle scale down and fade in on load
          animation: `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      />

      {/* 3. RESPONSIVE NAVBAR OVERLAY 
          Adjusted opacity and height for different screens
      */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: { xs: "70px", sm: "100px", md: "160px" },
          background: "linear-gradient(to bottom, rgba(2,21,15,0.9) 0%, rgba(2,21,15,0.4) 60%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
          animation: `${fadeUp} 0.8s ease-out forwards`,
        }}
      />

      {/* 4. RESPONSIVE BOTTOM BLEND 
          Ensures the grass transitions perfectly into the next section
      */}
      <Box
        sx={{
          position: "absolute",
          bottom: -1, // -1 avoids tiny gaps on some browsers
          left: 0,
          width: "100%",
          height: { xs: "10%", md: "20%" },
          background: "linear-gradient(to top, #02150F 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default AboutHero;