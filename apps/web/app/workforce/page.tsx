"use client";

export default function WorkforcePage() {
  const staff = [
    { id: "e1", name: "Alexander Wright", title: "System Administrator & Plant Tech Lead", dept: "IT & Systems", email: "admin@acme.com" },
    { id: "e2", name: "Sarah Jenkins", title: "Quality Control Lead Inspector", dept: "Quality Assurance", email: "sarah.manufacturing@acme.com" },
    { id: "e3", name: "David Miller", title: "Financial Controller", dept: "Finance & Accounting", email: "david.finance@acme.com" },
  ];

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>Workforce & HR Directory</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Employee directory, plant department structure & attendance approval workflows</p>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Employee Name</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Role Title</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Department</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(e => (
              <tr key={e.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{e.name}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{e.title}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}><span style={{ background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: "600" }}>{e.dept}</span></td>
                <td style={{ padding: "0.75rem 0.5rem", color: "#3b82f6" }}>{e.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
