import React from "react";
import { Box } from "@mui/material";

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        backgroundColor: "#02150F", // Fills any gaps on ultra-wide screens
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 1. THE IMAGE LAYER
          Using 'width: 100%' and 'height: auto' is the ONLY way to 
          ensure 100% of the image is shown without any cropping.
      */}
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="Golden Generation DT SACCO Team"
        sx={{
          width: "100%",
          height: "auto", // Respects the original photo's dimensions
          display: "block",
        }}
      />

      {/* 2. THE NAVBAR PROTECTOR (Top Overlay)
          This stays on top of the image so your white menu links 
          are readable over the building's roof.
      */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          // Adjust height based on your navbar thickness
          height: { xs: "80px", md: "140px" }, 
          background: "linear-gradient(to bottom, rgba(2,21,15,0.8), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* 3. THE BOTTOM BLEND (Optional)
          Makes the grass fade into your next section smoothly.
      */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "15%",
          background: "linear-gradient(to top, #02150F, transparent)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default AboutHero;