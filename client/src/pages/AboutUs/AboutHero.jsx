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
        height: { xs: "55vh", sm: "65vh", md: "75vh" },
        minHeight: { xs: 320, md: 520 },
        backgroundColor: "#02150F",
      }}
    >
      {/* ✅ Real image (sharp + fills full hero like your screenshot) */}
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="Golden Generation DT SACCO Team"
        loading="lazy"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // ✅ fills entire section
          objectPosition: { xs: "center 20%", md: "center 25%" }, // ✅ keeps faces safe
          display: "block",
        }}
      />

      {/* ✅ Top dark overlay (optional, for navbar visibility) */}
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

      {/* ✅ Bottom overlay (optional for smooth transition) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "22%",
          background:
            "linear-gradient(to top, rgba(2,21,15,0.85), transparent)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};

export default AboutHero;
