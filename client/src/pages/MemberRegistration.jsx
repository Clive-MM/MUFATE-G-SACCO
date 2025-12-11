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

// ======================================================
// STEP DEFINITIONS
// ======================================================
const steps = [
  { label: "Bio Data", icon: <PersonIcon /> },
  { label: "Contact", icon: <ContactPhoneIcon /> },
  { label: "Nominee", icon: <GroupIcon /> }
];

// ======================================================
// GOLD BRAND NEUMORPHISM - SAME FOR ALL WIDGETS
// ======================================================
const neuStyle = {
  borderRadius: "18px",
  background: "#011407",
  boxShadow: "8px 8px 18px #000, -8px -8px 18px #052b12",
  border: "1px solid rgba(255,215,0,0.25)",
  "&:hover": {
    boxShadow: "6px 6px 14px #000, -6px -6px 14px #06351a",
  },
};

// ======================================================
// INPUT STYLING (unchanged logic - only new colors)
// ======================================================
const inputStyle = {
  borderRadius: "12px",
  background: "rgba(255,255,255,0.08)",
  boxShadow:
    "inset 4px 4px 10px rgba(0,0,0,0.4), inset -4px -4px 10px rgba(255,255,255,0.08)",
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    height: 54,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 12,
    color: "#FFD700",
    "&:before, &:after": { display: "none" },
    "&.Mui-focused": {
      outline: "2px solid #FFD700",
      outlineOffset: 2,
    },
  },
};

// ======================================================
// COUNTY LIST
// ======================================================
const countiesInKenya = [
  "Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu","Garissa",
  "Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi",
  "Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos",
  "Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a",
  "Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri",
  "Samburu","Siaya","Taita Taveta","Tana River","Tharaka-Nithi","Trans Nzoia",
  "Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"
];

// ======================================================
// SELECT OPTIONS
// ======================================================
const selectOptions = {
  IDType: ["ID Card", "Certificate of Incorp", "Group Registration Certificate", "Passport"],
  MaritalStatus: ["Married", "Single", "Divorced", "Separated"],
  Gender: ["Male", "Female", "Others"],
  Salutation: ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof"],
  NomineeRelation: [
    "Wife","Husband","Grandfather","Grandmother","Cousin","Brother","Sister","Friend",
    "Father","Mother","Daughter","Son","Uncle","Aunt"
  ],
};

// ======================================================
// GRID LAYOUT — NEVER CHANGED
// ======================================================
const layout = {
  FullName: { xs: 12, sm: 8, md: 8 },
  Salutation: { xs: 12, sm: 4, md: 4 },
  IDType: { xs: 12, sm: 6, md: 4 },
  IDNumber: { xs: 12, sm: 6, md: 4 },
  DOB: { xs: 12, sm: 6, md: 4 },
  MaritalStatus: { xs: 12, sm: 6, md: 4 },
  Gender: { xs: 12, sm: 6, md: 4 },
  KRAPin: { xs: 12, sm: 6, md: 6 },
  County: { xs: 12, sm: 6, md: 6 },
  District: { xs: 12, sm: 6, md: 6 },
  Division: { xs: 12, sm: 6, md: 6 },
  Address: { xs: 12, sm: 6, md: 6 },
  PostalCode: { xs: 12, sm: 6, md: 6 },
  PhysicalAddress: { xs: 12, sm: 6, md: 6 },
  MobileNumber: { xs: 12, sm: 6, md: 6 },
  AlternateMobileNumber: { xs: 12, sm: 6, md: 6 },
  Email: { xs: 12, sm: 6, md: 6 },
  Profession: { xs: 12, sm: 6, md: 6 },
  ProfessionSector: { xs: 12, sm: 6, md: 6 },
  NomineeName: { xs: 12, sm: 8, md: 8 },
  NomineeIDNumber: { xs: 12, sm: 4, md: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6, md: 6 },
  NomineeRelation: { xs: 12, sm: 6, md: 6 },
};

// ======================================================
// MAIN COMPONENT
// ======================================================
const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false, message: "", severity: "success"
  });

  const [regMeta, setRegMeta] = useState({
    next_step: null, payment: null, member_id: null, email_warning: null,
  });

  // FORM INPUT HANDLER
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  // SUBMIT HANDLER
  const confirmSubmission = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://mufate-g-sacco.onrender.com/membership-register",
        formData
      );

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

  // ======================================================
  // FIELD RENDERER — LOGIC UNCHANGED
  // ======================================================
  const renderField = (field) => {
    // COUNTY DROPDOWN
    if (field === "County") {
      return (
        <FormControl variant="filled" fullWidth required sx={inputStyle}>
          <InputLabel sx={{ color: "#FFD700", fontWeight: 600 }}>
            County
          </InputLabel>
          <Select
            name="County"
            value={formData.County || ""}
            onChange={handleChange}
            input={<FilledInput disableUnderline />}
          >
            {countiesInKenya.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // OTHER SELECT FIELDS
    if (selectOptions[field]) {
      return (
        <FormControl variant="filled" fullWidth required sx={inputStyle}>
          <InputLabel sx={{ color: "#FFD700", fontWeight: 600 }}>
            {field === "NomineeRelation" ? "Relation" : field}
          </InputLabel>
          <Select
            name={field}
            value={formData[field] || ""}
            onChange={handleChange}
            input={<FilledInput disableUnderline />}
          >
            {selectOptions[field].map((op) => (
              <MenuItem key={op} value={op}>{op}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    // TEXT INPUT FIELDS
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
        InputLabelProps={{ shrink: true, sx: { color: "#FFD700", fontWeight: 600 }}}
        sx={inputStyle}
        InputProps={{ disableUnderline: true }}
      />
    );
  };

  // ======================================================
  // STEP RENDERER (UNCHANGED GRID LAYOUT)
  // ======================================================
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
          {stepFields[1].map((field) => (
            <Box key={field}>{renderField(field)}</Box>
          ))}
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {stepFields[activeStep].map((field) => (
          <Grid item key={field} {...layout[field]}>
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
    );
  };

  // ======================================================
  // MAIN RETURN
  // ======================================================
  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "#011407" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, ...neuStyle }}>
          
          {!success ? (
            <>
              {/* ===== PAGE TITLE ===== */}
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 900,
                  background: "linear-gradient(to right, #FFD700, #FFF4B5)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 12px rgba(255,215,0,0.4)",
                  mb: 4,
                }}
              >
                SACCO Member Registration
              </Typography>

              {/* ======================================================
                   GOLD STEPPER + PROGRESS BAR
                 ====================================================== */}
              <Box sx={{ mb: 4 }}>

                {/* PROGRESS BAR */}
                <Box
                  sx={{
                    height: 6,
                    width: "100%",
                    background: "rgba(255,215,0,0.15)",
                    borderRadius: 3,
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${((activeStep + 1) / steps.length) * 100}%`,
                      background: "linear-gradient(90deg, #FFD700, #FFF4B5)",
                      transition: "width 0.5s ease",
                      boxShadow: "0 0 12px rgba(255,215,0,0.6)",
                    }}
                  />
                </Box>

                {/* STEPPER */}
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{
                    "& .MuiStepConnector-line": {
                      borderColor: "rgba(255,215,0,0.45)",
                      borderWidth: 2,
                    },
                    "& .MuiStepIcon-root": {
                      color: "rgba(255,215,0,0.25)",
                      transition: "0.4s ease",
                    },
                    "& .MuiStepIcon-root.Mui-active": {
                      color: "#FFD700",
                      filter: "drop-shadow(0 0 8px rgba(255,215,0,1))",
                      transform: "scale(1.25)",
                    },
                    "& .MuiStepIcon-root.Mui-completed": {
                      color: "#FFD700",
                      filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))",
                    },
                    "& .MuiStepLabel-label": {
                      color: "#FFF4B5 !important",
                      fontWeight: 700,
                    },
                    "& .MuiStepLabel-label.Mui-active": {
                      color: "#FFD700 !important",
                      fontWeight: 900,
                      textShadow: "0 0 10px rgba(255,215,0,0.9)",
                    },
                  }}
                >
                  {steps.map((s) => (
                    <Step key={s.label}>
                      <StepLabel icon={s.icon}>{s.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* ===== FORM FIELDS ===== */}
              {renderStep()}

              {/* ===== NAVIGATION BUTTONS ===== */}
              <Box textAlign="center" mt={3}>
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
                    : loading
                    ? "Submitting..."
                    : "Submit"}
                </Button>
              </Box>
            </>
          ) : (

            /* SUCCESS SCREEN */
            <Box textAlign="center" sx={{ color: "#FFD700" }}>
              <CheckCircleIcon sx={{ fontSize: 60, color: "#FFD700" }} />

              <Typography sx={{ mt: 2 }}>
                Registration successful! <strong>You will be contacted.</strong>
              </Typography>

              {regMeta.next_step && (
                <Typography sx={{ mt: 1 }}>Next step: {regMeta.next_step}</Typography>
              )}

              {regMeta.payment?.required && (
                <Typography sx={{ mt: 1 }}>
                  One-time fee: <strong>KES {regMeta.payment.amount}</strong>
                </Typography>
              )}

              {regMeta.email_warning && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  {regMeta.email_warning}
                </Alert>
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
