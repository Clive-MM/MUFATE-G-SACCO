// src/pages/MemberRegistration.jsx
import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Paper, Stepper, Step, StepLabel, Snackbar, Alert,
  FormControl, InputLabel, Select, MenuItem, FilledInput
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

/* ============================================================
   🔥 BRAND COLORS
============================================================ */
const gold = "#FFD700";
const goldSoft = "#FFF4B5";
const greenDark = "#011407";
const greenDeep = "#01240F";

/* ============================================================
   🔥 ORIGINAL NEUMORPHISM BUT REBRANDED TO GOLD & DARK GREEN
============================================================ */
const neuStyle = {
  borderRadius: "18px",
  background: greenDeep,
  border: "1px solid rgba(255,215,0,0.25)",
  boxShadow:
    "0 0 18px rgba(255,215,0,0.25), inset 0 0 18px rgba(0,0,0,0.3)",
  padding: "24px",
  transition: "0.3s ease",
};

/* ============================================================
   🔥 INPUT STYLE — GOLDEN LABEL, CLEAR TEXT, SAME LAYOUT
============================================================ */
const inputStyle = {
  borderRadius: "12px",
  background: "rgba(255,255,255,0.65)",
  "& .MuiInputLabel-root": {
    color: goldSoft,
    fontWeight: 700,
    textShadow: "0 0 6px rgba(0,0,0,0.4)",
  },
  "& .MuiFilledInput-root": {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "12px",
    fontWeight: 700,
    color: greenDark,
    "&:before, &:after": { display: "none" },
    "&.Mui-focused": {
      outline: `2px solid ${gold}`,
      boxShadow: `0 0 12px ${gold}`,
    },
  }
};

/* ============================================================
   🔥 STEPPER ICONS — SAME BUT GOLD
============================================================ */
const steps = [
  { label: "Bio Data", icon: <PersonIcon /> },
  { label: "Contact",  icon: <ContactPhoneIcon /> },
  { label: "Nominee",  icon: <GroupIcon /> }
];

/* ============================================================
   🔥 COUNTY + OPTION DATA (unchanged)
============================================================ */
const countiesInKenya = [ /* unchanged */ ];
const selectOptions = { /* unchanged */ };
const layout = { /* unchanged */ };

/* ============================================================
   🔥 MAIN COMPONENT
============================================================ */
const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false, message: "", severity: "success"
  });

  const [regMeta, setRegMeta] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setActiveStep(prev => prev + 1);
  const prevStep = () => setActiveStep(prev => prev - 1);

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://mufate-g-sacco.onrender.com/membership-register",
        formData
      );

      setRegMeta(data);
      setSuccess(true);

      setSnackbar({
        open: true,
        message: data.message || "Registration successful!",
        severity: "success"
      });

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Registration failed!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     🔥 DO NOT MODIFY GRID — FIELD RENDERER UNCHANGED
  ============================================================ */
  const renderField = (field) => {
    if (field === "County") {
      return (
        <FormControl variant="filled" fullWidth required sx={inputStyle}>
          <InputLabel>County</InputLabel>
          <Select
            name="County"
            value={formData.County || ""}
            onChange={handleChange}
            input={<FilledInput disableUnderline />}
          >
            {countiesInKenya.map(c => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    if (selectOptions[field]) {
      return (
        <FormControl variant="filled" fullWidth required sx={inputStyle}>
          <InputLabel>{field}</InputLabel>
          <Select
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            input={<FilledInput disableUnderline />}
          >
            {selectOptions[field].map(o => (
              <MenuItem key={o} value={o}>{o}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        fullWidth
        label={field}
        name={field}
        variant="filled"
        required
        sx={inputStyle}
        type={field === "DOB" ? "date" : "text"}
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        value={formData[field] || ""}
        onChange={handleChange}
      />
    );
  };

  /* ============================================================
     🔥 DO NOT MODIFY POSITIONS — RETURN EXACT SAME GRID
  ============================================================ */
  const stepFields = [
    ["FullName","Salutation","IDType","IDNumber","DOB","MaritalStatus","Gender","KRAPin"],
    ["County","District","Division","Address","PostalCode","PhysicalAddress","MobileNumber","AlternateMobileNumber","Email","Profession","ProfessionSector"],
    ["NomineeName","NomineeIDNumber","NomineePhoneNumber","NomineeRelation"],
  ];

  const renderStep = () => {
    if (activeStep === 1) {
      return (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          {stepFields[1].map(f => <Box key={f}>{renderField(f)}</Box>)}
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {stepFields[activeStep].map(f => (
          <Grid key={f} item {...layout[f]}>
            {renderField(f)}
          </Grid>
        ))}
      </Grid>
    );
  };

  /* ============================================================
     🔥 MAIN UI (REBRANDED + RESPONSIVE)
  ============================================================ */
  return (
    <Box sx={{
      minHeight: "100vh",
      py: { xs: 3, md: 6 },
      background: greenDark,
    }}>
      <Container maxWidth="md">
        <Paper sx={neuStyle}>
          {!success ? (
            <>
              {/* TITLE */}
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: `linear-gradient(to right, ${gold}, ${goldSoft})`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "1.7rem", md: "2.2rem" },
                }}
              >
                SACCO Member Registration
              </Typography>

              {/* STEPPER */}
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map(step => (
                  <Step key={step.label}>
                    <StepLabel 
                      icon={step.icon}
                      sx={{
                        "& .MuiStepLabel-label": {
                          color: goldSoft,
                          fontWeight: 700,
                        },
                        "& .MuiStepIcon-root": {
                          color: "gray",
                        },
                        "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
                          color: gold,
                          filter: "drop-shadow(0 0 10px rgba(255,215,0,0.6))",
                        },
                      }}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStep()}

              {/* BUTTONS */}
              <Box textAlign="center" mt={4}>
                {activeStep > 0 && (
                  <Button sx={neuStyle} onClick={prevStep}>
                    Back
                  </Button>
                )}

                <Button
                  sx={{ ml: 2, ...neuStyle }}
                  disabled={loading}
                  onClick={activeStep < steps.length - 1 ? nextStep : confirmSubmission}
                >
                  {activeStep < steps.length - 1
                    ? "Next"
                    : loading ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            </>
          ) : (
            /* SUCCESS PAGE */
            <Box textAlign="center">
              <CheckCircleIcon sx={{ fontSize: 60, color: gold }} />
              <Typography sx={{ mt: 2, fontSize: "1.2rem", color: goldSoft }}>
                Registration successful — You will be contacted.
              </Typography>

              {regMeta.next_step && (
                <Typography sx={{ mt: 1, color: goldSoft }}>
                  Next Step: {regMeta.next_step}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Container>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default MemberRegistration;
