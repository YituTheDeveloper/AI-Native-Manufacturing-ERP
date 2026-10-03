const fs = require('fs');
const path = require('path');

// Load .env manually
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const idx = trimmed.indexOf('=');
    envVars[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim();
  }
});

const GEMINI_API_KEY = envVars.GEMINI_API_KEY;
const GEMINI_BASE_URL = envVars.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta/openai/';
const GEMINI_MODEL = envVars.GEMINI_MODEL || 'gemini-2.5-flash';

const ERP_SYSTEM_PROMPT = `You are an AI Manufacturing Copilot for Tekle Manufacturing PLC in Addis Ababa, Ethiopia. Currency is Ethiopian Birr (ETB). Current inventory: ALU-SHEET-2MM has 250 units at ETB 2,450/unit. ENCL-HV-100 has 45 units at ETB 21,700/unit. Operating cash: ETB 24,700,000. Reply concisely.`;

async function testGemini() {
  console.log('=== Live Gemini API Integration Test ===');
  console.log('Model:', GEMINI_MODEL);
  console.log('Base URL:', GEMINI_BASE_URL);
  console.log('API Key:', GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 12) + '...' : 'MISSING');
  console.log('');
  console.log('Sending test query to Gemini...');
  console.log('Question: "What is our current inventory status and what is 15% VAT on ETB 500,000?"');
  console.log('');

  try {
    const response = await fetch(`${GEMINI_BASE_URL}chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: GEMINI_MODEL,
        messages: [
          { role: 'system', content: ERP_SYSTEM_PROMPT },
          { role: 'user', content: 'What is our current inventory status and what is 15% VAT on an ETB 500,000 sale?' }
        ],
        max_tokens: 512,
        temperature: 0.3,
      }),
    });

    console.log('HTTP Status:', response.status, response.statusText);

    if (!response.ok) {
      const errText = await response.text();
      console.error('ERROR from Gemini API:', errText);
      process.exit(1);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    console.log('=== GEMINI RESPONSE ===');
    console.log(reply);
    console.log('');
    console.log('=== SUCCESS: Live Gemini AI integration is WORKING ===');
    console.log('Model used:', data.model || GEMINI_MODEL);
    console.log('Tokens used:', JSON.stringify(data.usage || {}));
  } catch (err) {
    console.error('FETCH ERROR:', err.message);
    process.exit(1);
  }
}

testGemini();
