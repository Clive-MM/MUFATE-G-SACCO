import React from "react";
import { Box, keyframes } from "@mui/material";

// 1. Entrance animations
const revealImage = keyframes`
  0% { transform: scale(1.08); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(15px); }
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
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    
        pt: { xs: "65px", sm: "80px", md: "0px" }, 
      }}
    >
      {/* 2. THE IMAGE LAYER 
        
      */}
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="Golden Generation DT SACCO Team"
        sx={{
          width: "100%",
          height: "auto", 
          display: "block",
          zIndex: 1,
          animation: `${revealImage} 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
        }}
      />

      {/* 3. RESPONSIVE NAVBAR PROTECTOR
        
      */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        
          height: { xs: "80px", md: "160px" },
          background: {
            xs: "linear-gradient(to bottom, rgba(2,21,15,1) 0%, transparent 100%)",
            md: "linear-gradient(to bottom, rgba(2,21,15,0.8) 0%, transparent 100%)"
          },
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* 4. BOTTOM BLEND 
          
      */}
      <Box
        sx={{
          position: "absolute",
          bottom: -1, 
          left: 0,
          width: "100%",
          height: { xs: "15%", md: "25%" },
          background: "linear-gradient(to top, #02150F 15%, transparent 100%)",
          zIndex: 3,
          pointerEvents: "none",
          animation: `${fadeUp} 1s ease-out forwards`,
        }}
      />
    </Box>
  );
};

export default AboutHero;