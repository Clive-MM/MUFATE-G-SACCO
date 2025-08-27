// src/components/SupportChatWidget.jsx
import React, { useMemo, useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, IconButton,
  Snackbar, Alert, Divider, CircularProgress, ToggleButton, ToggleButtonGroup,
  InputAdornment, Chip, Stack, Zoom, Slide, Tooltip
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

export default function SupportChatWidget({
  position = "bottom-right",
  offset = { x: 20, y: 24 },
}) {
  const apiBase = process.env.REACT_APP_API_BASE || "https://mufate-g-sacco.onrender.com";

  // state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [contactMode, setContactMode] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", text: "" });

  // validators
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const phoneOk = /^2547\d{8}$/.test(phone);
  const msgMin = 10;
  const msgMax = 1000;

  const disabled = useMemo(() => {
    if (step === 1) return contactMode === "email" ? !emailOk : !phoneOk;
    if (step === 2) return msg.trim().length < msgMin || msg.trim().length > msgMax;
    return false;
  }, [step, contactMode, emailOk, phoneOk, msg]);

  const alignStyle = position === "bottom-left" ? { left: offset.x } : { right: offset.x };

  // Neumorphism + brand tokens
  const neuBg = "#e9faea";
  const neuOut = "12px 12px 24px #bfdcc2, -12px -12px 24px #ffffff";
  const neuIn = "inset 6px 6px 12px #cfe6d2, inset -6px -6px 12px #ffffff";
  const brand = "#2e7d32";

  const quickReplies = [
    "I need help with registration",
    "Loan application guidance",
    "Mobile banking issue",
    "Branch contact & hours",
  ];

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
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit ticket");
      setStep(3);
      setToast({ open: true, type: "success", text: data?.message || "Ticket received." });
      setMsg("");
    } catch (err) {
      setToast({ open: true, type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <Box
        sx={{
          position: "fixed",
          bottom: `calc(${offset.y}px + env(safe-area-inset-bottom, 0px))`,
          ...alignStyle,
          zIndex: 1300,
        }}
      >
        <Zoom in={!open}>
          <Tooltip title="Chat with MUFATE G SACCO" arrow>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              aria-label="Open MUFATE G SACCO Support"
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                // ✅ Solid green background & white icon
                background: brand,
                color: "#fff",
                boxShadow: neuOut,
                border: "1px solid rgba(46,125,50,0.18)",
                position: "relative",

                // 🔔 Eye-catching alternating light-green ↔ gold glow
                "&:before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  boxShadow: "0 0 0 0 rgba(144,238,144,.55)", // light green start
                  animation: "pulse 2.1s infinite",
                },
                "@keyframes pulse": {
                  "0%":   { boxShadow: "0 0 0 0 rgba(144,238,144,.55)" },  // light green
                  "35%":  { boxShadow: "0 0 0 10px rgba(255,215,0,.45)" }, // gold halo
                  "70%":  { boxShadow: "0 0 0 20px rgba(144,238,144,0)" }, // fade
                  "100%": { boxShadow: "0 0 0 0 rgba(255,215,0,0)" },      // reset
                },
                "&:hover": { boxShadow: "8px 8px 18px #bcd9bf, -8px -8px 18px #ffffff" },
              }}
            >
              <ChatBubbleOutlineIcon />
            </IconButton>
          </Tooltip>
        </Zoom>

        {/* Panel */}
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper
            elevation={0}
            sx={{
              mt: 1.5,
              width: 380,
              maxWidth: "calc(100vw - 28px)",
              borderRadius: 3,
              overflow: "hidden",
              background: "rgba(233,250,234,0.9)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: neuOut,
              border: "1px solid rgba(46,125,50,0.12)",
            }}
            role="dialog"
            aria-labelledby="mufate-support-title"
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: neuBg,
                boxShadow: neuIn,
              }}
            >
              <Typography id="mufate-support-title" variant="subtitle1" sx={{ fontWeight: 800, color: brand }}>
                MUFATE G SACCO Support
              </Typography>
              <IconButton
                size="small"
                onClick={() => setOpen(false)}
                aria-label="Close support chat"
                sx={{ color: brand }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Body */}
            <Box sx={{ p: 2 }}>
              {step === 1 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1, color: "#1b5e20" }}>
                    Choose how we should contact you
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    value={contactMode}
                    onChange={(_, v) => v && setContactMode(v)}
                    sx={{
                      mb: 1.5,
                      "& .MuiToggleButton-root": {
                        textTransform: "none",
                        px: 1.5,
                        borderColor: "rgba(46,125,50,.25)",
                      },
                      "& .Mui-selected": {
                        background: brand,
                        color: "#fff",
                        "&:hover": { background: "#1b5e20" },
                      },
                    }}
                  >
                    <ToggleButton value="email">Email</ToggleButton>
                    <ToggleButton value="phone">Phone / WhatsApp</ToggleButton>
                  </ToggleButtonGroup>

                  {contactMode === "email" ? (
                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      size="small"
                      variant="filled"
                      helperText={email && !emailOk ? "Enter a valid email" : " "}
                      error={!!email && !emailOk}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: brand }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ borderRadius: 2, background: neuBg, boxShadow: neuIn }}
                    />
                  ) : (
                    <TextField
                      label="Phone (format: 2547XXXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                      size="small"
                      variant="filled"
                      helperText={phone && !phoneOk ? "Use Kenyan mobile format 2547XXXXXXXX" : " "}
                      error={!!phone && !phoneOk}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneIcon sx={{ color: brand }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ borderRadius: 2, background: neuBg, boxShadow: neuIn }}
                    />
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      background: brand,
                      "&:hover": { background: "#1b5e20" },
                      borderRadius: 2,
                      boxShadow: "0 6px 16px rgba(46,125,50,.25)",
                    }}
                    disabled={disabled}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1, color: "#1b5e20" }}>
                    Describe your question or issue
                  </Typography>

                  {/* Quick replies */}
                  <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
                    {quickReplies.map((q) => (
                      <Chip
                        key={q}
                        label={q}
                        size="small"
                        onClick={() => setMsg((m) => (m ? `${m} ${q}` : q))}
                        sx={{
                          borderColor: brand,
                          color: brand,
                          background: "#fff",
                          borderWidth: 1,
                          borderStyle: "solid",
                        }}
                      />
                    ))}
                  </Stack>

                  <TextField
                    label="Your message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value.slice(0, msgMax))}
                    fullWidth
                    minRows={4}
                    multiline
                    size="small"
                    variant="filled"
                    helperText={`${Math.max(0, msgMin - msg.trim().length)} more characters to reach minimum`}
                    InputProps={{ disableUnderline: true }}
                    sx={{ borderRadius: 2, background: neuBg, boxShadow: neuIn }}
                    error={msg.trim().length > 0 && msg.trim().length < msgMin}
                  />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Min {msgMin} • Max {msgMax}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {msg.trim().length}/{msgMax}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setStep(1)}
                      disabled={loading}
                      fullWidth
                      sx={{
                        borderColor: brand,
                        color: brand,
                        borderRadius: 2,
                        "&:hover": { borderColor: "#1b5e20", color: "#1b5e20" },
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={disabled || loading}
                      fullWidth
                      sx={{
                        background: brand,
                        "&:hover": { background: "#1b5e20" },
                        borderRadius: 2,
                        boxShadow: "0 6px 16px rgba(46,125,50,.25)",
                      }}
                    >
                      {loading ? <CircularProgress size={18} /> : "Submit"}
                    </Button>
                  </Box>

                  <Divider sx={{ my: 1.5, borderColor: "rgba(46,125,50,0.15)" }} />
                  <Typography variant="caption" color="text.secondary">
                    By submitting, you consent to be contacted via the method you selected above.
                  </Typography>
                </>
              )}

              {step === 3 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: brand }}>
                    🎟️ Ticket received
                  </Typography>
                  <Typography variant="body2">
                    We’ll contact you via <strong>{contactMode === "email" ? email : phone}</strong>.
                  </Typography>
                  <Button
                    sx={{
                      mt: 2,
                      background: brand,
                      "&:hover": { background: "#1b5e20" },
                      borderRadius: 2,
                      boxShadow: "0 6px 16px rgba(46,125,50,.25)",
                    }}
                    variant="contained"
                    onClick={() => {
                      setStep(1);
                      setOpen(false);
                      setEmail("");
                      setPhone("");
                      setMsg("");
                    }}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Slide>
      </Box>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3800}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: position === "bottom-left" ? "left" : "right",
        }}
      >
        <Alert onClose={() => setToast((s) => ({ ...s, open: false }))} severity={toast.type} variant="filled">
          {toast.text}
        </Alert>
      </Snackbar>
    </>
  );
}
