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
} from "@mui/material";
import axios from "axios";

const MemberRegistration = () => {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const validateForm = () => {
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`❌ ${field} is required`);
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

  const handleSubmit = () => {
    if (validateForm()) {
      setOpenDialog(true); // Show payment popup
    }
  };

  const confirmSubmission = async () => {
    setOpenDialog(false);
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) formDataToSend.append(key, formData[key]);
      for (const key in files) formDataToSend.append(key, files[key]);

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/membership/register`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResponseMsg(res.data.message);
    } catch (error) {
      setResponseMsg(error.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Member Registration
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Please fill in all required details to register as a SACCO member.
      </Typography>

      <Grid container spacing={2}>
        {requiredFields.map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            <TextField
              label={field.replace(/([A-Z])/g, " $1").trim()}
              name={field}
              fullWidth
              type={field === "DOB" ? "date" : "text"}
              InputLabelProps={field === "DOB" ? { shrink: true } : {}}
              onChange={handleChange}
              required
            />
          </Grid>
        ))}

        {/* File Uploads */}
        {["IDFrontURL", "IDBackURL", "SignatureURL", "PASSPORTURL"].map((fileField) => (
          <Grid item xs={12} sm={6} key={fileField}>
            <Button variant="outlined" component="label" fullWidth>
              Upload {fileField.replace("URL", "")}
              <input type="file" name={fileField} hidden onChange={handleFileChange} />
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            background: "linear-gradient(to right, #64dd17, #76ff03)",
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            borderRadius: "30px",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          {loading ? "Submitting..." : "Register"}
        </Button>
      </Box>

      {/* Payment Confirmation Dialog */}
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
        <Typography mt={3} color="primary" fontWeight="bold">
          {responseMsg}
        </Typography>
      )}
    </Container>
  );
};

export default MemberRegistration;
