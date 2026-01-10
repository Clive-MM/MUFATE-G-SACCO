import React, { useState } from "react";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Stepper, Step, StepLabel, Snackbar, Alert,
  FormControl, InputLabel, Select, MenuItem, FilledInput,
  CircularProgress, Stack
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

// --- BRAND TOKENS ---
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const steps = [
  { label: "Bio Data", icon: <PersonIcon /> },
  { label: "Contact", icon: <ContactPhoneIcon /> },
  { label: "Nominee", icon: <GroupIcon /> }
];

// --- UPDATED LAYOUT: Increased 'md' values to prevent laptop cropping ---
const layout = {
  // Bio Data
  FullName: { xs: 12, sm: 12, md: 8 },
  Salutation: { xs: 12, sm: 6, md: 4 }, // Increased md from 2/3 to 4
  IDType: { xs: 12, sm: 6, md: 6 },     // Increased to half-width for label space
  IDNumber: { xs: 12, sm: 6, md: 6 },
  DOB: { xs: 12, sm: 6, md: 4 },
  MaritalStatus: { xs: 12, sm: 6, md: 4 }, // Increased from 3 to 4
  Gender: { xs: 12, sm: 6, md: 4 },
  KRAPin: { xs: 12, sm: 12, md: 12 },   

  // Contact
  County: { xs: 12, sm: 6, md: 4 },
  District: { xs: 12, sm: 6, md: 4 },
  Division: { xs: 12, sm: 6, md: 4 },
  Address: { xs: 12, sm: 6, md: 6 },
  PostalCode: { xs: 12, sm: 6, md: 6 },
  PhysicalAddress: { xs: 12, sm: 6, md: 6 },
  MobileNumber: { xs: 12, sm: 6, md: 6 },
  AlternateMobileNumber: { xs: 12, sm: 6, md: 6 },
  Email: { xs: 12, sm: 12, md: 12 },
  Profession: { xs: 12, sm: 6, md: 6 },
  ProfessionSector: { xs: 12, sm: 6, md: 6 },

  // Nominee
  NomineeName: { xs: 12, sm: 12, md: 8 },
  NomineeIDNumber: { xs: 12, sm: 6, md: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6, md: 6 },
  NomineeRelation: { xs: 12, sm: 6, md: 6 },
};

const megaInputStyle = {
  '& .MuiFilledInput-root': {
    color: BRAND.light,
    background: 'rgba(255,255,255,0.06)', // Slightly more visible
    borderRadius: '16px',
    border: 'none',
    minHeight: '64px', 
    transition: 'all 0.2s ease-in-out',
    '&:hover': { background: 'rgba(255,255,255,0.1)' },
    '&.Mui-focused': {
      background: 'rgba(255,255,255,0.08)',
      boxShadow: `0 8px 24px -10px ${BRAND.gold}44`, // Soft glow when active
    },
    '&:before, &:after': { display: 'none' },
  },
  '& .MuiInputLabel-root': { 
    color: BRAND.textMuted,
    fontSize: '0.95rem',
    transform: 'translate(12px, 20px) scale(1)', // Better vertical alignment
    '&.Mui-focused, &.MuiInputLabel-shrink': {
       transform: 'translate(12px, 7px) scale(0.75)',
       color: BRAND.gold
    }
  },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("https://mufate-g-sacco.onrender.com/membership-register", formData);
      setSuccess(true);
      setSnackbar({ open: true, message: data.message, severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.message || "Registration failed.", severity: "error" });
    }
    setLoading(false);
  };

  const renderField = (field) => {
    const isSelect = selectOptions[field] || field === "County";
    const options = field === "County" ? countiesInKenya : selectOptions[field];

    if (isSelect) {
      return (
        <FormControl variant="filled" fullWidth required sx={megaInputStyle}>
          <InputLabel>{field === "NomineeRelation" ? "Relation" : field}</InputLabel>
          <Select name={field} value={formData[field] || ""} onChange={handleChange} input={<FilledInput disableUnderline />}>
            {options.map((op) => (<MenuItem key={op} value={op}>{op}</MenuItem>))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth variant="filled" required={field !== "KRAPin"} name={field} label={field}
        value={formData[field] || ""} onChange={handleChange} type={field === "DOB" ? "date" : "text"}
        InputLabelProps={{ shrink: true }} sx={megaInputStyle} InputProps={{ disableUnderline: true }}
      />
    );
  };

  const stepFields = [
    ["FullName","Salutation","IDType","IDNumber","DOB","MaritalStatus","Gender","KRAPin"],
    ["County","District","Division","Address","PostalCode","PhysicalAddress","MobileNumber","AlternateMobileNumber","Email","Profession","ProfessionSector"],
    ["NomineeName","NomineeIDNumber","NomineePhoneNumber","NomineeRelation"],
  ];

  return (
    <Box sx={{ 
      minHeight: "100vh", py: { xs: 4, md: 8 }, 
      backgroundColor: BRAND.dark,
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(236, 155, 20, 0.05) 0%, transparent 75%)' 
    }}>
      <Container maxWidth="md">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Typography align="center" sx={{ fontWeight: 900, color: BRAND.gold, fontSize: { xs: '1.8rem', md: '2.4rem' }, textTransform: 'uppercase', letterSpacing: '4px', mb: 1 }}>
                Member Registration
              </Typography>
              <Typography align="center" sx={{ color: BRAND.textMuted, mb: 6, fontSize: '0.9rem' }}>
                Complete the registration process to become our member.
              </Typography>

              {/* CLEAN STEPPER */}
              <Box sx={{ mb: 8 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((s, idx) => (
                    <Step key={s.label}>
                      <StepLabel 
                        StepIconProps={{ sx: { 
                          color: activeStep >= idx ? BRAND.gold : 'rgba(255,255,255,0.1)',
                          '&.Mui-active': { color: BRAND.gold, filter: `drop-shadow(0 0 10px ${BRAND.gold}66)` },
                          '& .MuiStepIcon-text': { fill: BRAND.dark, fontWeight: 900 }
                        }}}
                      >
                        <Typography sx={{ color: activeStep >= idx ? BRAND.light : BRAND.textMuted, fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>{s.label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Grid container spacing={2.5}>
                {stepFields[activeStep].map((field) => (
                  <Grid item key={field} {...layout[field]}>{renderField(field)}</Grid>
                ))}
              </Grid>

              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 8 }}>
                {activeStep > 0 && (
                  <Button variant="text" sx={{ color: BRAND.textMuted, px: 4, fontWeight: 700 }} onClick={() => setActiveStep(prev => prev - 1)}>BACK</Button>
                )}
                <Button 
                  variant="contained"
                  sx={{ 
                    background: BRAND.gold, color: BRAND.dark, fontWeight: 900, borderRadius: '12px', px: 8, py: 2,
                    '&:hover': { background: '#FFB84D' }
                  }} 
                  disabled={loading} 
                  onClick={activeStep < steps.length - 1 ? () => setActiveStep(prev => prev + 1) : confirmSubmission}
                >
                  {activeStep < steps.length - 1 ? "CONTINUE" : loading ? <CircularProgress size={24} color="inherit" /> : "REGISTER"}
                </Button>
              </Stack>
            </motion.div>
          ) : (
            <Box textAlign="center" py={10}>
              <CheckCircleIcon sx={{ fontSize: 100, color: BRAND.gold, mb: 4 }} />
              <Typography sx={{ color: BRAND.gold, fontWeight: 900, fontSize: '2.5rem', mb: 2 }}>SUCCESS</Typography>
              <Typography sx={{ color: BRAND.light, opacity: 0.8 }}>Thank you for joining Golden Generation DT SACCO.</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

// ... (countiesInKenya and selectOptions remain the same)
const countiesInKenya = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
const selectOptions = {
  IDType: ["ID Card", "Certificate of Incorp", "Passport"],
  MaritalStatus: ["Married", "Single", "Divorced", "Separated"],
  Gender: ["Male", "Female", "Others"],
  Salutation: ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof"],
  NomineeRelation: ["Wife","Husband","Grandfather","Grandmother","Cousin","Brother","Sister","Friend","Father","Mother","Daughter","Son","Uncle","Aunt"],
};

export default MemberRegistration;