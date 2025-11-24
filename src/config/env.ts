import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 3000,
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-2.5-pro',
    baseUrl:
      process.env.GEMINI_API_BASE_URL ||
      'https://generativelanguage.googleapis.com',
  },
};

if (!config.gemini.apiKey) {
  console.error('❌ ERROR: GEMINI_API_KEY is not set!');
  console.error('Please set GEMINI_API_KEY in your Render environment variables.');
  console.error('Get your API key from: https://makersuite.google.com/app/apikey');
} else {
  console.log('✅ GEMINI_API_KEY is configured');
  console.log(`Using model: ${config.gemini.model}`);
}
