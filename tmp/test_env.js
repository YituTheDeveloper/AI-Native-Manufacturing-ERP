import dotenv from 'dotenv';
dotenv.config();

console.log("Checking Environment Setup...");
console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "CONFIGURED" : "MISSING");
console.log("Gemini Model:", process.env.GEMINI_MODEL);
console.log("Gemini Key:", process.env.GEMINI_API_KEY ? "CONFIGURED (" + process.env.GEMINI_API_KEY.substring(0, 8) + "...)" : "MISSING");
console.log("Spring Datasource Host:", process.env.SPRING_DATASOURCE_URL ? "CONFIGURED" : "MISSING");
