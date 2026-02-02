import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- API CONFIG ---------------- */
const API_BASE =
  process.env.REACT_APP_API_BASE?.replace(/\/$/, "") ||
  "https://mufate-g-sacco.onrender.com";

/* ---------------- STYLED COMPONENTS ---------------- */
const PageWrapper = styled("div")({
  minHeight: "100vh",
  paddingTop: "110px",
  background: "radial-gradient(circle at top, #053021 0%, #02150F 55%)",
  color: "#F4F4F4",
  fontFamily: "'Inter', sans-serif",
});

const NeoCard = styled(Paper)({
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(236,155,20,0.18)",
  borderRadius: "22px",
  padding: "26px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: "none",
});

const CardHeader = styled(Typography)({
  color: "#EC9B14",
  fontWeight: 900,
  textTransform: "uppercase",
  fontSize: "0.85rem",
  letterSpacing: "1.4px",
  marginBottom: "22px",
  borderBottom: "1px solid rgba(236,155,20,0.2)",
  paddingBottom: "12px",
});

const InputLabel = styled("label")({
  display: "block",
  "& span": {
    display: "block",
    marginBottom: "6px",
    fontWeight: 800,
    fontSize: "0.65rem",
    color: "#F9E7C5",
    textTransform: "uppercase",
  },
});

const StyledInput = styled("input")({
  height: "40px",
  width: "100%",
  background: "rgba(255,255,255,0.95)",
  borderRadius: "10px",
  border: "none",
  padding: "0 14px",
  fontWeight: 600,
  fontSize: "0.85rem",
  color: "#02150F",
  "&:focus": {
    outline: "2px solid #EC9B14",
  },
  "&.readonly": {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.15)",
  },
});

const SummaryGoldCard = styled(Box)({
  background: "linear-gradient(135deg, #EC9B14, #D48A11)",
  borderRadius: "18px",
  padding: "18px",
  marginBottom: "14px",
  textAlign: "center",
  color: "#02150F",
  "& .label": {
    fontSize: "0.65rem",
    fontWeight: 900,
    textTransform: "uppercase",
    opacity: 0.8,
  },
  "& .value": {
    fontSize: "1.25rem",
    fontWeight: 900,
    marginTop: "4px",
  },
});

/* ---------------- HELPERS ---------------- */
const formatMoney = (val) =>
  `KES ${Number(val || 0).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
  })}`;

async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error(`${r.status} – Request failed`);
  return r.json();
}

/* ---------------- COMPONENT ---------------- */
export default function LoanCalculator() {
  const [products, setProducts] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [ratePct, setRatePct] = useState(0);
  const [defaultMonths, setDefaultMonths] = useState(0);
  const [months, setMonths] = useState("");
  const [principal, setPrincipal] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [summary, setSummary] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Load products */
  useEffect(() => {
    (async () => {
      try {
        const js = await getJSON(`${API_BASE}/loan/products`);
        const items = js.items || [];
        setProducts(items);

        if (items.length) {
          setSelectedKey(items[0].ProductKey);
          setRatePct(Number(items[0].MonthlyInterestRate) * 100);
          setDefaultMonths(items[0].DefaultTermMonths);
          setMonths(String(items[0].DefaultTermMonths));
        }
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const currentProduct = useMemo(
    () => products.find((p) => p.ProductKey === selectedKey),
    [products, selectedKey]
  );

  useEffect(() => {
    if (!currentProduct) return;
    setRatePct(Number(currentProduct.MonthlyInterestRate) * 100);
    setDefaultMonths(currentProduct.DefaultTermMonths);
    setMonths(String(currentProduct.DefaultTermMonths));
  }, [currentProduct]);

  const onCalculate = async () => {
    setError("");
    if (+principal <= 0) {
      setError("Please enter a valid loan amount.");
      return;
    }

    setLoading(true);
    try {
      const js = await getJSON(`${API_BASE}/loan/calc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_key: selectedKey,
          principal: Number(principal),
          start_date: startDate,
          term_months: Number(months),
        }),
      });

      setSummary(js.summary || null);
      setSchedule(js.schedule || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container maxWidth="xl">
        <Typography
          align="center"
          variant="h4"
          sx={{
            color: "#EC9B14",
            fontWeight: 900,
            letterSpacing: "3px",
            textTransform: "uppercase",
            mb: 6,
          }}
        >
          Loan Calculator
        </Typography>

        <Grid container spacing={4}>
          {/* ================= SPECIFY LOAN ================= */}
          <Grid item xs={12} md={8} lg={6}>
            <NeoCard>
              <CardHeader>Specify Your Loan</CardHeader>

              <Grid container spacing={3}>
                {/* Row 1 */}
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel>
                    <span>Loan Type</span>
                    <StyledInput
                      as="select"
                      value={selectedKey}
                      onChange={(e) => setSelectedKey(e.target.value)}
                    >
                      {products.map((p) => (
                        <option key={p.ProductKey} value={p.ProductKey}>
                          {p.LoanName}
                        </option>
                      ))}
                    </StyledInput>
                  </InputLabel>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel>
                    <span>Start Date</span>
                    <StyledInput
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </InputLabel>
                </Grid>

                <Grid item xs={12} md={4}>
                  <InputLabel>
                    <span>Principal (KES)</span>
                    <StyledInput
                      type="number"
                      placeholder="0.00"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                    />
                  </InputLabel>
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel>
                    <span>Interest Rate</span>
                    <StyledInput
                      className="readonly"
                      value={`${ratePct.toFixed(2)}%`}
                      readOnly
                    />
                  </InputLabel>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <InputLabel>
                    <span>Default Term</span>
                    <StyledInput
                      className="readonly"
                      value={`${defaultMonths} Months`}
                      readOnly
                    />
                  </InputLabel>
                </Grid>

                <Grid item xs={12} md={4}>
                  <InputLabel>
                    <span>Repayment Period (Months)</span>
                    <StyledInput
                      type="number"
                      value={months}
                      onChange={(e) => setMonths(e.target.value)}
                    />
                  </InputLabel>
                </Grid>
              </Grid>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 3,
                    bgcolor: "rgba(211,47,47,0.1)",
                    border: "1px solid #d32f2f",
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  fullWidth
                  onClick={onCalculate}
                  disabled={loading}
                  sx={{
                    bgcolor: "#EC9B14",
                    color: "#02150F",
                    fontWeight: 900,
                    height: 48,
                    borderRadius: "12px",
                  }}
                >
                  {loading ? "Calculating..." : "CALCULATE"}
                </Button>

                <Button
                  fullWidth
                  onClick={() => window.location.reload()}
                  sx={{
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    height: 48,
                    borderRadius: "12px",
                  }}
                >
                  RESET
                </Button>
              </Box>
            </NeoCard>
          </Grid>

          {/* ================= SUMMARY ================= */}
          <Grid item xs={12} md={4}>
            <NeoCard>
              <CardHeader>Summary</CardHeader>

              {!summary ? (
                <Typography sx={{ opacity: 0.4, textAlign: "center", mt: 6 }}>
                  Run calculation to view results.
                </Typography>
              ) : (
                <>
                  <SummaryGoldCard>
                    <div className="label">Loan Amount</div>
                    <div className="value">
                      {formatMoney(summary.Principal)}
                    </div>
                  </SummaryGoldCard>

                  <SummaryGoldCard
                    sx={{
                      background: "rgba(236,155,20,0.12)",
                      color: "#fff",
                      border: "1px solid #EC9B14",
                    }}
                  >
                    <div className="label" style={{ color: "#EC9B14" }}>
                      Total Interest
                    </div>
                    <div className="value">
                      {formatMoney(summary.TotalInterest)}
                    </div>
                  </SummaryGoldCard>

                  <SummaryGoldCard sx={{ mt: "auto" }}>
                    <div className="label">Total Payable</div>
                    <div className="value">
                      {formatMoney(summary.TotalPayable)}
                    </div>
                  </SummaryGoldCard>
                </>
              )}
            </NeoCard>
          </Grid>

          {/* ================= SCHEDULE ================= */}
          <Grid item xs={12} md={8}>
            <NeoCard>
              <CardHeader >Repayment Schedule</CardHeader>

              {!schedule.length ? (
                <Typography sx={{ opacity: 0.4, textAlign: "center", mt: 6 }}>
                  No schedule available yet.
                </Typography>
              ) : (
                <TableContainer sx={{ maxHeight: 420 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        {[
                          "Installment",
                          "Date",
                          "Principal",
                          "Interest",
                          "Balance",
                        ].map((h) => (
                          <TableCell
                            key={h}
                            sx={{
                              bgcolor: "#02150F",
                              color: "#EC9B14",
                              fontWeight: 800,
                              fontSize: "0.75rem",
                            }}
                          >
                            {h}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {schedule.map((row) => (
                        <TableRow key={row.period}>
                          {/* Installment Number */}
                          <TableCell sx={{ color: "#EC9B14", fontWeight: 700 }}>
                            {row.period}
                          </TableCell>

                          {/* Date */}
                          <TableCell sx={{ color: "#EC9B14", fontWeight: 700 }}>
                            {row.date}
                          </TableCell>

                          {/* Principal Amount */}
                          <TableCell sx={{ color: "#EC9B14", fontWeight: 700 }}>
                            {formatMoney(row.principal)}
                          </TableCell>

                          {/* Interest Amount */}
                          <TableCell sx={{ color: "#EC9B14", fontWeight: 700 }}>
                            {formatMoney(row.interest)}
                          </TableCell>

                          {/* Balance Amount */}
                          <TableCell sx={{ color: "#EC9B14", fontWeight: 900 }}>
                            {formatMoney(row.balance)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </NeoCard>
          </Grid>
        </Grid>

        {/* FOOTER */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.08)" }} />
          <Typography
            sx={{ color: "#EC9B14", fontWeight: 900, letterSpacing: "2px" }}
          >
            GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
          </Typography>
          <Typography sx={{ opacity: 0.6, fontSize: "0.7rem" }}>
            ALL RIGHTS RESERVED
          </Typography>
        </Box>
      </Container>
    </PageWrapper>
  );
}