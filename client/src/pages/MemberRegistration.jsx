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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const inputStyle = {
  borderRadius: 2,
  "& .MuiFilledInput-root": {
    borderRadius: 2,
    backgroundColor: "#fff",
  },
};

const steps = ["Bio Data", "Contact Details", "Nominee Info", "Uploads", "Review & Confirm"];

const MemberRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiles({ ...files, [e.target.name]: file });
    setFileNames({ ...fileNames, [e.target.name]: file?.name || "" });
  };

  const phonePattern = /^2547\d{8}$/;

  const validateStep = () => {
    if (activeStep === 0) {
      const required = ["FullName", "Salutation", "IDType", "IDNumber", "DOB", "MaritalStatus", "Gender"];
      return required.every((f) => formData[f]?.trim());
    }
    if (activeStep === 1) {
      const required = ["County", "District", "MobileNumber", "AlternateMobileNumber"];
      for (let f of required) {
        if (!formData[f] || !phonePattern.test(formData[f])) return false;
      }
      return true;
    }
    if (activeStep === 2) {
      const required = ["NomineeName", "NomineeIDNumber", "NomineePhoneNumber", "NomineeRelation"];
      return required.every((f) => formData[f]?.trim());
    }
    if (activeStep === 3) {
      return files.IDFrontURL && files.IDBackURL && files.SignatureURL && files.PASSPORTURL;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1);
    else alert("❌ Please fill in all required fields correctly.");
  };

  const prevStep = () => setActiveStep((prev) => prev - 1);

  const confirmSubmission = async () => {
    setOpenDialog(false);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((k) => formDataToSend.append(k, formData[k]));
      Object.keys(files).forEach((k) => formDataToSend.append(k, files[k]));

      const res = await axios.post(
        "https://mufate-g-sacco.onrender.com/membership/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResponseMsg(res.data.message);
    } catch (err) {
      setResponseMsg(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            {[
              { label: "Full Name", name: "FullName" },
              { label: "Salutation", name: "Salutation", select: ["MR", "MRS", "MISS", "DR", "PROF"] },
              { label: "ID Type", name: "IDType", select: ["ID Card", "Certificate of Incorp", "Group Registration Certificate", "Passport"] },
              { label: "ID Number", name: "IDNumber" },
              { label: "KRA PIN (Optional)", name: "KRAPin" },
              { label: "Date of Birth", name: "DOB", type: "date" },
              { label: "Marital Status", name: "MaritalStatus", select: ["Single", "Married", "Divorce", "Separated"] },
              { label: "Gender", name: "Gender", select: ["Male", "Female", "Others"] },
            ].map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                {field.select ? (
                  <FormControl fullWidth variant="filled" required sx={inputStyle}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select name={field.name} value={formData[field.name] || ""} onChange={handleChange}>
                      {field.select.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    variant="filled"
                    fullWidth
                    sx={inputStyle}
                    onChange={handleChange}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            {[
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
            ].map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            {[
              { label: "Nominee Name", name: "NomineeName" },
              { label: "Nominee ID Number", name: "NomineeIDNumber" },
              { label: "Nominee Phone Number", name: "NomineePhoneNumber" },
              { label: "Nominee Relation", name: "NomineeRelation" },
            ].map((field) => (
              <Grid item xs={12} sm={4} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                />
              </Grid>
            ))}
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map((fileField) => (
              <Grid item xs={12} sm={6} key={fileField}>
                <Button variant="outlined" component="label" fullWidth sx={{ py: 1.5, fontWeight: "bold" }}>
                  Upload {fileField.replace("URL", "")}
                  <input type="file" name={fileField} hidden onChange={handleFileChange} />
                </Button>
                {fileNames[fileField] && (
                  <Typography variant="body2" mt={1} align="center" color="text.secondary">
                    ✅ {fileNames[fileField]}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        );

      case 4:
        return (
          <Typography align="center" color="text.secondary">
            ✅ Review your details. If everything is correct, click "Submit".
          </Typography>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5, background: "linear-gradient(to bottom right, #c8facc, #eaffea)" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: 5, borderRadius: 4, boxShadow: "0px 8px 25px rgba(0,0,0,0.1)", backgroundColor: "white" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center" color="primary">
            Member Registration
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStep()}

          <Box mt={3} textAlign="center">
            {activeStep > 0 && (
              <Button onClick={prevStep} sx={{ mr: 2 }} variant="outlined">
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setOpenDialog(true)}>
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Payment Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please pay <strong>Kshs 1,500</strong> via M-PESA Paybill <strong>506492</strong> to activate your account.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmSubmission}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {responseMsg && (
        <Typography mt={3} color="primary" fontWeight="bold" textAlign="center">
          {responseMsg}
        </Typography>
      )}

      <Footer />
    </Box>
  );
};

export default MemberRegistration;
