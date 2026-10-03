"use client";

import { useState } from "react";
import { INITIAL_ACCOUNTS, INITIAL_JOURNALS } from "../../lib/store";
import { formatBirrCompact } from "../../lib/locale";

export default function FinancePage() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [journals, setJournals] = useState(INITIAL_JOURNALS);
  const [activeTab, setActiveTab] = useState<'journals' | 'accounts' | 'reports'>('journals');
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [desc, setDesc] = useState("");
  const [debitAmount, setDebitAmount] = useState(5000);

  const handlePostJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const newJournal = {
      id: `j-${Date.now()}`,
      journalNumber: `JRN-2026-${Math.floor(100 + Math.random() * 900)}`,
      postingDate: new Date().toISOString().slice(0, 10),
      description: desc || 'Manual Financial Adjustment Posting',
      lines: [
        { accountCode: '1010', accountName: 'Operating Cash Account', debit: debitAmount, credit: 0 },
        { accountCode: '4000', accountName: 'Manufacturing Sales Revenue', debit: 0, credit: debitAmount },
      ],
      isBalanced: true
    };
    setJournals(prev => [newJournal, ...prev]);
    setShowJournalModal(false);
    setDesc("");
  };

  const totalAssets = accounts.filter(a => a.type === 'ASSET').reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = accounts.filter(a => a.type === 'LIABILITY').reduce((sum, a) => sum + a.balance, 0);
  const totalRevenue = accounts.filter(a => a.type === 'REVENUE').reduce((sum, a) => sum + a.balance, 0);
  const totalExpenses = accounts.filter(a => a.type === 'EXPENSE').reduce((sum, a) => sum + a.balance, 0);

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Finance & Double-Entry Accounting</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Balanced double-entry journal postings, general ledger, chart of accounts & fiscal reports</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setActiveTab('journals')} style={{ padding: "0.5rem 1rem", background: activeTab === 'journals' ? "#3b82f6" : "#e2e8f0", color: activeTab === 'journals' ? "white" : "#0f172a", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Journal Entries
          </button>
          <button onClick={() => setActiveTab('accounts')} style={{ padding: "0.5rem 1rem", background: activeTab === 'accounts' ? "#3b82f6" : "#e2e8f0", color: activeTab === 'accounts' ? "white" : "#0f172a", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Chart of Accounts
          </button>
          <button onClick={() => setActiveTab('reports')} style={{ padding: "0.5rem 1rem", background: activeTab === 'reports' ? "#3b82f6" : "#e2e8f0", color: activeTab === 'reports' ? "white" : "#0f172a", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Financial Statements
          </button>
        </div>
      </div>

      {activeTab === 'journals' && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
            <button onClick={() => setShowJournalModal(true)} style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              + Post Double-Entry Journal
            </button>
          </div>

          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            {journals.map(j => (
              <div key={j.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: "700", fontSize: "1rem" }}>{j.journalNumber} — {j.description}</span>
                  <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Posting Date: {j.postingDate}</span>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", color: "#64748b", textAlign: "left" }}>
                      <th style={{ padding: "0.5rem" }}>Account Code</th>
                      <th style={{ padding: "0.5rem" }}>Account Name</th>
                      <th style={{ padding: "0.5rem" }}>Debit</th>
                      <th style={{ padding: "0.5rem" }}>Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {j.lines.map((l, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "0.5rem", fontWeight: "600" }}>{l.accountCode}</td>
                        <td style={{ padding: "0.5rem" }}>{l.accountName}</td>
                        <td style={{ padding: "0.5rem", fontWeight: "600", color: l.debit > 0 ? "#10b981" : "#64748b" }}>{l.debit > 0 ? formatBirrCompact(l.debit) : '—'}</td>
                        <td style={{ padding: "0.5rem", fontWeight: "600", color: l.credit > 0 ? "#3b82f6" : "#64748b" }}>{l.credit > 0 ? formatBirrCompact(l.credit) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'accounts' && (
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "0.75rem 0.5rem" }}>Account Code</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Account Name</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Type</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Current Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(a => (
                <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{a.code}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{a.name}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <span style={{ padding: "0.2rem 0.5rem", background: "#f1f5f9", borderRadius: "4px", fontWeight: "600", fontSize: "0.75rem" }}>{a.type}</span>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: "700" }}>{formatBirrCompact(a.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reports' && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: 0 }}>Profit & Loss Statement (P&L)</h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
              <span>Total Manufacturing Sales Revenue</span>
              <strong style={{ color: "#10b981" }}>+{formatBirrCompact(totalRevenue)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
              <span>Cost of Goods Sold (COGS)</span>
              <strong style={{ color: "#ef4444" }}>-{formatBirrCompact(totalExpenses)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", fontSize: "1.1rem", fontWeight: "700", borderTop: "2px solid #0f172a", marginTop: "1rem" }}>
              <span>Net Operating Profit (before 30% CIT)</span>
              <strong style={{ color: "#10b981" }}>{formatBirrCompact(totalRevenue - totalExpenses)}</strong>
            </div>
          </div>

          <div style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: 0 }}>Balance Sheet Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
              <span>Total Assets (Cash, AR, Stock)</span>
              <strong>{formatBirrCompact(totalAssets)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
              <span>Total Liabilities (AP)</span>
              <strong>{formatBirrCompact(totalLiabilities)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", fontSize: "1.1rem", fontWeight: "700", borderTop: "2px solid #0f172a", marginTop: "1rem" }}>
              <span>Total Stockholder Equity (Net Assets)</span>
              <strong style={{ color: "#3b82f6" }}>{formatBirrCompact(totalAssets - totalLiabilities)}</strong>
            </div>
          </div>
        </div>
      )}

      {showJournalModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", width: "420px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: 0 }}>Post Double-Entry Journal</h2>
            <form onSubmit={handlePostJournal} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Journal Description</label>
              <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. Received Customer Payment for SO-2026-101" style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Balanced Amount (ETB)</label>
              <input type="number" min="1" value={debitAmount} onChange={e => setDebitAmount(Number(e.target.value))} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />

              <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", fontSize: "0.75rem", color: "#475569" }}>
                <strong>Balanced Auto-Posting (ERCA Compliant):</strong><br />
                Debit: Acc #1010 CBE Cash (ETB {debitAmount.toLocaleString()})<br />
                Credit: Acc #4000 Revenue (ETB {debitAmount.toLocaleString()})
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowJournalModal(false)} style={{ padding: "0.5rem 1rem", background: "#cbd5e1", border: "none", borderRadius: "6px" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}>Post Journal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
