import React, { useState } from "react";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Paper, Stepper, Step, StepLabel, Snackbar, Alert,
  FormControl, InputLabel, Select, MenuItem, FilledInput,
  CircularProgress, Stack
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/VerifiedUser";
import axios from "axios";

// --- BRAND TOKENS (Sourced from Contact Page) ---
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

// --- UNIFIED STYLES ---
const professionalCardStyle = {
  background: 'rgba(2, 21, 15, 0.7)',
  backdropFilter: 'blur(20px) saturate(160%)',
  borderRadius: '32px',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderTop: `4px solid ${BRAND.gold}`,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
  p: { xs: 3, md: 5 },
};

const megaInputStyle = {
  '& .MuiFilledInput-root': {
    color: BRAND.light,
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    '&:hover': { background: 'rgba(255,255,255,0.05)' },
    '&.Mui-focused': {
      background: 'rgba(255,255,255,0.05)',
      borderColor: BRAND.gold,
      borderWidth: '1px',
    },
    '&:before, &:after': { display: 'none' },
  },
  '& label': { color: BRAND.textMuted },
  '& label.Mui-focused': { color: BRAND.gold }
};

const refinedGlowBtn = {
  background: `linear-gradient(90deg, ${BRAND.gold}, #FFB84D)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '12px',
  px: 4, py: 1.5,
  transition: '0.3s',
  '&:hover': { transform: 'scale(1.02)', boxShadow: `0 10px 20px ${BRAND.gold}44` },
  '&.Mui-disabled': { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
};

// --- DATA LISTS (Kept Intact) ---
const countiesInKenya = ["Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];
const selectOptions = {
  IDType: ["ID Card", "Certificate of Incorp", "Group Registration Certificate", "Passport"],
  MaritalStatus: ["Married", "Single", "Divorced", "Separated"],
  Gender: ["Male", "Female", "Others"],
  Salutation: ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof"],
  NomineeRelation: ["Wife","Husband","Grandfather","Grandmother","Cousin","Brother","Sister","Friend","Father","Mother","Daughter","Son","Uncle","Aunt"],
};

const layout = {
  FullName: { xs: 12, sm: 8 }, Salutation: { xs: 12, sm: 4 },
  IDType: { xs: 12, sm: 6, md: 4 }, IDNumber: { xs: 12, sm: 6, md: 4 }, DOB: { xs: 12, sm: 6, md: 4 },
  MaritalStatus: { xs: 12, sm: 6, md: 4 }, Gender: { xs: 12, sm: 6, md: 4 }, KRAPin: { xs: 12, sm: 6, md: 6 },
  County: { xs: 12, sm: 6 }, District: { xs: 12, sm: 6 }, Division: { xs: 12, sm: 6 }, Address: { xs: 12, sm: 6 },
  PostalCode: { xs: 12, sm: 6 }, PhysicalAddress: { xs: 12, sm: 6 }, MobileNumber: { xs: 12, sm: 6 },
  AlternateMobileNumber: { xs: 12, sm: 6 }, Email: { xs: 12, sm: 6 }, Profession: { xs: 12, sm: 6 },
  ProfessionSector: { xs: 12, sm: 6 }, NomineeName: { xs: 12, sm: 8 }, NomineeIDNumber: { xs: 12, sm: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6 }, NomineeRelation: { xs: 12, sm: 6 },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [regMeta, setRegMeta] = useState({ next_step: null, payment: null, member_id: null, email_warning: null });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

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
      minHeight: "100vh", py: 8, 
      backgroundColor: BRAND.dark,
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(236, 155, 20, 0.05) 0%, transparent 50%)' 
    }}>
      <Container maxWidth="md">
        <Paper sx={professionalCardStyle} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          {!success ? (
            <>
              <Typography align="center" sx={{ fontWeight: 900, color: BRAND.gold, fontSize: { xs: '1.5rem', md: '2.2rem' }, textTransform: 'uppercase', letterSpacing: '2px', mb: 4 }}>
                Member Registration
              </Typography>

              {/* UNIFIED STEPPER */}
              <Box sx={{ mb: 6 }}>
                <Box sx={{ height: 4, width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: 2, mb: 4, position: 'relative' }}>
                  <Box sx={{ height: "100%", width: `${((activeStep + 1) / steps.length) * 100}%`, background: BRAND.gold, transition: "0.5s ease", boxShadow: `0 0 15px ${BRAND.gold}` }} />
                </Box>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepConnector-line': { borderColor: 'rgba(255,255,255,0.1)' } }}>
                  {steps.map((s, idx) => (
                    <Step key={s.label}>
                      <StepLabel 
                        StepIconProps={{ sx: { 
                          color: activeStep >= idx ? BRAND.gold : 'rgba(255,255,255,0.1)',
                          '&.Mui-active': { color: BRAND.gold, filter: `drop-shadow(0 0 8px ${BRAND.gold})` },
                          '&.Mui-completed': { color: BRAND.gold }
                        }}}
                      >
                        <Typography sx={{ color: activeStep >= idx ? BRAND.light : BRAND.textMuted, fontWeight: 700, fontSize: '0.75rem' }}>{s.label}</Typography>
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

              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                {activeStep > 0 && (
                  <Button variant="outlined" sx={{ color: BRAND.gold, borderColor: BRAND.gold, borderRadius: '12px', px: 4 }} onClick={prevStep}>Back</Button>
                )}
                <Button sx={refinedGlowBtn} disabled={loading} onClick={activeStep < steps.length - 1 ? nextStep : confirmSubmission}>
                  {activeStep < steps.length - 1 ? "Continue" : loading ? <CircularProgress size={24} color="inherit" /> : "Submit Application"}
                </Button>
              </Stack>
            </>
          ) : (
            /* SUCCESS VIEW - MATCHES CONTACT MODAL VIBE */
            <Box textAlign="center" component={motion.div} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <Box sx={{ width: 80, height: 80, borderRadius: '50%', background: BRAND.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4 }}>
                <CheckCircleIcon sx={{ fontSize: 40, color: BRAND.dark }} />
              </Box>
              <Typography sx={{ color: BRAND.gold, fontWeight: 900, fontSize: '1.8rem', mb: 2 }}>SUBMITTED SUCCESSFULLY</Typography>
              <Stack spacing={2} sx={{ color: BRAND.light, opacity: 0.8, mb: 4 }}>
                <Typography>Your registration for <strong>Golden Generation DT SACCO</strong> is being processed.</Typography>
                {regMeta.member_id && <Typography sx={{ color: BRAND.gold }}>Member ID: {regMeta.member_id}</Typography>}
                {regMeta.payment?.required && (
                  <Box sx={{ p: 2, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: `1px dashed ${BRAND.gold}` }}>
                    <Typography>Required Registration Fee: <strong>KES {regMeta.payment.amount}</strong></Typography>
                  </Box>
                )}
              </Stack>
              <Button sx={refinedGlowBtn} onClick={() => window.location.href = '/'}>Return to Home</Button>
            </Box>
          )}

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
             <ShieldIcon sx={{ color: BRAND.gold, fontSize: '1rem' }} />
             <Typography sx={{ color: BRAND.textMuted, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '1px' }}>
               SECURE ENCRYPTED REGISTRATION PORTAL
             </Typography>
          </Box>
        </Paper>
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: '12px' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default MemberRegistration;