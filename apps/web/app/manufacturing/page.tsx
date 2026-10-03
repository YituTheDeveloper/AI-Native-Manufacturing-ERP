"use client";

import { useState } from "react";
import { INITIAL_PRODUCTION_ORDERS, INITIAL_PRODUCTS } from "../../lib/store";

export default function ManufacturingPage() {
  const [workOrders, setWorkOrders] = useState(INITIAL_PRODUCTION_ORDERS);
  const [showWOModal, setShowWOModal] = useState(false);
  const [plannedQty, setPlannedQty] = useState(100);

  const handleCreateWO = (e: React.FormEvent) => {
    e.preventDefault();
    const newWO = {
      id: `wo-${Date.now()}`,
      orderNumber: `WO-2026-${Math.floor(100 + Math.random() * 900)}`,
      productName: 'Heavy Industrial Enclosure 100L',
      sku: 'ENCL-HV-100',
      plannedQuantity: plannedQty,
      producedQuantity: 0,
      status: 'PLANNED' as const,
      startDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10)
    };
    setWorkOrders(prev => [newWO, ...prev]);
    setShowWOModal(false);
  };

  const advanceWOState = (id: string) => {
    setWorkOrders(prev => prev.map(w => {
      if (w.id !== id) return w;
      let nextStatus = w.status;
      let produced = w.producedQuantity;

      if (w.status === 'PLANNED') nextStatus = 'RELEASED';
      else if (w.status === 'RELEASED') nextStatus = 'IN_PROGRESS';
      else if (w.status === 'IN_PROGRESS') { nextStatus = 'QUALITY_CHECK'; produced = w.plannedQuantity * 0.95; }
      else if (w.status === 'QUALITY_CHECK') nextStatus = 'COMPLETED';

      return { ...w, status: nextStatus, producedQuantity: produced };
    }));
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Manufacturing & Production Orders</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Bill of Materials (BOM), Routings, Work Center Capacity & Work Order Execution</p>
        </div>
        <button onClick={() => setShowWOModal(true)} style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Create Work Order
        </button>
      </div>

      {/* BOM Summary Card */}
      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0 0 0.75rem 0" }}>Bill of Materials (BOM): ENCL-HV-100 v1.0</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", fontSize: "0.85rem" }}>
          <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
            <strong>Aluminum Sheet 2mm:</strong> 2.5 SHEETS / unit
          </div>
          <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
            <strong>M8 Hex Bolt:</strong> 32 PCS / unit
          </div>
          <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
            <strong>Black Powder Coating:</strong> 0.4 KG / unit
          </div>
        </div>
      </div>

      {/* Production Work Orders Table */}
      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0 0 1rem 0" }}>Production Order Lifecycle Execution</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Work Order #</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Product</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Planned / Produced</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Start / Due Date</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Lifecycle State</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {workOrders.map(w => (
              <tr key={w.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{w.orderNumber}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{w.productName} ({w.sku})</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{w.producedQuantity} / {w.plannedQuantity} Units</td>
                <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>{w.startDate} → {w.dueDate}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: w.status === 'COMPLETED' ? "#d1fae5" : w.status === 'IN_PROGRESS' ? "#dbeafe" : "#fef3c7", color: w.status === 'COMPLETED' ? "#065f46" : w.status === 'IN_PROGRESS' ? "#1e40af" : "#92400e" }}>
                    {w.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {w.status !== 'COMPLETED' && (
                    <button onClick={() => advanceWOState(w.id)} style={{ padding: "0.3rem 0.6rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>
                      Advance Stage →
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showWOModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", width: "420px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: 0 }}>Create Production Work Order</h2>
            <form onSubmit={handleCreateWO} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Target Manufactured Product</label>
              <input value="Heavy Industrial Enclosure 100L (ENCL-HV-100)" readOnly style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", background: "#f8fafc" }} />

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Planned Production Quantity</label>
              <input type="number" min="1" value={plannedQty} onChange={e => setPlannedQty(Number(e.target.value))} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowWOModal(false)} style={{ padding: "0.5rem 1rem", background: "#cbd5e1", border: "none", borderRadius: "6px" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}>Submit Work Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
