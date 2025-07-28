import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../components/Footer';

const BosaProducts = () => {
  const [bosaLoans, setBosaLoans] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/services')
      .then(res => {
        const filtered = res.data.services.filter(service => service.ServiceCategory === 'BOSA');
        setBosaLoans(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleExpandClick = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const filteredLoans = bosaLoans.filter((loan) =>
    loan.ServiceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #5cdf0aff, #9ff107)', py: 6 }}>
      {/* Section Heading */}
      <Typography
        variant="h5"
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
        BOSA Loan Products
      </Typography>

      {/* Search Bar */}
      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search BOSA loan..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ backgroundColor: '#fff', borderRadius: 2 }}
        />
      </Box>

      {/* Grid Layout */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4,
          alignItems: 'start',
          gridAutoRows: 'minmax(auto, max-content)' // ✅ Prevent layout jumping
        }}
      >
        {filteredLoans.map((loan, index) => {
          const isExpanded = expanded === index;

          return (
            <Card
              key={loan.ServiceID}
              data-aos="zoom-in"
              sx={{
                borderRadius: '20px',
                backgroundColor: isExpanded ? '#fafff5' : '#fff',
                border: isExpanded ? '2px solid #64dd17' : '2px solid transparent',
                boxShadow: isExpanded
                  ? '0 0 25px rgba(100, 221, 23, 0.5)'
                  : '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.4s ease',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transform: isExpanded ? 'scale(1.02)' : 'scale(1)', // ✅ Subtle enlarge effect
                zIndex: isExpanded ? 5 : 1, // ✅ Ensure expanded card is on top
                position: 'relative'
              }}
            >
              {/* Card Header */}
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: '#215732' }}><AccountBalanceIcon /></Avatar>}
                title={loan.ServiceName}
              />

              {/* Card Image */}
              {loan.ImageURL && (
                <CardMedia
                  component="img"
                  height="250"
                  image={loan.ImageURL}
                  alt={loan.ServiceName}
                  sx={{ objectFit: 'cover' }}
                />
              )}

              {/* Short Description */}
              <CardContent>
                <Typography variant="body2" sx={{ color: '#555' }}>
                  {loan.Description}
                </Typography>
              </CardContent>

              {/* Expand Button */}
              <CardActions disableSpacing>
                <IconButton
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={isExpanded}
                  aria-label="show more"
                  sx={{
                    marginLeft: 'auto',
                    color: '#215732',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      color: '#76ff03',
                      transform: 'scale(1.2) rotate(180deg)',
                    }
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>

              {/* Expandable Section */}
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                  {loan.Features && (
                    <Box mb={2}>
                      <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Features</Typography>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
                        {loan.Features.split('.').filter(f => f.trim() !== '').map((f, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{f.trim()}</li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {loan.Benefits && (
                    <Box>
                      <Typography sx={{ fontWeight: 'bold', color: '#2e7d32' }}>Benefits</Typography>
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#444' }}>
                        {loan.Benefits.split('.').filter(b => b.trim() !== '').map((b, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{b.trim()}</li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {loan.LoanFormURL && (
                    <Box sx={{ mt: 2 }}>
                      <a
                        href={loan.LoanFormURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(90deg, #64dd17, #76ff03)',
                          color: '#fff',
                          fontWeight: 'bold',
                          padding: '10px 20px',
                          borderRadius: '30px',
                          textDecoration: 'none',
                          boxShadow: '0 0 12px rgba(118, 255, 3, 0.6)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Download Form
                      </a>
                    </Box>
                  )}
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Box>

      {/* Footer */}
      <Box sx={{ height: '20px', backgroundColor: '#f2a922', mt: 6 }} />
      <Footer />
    </Box>
  );
};

export default BosaProducts;
