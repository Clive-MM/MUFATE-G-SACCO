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

// --- UPDATED LAYOUT (Extended widths to prevent cropping) ---
const layout = {
  // Bio Data
  FullName: { xs: 12, sm: 8, md: 8 },
  Salutation: { xs: 12, sm: 4, md: 4 }, 
  IDType: { xs: 12, sm: 6, md: 6 },     
  IDNumber: { xs: 12, sm: 6, md: 6 },
  DOB: { xs: 12, sm: 6, md: 4 },
  MaritalStatus: { xs: 12, sm: 6, md: 4 },
  Gender: { xs: 12, sm: 6, md: 4 },
  KRAPin: { xs: 12, sm: 12, md: 12 },   

  // Contact
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

  // Nominee
  NomineeName: { xs: 12, sm: 8 },
  NomineeIDNumber: { xs: 12, sm: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6 },
  NomineeRelation: { xs: 12, sm: 6 },
};

const megaInputStyle = {
  '& .MuiFilledInput-root': {
    color: BRAND.light,
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '16px',
    border: 'none',
    minHeight: '62px', 
    minWidth: '120px',
    transition: 'all 0.3s ease',
    '&:hover': { background: 'rgba(255,255,255,0.08)' },
    '&.Mui-focused': {
      background: 'rgba(255,255,255,0.07)',
      boxShadow: `0 0 0 1px ${BRAND.gold}66`,
    },
    '&:before, &:after': { display: 'none' },
  },
  '& label': { 
    color: BRAND.textMuted,
    fontSize: '0.95rem',
    whiteSpace: 'nowrap',
  },
  '& label.Mui-focused': { color: BRAND.gold }
};

const refinedGlowBtn = {
  background: `linear-gradient(135deg, ${BRAND.gold}, #FFB84D)`,
  color: BRAND.dark,
  fontWeight: 900,
  borderRadius: '14px',
  px: 8, py: 2,
  boxShadow: `0 8px 20px ${BRAND.gold}33`,
  '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 12px 25px ${BRAND.gold}55` },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // ✅ FIX: Bring back regMeta so setRegMeta exists (no layout/styling change)
  const [regMeta, setRegMeta] = useState({
    next_step: null,
    payment: null,
    member_id: null,
    email_warning: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://mufate-g-sacco.onrender.com/membership-register",
        formData
      );

      // ✅ Now setRegMeta is defined and build will pass
      setRegMeta({
        next_step: data.next_step || null,
        payment: data.payment || null,
        member_id: data.member_id || null,
        email_warning: data.email_warning || null,
      });

      setSuccess(true);
      setSnackbar({ open: true, message: data.message, severity: "success" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Registration failed.",
        severity: "error",
      });
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
          >
            {options.map((op) => (
              <MenuItem key={op} value={op}>
                {op}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth
        variant="filled"
        required={field !== "KRAPin"}
        name={field}
        label={field}
        value={formData[field] || ""}
        onChange={handleChange}
        type={field === "DOB" ? "date" : "text"}
        InputLabelProps={{ shrink: true }}
        sx={megaInputStyle}
        InputProps={{ disableUnderline: true }}
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
      minHeight: "100vh",
      py: { xs: 4, md: 10 }, 
      backgroundColor: BRAND.dark,
      backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(236, 155, 20, 0.05) 0%, transparent 70%)' 
    }}>
      <Container maxWidth="md">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Typography
                align="center"
                sx={{
                  fontWeight: 900,
                  color: BRAND.gold,
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  textTransform: "uppercase",
                  letterSpacing: "4px",
                  mb: 2,
                }}
              >
                Member Registration
              </Typography>

              <Typography align="center" sx={{ color: BRAND.textMuted, mb: 6, fontSize: "0.9rem" }}>
                Complete the registration process to become our member.
              </Typography>

              <Box sx={{ mb: 8 }}>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ "& .MuiStepConnector-line": { borderColor: "rgba(255,255,255,0.05)" } }}
                >
                  {steps.map((s, idx) => (
                    <Step key={s.label}>
                      <StepLabel
                        StepIconProps={{
                          sx: {
                            color: activeStep >= idx ? BRAND.gold : "rgba(255,255,255,0.1)",
                            "&.Mui-active": {
                              color: BRAND.gold,
                              filter: `drop-shadow(0 0 10px ${BRAND.gold}66)`,
                            },
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            color: activeStep >= idx ? BRAND.light : BRAND.textMuted,
                            fontWeight: 700,
                            fontSize: "0.7rem",
                          }}
                        >
                          {s.label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Grid container spacing={3}>
                {stepFields[activeStep].map((field) => (
                  <Grid item key={field} {...layout[field]}>
                    {renderField(field)}
                  </Grid>
                ))}
              </Grid>

              <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 8 }}>
                {activeStep > 0 && (
                  <Button
                    variant="text"
                    sx={{ color: BRAND.textMuted, px: 4 }}
                    onClick={() => setActiveStep((prev) => prev - 1)}
                  >
                    Back
                  </Button>
                )}

                <Button
                  sx={refinedGlowBtn}
                  disabled={loading}
                  onClick={
                    activeStep < steps.length - 1
                      ? () => setActiveStep((prev) => prev + 1)
                      : confirmSubmission
                  }
                >
                  {activeStep < steps.length - 1 ? (
                    "Continue"
                  ) : loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register"
                  )}
                </Button>
              </Stack>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: "center" }}
            >
              <CheckCircleIcon sx={{ fontSize: 100, color: BRAND.gold, mb: 4 }} />
              <Typography sx={{ color: BRAND.gold, fontWeight: 900, fontSize: "2.5rem", mb: 2 }}>
                SUCCESS
              </Typography>
              <Typography
                sx={{
                  color: BRAND.light,
                  maxWidth: "500px",
                  mx: "auto",
                  mb: 6,
                  opacity: 0.8,
                }}
              >
                Your membership application has been received.
              </Typography>
              <Button sx={refinedGlowBtn} onClick={() => (window.location.href = "/")}>
                Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: "12px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const countiesInKenya = [
  "Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega",
  "Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni",
  "Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua",
  "Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka-Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga",
  "Wajir","West Pokot"
];

const selectOptions = {
  IDType: ["ID Card", "Certificate of Incorp", "Passport"],
  MaritalStatus: ["Married", "Single", "Divorced", "Separated"],
  Gender: ["Male", "Female", "Others"],
  Salutation: ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof"],
  NomineeRelation: ["Wife","Husband","Grandfather","Grandmother","Cousin","Brother","Sister","Friend","Father","Mother","Daughter","Son","Uncle","Aunt"],
};

export default MemberRegistration;
