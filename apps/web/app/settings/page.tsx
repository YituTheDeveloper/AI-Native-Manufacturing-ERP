"use client";

import { INITIAL_TENANT } from "../../lib/store";

export default function SettingsPage() {
  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.25rem" }}>System & Tenant Configuration Settings</h1>
      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Multi-tenant parameters, organization scope, database connection status & RBAC security matrix</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: 0 }}>Active Tenant Scope</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
            <div><strong>Organization:</strong> {INITIAL_TENANT.orgName} ({INITIAL_TENANT.orgId})</div>
            <div><strong>Active Tenant:</strong> {INITIAL_TENANT.tenantName} ({INITIAL_TENANT.tenantId})</div>
            <div><strong>Security Role:</strong> {INITIAL_TENANT.role}</div>
            <div><strong>User Session:</strong> {INITIAL_TENANT.userName} ({INITIAL_TENANT.userEmail})</div>
          </div>
        </div>

        <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginTop: 0 }}>Database & Service Health</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
            <div><strong>PostgreSQL Engine:</strong> Supabase Managed PostgreSQL (pgvector enabled)</div>
            <div><strong>Migration Engine:</strong> Flyway SQL Migrations (V1 Baseline, V2 Seed)</div>
            <div><strong>ML FastAPI Service:</strong> Standalone Python Service (`services/ml`)</div>
            <div><strong>AI LLM Provider Adapter:</strong> OpenAI / Gemini Adapter Enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
}
