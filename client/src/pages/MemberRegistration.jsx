import React, { useState } from "react";
import Footer from "../components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const StyledSection = ({ title, children }) => (
  <Paper
    sx={{
      p: 3,
      mb: 4,
      borderRadius: 3,
      boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
      backgroundColor: "#f9fff9",
    }}
  >
    <Typography
      variant="h6"
      sx={{
        mb: 3,
        fontWeight: "bold",
        color: "#2e7d32",
        borderBottom: "3px solid #66bb6a",
        display: "inline-block",
        pb: 0.5,
      }}
    >
      {title}
    </Typography>
    {children}
  </Paper>
);

const inputStyle = {
  borderRadius: 2,
  "& .MuiFilledInput-root": {
    borderRadius: 2,
    backgroundColor: "#fff",
  },
};

const MemberRegistration = () => {
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

  const validateForm = () => {
    const requiredFields = [
      "FullName",
      "IDType",
      "IDNumber",
      "DOB",
      "MaritalStatus",
      "Gender",
      "Address",
      "Telephone",
      "AlternatePhone",
      "KRAPin",
      "County",
      "SubCounty",
      "Email",
      "ContactPerson",
      "ContactPersonPhone",
      "NomineeName",
      "NomineeID",
      "NomineeContact",
      "NomineeRelation",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`❌ ${field} is required`);
        return false;
      }
    }

    const phoneRegex = /^254\d{9}$/;
    const phoneFields = [
      "Telephone",
      "AlternatePhone",
      "ContactPersonPhone",
      "NomineeContact",
    ];
    for (let p of phoneFields) {
      if (!phoneRegex.test(formData[p])) {
        alert(`❌ ${p} must be in format 254XXXXXXXXX`);
        return false;
      }
    }

    if (
      !files.IDFrontURL ||
      !files.IDBackURL ||
      !files.SignatureURL ||
      !files.PASSPORTURL
    ) {
      alert("❌ All required files must be uploaded");
      return false;
    }
    return true;
  };

  const handleSubmit = () => validateForm() && setOpenDialog(true);

  const confirmSubmission = async () => {
    setOpenDialog(false);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((k) =>
        formDataToSend.append(k, formData[k])
      );
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

  const nomineeRelations = [
    "Wife",
    "Husband",
    "Father",
    "Mother",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
    "Uncle",
    "Aunt",
    "Nephew",
    "Niece",
    "Cousin",
    "Friend",
    "Other",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 5,
        background: "linear-gradient(to bottom right, #c8facc, #eaffea)",
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 5,
            borderRadius: 4,
            boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            align="center"
            color="primary"
          >
            Member Registration
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            mb={4}
            align="center"
          >
            Please fill in all required details to register as a SACCO member.
          </Typography>

          {/* BIO DATA */}
          <StyledSection title="Bio Data">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Full Name"
                  name="FullName"
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="filled" required sx={inputStyle}>
                  <InputLabel>ID Type</InputLabel>
                  <Select
                    name="IDType"
                    value={formData.IDType || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="ID Card Number">ID Card Number</MenuItem>
                    <MenuItem value="Passport Number">Passport Number</MenuItem>
                    <MenuItem value="Certificate of Incorporation">
                      Certificate of Incorporation
                    </MenuItem>
                    <MenuItem value="Group Reg Cert">Group Reg Cert</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="ID Number"
                  name="IDNumber"
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date of Birth"
                  name="DOB"
                  type="date"
                  fullWidth
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="filled" required sx={inputStyle}>
                  <InputLabel>Marital Status</InputLabel>
                  <Select
                    name="MaritalStatus"
                    value={formData.MaritalStatus || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="filled" required sx={inputStyle}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="Gender"
                    value={formData.Gender || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </StyledSection>

          {/* CONTACT DETAILS */}
          <StyledSection title="Contact Details">
            <Grid container spacing={3}>
              {[
                "Address",
                "Telephone",
                "AlternatePhone",
                "KRAPin",
                "County",
                "SubCounty",
                "Email",
                "ContactPerson",
                "ContactPersonPhone",
              ].map((field) => (
                <Grid item xs={12} sm={4} key={field}>
                  <TextField
                    label={field.replace(/([A-Z])/g, " $1").trim()}
                    name={field}
                    fullWidth
                    variant="filled"
                    sx={inputStyle}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              ))}
            </Grid>
          </StyledSection>

          {/* NOMINEE DETAILS */}
          <StyledSection title="Nominee Details">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nominee Name"
                  name="NomineeName"
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nominee ID"
                  name="NomineeID"
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nominee Contact"
                  name="NomineeContact"
                  fullWidth
                  variant="filled"
                  sx={inputStyle}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="filled" required sx={inputStyle}>
                  <InputLabel>Nominee Relation</InputLabel>
                  <Select
                    name="NomineeRelation"
                    value={formData.NomineeRelation || ""}
                    onChange={handleChange}
                  >
                    {nomineeRelations.map((relation) => (
                      <MenuItem key={relation} value={relation}>
                        {relation}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </StyledSection>

          {/* FILE UPLOADS */}
          <StyledSection title="Document Uploads">
            <Grid container spacing={3}>
              {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map(
                (fileField) => (
                  <Grid item xs={12} sm={6} key={fileField}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#eaffea" },
                      }}
                    >
                      Upload {fileField.replace("URL", "")}
                      <input
                        type="file"
                        name={fileField}
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>

                    {fileNames[fileField] && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                        align="center"
                      >
                        ✅ Selected: {fileNames[fileField]}
                      </Typography>
                    )}
                  </Grid>
                )
              )}
            </Grid>
          </StyledSection>

          {/* REGISTER BUTTON */}
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                background: "linear-gradient(to right, #4CAF50, #81C784)",
                px: 6,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: "30px",
                boxShadow: 3,
                "&:hover": {
                  background: "linear-gradient(to right, #388E3C, #66BB6A)",
                  transform: "scale(1.05)",
                },
              }}
            >
              {loading ? "Submitting..." : "Register"}
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* PAYMENT CONFIRMATION */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Payment Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please pay <b>KES 1,500</b> to complete your registration. <br />
            After payment, click <b>Confirm</b> to submit your details.
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
        <Typography
          mt={3}
          color="primary"
          fontWeight="bold"
          textAlign="center"
        >
          {responseMsg}
        </Typography>
      )}
    <Footer/>  
    </Box>
    
  );
};

export default MemberRegistration;
