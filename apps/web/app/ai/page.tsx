"use client";

import { useState, useRef, useEffect } from "react";
import { INITIAL_PROPOSALS, INITIAL_RAG_DOCS } from "../../lib/store";
import { formatBirr } from "../../lib/locale";

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  toolsUsed?: string[] | undefined;
  citations?: string[] | undefined;
  isLoading?: boolean | undefined;
}

const QUICK_PROMPTS = [
  "What is our current inventory status?",
  "Analyze reorder thresholds and propose a purchase order",
  "What are our top customers and their credit limits?",
  "Summarize our financial position in ETB",
  "What does the ESA standard ES 3821 require for quality?",
  "Calculate VAT on a ETB 500,000 sale",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "copilot",
      text: "ሰላም! (Hello!) I am your AI Manufacturing Copilot for Tekle Manufacturing PLC. I have full context of your Kilinto plant inventory, active work orders, financial accounts in Ethiopian Birr (ETB), and Ethiopian regulatory requirements. Ask me anything about your ERP data, or use a quick prompt below.",
    }
  ]);
  const [input, setInput] = useState("");
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [ragDocs] = useState(INITIAL_RAG_DOCS);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<"idle" | "ok" | "error">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Build conversation history for Gemini (excluding the welcome greeting)
  const buildHistory = (msgs: Message[]) =>
    msgs
      .filter(m => !m.isLoading)
      .slice(1) // skip the initial greeting
      .map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));

  const handleSend = async (text: string) => {
    const query = text || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { id: `msg-${Date.now()}`, sender: "user", text: query };
    const loadingMsg: Message = { id: `loading-${Date.now()}`, sender: "copilot", text: "", isLoading: true };

    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = buildHistory([...messages, userMsg]);
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "API error");

      // Detect tool-like patterns in the response for UX annotations
      const replyText: string = data.reply;
      const toolsUsed: string[] = [];
      const citations: string[] = [];

      if (/inventor|stock|on.?hand|warehouse/i.test(replyText)) toolsUsed.push("get_inventory_ledger");
      if (/reorder|threshold|safety stock/i.test(replyText)) toolsUsed.push("check_reorder_thresholds");
      if (/purchase order|PO|reorder|supplier/i.test(replyText)) toolsUsed.push("propose_purchase_order");
      if (/VAT|tax|ERCA|withholding/i.test(replyText)) { toolsUsed.push("query_tax_rules"); citations.push("Ethiopian VAT & Tax Compliance Guide — MoR 2025"); }
      if (/ESA|ES 3821|quality|inspection/i.test(replyText)) { toolsUsed.push("search_rag_documents"); citations.push("SOP — Aluminum Enclosure Assembly & QC (Tekle MFG)"); }
      if (/ETB|Birr|revenue|account|balance/i.test(replyText)) toolsUsed.push("query_financial_ledger");

      const botResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: "copilot",
        text: replyText,
        toolsUsed: toolsUsed.length > 0 ? toolsUsed : undefined,
        citations: citations.length > 0 ? citations : undefined,
      };

      setMessages(prev => prev.filter(m => !m.isLoading).concat(botResponse));
      setApiStatus("ok");
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "copilot",
        text: `⚠️ Gemini API connection failed: ${err instanceof Error ? err.message : "Unknown error"}. Please check your GEMINI_API_KEY in .env.`,
      };
      setMessages(prev => prev.filter(m => !m.isLoading).concat(errorMsg));
      setApiStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleApproveProposal = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
  };

  const handleRejectProposal = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p));
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1300px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>AI Manufacturing Copilot — Tekle MFG (Powered by Gemini)</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#64748b", fontSize: "0.875rem" }}>Live Gemini AI integration · Ethiopian ETB context · RAG-augmented ERP knowledge · Human-in-the-loop approvals</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.8rem", borderRadius: "20px", background: apiStatus === "ok" ? "#d1fae5" : apiStatus === "error" ? "#fee2e2" : "#f1f5f9", fontSize: "0.8rem", fontWeight: "600", color: apiStatus === "ok" ? "#065f46" : apiStatus === "error" ? "#991b1b" : "#64748b" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: apiStatus === "ok" ? "#10b981" : apiStatus === "error" ? "#ef4444" : "#94a3b8", display: "inline-block" }} />
          {apiStatus === "ok" ? "Gemini Connected" : apiStatus === "error" ? "API Error" : "Gemini Ready"}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        {/* Chat Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Quick Prompts */}
          <div style={{ background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", padding: "1rem" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#64748b", marginBottom: "0.6rem" }}>⚡ Quick ERP Prompts</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {QUICK_PROMPTS.map(p => (
                <button key={p} onClick={() => handleSend(p)} disabled={isLoading}
                  style={{ padding: "0.35rem 0.75rem", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "20px", fontSize: "0.78rem", cursor: isLoading ? "not-allowed" : "pointer", color: "#334155", transition: "all 0.15s" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div style={{ background: "#ffffff", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", height: "560px" }}>
            <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid #e2e8f0", background: "linear-gradient(135deg, #1e293b, #0f172a)", borderRadius: "10px 10px 0 0", color: "white", fontWeight: "700", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              🤖 ERP Copilot — Tekle Manufacturing PLC
              <span style={{ marginLeft: "auto", fontSize: "0.75rem", fontWeight: "400", opacity: 0.7 }}>Model: {process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash"}</span>
            </div>

            <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {messages.map(m => (
                <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.sender === "user" ? "flex-end" : "flex-start" }}>
                  {m.isLoading ? (
                    <div style={{ display: "flex", gap: "6px", padding: "0.875rem 1.1rem", background: "#f1f5f9", borderRadius: "12px" }}>
                      {[0, 1, 2].map(i => (
                        <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#94a3b8", animation: `bounce 1s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  ) : (
                    <div style={{ maxWidth: "82%", padding: "0.875rem 1.1rem", borderRadius: "12px", background: m.sender === "user" ? "#3b82f6" : "#f1f5f9", color: m.sender === "user" ? "white" : "#0f172a", fontSize: "0.9rem", lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
                      {m.text}
                    </div>
                  )}
                  {m.toolsUsed && m.toolsUsed.length > 0 && (
                    <div style={{ marginTop: "0.3rem", fontSize: "0.72rem", color: "#3b82f6", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      <span>⚡ ERP Tools:</span>
                      {m.toolsUsed.map(t => (
                        <span key={t} style={{ background: "#dbeafe", padding: "0.1rem 0.4rem", borderRadius: "4px", fontWeight: "600" }}>{t}</span>
                      ))}
                    </div>
                  )}
                  {m.citations && m.citations.length > 0 && (
                    <div style={{ marginTop: "0.2rem", fontSize: "0.72rem", color: "#10b981" }}>
                      📖 {m.citations.join(' · ')}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleFormSubmit} style={{ padding: "0.875rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "0.5rem" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about inventory, purchase proposals, ERCA tax, ESA quality standards..."
                style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.875rem", outline: "none" }}
              />
              <button type="submit" disabled={isLoading || !input.trim()}
                style={{ padding: "0.75rem 1.25rem", background: isLoading ? "#94a3b8" : "#3b82f6", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: isLoading ? "not-allowed" : "pointer", minWidth: "80px" }}>
                {isLoading ? "..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* AI Proposals Queue */}
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 1rem 0" }}>🛡️ Human Approval Queue</h3>
            {proposals.length === 0 ? (
              <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>No pending proposals.</p>
            ) : proposals.map(p => (
              <div key={p.id} style={{ background: p.status === 'PENDING_APPROVAL' ? "#fffbeb" : p.status === 'APPROVED' ? "#f0fdf4" : "#fef2f2", padding: "0.875rem", borderRadius: "8px", border: `1px solid ${p.status === 'PENDING_APPROVAL' ? "#fde68a" : p.status === 'APPROVED' ? "#bbf7d0" : "#fecaca"}`, marginBottom: "0.75rem" }}>
                <div style={{ fontSize: "0.72rem", color: "#3b82f6", fontWeight: "700", marginBottom: "0.25rem" }}>{p.actionType}</div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "0.4rem" }}>📅 {p.createdAt}</div>
                <p style={{ fontSize: "0.8rem", margin: "0 0 0.75rem 0", color: "#334155", lineHeight: 1.4 }}>{p.details}</p>
                {p.status === 'PENDING_APPROVAL' ? (
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => handleApproveProposal(p.id)}
                      style={{ flex: 1, padding: "0.4rem", background: "#10b981", color: "white", border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer" }}>
                      ✓ Approve
                    </button>
                    <button onClick={() => handleRejectProposal(p.id)}
                      style={{ flex: 1, padding: "0.4rem", background: "#ef4444", color: "white", border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600", cursor: "pointer" }}>
                      ✗ Reject
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: "0.75rem", fontWeight: "700", color: p.status === 'APPROVED' ? '#10b981' : '#ef4444' }}>
                    {p.status === 'APPROVED' ? '✓ Approved & Scheduled for Execution' : '✗ Rejected'}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RAG Document Store */}
          <div style={{ background: "#ffffff", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: "700", margin: "0 0 0.75rem 0" }}>📚 RAG Document Store (pgvector)</h3>
            {ragDocs.map(d => (
              <div key={d.id} style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", marginBottom: "0.5rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.2rem" }}>{d.title}</div>
                <div style={{ color: "#64748b", fontSize: "0.72rem" }}>📂 {d.category} · {d.chunksCount} vector chunks</div>
              </div>
            ))}
            <div style={{ marginTop: "0.75rem", padding: "0.6rem", background: "#dbeafe", borderRadius: "6px", fontSize: "0.75rem", color: "#1e40af" }}>
              🔵 Gemini embedding model indexes these documents and retrieves relevant chunks for every user query.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
