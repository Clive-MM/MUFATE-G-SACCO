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
        backgroundColor: "#02150F",

        // ✅ FULL HERO HEIGHT STYLE
        height: { xs: "55vh", sm: "65vh", md: "75vh" },
        minHeight: { xs: "320px", md: "500px" },

        // ✅ FULL IMAGE OCCUPIES THE WHOLE SECTION
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: "cover",          // ✅ fills whole section
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center 25%",  // ✅ keeps faces safe (slightly up)
      }}
    >
      {/* ✅ top dark fade only for navbar readability (NOT a shadow) */}
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

      {/* ✅ optional bottom fade for smooth section transition */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "18%",
          background: "linear-gradient(to top, rgba(2,21,15,0.85), transparent)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default AboutHero;
