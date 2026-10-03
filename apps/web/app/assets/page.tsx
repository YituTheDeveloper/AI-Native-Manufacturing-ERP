"use client";

export default function AssetsPage() {
  const assets = [
    { id: "ast-1", name: "CNC Milling Machine 5-Axis", code: "EQP-CNC-01", category: "Machinery", cost: 185000, depreciation: "Straight Line (10 Yrs)", status: "OPERATIONAL" },
    { id: "ast-2", name: "Fiber Laser Cutter 6kW", code: "EQP-LSR-02", category: "Machinery", cost: 240000, depreciation: "Straight Line (10 Yrs)", status: "MAINTENANCE_DUE" },
  ];

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>Asset Register & Maintenance Schedules</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Capital assets, straight-line depreciation & preventive maintenance work orders</p>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Asset Code</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Asset Description</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Category</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Acquisition Cost</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Depreciation Method</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Operational Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(a => (
              <tr key={a.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{a.code}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "500" }}>{a.name}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{a.category}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>${a.cost.toLocaleString()}</td>
                <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>{a.depreciation}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: a.status === 'OPERATIONAL' ? "#d1fae5" : "#fef3c7", color: a.status === 'OPERATIONAL' ? "#065f46" : "#92400e" }}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
