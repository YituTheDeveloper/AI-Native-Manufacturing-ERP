"use client";

import { INITIAL_PRODUCTS, INITIAL_SALES_ORDERS, INITIAL_PRODUCTION_ORDERS } from "../../lib/store";

export default function AnalyticsPage() {
  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Operational Analytics & Executive KPIs</h1>
        <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Cross-domain analytical metrics for Sales, Manufacturing Yield, Inventory Valuation & Operational Efficiency</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {/* Sales Trend Card */}
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginTop: 0 }}>Commercial Sales Fulfillment</h3>
          <div style={{ height: "180px", background: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "1rem" }}>
            <div style={{ height: "40%", width: "30px", background: "#93c5fd", borderRadius: "4px 4px 0 0" }} title="July" />
            <div style={{ height: "65%", width: "30px", background: "#93c5fd", borderRadius: "4px 4px 0 0" }} title="August" />
            <div style={{ height: "85%", width: "30px", background: "#3b82f6", borderRadius: "4px 4px 0 0" }} title="September" />
            <div style={{ height: "95%", width: "30px", background: "#10b981", borderRadius: "4px 4px 0 0" }} title="October (Projected)" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginTop: "0.5rem" }}>
            <span>Jul ($140k)</span><span>Aug ($210k)</span><span>Sep ($380k)</span><span style={{ fontWeight: "700", color: "#10b981" }}>Oct ($618k)</span>
          </div>
        </div>

        {/* Manufacturing OEE Yield */}
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginTop: 0 }}>Manufacturing OEE & Yield</h3>
          <div style={{ padding: "1rem 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
              <span>First Pass Quality Yield:</span><strong style={{ color: "#10b981" }}>98.2%</strong>
            </div>
            <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "4px", marginBottom: "1rem" }}>
              <div style={{ width: "98.2%", background: "#10b981", height: "100%", borderRadius: "4px" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
              <span>Work Center Capacity Utilization:</span><strong style={{ color: "#3b82f6" }}>84.5%</strong>
            </div>
            <div style={{ width: "100%", background: "#e2e8f0", height: "8px", borderRadius: "4px" }}>
              <div style={{ width: "84.5%", background: "#3b82f6", height: "100%", borderRadius: "4px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
