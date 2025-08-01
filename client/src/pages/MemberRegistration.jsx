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
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});
  const [fileNames, setFileNames] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const phonePattern = /^2547\d{8}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate field in real-time
    let errorMsg = "";
    if (!value && !["KRAPin", "Email", "Profession", "ProfessionSector"].includes(name)) {
      errorMsg = "Required field";
    }
    if (["MobileNumber", "AlternateMobileNumber", "NomineePhoneNumber"].includes(name) && value) {
      if (!phonePattern.test(value)) errorMsg = "Format must be 2547XXXXXXXX";
    }
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    setFiles({ ...files, [name]: file });
    setFileNames({ ...fileNames, [name]: file?.name || "" });
    if (!file) {
      setErrors({ ...errors, [name]: "Required file" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep = () => {
    let stepErrors = {};
    const requiredSteps = [
      ["FullName", "Salutation", "IDType", "IDNumber", "DOB", "MaritalStatus", "Gender"],
      ["County", "District", "MobileNumber", "AlternateMobileNumber"],
      ["NomineeName", "NomineeIDNumber", "NomineePhoneNumber", "NomineeRelation"],
    ];

    if (activeStep < 3) {
      for (let field of requiredSteps[activeStep] || []) {
        if (!formData[field]) stepErrors[field] = "Required field";
      }
    }

    if (activeStep === 1 || activeStep === 2) {
      ["MobileNumber", "AlternateMobileNumber", "NomineePhoneNumber"].forEach((f) => {
        if (formData[f] && !phonePattern.test(formData[f]))
          stepErrors[f] = "Format must be 2547XXXXXXXX";
      });
    }

    if (activeStep === 3) {
      ["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].forEach((f) => {
        if (!files[f]) stepErrors[f] = "Required file";
      });
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1);
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

  const renderField = (field) => (
    <Grid item xs={12} sm={6} md={4} key={field.name}>
      {field.select ? (
        <FormControl fullWidth variant="filled" sx={inputStyle} error={!!errors[field.name]}>
          <InputLabel>{field.label}</InputLabel>
          <Select name={field.name} value={formData[field.name] || ""} onChange={handleChange}>
            {field.select.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
          {errors[field.name] && (
            <Typography variant="caption" color="error">
              {errors[field.name]}
            </Typography>
          )}
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
          helperText={errors[field.name] || ""}
        />
      )}
    </Grid>
  );

  const renderStep = () => {
    const stepFields = [
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

    if (activeStep <= 2) {
      return <Grid container spacing={3}>{stepFields[activeStep].map(renderField)}</Grid>;
    }

    if (activeStep === 3) {
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
              {errors[fileField] && (
                <Typography variant="caption" color="error">
                  {errors[fileField]}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      );
    }

    if (activeStep === 4) {
      return (
        <Box>
          <Typography variant="h6" gutterBottom>
            Review Your Details:
          </Typography>
          {Object.keys(formData).map((key) => (
            <Typography key={key}>
              <strong>{key}:</strong> {formData[key] || "N/A"}
            </Typography>
          ))}
        </Box>
      );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 5, background: "linear-gradient(to bottom right, #c8facc, #eaffea)" }}>
      <Container maxWidth="md">
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: 3, backgroundColor: "white" }}>
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
