// src/components/SupportChatWidget.jsx
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
import CircleIcon from "@mui/icons-material/Circle";

export default function SupportChatWidget({
  position = "bottom-right",
  offset = { x: 20, y: 24 },
}) {
  const apiBase = process.env.REACT_APP_API_BASE || "https://mufate-g-sacco.onrender.com";

  // Theme + breakpoints
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));   // < 600px
  const isXs = useMediaQuery("(max-width:420px)");

  // Responsive tokens
  const launcherSize = isSmDown ? 56 : 64;
  const panelMaxWidth = isSmDown ? "calc(100vw - 16px)" : "380px";
  const panelRadius = isSmDown ? 16 : 24;
  const headerPad = isSmDown ? 1.25 : 2;
  const bodyPad = isSmDown ? 1.5 : 2;

  // Design tokens
  const TOKENS = {
    brand: "#2e7d32",
    brandDark: "#1b5e20",
    panelGlass: "rgba(243, 250, 244, 0.85)",
    neuBg: "#e9faea",
    ring: "0 0 0 3px rgba(46,125,50,.22)",
    radius: { s: 12, m: 16, l: 24 },
    shadowOut: "0 10px 30px rgba(46,125,50,.18)",
    shadowHover: "0 12px 36px rgba(46,125,50,.22)",
    inset: "inset 6px 6px 12px #cfe6d2, inset -6px -6px 12px #ffffff",
  };
  const brand = TOKENS.brand;

  // state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [contactMode, setContactMode] = useState("email"); // "email" | "phone"
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
          ...(isXs && (position === "bottom-left" ? { left: 12 } : { right: 12 })),
        }}
      >
        <Zoom in={!open}>
          <Tooltip title="Chat with MUFATE G SACCO" arrow>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              aria-label="Open MUFATE G SACCO Support"
              sx={{
                width: launcherSize,
                height: launcherSize,
                borderRadius: "50%",
                background: brand,
                color: "#fff",
                boxShadow: TOKENS.shadowOut,
                border: "1px solid rgba(46,125,50,0.18)",
                position: "relative",
                transition: "transform .15s ease, box-shadow .15s ease",
                "&:hover": { transform: "translateY(-1px)", boxShadow: TOKENS.shadowHover },
                "&:active": { transform: "translateY(0)", boxShadow: TOKENS.shadowOut },
                "&:focus-visible": { outline: "none", boxShadow: `${TOKENS.shadowOut}, ${TOKENS.ring}` },
                // Gentle pulse (reduced-motion respected)
                "&::before": {
                  content: '""', position: "absolute", inset: 0, borderRadius: "50%",
                  boxShadow: "0 0 0 0 rgba(144,238,144,.45)",
                  animation: "pulse 2.2s infinite",
                },
                "@media (prefers-reduced-motion: reduce)": { "&::before": { animation: "none" } },
                "@keyframes pulse": {
                  "0%": { boxShadow: "0 0 0 0 rgba(144,238,144,.45)" },
                  "60%": { boxShadow: "0 0 0 16px rgba(144,238,144,0)" },
                  "100%": { boxShadow: "0 0 0 0 rgba(144,238,144,0)" },
                },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: isSmDown ? 22 : 24 }} />
            </IconButton>
          </Tooltip>
        </Zoom>

        {/* Panel */}
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper
            elevation={0}
            sx={{
              mt: 1.25,
              width: "100%",
              maxWidth: panelMaxWidth,
              borderRadius: panelRadius,
              overflow: "hidden",
              background: TOKENS.panelGlass,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(46,125,50,0.12)",
              boxShadow: TOKENS.shadowOut,
              mx: isXs ? 0.5 : 0,
              ...(isSmDown && { maxHeight: "70vh", display: "flex", flexDirection: "column" }),
            }}
            role="dialog"
            aria-labelledby="mufate-support-title"
            aria-describedby={step === 2 ? "mufate-support-body" : undefined}
          >
            {/* Header */}
            <Box
              sx={{
                p: headerPad,
                px: isSmDown ? 1.25 : 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: `linear-gradient(180deg, ${TOKENS.neuBg} 0%, #f7fcf7 100%)`,
                boxShadow: "inset 0 -1px 0 rgba(46,125,50,0.08)",
                position: isSmDown ? "sticky" : "static",
                top: 0,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  id="mufate-support-title"
                  variant={isSmDown ? "subtitle2" : "subtitle1"}
                  sx={{ fontWeight: 800, color: brand, letterSpacing: 0.2 }}
                >
                  welcome to MUFATE Support
                </Typography>

                {/* Online status */}
                <Box
                  aria-label="Online now"
                  role="status"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 0.75,
                    py: 0.25,
                    borderRadius: 999,
                    background: "#ffffff",
                    border: "1px solid rgba(46,125,50,.18)",
                  }}
                >
                  <CircleIcon
                    fontSize="inherit"
                    sx={{
                      fontSize: 10,
                      color: "#19c37d",
                      filter: "drop-shadow(0 0 4px rgba(25,195,125,.6))",
                      animation: "blink 2.2s infinite",
                      "@keyframes blink": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0.55 },
                      },
                      "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "#1b5e20", fontWeight: 600 }}>
                    Online now
                  </Typography>
                </Box>
              </Box>

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
            <Box
              id="mufate-support-body"
              sx={{
                p: bodyPad,
                pt: isSmDown ? 1.25 : 2,
                ...(isSmDown && {
                  overflow: "auto",
                  maxHeight: "inherit",
                  scrollbarGutter: "stable",
                  overscrollBehavior: "contain",
                  paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 8px)",
                }),
              }}
            >
              {step === 1 && (
                <>
                  <Typography variant="body2" sx={{ mb: isSmDown ? 0.75 : 1, color: "#1b5e20" }}>
                    How should we contact you?
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    value={contactMode}
                    onChange={(_, v) => v && setContactMode(v)}
                    sx={{
                      mb: isSmDown ? 1 : 1.5,
                      borderRadius: TOKENS.radius.m,
                      background: "#fff",
                      padding: 0.25,
                      "& .MuiToggleButton-root": {
                        border: 0,
                        textTransform: "none",
                        px: isSmDown ? 1 : 1.5,
                        py: isSmDown ? 0.6 : 0.7,
                        fontSize: isSmDown ? ".85rem" : ".95rem",
                        borderRadius: TOKENS.radius.s,
                        color: "#1b5e20",
                        "&:hover": { backgroundColor: "rgba(46,125,50,.05)" },
                        "&.Mui-selected": {
                          background: brand,
                          color: "#fff",
                          boxShadow: "0 6px 14px rgba(46,125,50,.22)",
                          "&:hover": { background: TOKENS.brandDark },
                        },
                        "&:focus-visible": { outline: "none", boxShadow: TOKENS.ring },
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
                      size={isSmDown ? "small" : "medium"}
                      variant="filled"
                      helperText={email && !emailOk ? "Enter a valid email" : " "}
                      error={!!email && !emailOk}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: brand, fontSize: isSmDown ? 18 : 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        borderRadius: TOKENS.radius.m,
                        background: TOKENS.neuBg,
                        boxShadow: TOKENS.inset,
                        "& .MuiFilledInput-root": {
                          borderRadius: TOKENS.radius.m,
                          transition: "box-shadow .15s ease, background-color .15s ease",
                          "&.Mui-focused": {
                            background: "#f6fff7",
                            boxShadow: `${TOKENS.inset}, ${TOKENS.ring}`,
                          },
                        },
                        "& .MuiFormHelperText-root": { mt: 0.5 },
                      }}
                    />
                  ) : (
                    <TextField
                      label="Phone (format: 2547XXXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                      size={isSmDown ? "small" : "medium"}
                      variant="filled"
                      helperText={phone && !phoneOk ? "Use Kenyan mobile format 2547XXXXXXXX" : " "}
                      error={!!phone && !phoneOk}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneIcon sx={{ color: brand, fontSize: isSmDown ? 18 : 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        borderRadius: TOKENS.radius.m,
                        background: TOKENS.neuBg,
                        boxShadow: TOKENS.inset,
                        "& .MuiFilledInput-root": {
                          borderRadius: TOKENS.radius.m,
                          transition: "box-shadow .15s ease, background-color .15s ease",
                          "&.Mui-focused": {
                            background: "#f6fff7",
                            boxShadow: `${TOKENS.inset}, ${TOKENS.ring}`,
                          },
                        },
                        "& .MuiFormHelperText-root": { mt: 0.5 },
                      }}
                    />
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      py: isSmDown ? 0.6 : 0.8,
                      fontSize: isSmDown ? ".95rem" : "1rem",
                      background: brand,
                      borderRadius: TOKENS.radius.m,
                      boxShadow: TOKENS.shadowOut,
                      transition: "box-shadow .15s ease, transform .15s ease",
                      "&:hover": { background: TOKENS.brandDark, boxShadow: TOKENS.shadowHover, transform: "translateY(-1px)" },
                      "&:active": { transform: "translateY(0)" },
                      "&:focus-visible": { outline: "none", boxShadow: `${TOKENS.shadowOut}, ${TOKENS.ring}` },
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
                  <Typography variant="body2" sx={{ mb: isSmDown ? 0.75 : 1, color: "#1b5e20" }}>
                    Tell us a bit more about your request
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
                          mb: 0.75,
                          "&:hover": { background: "rgba(46,125,50,.06)" },
                        }}
                      />
                    ))}
                  </Stack>

                  <TextField
                    label="Your message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value.slice(0, msgMax))}
                    fullWidth
                    minRows={isSmDown ? 3 : 4}
                    multiline
                    size={isSmDown ? "small" : "medium"}
                    variant="filled"
                    helperText={`${Math.max(0, msgMin - msg.trim().length)} more characters to reach minimum`}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      borderRadius: TOKENS.radius.m,
                      background: TOKENS.neuBg,
                      boxShadow: TOKENS.inset,
                      "& .MuiFilledInput-root": {
                        borderRadius: TOKENS.radius.m,
                        transition: "box-shadow .15s ease, background-color .15s ease",
                        "&.Mui-focused": {
                          background: "#f6fff7",
                          boxShadow: `${TOKENS.inset}, ${TOKENS.ring}`,
                        },
                      },
                    }}
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
                        py: isSmDown ? 0.55 : 0.75,
                        fontSize: isSmDown ? ".95rem" : "1rem",
                        borderRadius: TOKENS.radius.m,
                        borderColor: brand,
                        color: brand,
                        "&:hover": { borderColor: TOKENS.brandDark, color: TOKENS.brandDark, background: "rgba(46,125,50,.04)" },
                        "&:focus-visible": { outline: "none", boxShadow: TOKENS.ring },
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
                        py: isSmDown ? 0.55 : 0.75,
                        fontSize: isSmDown ? ".95rem" : "1rem",
                        background: brand,
                        borderRadius: TOKENS.radius.m,
                        boxShadow: TOKENS.shadowOut,
                        transition: "box-shadow .15s ease, transform .15s ease",
                        "&:hover": { background: TOKENS.brandDark, boxShadow: TOKENS.shadowHover, transform: "translateY(-1px)" },
                        "&:active": { transform: "translateY(0)" },
                        "&:focus-visible": { outline: "none", boxShadow: `${TOKENS.shadowOut}, ${TOKENS.ring}` },
                      }}
                    >
                      {loading ? <CircularProgress size={18} /> : "Submit"}
                    </Button>
                  </Box>

                  <Divider sx={{ my: isSmDown ? 1 : 1.5, borderColor: "rgba(46,125,50,0.15)" }} />
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                    We may reply via {contactMode === "email" ? "Email" : "SMS or WhatsApp"} using the contact provided above.
                  </Typography>
                </>
              )}

              {step === 3 && (
                <Box
                  sx={{
                    textAlign: "center",
                    py: isSmDown ? 3 : 4,
                    px: isSmDown ? 1.5 : 2,
                    background: "linear-gradient(180deg, #f4fbf4 0%, #ffffff 100%)",
                  }}
                >
                  <Typography
                    variant={isSmDown ? "subtitle1" : "h6"}
                    sx={{ fontWeight: 800, mb: 1, color: brand }}
                  >
                    Ticket received ✅
                  </Typography>
                  <Typography variant="body2">
                    We’ll contact you via <strong>{contactMode === "email" ? email : phone}</strong>.
                  </Typography>
                  <Button
                    sx={{
                      mt: 2,
                      py: isSmDown ? 0.6 : 0.8,
                      background: brand,
                      borderRadius: TOKENS.radius.m,
                      boxShadow: TOKENS.shadowOut,
                      "&:hover": { background: TOKENS.brandDark, boxShadow: TOKENS.shadowHover },
                      "&:focus-visible": { outline: "none", boxShadow: `${TOKENS.shadowOut}, ${TOKENS.ring}` },
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
        <Alert
          onClose={() => setToast((s) => ({ ...s, open: false }))}
          severity={toast.type}
          variant="filled"
          sx={{ borderRadius: TOKENS.radius.m, boxShadow: TOKENS.shadowOut }}
        >
          {toast.text}
        </Alert>
      </Snackbar>
    </>
  );
}
