import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';

const News = () => {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        News & Updates
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Stay informed with the latest announcements and updates.
      </Typography>

      <Stack spacing={3}>
        {[1, 2, 3].map((item) => (
          <Paper
            key={item}
            elevation={2}
            sx={{ p: 3, borderRadius: 2 }}
          >
            <Typography variant="h6" fontWeight="bold">
              News Title {item}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a brief summary of the news article. More details will
              be added here later.
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default News;
