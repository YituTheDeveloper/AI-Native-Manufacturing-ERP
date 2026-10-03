"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  INITIAL_PRODUCTS, INITIAL_SALES_ORDERS, INITIAL_PURCHASE_ORDERS, 
  INITIAL_PRODUCTION_ORDERS, INITIAL_QUALITY_INSPECTIONS, INITIAL_ACCOUNTS, INITIAL_PROPOSALS 
} from "../lib/store";
import { formatBirrCompact } from "../lib/locale";

export default function OverviewPage() {
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);

  const totalRevenue = INITIAL_ACCOUNTS.find(a => a.code === '4000')?.balance || 0;
  const cashBalance = INITIAL_ACCOUNTS.find(a => a.code === '1010')?.balance || 0;
  const pendingApprovals = proposals.filter(p => p.status === 'PENDING_APPROVAL').length;
  const activeWorkOrders = INITIAL_PRODUCTION_ORDERS.filter(w => w.status === 'IN_PROGRESS' || w.status === 'PLANNED').length;

  const handleApprove = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
  };

  const handleReject = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p));
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", padding: "1.5rem", borderRadius: "12px", color: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Executive Operations Dashboard</h1>
          <p style={{ margin: "0.25rem 0 0 0", opacity: 0.8, fontSize: "0.875rem" }}>Tekle Manufacturing PLC — Kilinto Industrial Zone, Addis Ababa, Ethiopia</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/ai" style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.875rem" }}>
            🤖 Open AI Copilot
          </Link>
          <Link href="/sales" style={{ padding: "0.6rem 1.2rem", background: "rgba(255,255,255,0.1)", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "600", fontSize: "0.875rem", border: "1px solid rgba(255,255,255,0.2)" }}>
            + New Sales Order
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "0.875rem", color: "gray", fontWeight: "500" }}>YTD Sales Revenue</div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", marginTop: "0.25rem" }}>{formatBirrCompact(totalRevenue)}</div>
          <div style={{ fontSize: "0.75rem", color: "#10b981", marginTop: "0.5rem" }}>↑ +14.2% vs previous period</div>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "0.875rem", color: "gray", fontWeight: "500" }}>Operating Cash Reserve</div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#0f172a", marginTop: "0.25rem" }}>{formatBirrCompact(cashBalance)}</div>
          <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>CBE Operating Account (Acc #1010)</div>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "0.875rem", color: "gray", fontWeight: "500" }}>Active Production Orders</div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: "#3b82f6", marginTop: "0.25rem" }}>{activeWorkOrders} Orders</div>
          <div style={{ fontSize: "0.75rem", color: "#3b82f6", marginTop: "0.5rem" }}>WO-2026-88 on Line 2 (90% output)</div>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "0.875rem", color: "gray", fontWeight: "500" }}>Pending AI Approvals</div>
          <div style={{ fontSize: "1.75rem", fontWeight: "700", color: pendingApprovals > 0 ? "#f59e0b" : "#10b981", marginTop: "0.25rem" }}>{pendingApprovals} Actions</div>
          <div style={{ fontSize: "0.75rem", color: "#f59e0b", marginTop: "0.5rem" }}>Human-in-the-loop write requests</div>
        </div>
      </div>

      {/* Main Content Split */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Left Column: Recent Orders & Production */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Active Work Orders */}
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>Active Manufacturing Work Orders</h3>
              <Link href="/manufacturing" style={{ fontSize: "0.875rem", color: "#3b82f6", textDecoration: "none" }}>View All Routings →</Link>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "0.5rem" }}>Order #</th>
                  <th style={{ padding: "0.5rem" }}>Product</th>
                  <th style={{ padding: "0.5rem" }}>Planned / Output</th>
                  <th style={{ padding: "0.5rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_PRODUCTION_ORDERS.map(wo => (
                  <tr key={wo.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{wo.orderNumber}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{wo.productName}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{wo.producedQuantity} / {wo.plannedQuantity} Units</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: wo.status === "IN_PROGRESS" ? "#dbeafe" : "#fef3c7", color: wo.status === "IN_PROGRESS" ? "#1e40af" : "#92400e" }}>
                        {wo.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sales Orders */}
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: 0 }}>Recent Commercial Sales Orders</h3>
              <Link href="/sales" style={{ fontSize: "0.875rem", color: "#3b82f6", textDecoration: "none" }}>View Sales Register →</Link>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "0.5rem" }}>Order #</th>
                  <th style={{ padding: "0.5rem" }}>Customer</th>
                  <th style={{ padding: "0.5rem" }}>Total Amount</th>
                  <th style={{ padding: "0.5rem" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {INITIAL_SALES_ORDERS.map(so => (
                  <tr key={so.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{so.orderNumber}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>{so.customerName}</td>
                    <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{formatBirrCompact(so.totalAmount)}</td>
                    <td style={{ padding: "0.75rem 0.5rem" }}>
                      <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: "#d1fae5", color: "#065f46" }}>
                        {so.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: AI Action Proposal Inbox & Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* AI Proposal Box */}
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0 0 1rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>🤖</span> AI Human Approval Queue
            </h3>
            {proposals.map(p => (
              <div key={p.id} style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem", color: "#64748b", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: "600", color: "#3b82f6" }}>{p.actionType}</span>
                  <span>{p.createdAt}</span>
                </div>
                <p style={{ fontSize: "0.85rem", margin: "0 0 0.75rem 0", color: "#334155" }}>{p.details}</p>
                {p.status === 'PENDING_APPROVAL' ? (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleApprove(p.id)} style={{ flex: 1, padding: "0.4rem", background: "#10b981", color: "white", border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer" }}>Approve & Execute</button>
                    <button onClick={() => handleReject(p.id)} style={{ flex: 1, padding: "0.4rem", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer" }}>Reject</button>
                  </div>
                ) : (
                  <div style={{ fontSize: "0.75rem", fontWeight: "600", color: p.status === 'APPROVED' ? '#10b981' : '#ef4444' }}>
                    Status: {p.status}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Module Shortcuts */}
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "0 0 1rem 0" }}>ERP Module Directory</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem" }}>
              <Link href="/inventory" style={{ padding: "0.5rem", background: "#f1f5f9", borderRadius: "6px", color: "#0f172a", textDecoration: "none", fontWeight: "500" }}>📦 Inventory Ledger</Link>
              <Link href="/procurement" style={{ padding: "0.5rem", background: "#f1f5f9", borderRadius: "6px", color: "#0f172a", textDecoration: "none", fontWeight: "500" }}>🛒 Procurement</Link>
              <Link href="/quality" style={{ padding: "0.5rem", background: "#f1f5f9", borderRadius: "6px", color: "#0f172a", textDecoration: "none", fontWeight: "500" }}>🛡️ Quality Control</Link>
              <Link href="/finance" style={{ padding: "0.5rem", background: "#f1f5f9", borderRadius: "6px", color: "#0f172a", textDecoration: "none", fontWeight: "500" }}>📊 Finance & Ledger</Link>
              <Link href="/analytics" style={{ padding: "0.5rem", background: "#f1f5f9", borderRadius: "6px", color: "#0f172a", textDecoration: "none", fontWeight: "500" }}>📈 Analytics KPIs</Link>
              <Link href="/ai" style={{ padding: "0.5rem", background: "#dbeafe", borderRadius: "6px", color: "#1e40af", textDecoration: "none", fontWeight: "600" }}>🤖 AI Copilot & RAG</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
