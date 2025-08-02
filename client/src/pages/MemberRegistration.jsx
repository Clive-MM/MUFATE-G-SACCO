import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  Box, Button, Container, Grid, TextField, Typography,
  Paper, Stepper, Step, StepLabel, Avatar,
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
};

const CreateDropzone = ({ name, label, files, handleFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleFileUpload(name, acceptedFiles[0]),
    multiple: false,
    accept: "image/*",
  });

  return (
    <Box {...getRootProps()} sx={{ p: 2, textAlign: "center", cursor: "pointer", ...neuStyle }}>
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 40, color: "#2e7d32" }} />
      <Typography>{label}</Typography>
      {files[name] && (
        <Avatar
          src={URL.createObjectURL(files[name])}
          variant="rounded"
          sx={{ mt: 1, mx: "auto", width: 80, height: 80 }}
        />
      )}
    </Box>
  );
};

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (name, file) => {
    setFiles({ ...files, [name]: file });
  };

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    Object.entries(files).forEach(([k, v]) => data.append(k, v));

    try {
      await axios.post("https://mufate-g-sacco.onrender.com/membership/register", data);
      setSuccess(true);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    const stepFields = [
      ["FullName", "Salutation", "IDType", "IDNumber", "DOB", "MaritalStatus", "Gender", "KRAPin"],
      ["County", "District", "Division", "Address", "PostalCode", "PhysicalAddress", "MobileNumber", "AlternateMobileNumber", "Email", "Profession", "ProfessionSector"],
      ["NomineeName", "NomineeIDNumber", "NomineePhoneNumber", "NomineeRelation"],
    ];

    const fieldLabels = {
      FullName: "Full Name", Salutation: "Salutation", IDType: "ID Type", IDNumber: "ID Number",
      DOB: "Date of Birth", MaritalStatus: "Marital Status", Gender: "Gender", KRAPin: "KRA PIN",
      County: "County", District: "District", Division: "Division", Address: "Address",
      PostalCode: "Postal Code", PhysicalAddress: "Physical Address",
      MobileNumber: "Mobile Number", AlternateMobileNumber: "Alternate Mobile Number",
      Email: "Email", Profession: "Profession", ProfessionSector: "Profession Sector",
      NomineeName: "Nominee Name", NomineeIDNumber: "Nominee ID Number",
      NomineePhoneNumber: "Nominee Phone", NomineeRelation: "Nominee Relation"
    };

    if (activeStep < 3) {
      return (
        <Grid container spacing={2}>
          {stepFields[activeStep].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                required
                name={field}
                label={fieldLabels[field]}
                variant="filled"
                fullWidth
                sx={inputStyle}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <Grid container spacing={2}>
        {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map((file) => (
          <Grid item xs={12} sm={6} key={file}>
            <CreateDropzone
              name={file}
              label={file}
              files={files}
              handleFileUpload={handleFileUpload}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "#e3f9e5" }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Paper sx={{ p: 4, ...neuStyle }}>
            {!success ? (
              <>
                <Typography variant="h4" align="center" color="#2e7d32">
                  SACCO Member Registration
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, p: 2, ...inputStyle }}>
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel icon={step.icon}>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {renderStep()}
                <Box textAlign="center" mt={3}>
                  {activeStep > 0 && <Button sx={{ ...neuStyle }} onClick={prevStep}>Back</Button>}
                  {activeStep < steps.length - 1 ? (
                    <Button sx={{ ml: 2, ...neuStyle }} onClick={nextStep}>Next</Button>
                  ) : (
                    <Button sx={{ ml: 2, ...neuStyle }} onClick={confirmSubmission}>
                      {loading ? "Submitting..." : "Submit"}
                    </Button>
                  )}
                </Box>
              </>
            ) : (
              <Box textAlign="center">
                <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
                <Typography>
                  Registration Successful! Pay KES 1,500 via M-PESA Paybill 506492.
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
