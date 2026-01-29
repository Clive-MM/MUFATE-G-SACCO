import React, { useEffect, useMemo, useState } from "react";
import { 
  Box, Typography, Container, Grid, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Button, Alert, Divider 
} from "@mui/material";
import { styled } from "@mui/material/styles";

/* ---------------- API CONFIG ---------------- */
const API_BASE = process.env.REACT_APP_API_BASE?.replace(/\/$/, "") || "https://mufate-g-sacco.onrender.com";

/* ---------------- STYLED COMPONENTS ---------------- */
const PageWrapper = styled('div')({
  minHeight: '100vh',
  paddingTop: '100px',
  backgroundColor: '#02150F', 
  color: '#F4F4F4',
  fontFamily: "'Inter', sans-serif",
});

const NeoCard = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(236, 155, 20, 0.15)',
  borderRadius: '20px',
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'none',
});

const CardHeader = styled(Typography)({
  color: '#EC9B14',
  fontWeight: 800,
  textTransform: 'uppercase',
  fontSize: '0.85rem',
  letterSpacing: '1.2px',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(236, 155, 20, 0.15)',
  paddingBottom: '10px',
});

const InputLabel = styled('label')({
  display: 'block',
  marginBottom: '10px',
  '& span': {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 700,
    fontSize: '0.65rem',
    color: '#F9E7C5',
    textTransform: 'uppercase',
  }
});

const StyledInput = styled('input')({
  height: '38px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '8px',
  border: 'none',
  padding: '0 12px',
  fontWeight: 600,
  color: '#02150F',
  fontSize: '0.85rem',
  '&:focus': { outline: '2px solid #EC9B14' },
  '&.readonly': { background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
});

const SummaryGoldCard = styled(Box)({
  background: 'linear-gradient(135deg, #EC9B14 0%, #D48A11 100%)',
  padding: '18px',
  borderRadius: '16px',
  color: '#02150F',
  textAlign: 'center',
  marginBottom: '12px',
  '& .label': { fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.8 },
  '& .value': { fontSize: '1.2rem', fontWeight: 900, marginTop: '2px' },
});

/* ---------------- HELPERS ---------------- */
const formatMoney = (val) => `KES ${Number(val || 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error(`${r.status} - Request failed`);
  return r.json();
}

export default function LoanCalculator() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [ratePct, setRatePct] = useState(0);
  const [defaultMonths, setDefaultMonths] = useState(0);
  const [months, setMonths] = useState("");
  const [principal, setPrincipal] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedule, setSchedule] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

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
      } catch (e) { setError(e.message); }
    })();
  }, []);

  const currentProduct = useMemo(() => products.find(p => p.ProductKey === selectedKey), [products, selectedKey]);

  useEffect(() => {
    if (!currentProduct) return;
    setRatePct(Number(currentProduct.MonthlyInterestRate) * 100);
    setDefaultMonths(currentProduct.DefaultTermMonths);
    setMonths(String(currentProduct.DefaultTermMonths));
  }, [currentProduct]);

  const onCalculate = async () => {
    setError("");
    if (+principal <= 0) {
      setError("Please enter a valid amount.");
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
          term_months: Number(months)
        }),
      });
      setSchedule(js.schedule || []);
      setSummary(js.summary || null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      {/* 1. CHANGED maxWidth to "xl" to make the entire content area wider on large screens */}
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#EC9B14', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Loan Calculator
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={8}>
            <NeoCard>
              <CardHeader>Specify Your Loan</CardHeader>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel><span>Loan Type</span>
                    <StyledInput as="select" value={selectedKey} onChange={e => setSelectedKey(e.target.value)}>
                      {products.map(p => <option key={p.ProductKey} value={p.ProductKey}>{p.LoanName}</option>)}
                    </StyledInput>
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel><span>Start Date</span><StyledInput type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel><span>Principal (KES)</span><StyledInput type="number" placeholder="0.00" value={principal} onChange={e => setPrincipal(e.target.value)} /></InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel><span>Interest Rate</span><StyledInput className="readonly" value={`${ratePct.toFixed(2)}%`} readOnly /></InputLabel>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel><span>Default Term</span><StyledInput className="readonly" value={`${defaultMonths} Months`} readOnly /></InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel><span>Repayment Period (Months)</span><StyledInput type="number" value={months} onChange={e => setMonths(e.target.value)} /></InputLabel>
                </Grid>
              </Grid>

              {error && (
                <Alert severity="error" sx={{ mt: 2, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#ff8a8a', border: '1px solid #d32f2f' }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2 }}>
                <Button onClick={onCalculate} disabled={loading} sx={{ bgcolor: '#EC9B14', color: '#02150F', fontWeight: 900, px: 4, height: '45px', borderRadius: '10px', '&:hover': { bgcolor: '#fff' } }}>
                  {loading ? "Calculating..." : "CALCULATE"}
                </Button>
                <Button onClick={() => window.location.reload()} sx={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', px: 4, borderRadius: '10px' }}>
                  RESET
                </Button>
              </Box>
            </NeoCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <NeoCard>
              <CardHeader>Summary</CardHeader>
              {!summary ? (
                <Box sx={{ m: 'auto', textAlign: 'center', opacity: 0.3 }}>
                  Run calculation to view results.
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <SummaryGoldCard>
                    <div className="label">Loan Amount</div>
                    <div className="value">{formatMoney(summary.Principal)}</div>
                  </SummaryGoldCard>

                  <SummaryGoldCard sx={{ background: 'rgba(236, 155, 20, 0.1)', border: '1px solid #EC9B14', color: '#fff' }}>
                    <div className="label" style={{ color: '#EC9B14' }}>Total Interest</div>
                    <div className="value" style={{ fontSize: '1.1rem' }}>{formatMoney(summary.TotalInterest)}</div>
                  </SummaryGoldCard>

                  <SummaryGoldCard sx={{ mt: 'auto' }}>
                    <div className="label">Total Payable</div>
                    <div className="value" style={{ fontSize: '1.3rem', textDecoration: 'underline' }}>{formatMoney(summary.TotalPayable)}</div>
                  </SummaryGoldCard>
                </Box>
              )}
            </NeoCard>
          </Grid>

          <Grid item xs={12}>
            <NeoCard>
              <CardHeader>Repayment Schedule</CardHeader>
              {!schedule.length ? (
                <Typography sx={{ opacity: 0.3, textAlign: 'center', py: 4 }}>No schedule available yet.</Typography>
              ) : (
                /* 2. INCREASED maxHeight from 500px to 800px to make the table scroll area longer */
                <TableContainer sx={{ maxHeight: '800px', width: '100%' }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        {['Installment', 'Date', 'Principal', 'Interest', 'Balance'].map(head => (
                          <TableCell key={head} sx={{ bgcolor: '#02150F', color: '#EC9B14', fontWeight: 800, borderBottom: '1px solid rgba(236,155,20,0.3)', fontSize: '0.75rem' }}>
                            {head.toUpperCase()}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedule.map((row) => (
                        <TableRow key={row.period} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.period}</TableCell>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.date}</TableCell>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{formatMoney(row.principal)}</TableCell>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{formatMoney(row.interest)}</TableCell>
                          <TableCell sx={{ color: '#EC9B14', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 700 }}>{formatMoney(row.balance)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </NeoCard>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: '#02150F', pt: 10, pb: 4, mt: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 4 }} />
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#EC9B14', fontWeight: 900, letterSpacing: '2px', fontSize: '1rem' }}>
                    GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
                </Typography>
                <Typography sx={{ color: 'rgba(244, 244, 244, 0.6)', fontSize: '0.7rem', mt: 1 }}>
                    ALL RIGHTS RESERVED
                </Typography>
            </Box>
        </Container>
      </Box>
    </PageWrapper>
  );
}