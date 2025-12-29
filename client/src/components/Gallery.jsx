import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Gallery = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Gallery
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Explore photos from our events, activities, and milestones.
      </Typography>

      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Paper
              elevation={3}
              sx={{
                height: 200,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5',
              }}
            >
              <Typography variant="body2">Image Placeholder</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gallery;
