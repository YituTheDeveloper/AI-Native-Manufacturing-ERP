import { NextRequest, NextResponse } from 'next/server';

// Real Gemini AI integration for ERP Copilot
// Uses the Gemini API key from environment variables

const GEMINI_BASE_URL = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ERP System context injected into every conversation
const ERP_SYSTEM_PROMPT = `You are an AI Manufacturing Copilot for Tekle Manufacturing PLC, an Ethiopian manufacturing company based in the Kilinto Industrial Zone, Addis Ababa, Ethiopia.

You assist plant operators, managers, and administrators with ERP tasks using the following live context:

**Company:** Tekle Manufacturing PLC
**Plant:** Addis Ababa Plant #1 — Kilinto Industrial Zone
**Currency:** Ethiopian Birr (ETB)
**Tax Authority:** Ethiopian Revenue and Customs Authority (ERCA) — 15% VAT on taxable supplies
**Standards:** Ethiopian Standards Authority (ESA) certification ES 3821

**Current Inventory (Plant #1):**
- ALU-SHEET-2MM: Aluminum Sheet 2mm 4x8ft | 250 units | Cost: ETB 2,450 | SOH: 250 SHEETS | Reorder: 50
- FAST-BOLT-M8: M8 Stainless Steel Hex Bolt | 5,000 units | Cost: ETB 14.50 | Reorder: 1,000
- ENCL-HV-100: Heavy Industrial Enclosure 100L | 45 units | Cost: ETB 10,150 | List: ETB 21,700 | Reorder: 15
- POWDER-COAT-BLK: Industrial Black Powder Coating | 180 KG | Cost: ETB 685/KG | Reorder: 100

**Active Work Orders:**
- WO-2026-88: Heavy Industrial Enclosure 100L — 45/50 produced (IN_PROGRESS, due 2026-10-05)
- WO-2026-89: Heavy Industrial Enclosure 100L — 0/100 produced (PLANNED, starts 2026-10-06)

**Customers:**
- Ethiopian Electric Power Corporation (EEP) — Credit Limit: ETB 5,500,000
- Ethio Telecom S.C. — Credit Limit: ETB 13,700,000
- Commercial Bank of Ethiopia — Credit Limit: ETB 8,250,000

**Suppliers:**
- Derba Steel and Metals PLC (Rating: 4.85/5)
- Awash Industrial Hardware Co. (Rating: 4.72/5)

**Financial Summary:**
- Operating Cash (CBE Account): ETB 24,700,000
- YTD Revenue: ETB 33,900,000
- Accounts Receivable: ETB 4,658,500
- Accounts Payable: ETB 2,303,000

**Key Policies:**
- Purchases above ETB 550,000 require Plant Manager approval (Human-in-the-loop)
- Inventory transfers above 100 units require approval
- All journal entries require double-entry balancing
- Withholding tax 2% on procurement contracts above ETB 10,000

Respond concisely, professionally, and in the context of Ethiopian manufacturing operations.
When you propose an action (like creating a PO or transferring inventory), explicitly say you are PROPOSING it and that it requires human approval.
Use ETB for all monetary amounts. Format amounts with commas (e.g., ETB 1,225,000).`;

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API key not configured.' }, { status: 500 });
  }

  try {
    const { messages } = await req.json();

    // Build messages array for the Gemini API (OpenAI-compatible endpoint)
    const payload = {
      model: GEMINI_MODEL,
      messages: [
        { role: 'system', content: ERP_SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 1024,
      temperature: 0.3,
    };

    const response = await fetch(`${GEMINI_BASE_URL}chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return NextResponse.json({ error: `Gemini API error: ${response.status}` }, { status: 502 });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || 'No response from AI.';

    return NextResponse.json({ reply: assistantMessage });
  } catch (err) {
    console.error('ERP Copilot API error:', err);
    return NextResponse.json({ error: 'Internal server error calling Gemini.' }, { status: 500 });
  }
}
