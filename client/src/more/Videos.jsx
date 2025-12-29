import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const Videos = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Videos
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Watch videos covering our services, events, and announcements.
      </Typography>

      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Paper
              elevation={3}
              sx={{
                height: 220,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#000',
                color: '#fff',
              }}
            >
              <Typography variant="body2">Video Placeholder</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Videos;
