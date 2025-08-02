import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import GroupIcon from "@mui/icons-material/Group";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const steps = [
  { label: "Bio Data", icon: <PersonIcon /> },
  { label: "Contact", icon: <ContactPhoneIcon /> },
  { label: "Nominee", icon: <GroupIcon /> },
  { label: "Uploads", icon: <CloudUploadIcon /> },
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

const inputStyle = {
  borderRadius: "12px",
  background: "#e3f9e5",
  boxShadow: "inset 6px 6px 12px #b8dcb8, inset -6px -6px 12px #ffffff",
  "& .MuiFilledInput-root": { backgroundColor: "transparent" },
  "& .MuiSelect-filled": { backgroundColor: "transparent" },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (name, file) => {
    setFiles({ ...files, [name]: file });
  };

  const createDropzone = (name) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleFileUpload(name, acceptedFiles[0]),
      accept: "image/*",
    });

    return (
      <Box {...getRootProps()} sx={{ p: 2, textAlign: "center", cursor: "pointer", ...neuStyle }}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40, color: "#2e7d32" }} />
        <Typography variant="body2">Drag & Drop or Click to Upload</Typography>
      </Box>
    );
  };

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    Object.entries(files).forEach(([key, file]) => data.append(key, file));

    await axios.post("/membership/register", data);
  };

  const renderStep = () => (
    <Grid container spacing={2}>
      {activeStep === 3
        ? ["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map((name) => (
            <Grid item xs={12} sm={6} key={name}>
              {createDropzone(name)}
            </Grid>
          ))
        : ["FullName", "Salutation", "IDType", "IDNumber"].map((name) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                name={name}
                label={name}
                variant="filled"
                fullWidth
                sx={inputStyle}
                onChange={handleChange}
              />
            </Grid>
          ))}
    </Grid>
  );

  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "#e3f9e5" }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 4, ...neuStyle }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: "#2e7d32" }}>
              SACCO Member Registration
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, p: 2, borderRadius: "16px", ...inputStyle }}>
              {steps.map((s) => (
                <Step key={s.label}>
                  <StepLabel icon={s.icon}>{s.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStep()}

            <Box mt={3} textAlign="center">
              {activeStep > 0 && (
                <Button variant="outlined" onClick={prevStep} sx={{ px: 4, py: 1, mr: 2, ...neuStyle }}>
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button variant="contained" onClick={nextStep} sx={{ px: 4, py: 1, ...neuStyle }}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" onClick={confirmSubmission} sx={{ px: 4, py: 1, ...neuStyle }}>
                  Submit
                </Button>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
      <Footer />
    </Box>
  );
};

export default MemberRegistration;
