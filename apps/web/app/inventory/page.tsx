"use client";

import { useState } from "react";
import { INITIAL_PRODUCTS, INITIAL_STOCK_LEDGER } from "../../lib/store";

export default function InventoryPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [ledger, setLedger] = useState(INITIAL_STOCK_LEDGER);
  const [activeTab, setActiveTab] = useState<'products' | 'ledger'>('products');

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Inventory & Stock Ledger</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Immutable transaction ledger, stock levels, safety stock thresholds & warehouse bins</p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => setActiveTab('products')} style={{ padding: "0.5rem 1rem", background: activeTab === 'products' ? "#3b82f6" : "#e2e8f0", color: activeTab === 'products' ? "white" : "#0f172a", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Product Master
          </button>
          <button onClick={() => setActiveTab('ledger')} style={{ padding: "0.5rem 1rem", background: activeTab === 'ledger' ? "#3b82f6" : "#e2e8f0", color: activeTab === 'ledger' ? "white" : "#0f172a", border: "none", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
            Stock Transaction Ledger
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "0.75rem 0.5rem" }}>SKU</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Product Name</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Category</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>UOM</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Cost / List Price</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Reorder Point</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Stock On Hand</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => {
                const isLow = p.stockOnHand <= p.reorderPoint;
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{p.sku}</td>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: "500" }}>{p.name}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{p.category}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{p.uom}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>${p.costPrice} / ${p.listPrice}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{p.reorderPoint} {p.uom}</td>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: "700", color: isLow ? "#ef4444" : "#0f172a" }}>
                      {p.stockOnHand} {p.uom}
                    </td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: isLow ? "#fee2e2" : "#d1fae5", color: isLow ? "#991b1b" : "#065f46" }}>
                        {isLow ? "REORDER REQUIRED" : "HEALTHY"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "0.75rem 0.5rem" }}>Timestamp</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Warehouse</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>SKU</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Product</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Type</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Quantity Change</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Reference</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map(l => (
                <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>{l.timestamp}</td>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{l.warehouse}</td>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{l.sku}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>{l.productName}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <span style={{ padding: "0.2rem 0.5rem", background: "#f1f5f9", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" }}>{l.entryType}</span>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", fontWeight: "700", color: l.quantityChange > 0 ? "#10b981" : "#ef4444" }}>
                    {l.quantityChange > 0 ? `+${l.quantityChange}` : l.quantityChange}
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem", color: "#3b82f6" }}>{l.referenceId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
