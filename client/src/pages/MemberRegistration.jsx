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

// --- BALANCED RESPONSIVE LAYOUT ---
// We use 6 columns (half-width) for small fields on laptop (md) 
// to ensure labels like "Salutation" are NEVER cropped.
const layout = {
  FullName: { xs: 12, md: 8 },
  Salutation: { xs: 12, sm: 6, md: 4 }, 
  IDType: { xs: 12, sm: 6, md: 6 },     
  IDNumber: { xs: 12, sm: 6, md: 6 },
  DOB: { xs: 12, sm: 6, md: 4 },
  MaritalStatus: { xs: 12, sm: 6, md: 4 },
  Gender: { xs: 12, sm: 6, md: 4 },
  KRAPin: { xs: 12, md: 12 },

  County: { xs: 12, sm: 6 },
  District: { xs: 12, sm: 6 },
  Division: { xs: 12, sm: 6 },
  Address: { xs: 12, sm: 6 },
  PostalCode: { xs: 12, sm: 6 },
  PhysicalAddress: { xs: 12, sm: 6 },
  MobileNumber: { xs: 12, sm: 6 },
  AlternateMobileNumber: { xs: 12, sm: 6 },
  Email: { xs: 12 },
  Profession: { xs: 12, sm: 6 },
  ProfessionSector: { xs: 12, sm: 6 },

  NomineeName: { xs: 12, md: 8 },
  NomineeIDNumber: { xs: 12, sm: 6, md: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6 },
  NomineeRelation: { xs: 12, sm: 6 },
};

const megaInputStyle = {
  mb: 1,
  '& .MuiFilledInput-root': {
    color: BRAND.light,
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '20px', // Restored the big rounded look
    border: '1px solid rgba(255,255,255,0.1)',
    minHeight: '65px', 
    transition: 'all 0.3s ease',
    '&:hover': { background: 'rgba(255,255,255,0.08)' },
    '&.Mui-focused': {
      background: 'rgba(255,255,255,0.07)',
      borderColor: BRAND.gold,
      boxShadow: `0 0 0 1px ${BRAND.gold}`,
    },
    '&:before, &:after': { display: 'none' },
  },
  '& label': { 
    color: BRAND.textMuted,
    fontSize: '1rem',
    marginLeft: '8px',
    '&.Mui-focused, &.MuiInputLabel-shrink': {
      color: BRAND.gold,
      marginLeft: '0px',
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
      await axios.post("https://mufate-g-sacco.onrender.com/membership-register", formData);
      setSuccess(true);
    } catch (error) {
      setSnackbar({ open: true, message: "Registration failed.", severity: "error" });
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
          <Select 
            name={field} 
            value={formData[field] || ""} 
            onChange={handleChange} 
            input={<FilledInput disableUnderline />}
            MenuProps={{ PaperProps: { sx: { bgcolor: BRAND.dark, color: BRAND.light } } }}
          >
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
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 8 }, backgroundColor: BRAND.dark }}>
      <Container maxWidth="md">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography align="center" variant="h4" sx={{ fontWeight: 900, color: BRAND.gold, mb: 4, textTransform: 'uppercase' }}>
                Member Registration
              </Typography>

              <Box sx={{ mb: 6 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((s) => (
                    <Step key={s.label}>
                      <StepLabel StepIconProps={{ sx: { color: 'rgba(255,255,255,0.1)', '&.Mui-active': { color: BRAND.gold } } }}>
                        <Typography sx={{ color: BRAND.light, fontWeight: 700, fontSize: '0.8rem' }}>{s.label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Grid container spacing={2}>
                {stepFields[activeStep].map((field) => (
                  <Grid item key={field} {...layout[field]}>{renderField(field)}</Grid>
                ))}
              </Grid>

              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
                {activeStep > 0 && <Button onClick={() => setActiveStep(prev => prev - 1)} sx={{ color: BRAND.light }}>Back</Button>}
                <Button 
                  onClick={activeStep < 2 ? () => setActiveStep(prev => prev + 1) : confirmSubmission}
                  variant="contained" 
                  sx={{ bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900, borderRadius: '15px', px: 6, py: 1.5, '&:hover': { bgcolor: '#d48a12' } }}
                >
                  {activeStep < 2 ? "CONTINUE" : "REGISTER"}
                </Button>
              </Stack>
            </motion.div>
          ) : (
            <Box textAlign="center" py={10}>
               <CheckCircleIcon sx={{ fontSize: 80, color: BRAND.gold, mb: 2 }} />
               <Typography variant="h4" sx={{ color: BRAND.gold, fontWeight: 900 }}>REGISTRATION SUCCESSFUL</Typography>
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

const countiesInKenya = ["Nairobi", "Mombasa", "Kiambu", "Nakuru", "Kisumu"]; // Add more as needed
const selectOptions = {
  IDType: ["ID Card", "Passport"],
  MaritalStatus: ["Married", "Single"],
  Gender: ["Male", "Female"],
  Salutation: ["Mr", "Mrs", "Ms", "Dr"],
  NomineeRelation: ["Spouse", "Parent", "Child", "Sibling"],
};

export default MemberRegistration;