import React, { useState } from "react";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Paper, Stepper, Step, StepLabel, Snackbar, Alert,
  FormControl, InputLabel, Select, MenuItem, FilledInput,
  CircularProgress, Stack
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/VerifiedUser";
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

// --- BORDERLESS GLASS STYLE ---
const professionalCardStyle = {
  background: 'rgba(2, 21, 15, 0.8)',
  backdropFilter: 'blur(25px) saturate(180%)',
  borderRadius: { xs: '24px', md: '32px' },
  border: 'none', // REMOVED BORDERS
  boxShadow: '0 25px 80px rgba(0,0,0,0.6)',
  p: { xs: 2.5, md: 5 },
  position: 'relative',
  overflow: 'hidden'
};

const megaInputStyle = {
  '& .MuiFilledInput-root': {
    color: BRAND.light,
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    border: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': { background: 'rgba(255,255,255,0.08)' },
    '&.Mui-focused': {
      background: 'rgba(255,255,255,0.07)',
      boxShadow: `0 0 0 1px ${BRAND.gold}66, 0 10px 20px -10px ${BRAND.gold}33`,
    },
    '&:before, &:after': { display: 'none' },
  },
  '& label': { 
    color: BRAND.textMuted,
    fontSize: { xs: '0.85rem', md: '1rem' },
  },
  '& label.Mui-focused': { color: BRAND.gold }
};

const refinedGlowBtn = {
  background: `linear-gradient(135deg, ${BRAND.gold}, #FFB84D)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '14px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  px: 4, py: 1.8,
  boxShadow: `0 8px 20px ${BRAND.gold}33`,
  '&:hover': { 
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 25px ${BRAND.gold}55`,
  },
  '&.Mui-disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.2)' }
};

// --- DATA LISTS (Functionality Unchanged) ---
const countiesInKenya = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
const selectOptions = {
  IDType: ["ID Card", "Certificate of Incorp", "Passport"],
  MaritalStatus: ["Married", "Single", "Divorced", "Separated"],
  Gender: ["Male", "Female", "Others"],
  Salutation: ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof"],
  NomineeRelation: ["Wife","Husband","Grandfather","Grandmother","Cousin","Brother","Sister","Friend","Father","Mother","Daughter","Son","Uncle","Aunt"],
};

// --- RESPONSIVE LAYOUT (xs: 12 fixes the cropping on phone) ---
const layout = {
  FullName: { xs: 12, sm: 8 },
  Salutation: { xs: 12, sm: 4 },
  IDType: { xs: 12, sm: 6, md: 4 },
  IDNumber: { xs: 12, sm: 6, md: 4 },
  DOB: { xs: 12, sm: 6, md: 4 },
  MaritalStatus: { xs: 12, sm: 6, md: 4 },
  Gender: { xs: 12, sm: 6, md: 4 },
  KRAPin: { xs: 12, sm: 6, md: 4 },
  County: { xs: 12, sm: 6 },
  District: { xs: 12, sm: 6 },
  Division: { xs: 12, sm: 6 },
  Address: { xs: 12, sm: 6 },
  PostalCode: { xs: 12, sm: 6 },
  PhysicalAddress: { xs: 12, sm: 6 },
  MobileNumber: { xs: 12, sm: 6 },
  AlternateMobileNumber: { xs: 12, sm: 6 },
  Email: { xs: 12, sm: 12 },
  Profession: { xs: 12, sm: 6 },
  ProfessionSector: { xs: 12, sm: 6 },
  NomineeName: { xs: 12, sm: 8 },
  NomineeIDNumber: { xs: 12, sm: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6 },
  NomineeRelation: { xs: 12, sm: 6 },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [regMeta, setRegMeta] = useState({ next_step: null, payment: null, member_id: null, email_warning: null });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("https://mufate-g-sacco.onrender.com/membership-register", formData);
      setRegMeta({
        next_step: data.next_step || null,
        payment: data.payment || null,
        member_id: data.member_id || null,
        email_warning: data.email_warning || null,
      });
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
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(236, 155, 20, 0.08) 0%, transparent 60%)' 
    }}>
      <Container maxWidth="md">
        <Paper sx={professionalCardStyle} component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          
          {/* Top accent line */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />

          {!success ? (
            <>
              <Typography align="center" sx={{ fontWeight: 900, color: BRAND.gold, fontSize: { xs: '1.4rem', md: '2rem' }, textTransform: 'uppercase', letterSpacing: '3px', mb: 4 }}>
                Member Registration
              </Typography>

              {/* CLEAN PROGRESS INDICATOR */}
              <Box sx={{ mb: 6, px: { xs: 0, md: 4 } }}>
                <Box sx={{ height: 2, width: "100%", background: "rgba(255,255,255,0.1)", mb: 4, position: 'relative' }}>
                  <Box sx={{ height: "100%", width: `${((activeStep + 1) / steps.length) * 100}%`, background: BRAND.gold, transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: `0 0 10px ${BRAND.gold}` }} />
                </Box>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepConnector-root': { display: 'none' } }}>
                  {steps.map((s, idx) => (
                    <Step key={s.label}>
                      <StepLabel 
                        StepIconProps={{ sx: { 
                          fontSize: '1.2rem',
                          color: activeStep >= idx ? BRAND.gold : 'rgba(255,255,255,0.2)',
                          '&.Mui-active': { color: BRAND.gold, transform: 'scale(1.2)' },
                        }}}
                      >
                        <Typography sx={{ color: activeStep >= idx ? BRAND.light : BRAND.textMuted, fontWeight: activeStep === idx ? 800 : 500, fontSize: '0.65rem', textTransform: 'uppercase' }}>{s.label}</Typography>
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

              <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mt: 6 }}>
                <Button 
                   disabled={activeStep === 0}
                   onClick={() => setActiveStep(prev => prev - 1)}
                   sx={{ color: BRAND.textMuted, '&:hover': { color: BRAND.gold } }}
                >
                  Back
                </Button>
                
                <Button 
                  sx={refinedGlowBtn} 
                  disabled={loading} 
                  onClick={activeStep < steps.length - 1 ? () => setActiveStep(prev => prev + 1) : confirmSubmission}
                >
                  {activeStep < steps.length - 1 ? "Next Step" : loading ? <CircularProgress size={24} color="inherit" /> : "Complete Registration"}
                </Button>
              </Stack>
            </>
          ) : (
            <Box textAlign="center" py={4}>
              <CheckCircleIcon sx={{ fontSize: 80, color: BRAND.gold, mb: 2 }} />
              <Typography sx={{ color: BRAND.light, fontWeight: 900, fontSize: '1.8rem', mb: 2 }}>SUBMISSION COMPLETE</Typography>
              <Typography sx={{ color: BRAND.textMuted, mb: 4 }}>Your application is being reviewed by our compliance team.</Typography>
              <Button sx={refinedGlowBtn} onClick={() => window.location.href = '/'}>Back to Dashboard</Button>
            </Box>
          )}

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
             <ShieldIcon sx={{ color: BRAND.gold, fontSize: '0.9rem' }} />
             <Typography sx={{ color: BRAND.textMuted, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px' }}>
               ISO 27001 CERTIFIED DATA ENCRYPTION
             </Typography>
          </Stack>
        </Paper>
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '12px', background: snackbar.severity === 'success' ? '#052b12' : '#d32f2f' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default MemberRegistration;