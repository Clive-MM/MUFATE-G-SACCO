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

const steps = [
  { label: "Bio Data", icon: <PersonIcon /> },
  { label: "Contact", icon: <ContactPhoneIcon /> },
  { label: "Nominee", icon: <GroupIcon /> }
];

/* -----------------------------------------------------------
   GOLDEN GENERATION BRANDING + NEUMORPHISM
------------------------------------------------------------ */

const neuStyle = {
  borderRadius: "20px",
  background: "linear-gradient(145deg, #01240F, #01170B)",
  boxShadow:
    "0 0 18px rgba(255,215,0,0.25), inset 0 0 10px rgba(0,0,0,0.35)",
  border: "1px solid rgba(255,215,0,0.18)",
  transition: "0.3s ease",
  "&:hover": {
    boxShadow:
      "0 0 25px rgba(255,215,0,0.45), inset 0 0 12px rgba(0,0,0,0.5)",
  }
};

const inputStyle = {
  borderRadius: "14px",
  background: "rgba(255,255,255,0.85)",
  boxShadow:
    "inset 4px 4px 10px rgba(0,0,0,0.25), inset -4px -4px 10px rgba(255,255,255,0.9)",
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    height: 54,
    borderRadius: 14,
    paddingLeft: 12,
    paddingRight: 12,
    "&:before, &:after": { display: "none" },
    "&.Mui-focused": {
      outline: "2px solid #FFD700",
      outlineOffset: 2,
      boxShadow: "0 0 15px rgba(255,215,0,0.7)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#01240F",
    fontWeight: 700,
  }
};

/* -----------------------------------------------------------
   MOBILE-FIRST IMPROVEMENTS
------------------------------------------------------------ */

const responsivePaper = {
  p: { xs: 2, sm: 3, md: 4 },
  borderRadius: "22px",
  mx: "auto",
  width: "100%",
  maxWidth: "950px",
};

const responsiveStepper = {
  mb: 4,
  "& .MuiStepIcon-root": {
    transform: { xs: "scale(0.9)", sm: "scale(1)" }
  },
  "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
    color: "#FFD700",
    filter: "drop-shadow(0 0 6px rgba(255,215,0,0.7))"
  },
  "& .MuiStepLabel-label": {
    color: "#FFF4B5",
    fontWeight: 700,
    fontSize: { xs: "0.8rem", sm: "1rem" },
  }
};

/* -----------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------ */

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://mufate-g-sacco.onrender.com/membership-register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setRegMeta({
        next_step: data.next_step || null,
        payment: data.payment || null,
        member_id: data.member_id || null,
        email_warning: data.email_warning || null,
      });

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

  /* ---------------------------------------------------------
     FIELDS & RENDERING (DO NOT CHANGE POSITIONS)
  ---------------------------------------------------------- */

  const countiesInKenya = [ /* unchanged */ ];
  const selectOptions = { /* unchanged */ };

  const layout = { /* unchanged */ };

  const stepFields = [
    ["FullName","Salutation","IDType","IDNumber","DOB","MaritalStatus","Gender","KRAPin"],
    ["County","District","Division","Address","PostalCode","PhysicalAddress","MobileNumber","AlternateMobileNumber","Email","Profession","ProfessionSector"],
    ["NomineeName","NomineeIDNumber","NomineePhoneNumber","NomineeRelation"],
  ];

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
            {countiesInKenya.map((county) => (
              <MenuItem key={county} value={county}>{county}</MenuItem>
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
            {selectOptions[field].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
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

  const renderStep = () => {
    if (activeStep === 1) {
      return (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {stepFields[1].map((field) => (
            <Box key={field}>{renderField(field)}</Box>
          ))}
        </Box>
      );
    }

    return (
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {stepFields[activeStep].map((field) => (
          <Grid item key={field} {...(layout[field] || { xs: 12 })}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
    );
  };

  /* ----------------------------------------------------------
     FINAL UI RENDER
  ----------------------------------------------------------- */

  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "#01170B" }}>
      <Container maxWidth="md">
        <Paper sx={{ ...neuStyle, ...responsivePaper }}>
          
          {!success ? (
            <>
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  background: "linear-gradient(to right, #FFD700, #FFF4B5)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                SACCO Member Registration
              </Typography>

              <Stepper activeStep={activeStep} alternativeLabel sx={responsiveStepper}>
                {steps.map((step) => (
                  <Step key={step.label}>
                    <StepLabel icon={step.icon}>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {renderStep()}

              <Box textAlign="center" mt={3}>
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
                  {activeStep < steps.length - 1 ? "Next" : (loading ? "Submitting..." : "Submit")}
                </Button>
              </Box>
            </>
          ) : (
            <Box textAlign="center">
              <CheckCircleIcon sx={{ fontSize: 60, color: "#FFD700" }} />
              <Typography sx={{ mt: 2, color: "#FFF4B5" }}>
                Registration successful! You will be contacted by MUFATE G SACCO.
              </Typography>

              {regMeta.next_step && (
                <Typography sx={{ mt: 1, color: "#FFD700" }}>
                  Next step: {regMeta.next_step}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Container>

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
