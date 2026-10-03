"use client";

import { useState } from "react";
import { INITIAL_CUSTOMERS } from "../../lib/store";

export default function CRMPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCust, setNewCust] = useState({ code: "", name: "", email: "", phone: "", creditLimit: 50000 });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCust.name || !newCust.code) return;
    setCustomers(prev => [...prev, { ...newCust, id: `c-${Date.now()}`, paymentTerms: "NET30" }]);
    setShowAddModal(false);
    setNewCust({ code: "", name: "", email: "", phone: "", creditLimit: 50000 });
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>CRM & Customer Management</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Track customer accounts, credit limits, and commercial opportunities</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Add Customer Account
        </button>
      </div>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Code</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Customer Name</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Contact Email</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Phone</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Payment Terms</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Credit Limit</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{c.code}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "500" }}>{c.name}</td>
                <td style={{ padding: "0.75rem 0.5rem", color: "#3b82f6" }}>{c.email}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{c.phone}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.2rem 0.5rem", background: "#f1f5f9", borderRadius: "4px", fontWeight: "600" }}>{c.paymentTerms}</span>
                </td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>${c.creditLimit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", width: "400px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: 0 }}>Add New Customer</h2>
            <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input placeholder="Customer Code (e.g. CUST-APEX)" value={newCust.code} onChange={e => setNewCust({...newCust, code: e.target.value})} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />
              <input placeholder="Customer Name" value={newCust.name} onChange={e => setNewCust({...newCust, name: e.target.value})} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />
              <input placeholder="Email" type="email" value={newCust.email} onChange={e => setNewCust({...newCust, email: e.target.value})} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
              <input placeholder="Phone" value={newCust.phone} onChange={e => setNewCust({...newCust, phone: e.target.value})} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: "0.5rem 1rem", background: "#cbd5e1", border: "none", borderRadius: "6px" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}>Save Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
