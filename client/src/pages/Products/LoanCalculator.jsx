import React, { useEffect, useMemo, useState } from "react";
import "./LoanCalculator.css";

const API_BASE = "https://mufate-g-sacco.onrender.com"; // same-origin. If different: e.g. "http://localhost:5000"

const fmtKES = (n) =>
  (n ?? 0).toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
  const [rate, setRate] = useState(0);
  const [defaultMonths, setDefaultMonths] = useState(0);
  const [months, setMonths] = useState("");
  const [principal, setPrincipal] = useState("");
  const [startDate, setStartDate] = useState(todayISO());
  const [schedule, setSchedule] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  // load products once
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/loan/products`);
        const js = await r.json();
        if (!r.ok) throw new Error(js.message || "Failed to load products");
        setProducts(js.items || []);
        if (js.items?.length) {
          const first = js.items[0];
          setSelectedKey(first.ProductKey);
          setRate(first.MonthlyInterestRate);
          setDefaultMonths(first.DefaultTermMonths);
          setMonths(String(first.DefaultTermMonths));
        }
      } catch (e) {
        setError(String(e.message || e));
      }
    })();
  }, []);

  // when product changes, auto-fill rate and months
  const currentProduct = useMemo(
    () => products.find((p) => p.ProductKey === selectedKey),
    [products, selectedKey]
  );

  useEffect(() => {
    if (!currentProduct) return;
    setRate(currentProduct.MonthlyInterestRate);
    setDefaultMonths(currentProduct.DefaultTermMonths);
    setMonths(String(currentProduct.DefaultTermMonths));
  }, [currentProduct]);

  const onCalculate = async () => {
    setError("");
    if (!selectedKey) return setError("Select a product");
    const P = Number(principal);
    const n = Number(months);
    if (!P || P <= 0) return setError("Enter a valid principal");
    if (!n || n <= 0) return setError("Enter a valid period (months)");

    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/loan/calc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_key: selectedKey,
          principal: P,
          start_date: startDate,
          term_months: n
        })
      });
      const js = await r.json();
      if (!r.ok) throw new Error(js.message || "Failed to calculate");
      setSchedule(js.schedule || []);
      setSummary(js.summary || null);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!schedule?.length) return;
    const header = ["Period,Date,Principal,Interest,Total,Balance"];
    const rows = schedule.map((row) =>
      [row.period, row.date, row.principal, row.interest, row.total, row.balance].join(",")
    );
    const csv = [...header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedKey}_schedule.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="lc-page">
      <div className="lc-header">
        <h1>Loan Calculator</h1>
        <p>Plan your repayments with MUFATE G SACCO</p>
      </div>

      <div className="lc-grid">
        {/* form card */}
        <div className="card neo">
          <div className="card-title">Inputs</div>

          <label className="field">
            <span>Loan Type</span>
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="input"
            >
              {products.map((p) => (
                <option key={p.ProductKey} value={p.ProductKey}>
                  {p.LoanName}
                </option>
              ))}
            </select>
          </label>

          <div className="field-row">
            <label className="field">
              <span>Rate (per month)</span>
              <input className="input" value={rate} readOnly />
            </label>
            <label className="field">
              <span>Default Months</span>
              <input className="input" value={defaultMonths} readOnly />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span>Months (editable)</span>
              <input
                className="input"
                type="number"
                min={1}
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </label>

            <label className="field">
              <span>Principal (KES)</span>
              <input
                className="input"
                type="number"
                min={1}
                step="1"
                placeholder="e.g. 100000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </label>
          </div>

          <label className="field">
            <span>Start Date</span>
            <input
              className="input"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>

          {error && <div className="alert">{error}</div>}

          <div className="actions">
            <button className="btn-brand" disabled={loading} onClick={onCalculate}>
              {loading ? "Calculating…" : "Calculate"}
            </button>
            <button className="btn-ghost" onClick={() => { setSchedule([]); setSummary(null); }}>
              Reset
            </button>
          </div>
        </div>

        {/* summary card */}
        <div className="card neo">
          <div className="card-title">Summary</div>
          {!summary ? (
            <div className="muted">Run a calculation to see totals.</div>
          ) : (
            <div className="chips">
              <div className="chip">
                <div className="k">Loan</div>
                <div className="v">KES {fmtKES(summary.Principal)}</div>
              </div>
              {summary.MonthlyPrincipal != null && (
                <div className="chip">
                  <div className="k">Monthly Principal</div>
                  <div className="v">KES {fmtKES(summary.MonthlyPrincipal)}</div>
                </div>
              )}
              {summary.EMI != null && (
                <div className="chip">
                  <div className="k">Monthly Installment</div>
                  <div className="v">KES {fmtKES(summary.EMI)}</div>
                </div>
              )}
              <div className="chip">
                <div className="k">First Month Interest</div>
                <div className="v">KES {fmtKES(summary.FirstMonthInterest)}</div>
              </div>
              <div className="chip">
                <div className="k">Total Interest</div>
                <div className="v">KES {fmtKES(summary.TotalInterest)}</div>
              </div>
              <div className="chip">
                <div className="k">Total Payable</div>
                <div className="v">KES {fmtKES(summary.TotalPayable)}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* schedule */}
      <div className="card neo">
        <div className="card-title row">
          <span>Repayment Schedule</span>
          <div className="spacer" />
          <button className="btn-ghost" disabled={!schedule.length} onClick={exportCSV}>
            Export CSV
          </button>
        </div>

        {!schedule.length ? (
          <div className="muted">No schedule yet.</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Total</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr key={r.period}>
                    <td>{r.period}</td>
                    <td>{r.date}</td>
                    <td>{fmtKES(r.principal)}</td>
                    <td>{fmtKES(r.interest)}</td>
                    <td>{fmtKES(r.total)}</td>
                    <td>{fmtKES(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="note">
        * This is an indicative schedule. Final terms subject to approval by MUFATE G SACCO.
      </div>
    </div>
  );
}
