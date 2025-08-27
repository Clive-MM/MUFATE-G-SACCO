// src/components/SupportChatWidget.jsx
import React, { useMemo, useState } from "react";
import {
  Box, Paper, Typography, TextField, Button, IconButton,
  Snackbar, Alert, Divider, CircularProgress
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";

export default function SupportChatWidget({
  position = "bottom-right", // can also pass "bottom-left"
  offset = { x: 20, y: 24 },
}) {
  const apiBase = process.env.REACT_APP_API_BASE || "https://mufate-g-sacco.onrender.com";

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1); // 1=email, 2=message, 3=done
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: "success", text: "" });

  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const disabled = useMemo(() => {
    if (step === 1) return !emailOk;
    if (step === 2) return msg.trim().length < 10;
    return false;
  }, [step, emailOk, msg]);

  const alignStyle =
    position === "bottom-left"
      ? { left: offset.x }
      : { right: offset.x };

  async function handleSubmit() {
    try {
      setLoading(true);
      const payload = {
        Email: email.trim(),
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
            sx={{
              background: "linear-gradient(135deg,#065f46,#10b981)",
              color: "#fff",
              width: 56,
              height: 56,
              boxShadow: 3,
              "&:hover": { opacity: 0.92, boxShadow: 6 },
            }}
            aria-label="Open MUFATE G SACCO Support"
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
        )}

        {open && (
          <Paper
            elevation={8}
            sx={{
              width: 340,
              maxWidth: "calc(100vw - 32px)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(135deg,#065f46,#10b981)",
                color: "#fff",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  MUFATE G SACCO Support
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setOpen(false)}
                  sx={{ color: "#fff" }}
                  aria-label="Close support chat"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                We’ll email you updates about your ticket.
              </Typography>
            </Box>

            {/* Body */}
            <Box sx={{ p: 2 }}>
              {step === 1 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    Welcome! What’s your email address?
                  </Typography>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={disabled}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    Describe your question or issue (min 10 characters).
                  </Typography>
                  <TextField
                    label="Your message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    fullWidth
                    minRows={4}
                    multiline
                    size="small"
                  />
                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button variant="outlined" onClick={() => setStep(1)} disabled={loading} fullWidth>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={disabled || loading}
                      fullWidth
                    >
                      {loading ? <CircularProgress size={18} /> : "Submit"}
                    </Button>
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    By submitting, you consent to be contacted at the email above regarding this ticket.
                  </Typography>
                </>
              )}

              {step === 3 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    🎟️ Ticket received
                  </Typography>
                  <Typography variant="body2">
                    We’ve sent a confirmation to <strong>{email}</strong>.
                  </Typography>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    onClick={() => {
                      setStep(1);
                      setOpen(false);
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
