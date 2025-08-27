// src/components/SupportChatWidget.jsx
import React, { useMemo, useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, IconButton,
  Snackbar, Alert, Divider, CircularProgress, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; // ✅ correct icon import
import CloseIcon from "@mui/icons-material/Close";

export default function SupportChatWidget({
  position = "bottom-right", // "bottom-right" | "bottom-left"
  offset = { x: 20, y: 24 },
}) {
  // CRA env → REACT_APP_API_BASE
  const apiBase = process.env.REACT_APP_API_BASE || "https://mufate-g-sacco.onrender.com";

  // UI state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = contact, 2 = message, 3 = done
  const [contactMode, setContactMode] = useState("email"); // "email" | "phone"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", text: "" });

  // Validation
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const phoneOk = /^2547\d{8}$/.test(phone); // Kenya mobile format
  const disabled = useMemo(() => {
    if (step === 1) return contactMode === "email" ? !emailOk : !phoneOk;
    if (step === 2) return msg.trim().length < 10;
    return false;
  }, [step, contactMode, emailOk, phoneOk, msg]);

  const alignStyle = position === "bottom-left" ? { left: offset.x } : { right: offset.x };

  // Neumorphism tokens
  const neuBg = "#e3f9e5"; // same family as your MemberRegistration page
  const neuShadowOut = "8px 8px 16px #b8dcb8, -8px -8px 16px #ffffff";
  const neuShadowIn = "inset 6px 6px 12px #b8dcb8, inset -6px -6px 12px #ffffff";
  const brandGreen = "#2e7d32";

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
      {/* Floating trigger & panel */}
      <Box
        sx={{
          position: "fixed",
          bottom: offset.y,
          ...alignStyle,
          zIndex: 1300,
        }}
      >
        {!open && (
          <IconButton
            onClick={() => setOpen(true)}
            size="large"
            aria-label="Open MUFATE G SACCO Support"
            sx={{
              width: 62,
              height: 62,
              borderRadius: "50%",
              background: neuBg,
              color: brandGreen,
              boxShadow: neuShadowOut,
              border: "1px solid rgba(46,125,50,0.15)",
              "&:hover": { boxShadow: "6px 6px 12px #a5cba5, -6px -6px 12px #ffffff" },
            }}
          >
            <ChatBubbleOutlineIcon /> {/* ✅ fixed icon usage */}
          </IconButton>
        )}

        {open && (
          <Paper
            elevation={0}
            sx={{
              width: 360,
              maxWidth: "calc(100vw - 32px)",
              borderRadius: 3,
              overflow: "hidden",
              background: neuBg,
              boxShadow: neuShadowOut,
              border: "1px solid rgba(46,125,50,0.12)",
            }}
            role="dialog"
            aria-labelledby="mufate-support-title"
          >
            {/* Header (neumorphic bar) */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: neuBg,
                boxShadow: neuShadowIn,
              }}
            >
              <Typography id="mufate-support-title" variant="subtitle1" sx={{ fontWeight: 700, color: brandGreen }}>
                MUFATE G SACCO Support
              </Typography>
              <IconButton
                size="small"
                onClick={() => setOpen(false)}
                aria-label="Close support chat"
                sx={{ color: brandGreen }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Body */}
            <Box sx={{ p: 2 }}>
              {step === 1 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1.25, color: "#1b5e20" }}>
                    Choose how we should contact you:
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    value={contactMode}
                    onChange={(_, v) => v && setContactMode(v)}
                    sx={{ mb: 1.5 }}
                  >
                    <ToggleButton value="email">Email</ToggleButton>
                    <ToggleButton value="phone">Phone/WhatsApp</ToggleButton>
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
                      InputProps={{ disableUnderline: true }}
                      sx={{
                        borderRadius: 2,
                        background: neuBg,
                        boxShadow: neuShadowIn,
                      }}
                    />
                  ) : (
                    <TextField
                      label="Phone (format: 2547XXXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                      size="small"
                      variant="filled"
                      InputProps={{ disableUnderline: true }}
                      sx={{
                        borderRadius: 2,
                        background: neuBg,
                        boxShadow: neuShadowIn,
                      }}
                    />
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      background: brandGreen,
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
                  <Typography variant="body2" sx={{ mb: 1.25, color: "#1b5e20" }}>
                    Describe your question or issue (min 10 characters)
                  </Typography>
                  <TextField
                    label="Your message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    fullWidth
                    minRows={4}
                    multiline
                    size="small"
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      borderRadius: 2,
                      background: neuBg,
                      boxShadow: neuShadowIn,
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setStep(1)}
                      disabled={loading}
                      fullWidth
                      sx={{
                        borderColor: brandGreen,
                        color: brandGreen,
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
                        background: brandGreen,
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
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: brandGreen }}>
                    🎟️ Ticket received
                  </Typography>
                  <Typography variant="body2">
                    We’ve recorded your request. We’ll contact you via{" "}
                    <strong>{contactMode === "email" ? email : phone}</strong>.
                  </Typography>
                  <Button
                    sx={{
                      mt: 2,
                      background: brandGreen,
                      "&:hover": { background: "#1b5e20" },
                      borderRadius: 2,
                      boxShadow: "0 6px 16px rgba(46,125,50,0.25)",
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
        )}
      </Box>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
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
