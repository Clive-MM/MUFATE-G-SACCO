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
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});
  const [filePreviews, setFilePreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

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

  const phonePattern = /^2547\d{8}$/;

  const validateStep = () => {
    let stepErrors = {};

    if (activeStep === 0) {
      ["FullName", "Salutation", "IDType", "IDNumber", "DOB", "MaritalStatus", "Gender"].forEach((f) => {
        if (!formData[f]) stepErrors[f] = "Required";
      });
    }

    if (activeStep === 1) {
      ["County", "District", "MobileNumber", "AlternateMobileNumber"].forEach((f) => {
        if (!formData[f]) stepErrors[f] = "Required";
        else if ((f === "MobileNumber" || f === "AlternateMobileNumber") && !phonePattern.test(formData[f]))
          stepErrors[f] = "Must be 2547XXXXXXXX";
      });
    }

    if (activeStep === 2) {
      ["NomineeName", "NomineeIDNumber", "NomineePhoneNumber", "NomineeRelation"].forEach((f) => {
        if (!formData[f]) stepErrors[f] = "Required";
        else if (f === "NomineePhoneNumber" && !phonePattern.test(formData[f]))
          stepErrors[f] = "Must be 2547XXXXXXXX";
      });
    }

    if (activeStep === 3) {
      ["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].forEach((file) => {
        if (!files[file]) stepErrors[file] = "Required";
      });
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => validateStep() && setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    setLoading(true);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((k) => formDataToSend.append(k, formData[k]));
    Object.keys(files).forEach((k) => formDataToSend.append(k, files[k]));

    try {
      await axios.post("https://mufate-g-sacco.onrender.com/membership/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    const fieldGroups = [
      [
        { label: "Full Name", name: "FullName" },
        { label: "Salutation", name: "Salutation", select: ["MR", "MRS", "MISS", "DR", "PROF"] },
        { label: "ID Type", name: "IDType", select: ["ID Card", "Certificate of Incorp", "Group Registration Certificate", "Passport"] },
        { label: "ID Number", name: "IDNumber" },
        { label: "KRA PIN (Optional)", name: "KRAPin" },
        { label: "Date of Birth", name: "DOB", type: "date" },
        { label: "Marital Status", name: "MaritalStatus", select: ["Single", "Married", "Divorce", "Separated"] },
        { label: "Gender", name: "Gender", select: ["Male", "Female", "Others"] },
      ],
      [
        { label: "County", name: "County" },
        { label: "District", name: "District" },
        { label: "Division (Optional)", name: "Division" },
        { label: "Address", name: "Address" },
        { label: "Postal Code", name: "PostalCode" },
        { label: "Physical Address", name: "PhysicalAddress" },
        { label: "Mobile Number", name: "MobileNumber" },
        { label: "Alternate Mobile Number", name: "AlternateMobileNumber" },
        { label: "Email (Optional)", name: "Email" },
        { label: "Profession (Optional)", name: "Profession" },
        { label: "Profession Sector (Optional)", name: "ProfessionSector" },
      ],
      [
        { label: "Nominee Name", name: "NomineeName" },
        { label: "Nominee ID Number", name: "NomineeIDNumber" },
        { label: "Nominee Phone Number", name: "NomineePhoneNumber" },
        { label: "Nominee Relation", name: "NomineeRelation" },
      ],
    ];

    if (activeStep < 3) {
      return (
        <Grid container spacing={2}>
          {fieldGroups[activeStep].map((field) => (
            <Grid item xs={12} sm={4} key={field.name}>
              {field.select ? (
                <FormControl fullWidth variant="filled" required sx={inputStyle}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  >
                    {field.select.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                  {errors[field.name] && <Typography color="error" variant="caption">{errors[field.name]}</Typography>}
                </FormControl>
              ) : (
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  variant="filled"
                  fullWidth
                  sx={inputStyle}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                />
              )}
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <Grid container spacing={2}>
        {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map((f) => (
          <Grid item xs={12} sm={6} key={f}>
            {createDropzone(f)}
            {errors[f] && <Typography color="error" variant="caption">{errors[f]}</Typography>}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 4, background: "linear-gradient(135deg,#f0fff4,#e6f7ff)" }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
            {!success ? (
              <>
                <Typography variant="h4" align="center" gutterBottom color="primary">
                  Member Registration
                </Typography>

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                  {steps.map((s) => (
                    <Step key={s.label}>
                      <StepLabel icon={s.icon}>{s.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {renderStep()}

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
                  Please pay KES 1,500 via M-PESA Paybill 506492 to activate your account.
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
