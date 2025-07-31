import React, { useState } from "react";
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
} from "@mui/material";
import axios from "axios";

const MemberRegistration = () => {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const validateForm = () => {
    const requiredFields = [
      "FullName","IDType","IDNumber","DOB","MaritalStatus","Gender",
      "Address","Telephone","AlternatePhone","KRAPin","County","SubCounty",
      "Email","ContactPerson","ContactPersonPhone",
      "NomineeName","NomineeID","NomineeContact","NomineeRelation"
    ];
    for (let f of requiredFields) {
      if (!formData[f]) {
        alert(`❌ ${f} is required`);
        return false;
      }
    }
    const phoneRegex = /^254\d{9}$/;
    if (
      !phoneRegex.test(formData.Telephone) ||
      !phoneRegex.test(formData.AlternatePhone) ||
      !phoneRegex.test(formData.ContactPersonPhone) ||
      !phoneRegex.test(formData.NomineeContact)
    ) {
      alert("❌ All phone numbers must be in format 254XXXXXXXXX");
      return false;
    }
    if (!files.IDFrontURL || !files.IDBackURL || !files.SignatureURL || !files.PASSPORTURL) {
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
      Object.keys(formData).forEach((k) => formDataToSend.append(k, formData[k]));
      Object.keys(files).forEach((k) => formDataToSend.append(k, files[k]));

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/membership/register`,
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

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Member Registration
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4} align="center">
          Please fill in all required details to register as a SACCO member.
        </Typography>

        {/* ✅ BIO DATA SECTION */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Bio Data
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" name="FullName" fullWidth onChange={handleChange} required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="ID Type"
              name="IDType"
              fullWidth
              SelectProps={{ native: true }}
              onChange={handleChange}
              required
            >
              <option value="">-- Select ID Type --</option>
              <option value="ID Card Number">ID Card Number</option>
              <option value="Passport Number">Passport Number</option>
              <option value="Certificate of Incorporation">Certificate of Incorporation</option>
              <option value="Group Reg Cert">Group Reg Cert</option>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField label="ID Number" name="IDNumber" fullWidth onChange={handleChange} required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              name="DOB"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Marital Status"
              name="MaritalStatus"
              fullWidth
              SelectProps={{ native: true }}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Gender"
              name="Gender"
              fullWidth
              SelectProps={{ native: true }}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </TextField>
          </Grid>
        </Grid>

        {/* ✅ CONTACT DETAILS */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Contact Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            "Address","Telephone","AlternatePhone","KRAPin","County","SubCounty",
            "Email","ContactPerson","ContactPersonPhone"
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                fullWidth
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
        </Grid>

        {/* ✅ NOMINEE DETAILS */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Nominee Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {["NomineeName", "NomineeID", "NomineeContact", "NomineeRelation"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                fullWidth
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
        </Grid>

        {/* ✅ DOCUMENT UPLOADS */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
          Document Uploads
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map((fileField) => (
            <Grid item xs={12} sm={6} key={fileField}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "primary.light" },
                }}
              >
                Upload {fileField.replace("URL", "")}
                <input type="file" name={fileField} hidden onChange={handleFileChange} />
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* ✅ REGISTER BUTTON */}
        <Box textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              background: "linear-gradient(to right, #64dd17, #76ff03)",
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "30px",
              boxShadow: 3,
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            {loading ? "Submitting..." : "Register"}
          </Button>
        </Box>
      </Paper>

      {/* ✅ Payment Confirmation Popup */}
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
        <Typography mt={3} color="primary" fontWeight="bold" textAlign="center">
          {responseMsg}
        </Typography>
      )}
    </Container>
  );
};

export default MemberRegistration;
