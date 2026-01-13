import React, { useMemo, useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, IconButton,
  Snackbar, Alert, Divider, CircularProgress, ToggleButton, ToggleButtonGroup,
  InputAdornment, Chip, Stack, Zoom, Slide, Tooltip, useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

export default function SupportChatWidget({
  position = "bottom-right",
  offset = { x: 20, y: 24 },
}) {
  const apiBase = process.env.REACT_APP_API_BASE || "https://mufate-g-sacco.onrender.com";
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  // BRAND COLORS
  const BRAND_GOLD = "#EC9B14";
  const BRAND_DARK = "#02150F";
  const BRAND_DARK_SOFT = "#05291E"; 
  const LOGO_URL = "https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png";

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [contactMode, setContactMode] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", text: "" });

  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const phoneOk = /^2547\d{8}$/.test(phone);
  
  const disabled = useMemo(() => {
    if (step === 1) return contactMode === "email" ? !emailOk : !phoneOk;
    if (step === 2) return msg.trim().length < 10;
    return false;
  }, [step, contactMode, emailOk, phoneOk, msg]);

  const alignStyle = position === "bottom-left" ? { left: offset.x } : { right: offset.x };

  async function handleSubmit() {
    try {
      setLoading(true);
      const payload = {
        Email: contactMode === "email" ? email.trim() : "",
        PhoneNumber: contactMode === "phone" ? phone.trim() : "",
        Message: msg.trim(),
        PageUrl: window.location.href,
      };
      const res = await fetch(`${apiBase}/support/ticket`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStep(3);
      setToast({ open: true, type: "success", text: "Support ticket sent!" });
    } catch (err) {
      setToast({ open: true, type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <Box sx={{ position: "fixed", bottom: offset.y, ...alignStyle, zIndex: 1300 }}>
        <Zoom in={!open}>
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              width: 64, height: 64, background: BRAND_GOLD, color: BRAND_DARK,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)", 
              border: `2px solid ${BRAND_DARK}`,
              "&:hover": { background: BRAND_GOLD, transform: "scale(1.1)" }
            }}
          >
            <ChatBubbleOutlineIcon fontSize="large" />
          </IconButton>
        </Zoom>

        {/* Panel */}
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper
            elevation={24}
            sx={{
              width: isSmDown ? "calc(100vw - 24px)" : "400px", // Width increased for full title
              borderRadius: "24px",
              overflow: "hidden",
              background: BRAND_DARK,
              border: `1px solid ${BRAND_GOLD}55`,
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
            }}
          >
            {/* Header with Logo and Full Title */}
            <Box sx={{ 
              p: 2, 
              display: "flex", 
              alignItems: "center", 
              background: `linear-gradient(to bottom, ${BRAND_DARK_SOFT}, ${BRAND_DARK})`,
              borderBottom: `1px solid ${BRAND_GOLD}33` 
            }}>
              <Box component="img" src={LOGO_URL} sx={{ height: 35, mr: 1.5, objectFit: 'contain' }} />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ 
                  fontWeight: 800, 
                  color: BRAND_GOLD, 
                  fontSize: "0.85rem", 
                  lineHeight: 1.2,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase"
                }}>
                  Golden Generation <br/> DT Sacco Support
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "#19c37d", boxShadow: "0 0 8px #19c37d" }} />
                 <IconButton onClick={() => setOpen(false)} sx={{ color: BRAND_GOLD, p: 0.5 }}><CloseIcon fontSize="small" /></IconButton>
              </Box>
            </Box>

            {/* Body */}
            <Box sx={{ p: 3 }}>
              {step === 1 && (
                <Stack spacing={2.5}>
                  <Typography variant="body2" sx={{ color: BRAND_GOLD, fontWeight: 500 }}>
                    How should we contact you?
                  </Typography>
                  
                  <ToggleButtonGroup
                    exclusive
                    value={contactMode}
                    onChange={(_, v) => v && setContactMode(v)}
                    sx={{
                      width: '100%', background: BRAND_DARK_SOFT, p: 0.5, borderRadius: "12px",
                      "& .MuiToggleButton-root": {
                        flex: 1, border: 0, color: BRAND_GOLD, borderRadius: "10px !important",
                        textTransform: "none", fontWeight: 700,
                        "&.Mui-selected": { 
                          background: BRAND_GOLD, 
                          color: BRAND_DARK, 
                          "&:hover": { background: BRAND_GOLD } 
                        },
                        "&:hover": { background: `${BRAND_GOLD}22` }
                      }
                    }}
                  >
                    <ToggleButton value="email">Email</ToggleButton>
                    <ToggleButton value="phone">Phone / WhatsApp</ToggleButton>
                  </ToggleButtonGroup>

                  <TextField
                    fullWidth
                    label={contactMode === "email" ? "Email Address" : "Phone (e.g. 2547...)"}
                    variant="filled"
                    value={contactMode === "email" ? email : phone}
                    onChange={(e) => contactMode === "email" ? setEmail(e.target.value) : setPhone(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          {contactMode === "email" ? <EmailIcon sx={{ color: BRAND_GOLD }} /> : <PhoneIphoneIcon sx={{ color: BRAND_GOLD }} />}
                        </InputAdornment>
                      ),
                      sx: { color: "#FFF", fontSize: '0.95rem' }
                    }}
                    InputLabelProps={{ sx: { color: `${BRAND_GOLD}88` } }}
                    sx={{ 
                        background: BRAND_DARK_SOFT, 
                        borderRadius: "12px", 
                        border: `1px solid ${BRAND_GOLD}22`,
                        "& .MuiFilledInput-root": { borderRadius: "12px" }
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setStep(2)}
                    disabled={disabled}
                    sx={{
                      py: 1.5, borderRadius: "12px", background: BRAND_GOLD, color: BRAND_DARK, 
                      fontWeight: 900, fontSize: "1rem", 
                      "&:hover": { background: BRAND_GOLD, transform: 'translateY(-2px)', boxShadow: `0 4px 15px ${BRAND_GOLD}44` },
                      "&.Mui-disabled": { background: `${BRAND_GOLD}33`, color: `${BRAND_GOLD}66` }
                    }}
                  >
                    CONTINUE
                  </Button>
                </Stack>
              )}

              {step === 2 && (
                <Stack spacing={2}>
                  <Typography variant="body2" sx={{ color: BRAND_GOLD, fontWeight: 500 }}>Describe your request</Typography>
                  <TextField
                    fullWidth multiline rows={4} variant="filled"
                    placeholder="Type your message here..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    InputProps={{ disableUnderline: true, sx: { color: "#FFF", borderRadius: '12px' } }}
                    sx={{ 
                        background: BRAND_DARK_SOFT, 
                        borderRadius: "12px", 
                        border: `1px solid ${BRAND_GOLD}22`,
                        "& .MuiFilledInput-root": { borderRadius: "12px" }
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1.5, pt: 1 }}>
                    <Button fullWidth onClick={() => setStep(1)} sx={{ color: BRAND_GOLD, fontWeight: 700 }}>Back</Button>
                    <Button
                      fullWidth variant="contained" onClick={handleSubmit} disabled={disabled || loading}
                      sx={{ 
                        background: BRAND_GOLD, color: BRAND_DARK, fontWeight: 900, borderRadius: "12px",
                        "&:hover": { background: BRAND_GOLD, opacity: 0.9 }
                      }}
                    >
                      {loading ? <CircularProgress size={24} sx={{ color: BRAND_DARK }} /> : "SUBMIT"}
                    </Button>
                  </Box>
                </Stack>
              )}

              {step === 3 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                   <Box sx={{ width: 60, height: 60, borderRadius: '50%', background: BRAND_GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Typography sx={{ fontSize: '2rem' }}>✅</Typography>
                   </Box>
                  <Typography variant="h6" sx={{ color: BRAND_GOLD, fontWeight: 800, mb: 1 }}>Ticket Received</Typography>
                  <Typography variant="body2" sx={{ color: "#FFF", opacity: 0.8, mb: 4 }}>We have received your message and will reach out to you via {contactMode} shortly.</Typography>
                  <Button fullWidth variant="contained" onClick={() => {setOpen(false); setStep(1); setEmail(""); setPhone(""); setMsg("");}} sx={{ background: BRAND_GOLD, color: BRAND_DARK, fontWeight: 900, borderRadius: "12px" }}>Close Chat</Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Slide>
      </Box>

      {/* Snackbar Styling */}
      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled" sx={{ background: BRAND_GOLD, color: BRAND_DARK, fontWeight: 'bold' }}>
          {toast.text}
        </Alert>
      </Snackbar>
    </>
  );
}