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

  // Theme + breakpoints
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery("(max-width:420px)");

  // BRAND COLOR TOKENS
  const BRAND_GOLD = "#EC9B14";
  const BRAND_DARK = "#02150F";
  const BRAND_DARK_ACCENT = "#042b1f"; // Slightly lighter green for contrast

  // Responsive tokens
  const launcherSize = isSmDown ? 56 : 64;
  const panelMaxWidth = isSmDown ? "calc(100vw - 16px)" : "380px";
  const panelRadius = isSmDown ? 16 : 24;
  const headerPad = isSmDown ? 1.25 : 2;
  const bodyPad = isSmDown ? 1.5 : 2;

  // Design tokens
  const TOKENS = {
    brand: BRAND_DARK,
    brandGold: BRAND_GOLD,
    panelGlass: BRAND_DARK, 
    neuBg: BRAND_DARK_ACCENT,
    ring: `0 0 0 3px rgba(236, 155, 20, 0.22)`,
    radius: { s: 12, m: 16, l: 24 },
    shadowOut: "0 10px 30px rgba(0,0,0,0.5)",
    shadowHover: "0 12px 36px rgba(0,0,0,0.7)",
    inset: "inset 2px 2px 5px rgba(0,0,0,0.4), inset -1px -1px 2px rgba(255,255,255,0.05)",
    online: "#19c37d",
  };

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
          <Tooltip title="Chat with GOLDEN GENERATION DT SACCO" arrow>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              aria-label="Open GOLDEN GENERATION DT SACCO Support"
              sx={{
                width: launcherSize,
                height: launcherSize,
                borderRadius: "50%",
                background: BRAND_GOLD,
                color: BRAND_DARK,
                boxShadow: TOKENS.shadowOut,
                border: `2px solid ${BRAND_GOLD}`,
                position: "relative",
                transition: "transform .15s ease, box-shadow .15s ease",
                "&:hover": { transform: "translateY(-1px)", boxShadow: TOKENS.shadowHover },
                "&::before": {
                  content: '""', position: "absolute", inset: 0, borderRadius: "50%",
                  boxShadow: `0 0 0 0 ${BRAND_GOLD}77`,
                  animation: "pulse 2.2s infinite",
                },
                "@keyframes pulse": {
                  "0%": { boxShadow: `0 0 0 0 ${BRAND_GOLD}77` },
                  "60%": { boxShadow: `0 0 0 16px ${BRAND_GOLD}00` },
                  "100%": { boxShadow: `0 0 0 0 ${BRAND_GOLD}00` },
                },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: isSmDown ? 22 : 24, fontWeight: 'bold' }} />
            </IconButton>
          </Tooltip>
        </Zoom>

        {/* Panel */}
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Paper
            elevation={24}
            sx={{
              mt: 1.25,
              width: "100%",
              maxWidth: panelMaxWidth,
              borderRadius: panelRadius,
              overflow: "hidden",
              background: BRAND_DARK,
              border: `1px solid ${BRAND_GOLD}44`,
              boxShadow: TOKENS.shadowOut,
              mx: isXs ? 0.5 : 0,
              ...(isSmDown && { maxHeight: "70vh", display: "flex", flexDirection: "column" }),
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: headerPad,
                px: 2,
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(180deg, ${BRAND_DARK} 0%, ${BRAND_DARK_ACCENT} 100%)`,
                boxShadow: `inset 0 -1px 0 ${BRAND_GOLD}33`,
                position: isSmDown ? "sticky" : "static",
                top: 0,
                zIndex: 1,
              }}
            >
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 0, position: "relative", pr: 5 }}>
                <Typography
                  variant={isSmDown ? "subtitle2" : "subtitle1"}
                  sx={{
                    fontWeight: 800,
                    color: BRAND_GOLD,
                    letterSpacing: 0.2,
                    fontSize: isSmDown ? "0.9rem" : "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  GOLDEN GENERATION SUPPORT
                  <Box
                    component="span"
                    sx={{
                      width: 10, height: 10, borderRadius: "50%",
                      background: TOKENS.online,
                      boxShadow: "0 0 8px 2px rgba(25,195,125,.6)",
                      animation: "ping 1.9s infinite",
                      "@keyframes ping": {
                        "0%": { transform: "scale(1)", opacity: 1 },
                        "50%": { transform: "scale(1.2)", opacity: 0.8 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                      },
                    }}
                  />
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setOpen(false)}
                  sx={{ position: "absolute", right: 0, color: BRAND_GOLD }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Body */}
            <Box
              sx={{
                p: bodyPad,
                pt: isSmDown ? 1.25 : 2,
                backgroundColor: BRAND_DARK,
                ...(isSmDown && { overflow: "auto", maxHeight: "inherit" }),
              }}
            >
              {step === 1 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1, color: BRAND_GOLD, opacity: 0.9 }}>
                    How should we contact you?
                  </Typography>

                  <ToggleButtonGroup
                    exclusive
                    value={contactMode}
                    onChange={(_, v) => v && setContactMode(v)}
                    sx={{
                      mb: 2,
                      width: '100%',
                      background: BRAND_DARK_ACCENT,
                      padding: 0.5,
                      borderRadius: TOKENS.radius.m,
                      "& .MuiToggleButton-root": {
                        flex: 1,
                        border: 0,
                        color: BRAND_GOLD,
                        textTransform: "none",
                        borderRadius: `${TOKENS.radius.s}px !important`,
                        "&.Mui-selected": {
                          background: BRAND_GOLD,
                          color: BRAND_DARK,
                          fontWeight: 'bold',
                          "&:hover": { background: BRAND_GOLD, opacity: 0.9 },
                        },
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
                      variant="filled"
                      error={!!email && !emailOk}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: BRAND_GOLD, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        sx: { color: "#FFF" }
                      }}
                      InputLabelProps={{ sx: { color: `${BRAND_GOLD}aa` } }}
                      sx={{
                        background: BRAND_DARK_ACCENT,
                        borderRadius: TOKENS.radius.m,
                        boxShadow: TOKENS.inset,
                      }}
                    />
                  ) : (
                    <TextField
                      label="Phone (2547XXXXXXXX)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                      variant="filled"
                      error={!!phone && !phoneOk}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneIcon sx={{ color: BRAND_GOLD, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        sx: { color: "#FFF" }
                      }}
                      InputLabelProps={{ sx: { color: `${BRAND_GOLD}aa` } }}
                      sx={{
                        background: BRAND_DARK_ACCENT,
                        borderRadius: TOKENS.radius.m,
                        boxShadow: TOKENS.inset,
                      }}
                    />
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    disabled={disabled}
                    onClick={() => setStep(2)}
                    sx={{
                      mt: 3, py: 1.2,
                      background: BRAND_GOLD,
                      color: BRAND_DARK,
                      fontWeight: 'bold',
                      borderRadius: TOKENS.radius.m,
                      "&:hover": { background: BRAND_GOLD, opacity: 0.85 },
                    }}
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <Typography variant="body2" sx={{ mb: 1, color: BRAND_GOLD }}>
                    Tell us a bit more about your request
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}>
                    {quickReplies.map((q) => (
                      <Chip
                        key={q}
                        label={q}
                        size="small"
                        onClick={() => setMsg((m) => (m ? `${m} ${q}` : q))}
                        sx={{
                          borderColor: BRAND_GOLD,
                          color: BRAND_GOLD,
                          background: "transparent",
                          borderWidth: 1,
                          mb: 0.5,
                          "&:hover": { background: `${BRAND_GOLD}22` },
                        }}
                      />
                    ))}
                  </Stack>

                  <TextField
                    label="Your message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value.slice(0, msgMax))}
                    fullWidth
                    multiline
                    rows={4}
                    variant="filled"
                    InputProps={{ disableUnderline: true, sx: { color: "#FFF" } }}
                    InputLabelProps={{ sx: { color: `${BRAND_GOLD}aa` } }}
                    sx={{
                      background: BRAND_DARK_ACCENT,
                      borderRadius: TOKENS.radius.m,
                      boxShadow: TOKENS.inset,
                    }}
                    error={msg.trim().length > 0 && msg.trim().length < msgMin}
                  />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: BRAND_GOLD, opacity: 0.7 }}>
                      Min {msgMin} characters
                    </Typography>
                    <Typography variant="caption" sx={{ color: BRAND_GOLD, opacity: 0.7 }}>
                      {msg.trim().length}/{msgMax}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setStep(1)}
                      disabled={loading}
                      fullWidth
                      sx={{
                        borderRadius: TOKENS.radius.m,
                        borderColor: BRAND_GOLD,
                        color: BRAND_GOLD,
                        "&:hover": { borderColor: BRAND_GOLD, background: `${BRAND_GOLD}11` },
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
                        background: BRAND_GOLD,
                        color: BRAND_DARK,
                        fontWeight: 'bold',
                        borderRadius: TOKENS.radius.m,
                        "&:hover": { background: BRAND_GOLD, opacity: 0.85 },
                      }}
                    >
                      {loading ? <CircularProgress size={18} sx={{ color: BRAND_DARK }} /> : "Submit"}
                    </Button>
                  </Box>
                </>
              )}

              {step === 3 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: BRAND_GOLD }}>
                    Ticket received ✅
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#FFF", opacity: 0.8, mb: 3 }}>
                    We’ll contact you via <strong>{contactMode === "email" ? email : phone}</strong>.
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      setStep(1);
                      setOpen(false);
                      setEmail("");
                      setPhone("");
                      setMsg("");
                    }}
                    sx={{
                      background: BRAND_GOLD,
                      color: BRAND_DARK,
                      fontWeight: 'bold',
                      borderRadius: TOKENS.radius.m,
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
        anchorOrigin={{ vertical: "bottom", horizontal: position === "bottom-left" ? "left" : "right" }}
      >
        <Alert
          severity={toast.type}
          variant="filled"
          sx={{ 
            borderRadius: TOKENS.radius.m, 
            background: BRAND_GOLD, 
            color: BRAND_DARK,
            "& .MuiAlert-icon": { color: BRAND_DARK }
          }}
        >
          {toast.text}
        </Alert>
      </Snackbar>
    </>
  );
}