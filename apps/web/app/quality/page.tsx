"use client";

import { useState } from "react";
import { INITIAL_QUALITY_INSPECTIONS } from "../../lib/store";

export default function QualityPage() {
  const [inspections, setInspections] = useState(INITIAL_QUALITY_INSPECTIONS);
  const [showInspModal, setShowInspModal] = useState(false);
  const [plan, setPlan] = useState("Final Assembly Quality Gate");
  const [notes, setNotes] = useState("");

  const handleCreateInsp = (e: React.FormEvent) => {
    e.preventDefault();
    const newInsp = {
      id: `qi-${Date.now()}`,
      inspectionPlan: plan,
      referenceNumber: `INSP-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PASSED' as const,
      inspector: 'Alexander Wright',
      date: new Date().toISOString().slice(0, 10),
      defectsCount: 0,
      notes: notes || 'Inspection passed with 100% adherence to tolerance specs.'
    };
    setInspections(prev => [newInsp, ...prev]);
    setShowInspModal(false);
    setNotes("");
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>Quality Control & Inspections</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Inspection Plans, In-process quality gates, Defect Non-conformance & CAPA</p>
        </div>
        <button onClick={() => setShowInspModal(true)} style={{ padding: "0.6rem 1.2rem", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
          + Perform Quality Inspection
        </button>
      </div>

      <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
              <th style={{ padding: "0.75rem 0.5rem" }}>Ref Number</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Inspection Plan</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Inspector</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Date</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Defects Found</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Result Status</th>
              <th style={{ padding: "0.75rem 0.5rem" }}>Inspection Notes</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map(i => (
              <tr key={i.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "600" }}>{i.referenceNumber}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "500" }}>{i.inspectionPlan}</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>{i.inspector}</td>
                <td style={{ padding: "0.75rem 0.5rem", color: "#64748b" }}>{i.date}</td>
                <td style={{ padding: "0.75rem 0.5rem", fontWeight: "700", color: i.defectsCount > 0 ? "#f59e0b" : "#10b981" }}>{i.defectsCount} defects</td>
                <td style={{ padding: "0.75rem 0.5rem" }}>
                  <span style={{ padding: "0.25rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", background: i.status === 'PASSED' ? "#d1fae5" : "#fee2e2", color: i.status === 'PASSED' ? "#065f46" : "#991b1b" }}>
                    {i.status}
                  </span>
                </td>
                <td style={{ padding: "0.75rem 0.5rem", color: "#475569" }}>{i.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInspModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", width: "420px" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: 0 }}>Record Quality Inspection</h2>
            <form onSubmit={handleCreateInsp} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Inspection Plan</label>
              <select value={plan} onChange={e => setPlan(e.target.value)} style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}>
                <option value="Final Assembly Quality Gate">Final Assembly Quality Gate</option>
                <option value="Incoming Sheet Inspection Plan v2">Incoming Sheet Inspection Plan v2</option>
                <option value="Fastener Hardness & Dimensions">Fastener Hardness & Dimensions</option>
              </select>

              <label style={{ fontSize: "0.85rem", fontWeight: "600" }}>Notes & Measurements</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Record inspection details..." style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", height: "80px" }} />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowInspModal(false)} style={{ padding: "0.5rem 1rem", background: "#cbd5e1", border: "none", borderRadius: "6px" }}>Cancel</button>
                <button type="submit" style={{ padding: "0.5rem 1rem", background: "#10b981", color: "white", border: "none", borderRadius: "6px" }}>Record Pass</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
