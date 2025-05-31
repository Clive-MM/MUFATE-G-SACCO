import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const News = () => {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('❌ Error fetching news posts:', error));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleExpandClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 6, flexGrow: 1 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 5,
          }}
        >
          MUFATE G SACCO News & Updates
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {posts.map(post => (
            <Grid item xs={12} sm={6} md={6} key={post.PostID} data-aos="fade-up">
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'all 0.4s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(34, 139, 34, 0.4)',
                    transform: 'translateY(-6px)',
                    borderColor: 'green',
                  },
                }}
              >
                {post.CoverImage && (
                  <CardMedia
                    component="img"
                    height="220"
                    image={post.CoverImage}
                    alt={post.Title}
                    sx={{ objectFit: 'cover' }}
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
      </Box>

      <Footer />
    </Box>
  );
};

export default News;
