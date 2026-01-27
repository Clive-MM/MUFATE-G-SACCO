import React, { useEffect, useMemo, useState } from "react";
import "./LoanCalculator.css";
import Footer from "../../components/Footer";

const API_BASE =
  process.env.REACT_APP_API_BASE?.replace(/\/$/, "") ||
  "https://mufate-g-sacco.onrender.com";

/* ---------------- Helpers ---------------- */
async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  const ct = r.headers.get("content-type") || "";
  const isJSON = ct.includes("application/json");

  if (!r.ok) {
    const body = isJSON ? await r.json() : await r.text();
    const msg = isJSON ? body?.message || JSON.stringify(body) : body.slice(0, 240);
    throw new Error(`${r.status} ${r.statusText} – ${msg}`);
  }
  return r.json();
}

const todayISO = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

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
    if (!selectedKey) return setError("Select a loan product.");
    if (+principal <= 0) return setError("Enter a valid principal amount.");
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
      setSchedule(js.schedule || []);
      setSummary(js.summary || null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    onCalculate(); // Helper to refresh
    setPrincipal("");
    setSchedule([]);
    setSummary(null);
  };

  return (
    <div className="lc-page">
      <div className="lc-header">
        <h1>Loan Calculator</h1>
        <p>
          Plan your repayments with <b>Golden Generation DT SACCO</b>
        </p>
      </div>

      <div className="lc-grid">
        {/* INPUT CARD */}
        <div className="card neo">
          <div className="card-title">Specify your loan</div>
          
          <div className="compact-row">
            <label className="field compact">
              <span>Loan Type</span>
              <select className="input" value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                {products.map((p) => (
                  <option key={p.ProductKey} value={p.ProductKey}>{p.LoanName}</option>
                ))}
              </select>
            </label>

            <label className="field compact">
              <span>Start Date</span>
              <input className="input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span>Interest Rate</span>
              <input className="input" style={{opacity: 0.8}} value={`${ratePct.toFixed(2)}% p.m`} readOnly />
            </label>
            <label className="field">
              <span>Default Term</span>
              <input className="input" style={{opacity: 0.8}} value={`${defaultMonths} Months`} readOnly />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span>Repayment Period (Months)</span>
              <input className="input" type="number" value={months} onChange={(e) => setMonths(e.target.value)} />
            </label>
            <label className="field">
              <span>Principal (KES)</span>
              <input className="input" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="0.00" />
            </label>
          </div>

          {error && <div style={{color: '#ff4d4d', marginTop: '10px', fontWeight: 'bold'}}>{error}</div>}

          <div className="actions">
            <button className="btn-brand" onClick={onCalculate} disabled={loading}>
              {loading ? "Calculating..." : "Calculate Now"}
            </button>
            <button className="btn-ghost" onClick={onReset}>Reset</button>
          </div>
        </div>

        {/* SUMMARY CARD */}
        <div className="card neo">
          <div className="card-title">Calculation Summary</div>
          {!summary ? (
            <div style={{color: 'var(--muted)', padding: '20px'}}>Enter details to generate summary.</div>
          ) : (
            <div className="chips">
              <div className="chip">
                <div className="k">LOAN PRINCIPAL</div>
                <div className="v">{formatMoney(summary.Principal)}</div>
              </div>
              <div className="chip">
                <div className="k">TOTAL INTEREST</div>
                <div className="v">{formatMoney(summary.TotalInterest)}</div>
              </div>
              <div className="chip">
                <div className="k">TOTAL REPAYABLE</div>
                <div className="v" style={{color: '#0A5A2A'}}>{formatMoney(summary.TotalPayable)}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SCHEDULE TABLE */}
      <div className="card schedule-card">
        <div className="card-title">Repayment Schedule</div>
        {!schedule.length ? (
          <div style={{color: 'var(--muted)', padding: '20px'}}>No schedule generated.</div>
        ) : (
          <div className="table-wrap">
            <table className="table-fixed">
              <thead>
                <tr>
                  <th>Inst.</th>
                  <th>Due Date</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Total Due</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r, i) => (
                  <tr key={i} className={i === 0 ? "first-row" : ""}>
                    <td>{r.period}</td>
                    <td>{r.date}</td>
                    <td>{formatMoney(r.principal)}</td>
                    <td>{formatMoney(r.interest)}</td>
                    <td>{formatMoney(r.total)}</td>
                    <td>{formatMoney(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="note">
        <div className="note-icon">i</div>
        <div>
          <b style={{color: 'var(--gold)'}}>Note:</b> This is an estimated schedule. Actual loan terms may vary based on credit approval.
        </div>
      </div>

      <Footer />
    </div>
  );
}