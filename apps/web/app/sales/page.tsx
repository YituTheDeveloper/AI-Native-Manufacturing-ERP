"use client";

import { useState } from "react";
import { INITIAL_SALES_ORDERS, INITIAL_CUSTOMERS, INITIAL_PRODUCTS } from "../../lib/store";

export default function SalesPage() {
  const [orders, setOrders] = useState(INITIAL_SALES_ORDERS);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMERS[0]?.name || "Apex Power Solutions Inc");
  const [productSku, setProductSku] = useState(INITIAL_PRODUCTS[2]?.sku || "ENCL-HV-100");
  const [quantity, setQuantity] = useState(25);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProd = INITIAL_PRODUCTS.find(p => p.sku === productSku);
    const unitPrice = selectedProd ? selectedProd.listPrice : 100;
    const totalAmount = unitPrice * quantity;

    const newOrder = {
      id: `so-${Date.now()}`,
      orderNumber: `SO-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName: customer,
      date: new Date().toISOString().slice(0, 10),
      status: 'CONFIRMED' as const,
      totalAmount,
      items: [{ sku: productSku, quantity, unitPrice }]
    };

    setOrders(prev => [newOrder, ...prev]);
    setShowOrderModal(false);
  };

  const advanceStatus = (id: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      const nextStatus = o.status === 'CONFIRMED' ? 'RESERVED' : o.status === 'RESERVED' ? 'DELIVERED' : o.status === 'DELIVERED' ? 'INVOICED' : o.status;
      return { ...o, status: nextStatus };
    }));
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Sales Orders & Quotations</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Commercial sales lifecycle: Quote → Sales Order → Reservation → Delivery → Invoice</p>
        </div>
        <button onClick={() => setShowOrderModal(true)} style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Create Sales Order
        </button>
      </div>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Order #</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Customer</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Order Date</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Line Items</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Total Value</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Lifecycle Status</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{o.orderNumber}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{o.customerName}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{o.date}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{o.items.map(i => `${i.quantity}x ${i.sku}`).join(', ')}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>${o.totalAmount.toLocaleString()}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: "#dbeafe", color: "#1e40af" }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  {o.status !== 'INVOICED' && (
                    <button onClick={() => advanceStatus(o.id)} style={{ padding: "0.3rem 0.6rem", background: "#10b981", color: "white", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>
                      Advance Stage →
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showOrderModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", width: "420px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: 0 }}>Create Commercial Sales Order</h2>
            <form onSubmit={handleCreateOrder} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Customer Account</label>
              <select value={customer} onChange={e => setCustomer(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}>
                {INITIAL_CUSTOMERS.map(c => <option key={c.id} value={c.name}>{c.name} ({c.code})</option>)}
              </select>

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Product Selection</label>
              <select value={productSku} onChange={e => setProductSku(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}>
                {INITIAL_PRODUCTS.map(p => <option key={p.id} value={p.sku}>{p.name} ({p.sku}) — ${p.listPrice}</option>)}
              </select>

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Quantity</label>
              <input type="number" min="1" value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }} required />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowOrderModal(false)} style={{ padding: "0.5rem 1rem", background: "#cbd5e1", border: "none", borderRadius: "6px" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}>Submit Order</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
