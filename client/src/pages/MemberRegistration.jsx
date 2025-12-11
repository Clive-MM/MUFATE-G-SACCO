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

// 🔹 Stepper Icons
const steps = [
  { label: "Bio Data", icon: <PersonIcon /> },
  { label: "Contact", icon: <ContactPhoneIcon /> },
  { label: "Nominee", icon: <GroupIcon /> }
];

/* ======================================================
   🔥 GOLDEN GENERATION BRAND COLORS
====================================================== */
const gold = "#FFD700";
const goldSoft = "#FFF4B5";
const greenDark = "#011407";
const greenDeep = "#01240F";

/* ======================================================
   🔥 NEUMORPHISM BACKGROUND (Neutral, Preserved Layout)
====================================================== */
const neuStyle = {
  borderRadius: "20px",
  background: greenDark,
  border: "1px solid rgba(255,215,0,0.25)",
  boxShadow:
    "0 0 20px rgba(255,215,0,0.25), inset 0 0 12px rgba(0,0,0,0.6)",
  padding: "30px",
};

/* ======================================================
   🔥 INPUT FIELD STYLE (NO layout changes)
====================================================== */
const inputStyle = {
  borderRadius: "14px",
  background: "rgba(255,255,255,0.8)",
  "& .MuiInputLabel-root": {
    color: goldSoft,
    fontWeight: 800,
    textShadow: "0 0 6px rgba(0,0,0,0.5)",
  },
  "& .MuiFilledInput-root": {
    borderRadius: "14px",
    background: "rgba(255,255,255,0.9)",
    fontWeight: 700,
    color: greenDeep,
    "&:before, &:after": { display: "none" },
    "&.Mui-focused": {
      borderColor: gold,
      outline: `2px solid ${gold}`,
      boxShadow: `0 0 12px ${gold}`,
    },
  }
};

/* ======================================================
   🟩 COUNTIES + SELECT OPTIONS (UNCHANGED)
====================================================== */
const countiesInKenya = [/* unchanged */];
const selectOptions = { /* unchanged */ };
const layout = { /* unchanged */ };

// Fields mapping unchanged
const stepFields = [
  ["FullName","Salutation","IDType","IDNumber","DOB","MaritalStatus","Gender","KRAPin"],
  ["County","District","Division","Address","PostalCode","PhysicalAddress","MobileNumber","AlternateMobileNumber","Email","Profession","ProfessionSector"],
  ["NomineeName","NomineeIDNumber","NomineePhoneNumber","NomineeRelation"],
];

/* ======================================================
   🔥 COMPONENT START
====================================================== */
const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false, message: "", severity: "success"
  });

  const [regMeta, setRegMeta] = useState({
    next_step: null,
    payment: null,
    member_id: null,
    email_warning: null,
  });

  /* -------------------------
     Handle Input Change
  --------------------------*/
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

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
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Registration failed!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------
     FIELD RENDERER — DO NOT CHANGE GRID LOGIC
  ------------------------------------------- */
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
            {selectOptions[field].map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <TextField
        required
        name={field}
        label={field}
        variant="filled"
        fullWidth
        sx={inputStyle}
        InputProps={{ disableUnderline: true }}
        InputLabelProps={{ shrink: true }}
        onChange={handleChange}
        value={formData[field] || ""}
        type={field === "DOB" ? "date" : "text"}
      />
    );
  };

  /* ------------------------------------------
     STEP RENDERER — GRID PRESERVED EXACTLY
  ------------------------------------------- */
  const renderStep = () => {
    return (
      <Grid container spacing={3}>
        {stepFields[activeStep].map(field => (
          <Grid item key={field} {...(layout[field])}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
    );
  };

  /* ------------------------------------------
     FINAL UI — COLORS & MOBILE RESPONSIVENESS
  ------------------------------------------- */
  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: greenDeep }}>
      <Container maxWidth="md">
        <Paper sx={neuStyle}>
          {!success ? (
            <>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 900,
                  mb: 4,
                  background: `linear-gradient(to right, ${gold}, ${goldSoft})`,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 10px rgba(255,215,0,0.45)",
                }}
              >
                SACCO Member Registration
              </Typography>

              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
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
                          color: goldSoft,
                        },
                        "& .MuiStepIcon-root.Mui-active": {
                          color: gold,
                          filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))",
                        }
                      }}
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStep()}

              <Box textAlign="center" mt={4}>
                {activeStep > 0 && (
                  <Button sx={neuStyle} onClick={prevStep}>Back</Button>
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
            <Box textAlign="center">
              <CheckCircleIcon sx={{ fontSize: 60, color: gold }} />
              <Typography sx={{ mt: 3, color: goldSoft }}>
                Registration successful — you will be contacted.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default MemberRegistration;
