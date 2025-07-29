import React, { useEffect, useState } from "react";
import axios from "axios";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import {
  Container,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { motion } from "framer-motion";

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    return 3;
  };

  useEffect(() => {
    axios
      .get("https://mufate-g-sacco.onrender.com/gallery")
      .then((res) => {
        setPhotos(res.data.gallery || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6 } }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "1.8rem", md: "2.5rem" },
          fontWeight: "bold",
          color: "#fff",
          mb: 4,
        }}
      >
        📸 MUFATE G SACCO GALLERY
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <LightGallery speed={500} plugins={[]} elementClassNames="custom-gallery">
          <ImageList
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "auto",
            }}
            cols={getCols()}
            gap={16}
          >
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
              >
                <ImageListItem>
                  <a
                    href={photo.ImageURL}
                    data-sub-html={`<div style="text-align:center; padding:10px;">
                                      <h3 style="margin:0; font-size:20px; font-weight:bold;">${photo.Title}</h3>
                                      <p style="margin:5px 0 0; font-size:16px; color:#ddd;">${photo.Description || ""}</p>
                                    </div>`}
                  >
                    <img
                      src={`${photo.ImageURL}`}
                      alt={photo.Title}
                      loading="lazy"
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        display: "block",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </a>

                  <ImageListItemBar
                    title={photo.Title}
                    subtitle={photo.Description || ""}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.8)" }}
                        aria-label={`info about ${photo.Title}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                      "& .MuiImageListItemBar-title": {
                        fontWeight: "bold",
                        fontSize: "1rem",
                      },
                      "& .MuiImageListItemBar-subtitle": {
                        fontSize: "0.85rem",
                        fontStyle: "italic",
                      },
                    }}
                  />
                </ImageListItem>
              </motion.div>
            ))}
          </ImageList>
        </LightGallery>
      )}
    </Container>
  );
};

export default SaccoGallery;
