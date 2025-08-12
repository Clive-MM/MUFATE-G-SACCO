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

const neuStyle = {
  borderRadius: "16px",
  background: "#e3f9e5",
  boxShadow: "8px 8px 16px #b8dcb8, -8px -8px 16px #ffffff",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "6px 6px 12px #a5cba5, -6px -6px 12px #ffffff",
  },
};

/* ---------- Input look: no underline + uniform height + focus ring ---------- */
const inputStyle = {
  borderRadius: "12px",
  background: "#e3f9e5",
  boxShadow: "inset 6px 6px 12px #b8dcb8, inset -6px -6px 12px #ffffff",
  "& .MuiFilledInput-root": {
    backgroundColor: "transparent",
    height: 54,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 12,
    // remove underline for Filled variant (before/after)
    "&:before, &:after": { display: "none" },
    "&.Mui-focused": {
      outline: "2px solid rgba(46,125,50,.35)",
      outlineOffset: 2,
    },
  },
};

const countiesInKenya = [
  "Baringo","Bomet","Bungoma","Busia","Elgeyo-Marakwet","Embu",
  "Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho",
  "Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui",
  "Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera",
  "Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi",
  "Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri",
  "Samburu","Siaya","Taita Taveta","Tana River","Tharaka-Nithi",
  "Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"
];

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

/* ---------- Column layout map: prevents squeezed/cropped labels ---------- */
const layout = {
  // Bio
  FullName:      { xs: 12, sm: 8,  md: 8 },
  Salutation:    { xs: 12, sm: 4,  md: 4 },
  IDType:        { xs: 12, sm: 6,  md: 4 },
  IDNumber:      { xs: 12, sm: 6,  md: 4 },
  DOB:           { xs: 12, sm: 6,  md: 4 },
  MaritalStatus: { xs: 12, sm: 6,  md: 4 },
  Gender:        { xs: 12, sm: 6,  md: 4 },
  KRAPin:        { xs: 12, sm: 6,  md: 6 },

  // Contact
  County:                { xs: 12, sm: 6, md: 6 },
  District:              { xs: 12, sm: 6, md: 6 },
  Division:              { xs: 12, sm: 6, md: 6 },
  Address:               { xs: 12, sm: 6, md: 6 },
  PostalCode:            { xs: 12, sm: 6, md: 6 },
  PhysicalAddress:       { xs: 12, sm: 6, md: 6 },
  MobileNumber:          { xs: 12, sm: 6, md: 6 },
  AlternateMobileNumber: { xs: 12, sm: 6, md: 6 },
  Email:                 { xs: 12, sm: 6, md: 6 },
  Profession:            { xs: 12, sm: 6, md: 6 },
  ProfessionSector:      { xs: 12, sm: 6, md: 6 },

  // Nominee
  NomineeName:        { xs: 12, sm: 8, md: 8 },
  NomineeIDNumber:    { xs: 12, sm: 4, md: 4 },
  NomineePhoneNumber: { xs: 12, sm: 6, md: 6 },
  NomineeRelation:    { xs: 12, sm: 6, md: 6 },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mufate-g-sacco.onrender.com/membership-register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess(true);
      setSnackbar({
        open: true,
        message: response.data.message || "✅ Registration successful!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "❌ Registration failed!",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const stepFields = [
    // Bio
    ["FullName","Salutation","IDType","IDNumber","DOB","MaritalStatus","Gender","KRAPin"],
    // Contact
    ["County","District","Division","Address","PostalCode","PhysicalAddress","MobileNumber","AlternateMobileNumber","Email","Profession","ProfessionSector"],
    // Nominee
    ["NomineeName","NomineeIDNumber","NomineePhoneNumber","NomineeRelation"],
  ];

  const renderStep = () => (
    <Grid container spacing={{ xs: 1.5, sm: 2 }}>
      {stepFields[activeStep].map((field) => (
        <Grid item key={field} {...(layout[field] || { xs: 12, sm: 6 })}>
          {field === "County" ? (
            <FormControl variant="filled" fullWidth required sx={inputStyle}>
              <InputLabel>County</InputLabel>
              <Select
                name="County"
                value={formData.County || ""}
                onChange={handleChange}
                input={<FilledInput disableUnderline />}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 320,
                      minWidth: 280,
                      "& .MuiMenuItem-root:hover": { fontWeight: 600, color: "#2e7d32" },
                    },
                  },
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                }}
              >
                {countiesInKenya.map((county) => (
                  <MenuItem key={county} value={county}>{county}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : selectOptions[field] ? (
            <FormControl variant="filled" fullWidth required sx={inputStyle}>
              <InputLabel>{field === "NomineeRelation" ? "Relation" : field}</InputLabel>
              <Select
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                input={<FilledInput disableUnderline />}
                MenuProps={{
                  PaperProps: { sx: { maxHeight: 320, minWidth: 260 } },
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                }}
              >
                {selectOptions[field].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              required={field !== "KRAPin"}
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
          )}
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "#e3f9e5" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, ...neuStyle }}>
          {!success ? (
            <>
              <Typography variant="h4" align="center" color="#2e7d32" gutterBottom>
                SACCO Member Registration
              </Typography>

              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  mb: 4,
                  "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
                    color: "#2e7d32",
                  },
                }}
              >
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
                  onClick={activeStep < steps.length - 1 ? nextStep : confirmSubmission}
                >
                  {activeStep < steps.length - 1 ? "Next" : (loading ? "Submitting..." : "Submit")}
                </Button>
              </Box>
            </>
          ) : (
            <Box textAlign="center">
              <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
              <Typography sx={{ mt: 2, fontSize: "1.1rem" }}>
                ✅ Registration successful! An admin will contact you shortly to collect your original ID card (front and back) and passport photo. You will also be guided on how to complete your one-time registration fee of <strong>KES 1,500</strong> via <strong>M-PESA Paybill 506492</strong>.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default MemberRegistration;
