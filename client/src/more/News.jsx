import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardMedia, CardContent, Grid, Collapse, IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer';
import SaccoGallery from './saccogallery';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  color: '#215732',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    color: '#76ff03',
    transform: expand ? 'scale(1.2) rotate(0deg)' : 'scale(1.2) rotate(180deg)'
  }
}));

const News = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/posts')
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('❌ Error fetching news posts:', error));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExpandClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #215732, #0a3d2e)', py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          mb: 4,
          letterSpacing: '1px',
          textShadow: '0 0 6px #f2a922'
        }}
      >
        MUFATE G SACCO GALLERY
      </Typography>

      <Grid container spacing={4} justifyContent="center" px={2}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={6} key={post.PostID} data-aos="fade-up">
            <Card
              sx={{
                borderRadius: '20px',
                backgroundColor: '#fff',
                boxShadow: 4,
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 0 25px rgba(100, 221, 23, 0.6)',
                  border: '2px solid #64dd17'
                },
                maxWidth: 500,
                mx: 'auto'
              }}
            >
              {/* Cover Image */}
              {post.CoverImage && (
                <CardMedia
                  component="img"
                  height="250"
                  image={post.CoverImage}
                  alt={post.Title}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
              )}

              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#014421',
                    textTransform: 'uppercase',
                    mb: 1,
                  }}
                >
                  {post.Title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>
                  {new Date(post.DatePosted).toLocaleDateString()}
                </Typography>
              </CardContent>

              <CardContent sx={{ pt: 0 }}>
                <ExpandMore
                  expand={expandedPostId === post.PostID}
                  onClick={() => handleExpandClick(post.PostID)}
                  aria-expanded={expandedPostId === post.PostID}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardContent>

              <Collapse in={expandedPostId === post.PostID} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body1" sx={{ color: '#333', whiteSpace: 'pre-line' }}>
                    {post.Content}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ height: '20px', backgroundColor: '#f2a922', mt: 6 }} />
      <SaccoGallery/>
      <Footer />
    </Box>
  );
};

export default News;
