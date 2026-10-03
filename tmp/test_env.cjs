const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const idx = trimmed.indexOf('=');
    const key = trimmed.substring(0, idx).trim();
    const val = trimmed.substring(idx + 1).trim();
    envVars[key] = val;
  }
});

console.log("=== Environment Credentials Verification ===");
console.log("Supabase URL:", envVars.NEXT_PUBLIC_SUPABASE_URL || "MISSING");
console.log("Supabase Anon Key:", envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "CONFIGURED" : "MISSING");
console.log("Gemini Model:", envVars.GEMINI_MODEL || "MISSING");
console.log("Gemini API Key:", envVars.GEMINI_API_KEY ? "CONFIGURED (" + envVars.GEMINI_API_KEY.substring(0, 8) + "...)" : "MISSING");
console.log("Spring Datasource URL:", envVars.SPRING_DATASOURCE_URL || "MISSING");
console.log("Spring Datasource User:", envVars.SPRING_DATASOURCE_USERNAME || "MISSING");
console.log("==========================================");
