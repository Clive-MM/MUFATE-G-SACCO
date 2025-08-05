import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Paper, Stepper, Step, StepLabel, Snackbar, Alert,
  FormControl, InputLabel, Select, MenuItem
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

const countiesInKenya = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui",
  "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri",
  "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const neuStyle = {
  borderRadius: "16px",
  background: "#f1faf2",
  boxShadow: "4px 4px 12px #c3d6c5, -4px -4px 12px #ffffff",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: "2px 2px 8px #b8ccb8, -2px -2px 8px #ffffff",
  },
};

const inputStyle = {
  borderRadius: "12px",
  background: "#f1faf2",
  boxShadow: "inset 3px 3px 6px #cbd7cb, inset -3px -3px 6px #ffffff",
  "& .MuiFilledInput-root": { backgroundColor: "transparent" },
  "& label": {
    whiteSpace: "normal",
    overflow: "visible",
    textOverflow: "unset",
    lineHeight: "1.2rem",
  }
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
      const response = await axios.post("https://mufate-g-sacco.onrender.com/membership-register", formData, {
        headers: { "Content-Type": "application/json" }
      });

      setSuccess(true);
      setSnackbar({
        open: true,
        message: response.data.message || "✅ Registration successful!",
        severity: "success"
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "❌ Registration failed!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectOptions = {
    IDType: ["ID Card", "Certificate of Incorp", "Group Registration Certificate", "Passport"],
    MaritalStatus: ["Married", "Single", "Divorced", "Separated"],
    Gender: ["Male", "Female", "Others"],
    Salutation: ["Mr", "Ms", "Mrs", "Miss", "Dr", "Prof"],
    NomineeRelation: [
      "Wife", "Husband", "Grandfather", "Grandmother", "Cousin", "Brother", "Sister", "Friend",
      "Father", "Mother", "Daughter", "Son", "Uncle", "Aunt"
    ]
  };

  const renderStep = () => {
    const stepFields = [
      ["FullName", "Salutation", "IDType", "IDNumber", "DOB", "MaritalStatus", "Gender", "KRAPin"],
      ["County", "District", "Division", "Address", "PostalCode", "PhysicalAddress", "MobileNumber", "AlternateMobileNumber", "Email", "Profession", "ProfessionSector"],
      ["NomineeName", "NomineeIDNumber", "NomineePhoneNumber", "NomineeRelation"]
    ];

    return (
      <Grid container spacing={2}>
        {stepFields[activeStep].map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            {field === "County" ? (
              <FormControl variant="filled" fullWidth required sx={inputStyle}>
                <InputLabel>County</InputLabel>
                <Select
                  name="County"
                  value={formData.County || ""}
                  onChange={handleChange}
                >
                  {countiesInKenya.map((county) => (
                    <MenuItem key={county} value={county}>{county}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : selectOptions[field] ? (
              <FormControl variant="filled" fullWidth required sx={inputStyle}>
                <InputLabel>{field}</InputLabel>
                <Select
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
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
                onChange={handleChange}
                value={formData[field] || ""}
                InputLabelProps={{ shrink: true }}
                type={field === "DOB" ? "date" : "text"}
              />
            )}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "#f1faf2" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 4, ...neuStyle }}>
          {!success ? (
            <>
              <Typography variant="h4" align="center" color="#2e7d32" gutterBottom>
                SACCO Member Registration
              </Typography>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((step) => (
                  <Step key={step.label}>
                    <StepLabel icon={step.icon}>{step.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {renderStep()}
              <Box textAlign="center" mt={3}>
                {activeStep > 0 && <Button sx={neuStyle} onClick={prevStep}>Back</Button>}
                <Button sx={{ ml: 2, ...neuStyle }} onClick={activeStep < steps.length - 1 ? nextStep : confirmSubmission}>
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
