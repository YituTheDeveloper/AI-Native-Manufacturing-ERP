"use client";

export default function WorkflowPage() {
  const rules = [
    { id: "w1", name: "High-Value Purchase Order Approval (>$10,000)", approver: "Plant Manager / Controller", status: "ACTIVE" },
    { id: "w2", name: "AI Write Proposal Human Gate", approver: "System Administrator", status: "ACTIVE" },
    { id: "w3", name: "Period Close Financial Approval", approver: "Financial Controller", status: "ACTIVE" },
  ];

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>Reusable Approval Workflows</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Multi-step approval definitions, threshold rules, delegation & audit trail</p>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Workflow Rule Name</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Required Approver Role</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Enforcement Status</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(r => (
              <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{r.name}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{r.approver}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: "#d1fae5", color: "#065f46" }}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
