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
  Avatar,
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
  { label: "Submit", icon: <CheckCircleIcon /> },
];

const inputStyle = {
  borderRadius: 2,
  "& .MuiFilledInput-root": {
    borderRadius: 2,
    backgroundColor: "#fff",
  },
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [filePreviews, setFilePreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = (name, file) => {
    setFiles((prev) => ({ ...prev, [name]: file }));
    setFilePreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
  };

  const createDropzone = (name) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleFileUpload(name, acceptedFiles[0]),
      multiple: false,
      accept: "image/*",
    });

    return (
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #4CAF50",
          p: 2,
          textAlign: "center",
          borderRadius: 2,
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40, color: "#4CAF50" }} />
        <Typography variant="body2">Drag & Drop or Click to Upload</Typography>
        {filePreviews[name] && (
          <Avatar
            src={filePreviews[name]}
            variant="rounded"
            sx={{ width: 100, height: 100, mt: 1, mx: "auto" }}
          />
        )}
      </Box>
    );
  };

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((k) =>
      formDataToSend.append(k, formData[k])
    );
    Object.keys(files).forEach((k) => formDataToSend.append(k, files[k]));

    try {
      await axios.post(
        "https://mufate-g-sacco.onrender.com/membership/register",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccess(true);
    } catch (err) {
      alert("❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        background: "linear-gradient(135deg,#f0fff4,#e6f7ff)",
      }}
    >
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
            {!success ? (
              <>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  color="primary"
                >
                  Member Registration
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                  {steps.map((s) => (
                    <Step key={s.label}>
                      <StepLabel icon={s.icon}>{s.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {activeStep === 3 && (
                  <Grid container spacing={2}>
                    {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map(
                      (f) => (
                        <Grid item xs={12} sm={6} key={f}>
                          {createDropzone(f)}
                        </Grid>
                      )
                    )}
                  </Grid>
                )}

                {activeStep === 4 && (
                  <Typography align="center" sx={{ mb: 3 }}>
                    ✅ Please confirm and submit your registration.
                  </Typography>
                )}

                <Box mt={3} textAlign="center">
                  {activeStep > 0 && (
                    <Button variant="outlined" onClick={prevStep} sx={{ mr: 2 }}>
                      Back
                    </Button>
                  )}

                  {activeStep < steps.length - 1 ? (
                    <Button variant="contained" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={confirmSubmission}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <Box textAlign="center" py={5}>
                <CheckCircleIcon sx={{ fontSize: 80, color: "green" }} />
                <Typography variant="h5" mt={2}>
                  🎉 Registration Successful!
                </Typography>
                <Typography color="text.secondary">
                  Please pay KES 1,500 via M-PESA Paybill 506492 to activate your
                  account.
                </Typography>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
      <Footer />
    </Box>
  );
};

export default MemberRegistration;
