import React, { useEffect, useMemo, useState } from "react";
import { 
  Box, Typography, Container, Grid, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Button 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Footer from "../../components/Footer";

/* ---------------- API CONFIG ---------------- */
const API_BASE = process.env.REACT_APP_API_BASE?.replace(/\/$/, "") || "https://mufate-g-sacco.onrender.com";

/* ---------------- STYLED COMPONENTS ---------------- */
const PageWrapper = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: '140px',
  paddingBottom: '80px',
  background: 'radial-gradient(circle at top, #04331a 0%, #02150F 70%)',
  color: '#F4F4F4',
  fontFamily: "'Inter', sans-serif",
  [theme.breakpoints.down('md')]: { paddingTop: '100px' },
}));

const NeoCard = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(236, 155, 20, 0.2)',
  borderRadius: '24px',
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: '0.3s ease',
  boxShadow: 'none',
  '&:hover': {
    borderColor: '#EC9B14',
    boxShadow: '0 0 30px rgba(236, 155, 20, 0.1)',
  },
});

const CardHeader = styled(Typography)({
  color: '#EC9B14',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(236, 155, 20, 0.2)',
  paddingBottom: '10px',
});

const InputLabel = styled('label')({
  display: 'block',
  marginBottom: '16px',
  '& span': {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 700,
    fontSize: '0.75rem',
    color: '#F9E7C5',
    textTransform: 'uppercase',
  }
});

const StyledInput = styled('input')({
  height: '45px',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '10px',
  border: '2px solid transparent',
  padding: '0 12px',
  fontWeight: 600,
  color: '#02150F',
  boxSizing: 'border-box',
  fontSize: '0.9rem',
  transition: '0.3s',
  '&:focus': { outline: 'none', borderColor: '#EC9B14' },
  '&.readonly': { background: 'rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'not-allowed' }
});

const SummaryChip = styled(Box)({
  background: 'linear-gradient(135deg, #EC9B14 0%, #D48A11 100%)',
  padding: '16px',
  borderRadius: '14px',
  color: '#02150F',
  marginBottom: '12px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  '& .label': { fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 },
  '& .value': { fontSize: '1.1rem', fontWeight: 900, marginTop: '2px' },
});

/* ---------------- HELPERS ---------------- */
async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error(`${r.status} - Request failed`);
  return r.json();
}
const todayISO = () => new Date().toISOString().split('T')[0];

/* ---------------- MAIN COMPONENT ---------------- */
export default function LoanCalculator() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [ratePct, setRatePct] = useState(0);
  const [defaultMonths, setDefaultMonths] = useState(0);
  const [months, setMonths] = useState("");
  const [principal, setPrincipal] = useState("");
  const [startDate, setStartDate] = useState(todayISO());
  const [schedule, setSchedule] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const formatMoney = (val) => `KES ${Number(val || 0).toLocaleString("en-KE", { minimumFractionDigits: 2 })}`;

  useEffect(() => {
    (async () => {
      try {
        const js = await getJSON(`${API_BASE}/loan/products`);
        const items = js.items || [];
        setProducts(items);
        if (items.length) {
          const first = items[0];
          setSelectedKey(first.ProductKey);
          setRatePct(Number(first.MonthlyInterestRate) * 100);
          setDefaultMonths(first.DefaultTermMonths);
          setMonths(String(first.DefaultTermMonths));
        }
      } catch (e) { setError(e.message); }
    })();
  }, []);

  const currentProduct = useMemo(() => products.find((p) => p.ProductKey === selectedKey), [products, selectedKey]);

  useEffect(() => {
    if (!currentProduct) return;
    setRatePct(Number(currentProduct.MonthlyInterestRate) * 100);
    setDefaultMonths(currentProduct.DefaultTermMonths);
    setMonths(String(currentProduct.DefaultTermMonths));
  }, [currentProduct]);

  const onCalculate = async () => {
    setError("");
    if (+principal <= 0) return setError("Enter a valid amount.");
    setLoading(true);
    try {
      const js = await getJSON(`${API_BASE}/loan/calc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_key: selectedKey, principal: Number(principal), start_date: startDate, term_months: Number(months) }),
      });
      setSchedule(js.schedule || []);
      setSummary(js.summary || null);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        {/* HEADER SECTION */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', color: '#EC9B14', letterSpacing: '3px', textShadow: '0 0 15px rgba(236, 155, 20, 0.3)', fontSize: { xs: '2rem', md: '3rem' } }}>
            Loan Calculator
          </Typography>
          <Typography sx={{ color: 'rgba(244, 244, 244, 0.6)', mt: 1, letterSpacing: '1px' }}>
            Plan your repayments with <b>GOLDEN GENERATION DT SACCO</b>
          </Typography>
        </Box>

        {/* TOP ROW: INPUTS & SUMMARY SIDE-BY-SIDE */}
        <Grid container spacing={3} alignItems="stretch">
          
          {/* LEFT COLUMN: SPECIFY YOUR LOAN (7/12 Width) */}
          <Grid item xs={12} md={7}>
            <NeoCard>
              <CardHeader variant="h6">Specify Your Loan</CardHeader>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>
                    <span>Loan Type</span>
                    <StyledInput as="select" value={selectedKey} onChange={e => setSelectedKey(e.target.value)}>
                      {products.map(p => <option key={p.ProductKey} value={p.ProductKey}>{p.LoanName}</option>)}
                    </StyledInput>
                  </InputLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel><span>Start Date</span><StyledInput type="date" value={startDate} onChange={e => setStartDate(e.target.value)}/></InputLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel><span>Principal (KES)</span><StyledInput type="number" placeholder="0.00" value={principal} onChange={e => setPrincipal(e.target.value)}/></InputLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel><span>Interest Rate</span><StyledInput className="readonly" value={`${ratePct.toFixed(2)}%`} readOnly/></InputLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel><span>Default Term</span><StyledInput className="readonly" value={`${defaultMonths} Months`} readOnly/></InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel><span>Repayment Period (Months)</span><StyledInput type="number" value={months} onChange={e => setMonths(e.target.value)}/></InputLabel>
                </Grid>
              </Grid>

              <Box sx={{ mt: 'auto', pt: 3, display: 'flex', gap: 2 }}>
                <Button fullWidth variant="contained" onClick={onCalculate} disabled={loading} sx={{ bgcolor: '#EC9B14', color: '#02150F', fontWeight: 900, borderRadius: '12px', height: '50px', '&:hover': { bgcolor: '#fff' } }}>
                  {loading ? "..." : "CALCULATE"}
                </Button>
                <Button fullWidth variant="outlined" onClick={() => window.location.reload()} sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: 700, '&:hover': { borderColor: '#EC9B14', color: '#EC9B14' } }}>
                  RESET
                </Button>
              </Box>
              {error && <Typography sx={{ color: '#ff4d4d', mt: 2, fontWeight: 700, textAlign: 'center' }}>{error}</Typography>}
            </NeoCard>
          </Grid>

          {/* RIGHT COLUMN: SUMMARY (5/12 Width) */}
          <Grid item xs={12} md={5}>
            <NeoCard>
              <CardHeader variant="h6">Summary</CardHeader>
              {!summary ? (
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontStyle: 'italic' }}>
                    Run a calculation to see the summary
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <SummaryChip>
                    <span className="label">Loan Amount</span>
                    <span className="value">{formatMoney(summary.Principal)}</span>
                  </SummaryChip>
                  <SummaryChip>
                    <span className="label">Total Interest</span>
                    <span className="value">{formatMoney(summary.TotalInterest)}</span>
                  </SummaryChip>
                  <SummaryChip sx={{ border: '2px solid #fff', mt: 'auto', mb: 0 }}>
                    <span className="label">Total Payable</span>
                    <span className="value">{formatMoney(summary.TotalPayable)}</span>
                  </SummaryChip>
                </Box>
              )}
            </NeoCard>
          </Grid>

          {/* BOTTOM ROW: REPAYMENT SCHEDULE (Full Width) */}
          <Grid item xs={12}>
            <NeoCard>
              <CardHeader variant="h6">Repayment Schedule</CardHeader>
              {!schedule.length ? (
                <Typography sx={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center', py: 6 }}>
                  No schedule available yet. Please click calculate above.
                </Typography>
              ) : (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#EC9B14', fontWeight: 800, borderBottom: '1px solid rgba(236,155,20,0.3)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Installment</TableCell>
                        <TableCell sx={{ color: '#EC9B14', fontWeight: 800, borderBottom: '1px solid rgba(236,155,20,0.3)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Date</TableCell>
                        <TableCell sx={{ color: '#EC9B14', fontWeight: 800, borderBottom: '1px solid rgba(236,155,20,0.3)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Principal</TableCell>
                        <TableCell sx={{ color: '#EC9B14', fontWeight: 800, borderBottom: '1px solid rgba(236,155,20,0.3)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Interest</TableCell>
                        <TableCell sx={{ color: '#EC9B14', fontWeight: 800, borderBottom: '1px solid rgba(236,155,20,0.3)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Balance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {schedule.map((row) => (
                        <TableRow key={row.period} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 600 }}>{row.period}</TableCell>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.date}</TableCell>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{formatMoney(row.principal)}</TableCell>
                          <TableCell sx={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{formatMoney(row.interest)}</TableCell>
                          {/* FIXED DUPLICATE KEY ERROR BELOW */}
                          <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#EC9B14', fontWeight: 700 }}>
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
      </Container>
      <Footer />
    </PageWrapper>
  );
}