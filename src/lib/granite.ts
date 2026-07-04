import dotenv from "dotenv";

dotenv.config();

console.log("IBM URL:", process.env.IBM_URL);
console.log("Project ID loaded:", !!process.env.IBM_PROJECT_ID);
console.log("API Key loaded:", !!process.env.IBM_API_KEY);

export const graniteConfig = {
  apiKey: process.env.IBM_API_KEY,
  projectId: process.env.IBM_PROJECT_ID,
  url: process.env.IBM_URL,
};