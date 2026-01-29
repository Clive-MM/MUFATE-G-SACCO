// src/pages/Products/LoanCalculator.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./LoanCalculator.css";
import Footer from "../../components/Footer";
import { Box, Typography, Container } from "@mui/material";

const API_BASE = process.env.REACT_APP_API_BASE?.replace(/\/$/, "") || "https://mufate-g-sacco.onrender.com";

/* ---------------- Helpers ---------------- */
async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  const ct = r.headers.get("content-type") || "";
  const isJSON = ct.includes("application/json");
  if (!r.ok) {
    const body = isJSON ? await r.json() : await r.text();
    throw new Error(`${r.status} – ${isJSON ? body?.message : body.slice(0, 240)}`);
  }
  return r.json();
}

const todayISO = () => new Date().toISOString().split('T')[0];

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

  const formatMoney = (value) =>
    `KES ${Number(value || 0).toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

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
    if (!selectedKey || +principal <= 0 || +months <= 0) return setError("Please fill all fields correctly.");
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

  const onReset = () => {
    if (products.length) {
      setSelectedKey(products[0].ProductKey);
      setMonths(String(products[0].DefaultTermMonths));
    }
    setPrincipal("");
    setStartDate(todayISO());
    setSchedule([]);
    setSummary(null);
    setError("");
  };

  return (
    <div className="lc-page">
      <Container maxWidth="lg">
        <Box sx={{ pt: { xs: 8, md: 12 }, mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '3px', color: '#EC9B14', mb: 1, fontSize: { xs: '2rem', md: '3rem' }, textShadow: '0 0 20px rgba(236, 155, 20, 0.4)' }}>
            Loan Calculator
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '1px' }}>
            Plan your repayments with <b>GOLDEN GENERATION DT SACCO</b>
          </Typography>
        </Box>

        <div className="lc-main-layout">
          {/* LEFT: INPUTS */}
          <div className="card neo lc-input-section">
            <div className="card-header-modern">SPECIFY YOUR LOAN</div>
            <div className="lc-form-grid">
              <label className="field full">
                <span>Loan Type</span>
                <select className="input-modern" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                  {products.map((p) => <option key={p.ProductKey} value={p.ProductKey}>{p.LoanName}</option>)}
                </select>
              </label>

              <label className="field">
                <span>Start Date</span>
                <input className="input-modern" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </label>

              <label className="field">
                <span>Principal (KES)</span>
                <input className="input-modern" type="number" placeholder="0.00" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
              </label>

              <label className="field">
                <span>Interest Rate</span>
                <input className="input-modern readonly" value={`${ratePct.toFixed(2)}%`} readOnly />
              </label>

              <label className="field">
                <span>Default Term</span>
                <input className="input-modern readonly" value={`${defaultMonths} Months`} readOnly />
              </label>

              <label className="field full">
                <span>Specify Repayment Months</span>
                <input className="input-modern" type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
              </label>
            </div>

            <div className="lc-actions-modern">
              <button className="btn-modern-gold" onClick={onCalculate} disabled={loading}>{loading ? "..." : "CALCULATE"}</button>
              <button className="btn-modern-outline" onClick={onReset}>RESET</button>
            </div>
            {error && <div className="error-text">{error}</div>}
          </div>

          {/* RIGHT: SUMMARY & SCHEDULE */}
          <div className="lc-results-column">
            <div className="card neo lc-summary-section">
              <div className="card-header-modern">SUMMARY</div>
              {!summary ? (
                <div className="muted-modern">Run a calculation to view results.</div>
              ) : (
                <div className="summary-chips-container">
                  <div className="gold-chip">
                    <span className="chip-label">Loan Amount</span>
                    <span className="chip-value">{formatMoney(summary.Principal)}</span>
                  </div>
                  <div className="gold-chip">
                    <span className="chip-label">Total Interest</span>
                    <span className="chip-value">{formatMoney(summary.TotalInterest)}</span>
                  </div>
                  <div className="gold-chip">
                    <span className="chip-label">Total Payable</span>
                    <span className="chip-value">{formatMoney(summary.TotalPayable)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="card neo lc-schedule-section">
              <div className="card-header-modern">REPAYMENT SCHEDULE</div>
              {!schedule.length ? (
                <div className="muted-modern">No schedule generated.</div>
              ) : (
                <div className="table-modern-wrap">
                  <table className="table-modern">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((r) => (
                        <tr key={r.period}>
                          <td>{r.period}</td>
                          <td>{r.date}</td>
                          <td>{formatMoney(r.principal)}</td>
                          <td>{formatMoney(r.interest)}</td>
                          <td>{formatMoney(r.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}