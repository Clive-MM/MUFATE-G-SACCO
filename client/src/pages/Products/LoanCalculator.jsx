import React, { useEffect, useMemo, useState } from "react";
import "./LoanCalculator.css";
import Footer from "../../components/Footer";

/* Backend base URL */
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

  if (!isJSON) throw new Error("Expected JSON response from server.");
  return r.json();
}

const fmtKES = (n) =>
  (n ?? 0).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const todayISO = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

/* ---------------- Component ---------------- */
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

  /* Load loan products */
  useEffect(() => {
    (async () => {
      try {
        setError("");
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
        setProducts([]);
      }
    })();
  }, []);

  /* Sync UI when product changes */
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

  /* Calculate schedule */
  const onCalculate = async () => {
    setError("");
    setSchedule([]);
    setSummary(null);

    if (!selectedKey) return setError("Select a loan product.");
    const P = Number(principal);
    const n = Number(months);

    if (!P || P <= 0) return setError("Enter a valid principal amount.");
    if (!n || n <= 0) return setError("Enter a valid repayment period.");

    setLoading(true);
    try {
      const js = await getJSON(`${API_BASE}/loan/calc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_key: selectedKey,
          principal: P,
          start_date: startDate,
          term_months: n,
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

  /* Reset form */
  const onReset = () => {
    const base = products[0];
    if (base) {
      setSelectedKey(base.ProductKey);
      setRatePct(Number(base.MonthlyInterestRate) * 100);
      setDefaultMonths(base.DefaultTermMonths);
      setMonths(String(base.DefaultTermMonths));
    }

    setPrincipal("");
    setStartDate(todayISO());
    setSchedule([]);
    setSummary(null);
    setError("");
  };

  /* Export CSV */
  const exportCSV = () => {
    if (!schedule.length) return;

    const header = ["Period,Date,Principal,Interest,Total,Balance"];
    const rows = schedule.map((r) =>
      [r.period, r.date, r.principal, r.interest, r.total, r.balance].join(",")
    );

    const blob = new Blob([header.join("\n"), ...rows].join("\n"), {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedKey || "loan"}_schedule.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="lc-page">
      <div className="lc-header">
        <h1>Loan Calculator</h1>
        <p>
          Plan your repayments with <b>Golden Generation DT SACCO</b>
        </p>
      </div>

      <div className="lc-grid">
        {/* INPUTS */}
        <div className="card neo">
          <div className="card-title">Inputs</div>

          <div className="compact-row">
            <label className="field compact">
              <span>Loan Type</span>
              <select
                className="input"
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                disabled={!products.length}
              >
                {!products.length && <option>(No products)</option>}
                {products.map((p) => (
                  <option key={p.ProductKey} value={p.ProductKey}>
                    {p.LoanName}
                  </option>
                ))}
              </select>
            </label>

            <label className="field compact">
              <span>Start Date</span>
              <input
                className="input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span>Rate (per month)</span>
              <input className="input" value={`${ratePct.toFixed(2)} %`} readOnly />
            </label>

            <label className="field">
              <span>Default Months</span>
              <input className="input" value={defaultMonths} readOnly />
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span>Months</span>
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
                placeholder="e.g. 100000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </label>
          </div>

          {error && <div className="alert">{error}</div>}

          <div className="actions">
            <button className="btn-brand" onClick={onCalculate} disabled={loading}>
              {loading ? "Calculating…" : "Calculate"}
            </button>
            <button className="btn-ghost" onClick={onReset} disabled={loading}>
              Reset
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="card neo">
          <div className="card-title">Summary</div>

          {!summary ? (
            <div className="muted">Run a calculation to view results.</div>
          ) : (
            <div className="chips">
              <div className="chip">
                <div className="k">Loan Amount</div>
                <div className="v">KES {fmtKES(summary.Principal)}</div>
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

      {/* SCHEDULE */}
      <div className="card neo">
        <div className="card-title row">
          <span>Repayment Schedule</span>
          <div className="spacer" />
          <button className="btn-ghost" onClick={exportCSV} disabled={!schedule.length}>
            Export CSV
          </button>
        </div>

        {!schedule.length ? (
          <div className="muted">No schedule generated.</div>
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
        <span className="note-icon">i</span>
        <span className="note-text">
          <strong>Important:</strong> This calculator provides indicative values.
          Final approval rests with <b>Golden Generation DT SACCO</b>.
        </span>
      </div>

      <Footer />
    </div>
  );
}
