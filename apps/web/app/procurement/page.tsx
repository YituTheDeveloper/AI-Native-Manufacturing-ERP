"use client";

import { useState } from "react";
import { INITIAL_PURCHASE_ORDERS, INITIAL_SUPPLIERS, INITIAL_PRODUCTS } from "../../lib/store";

export default function ProcurementPage() {
  const [pos, setPos] = useState(INITIAL_PURCHASE_ORDERS);
  const [showPOModal, setShowPOModal] = useState(false);
  const [supplier, setSupplier] = useState(INITIAL_SUPPLIERS[0]?.name || "Global Metals Supply LLC");
  const [sku, setSku] = useState(INITIAL_PRODUCTS[0]?.sku || "ALU-SHEET-2MM");
  const [qty, setQty] = useState(100);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = INITIAL_PRODUCTS.find(p => p.sku === sku);
    const unitPrice = prod ? prod.costPrice : 50;

    const newPO = {
      id: `po-${Date.now()}`,
      poNumber: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
      supplierName: supplier,
      date: new Date().toISOString().slice(0, 10),
      status: 'APPROVED' as const,
      totalAmount: unitPrice * qty,
      items: [{ sku, quantity: qty, unitPrice }]
    };

    setPos(prev => [newPO, ...prev]);
    setShowPOModal(false);
  };

  const receiveGoods = (id: string) => {
    setPos(prev => prev.map(p => p.id === id ? { ...p, status: 'RECEIVED' } : p));
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Procurement & Purchase Orders</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Requisitions, RFQs, Purchase Orders, Goods Receipt & Supplier Rating</p>
        </div>
        <button onClick={() => setShowPOModal(true)} style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Issue Purchase Order
        </button>
      </div>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>PO Number</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Supplier</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Date Issued</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Ordered Items</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>PO Total</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Status</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {pos.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{p.poNumber}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{p.supplierName}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{p.date}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{p.items.map(i => `${i.quantity}x ${i.sku}`).join(', ')}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>${p.totalAmount.toLocaleString()}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: p.status === 'RECEIVED' ? "#d1fae5" : "#fef3c7", color: p.status === 'RECEIVED' ? "#065f46" : "#92400e" }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {p.status !== 'RECEIVED' && (
                    <button onClick={() => receiveGoods(p.id)} style={{ padding: "0.3rem 0.6rem", background: "#10b981", color: "white", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>
                      Confirm Receipt →
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPOModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", width: "420px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: 0 }}>Issue Purchase Order</h2>
            <form onSubmit={handleCreatePO} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Supplier</label>
              <select value={supplier} onChange={e => setSupplier(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}>
                {INITIAL_SUPPLIERS.map(s => <option key={s.id} value={s.name}>{s.name} (Rating: {s.rating}/5)</option>)}
              </select>

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Product</label>
              <select value={sku} onChange={e => setSku(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}>
                {INITIAL_PRODUCTS.map(p => <option key={p.id} value={p.sku}>{p.name} ({p.sku}) — Cost ${p.costPrice}</option>)}
              </select>

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Quantity</label>
              <input type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowPOModal(false)} style={{ padding: "0.5rem 1rem", background: "#cbd5e1", border: "none", borderRadius: "6px" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}>Confirm PO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
