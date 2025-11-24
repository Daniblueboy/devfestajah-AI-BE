import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env';

export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!config.gemini.apiKey) {
      throw new Error('GEMINI_API_KEY is required');
    }
    this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: config.gemini.model });
  }

  async generateChatReply(message: string): Promise<{ reply: string }> {
    try {
      if (!config.gemini.apiKey) {
        throw new Error('GEMINI_API_KEY is not configured. Please set it in environment variables.');
      }
      
      const result = await this.model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      return { reply: text };
    } catch (error: any) {
      console.error('Error generating chat reply:', error);
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        apiKey: config.gemini.apiKey ? 'Set (hidden)' : 'Not set',
        model: config.gemini.model
      });
      
      const errorMessage = error?.message?.includes('API_KEY') 
        ? 'API key configuration error. Please check Render environment variables.'
        : error?.message || 'Failed to generate chat reply';
      
      throw new Error(errorMessage);
    }
  }

  async suggestCodeImprovements(
    code: string,
    context?: string
  ): Promise<{ suggestions: string; explanation: string }> {
    try {
      if (!config.gemini.apiKey) {
        throw new Error('GEMINI_API_KEY is not configured. Please set it in environment variables.');
      }
      
      const prompt = `
        You are an expert senior software engineer.
        Review the following code and provide specific suggestions for improvement, focusing on performance, security, and readability.
        
        Context: ${context || 'No specific context provided.'}
        
        Code:
        \`\`\`
        ${code}
        \`\`\`
        
        Format your response as JSON with two fields: "suggestions" (a markdown string with the suggested code) and "explanation" (a markdown string explaining the changes).
        Ensure the response is valid JSON. Do not wrap the JSON in markdown code blocks.
      `;

      // Use a model capable of JSON mode if available, or prompt engineering for JSON
      // For this demo, we'll ask for JSON and parse it, or fall back to text if needed.
      // Gemini 1.5 Pro/Flash supports response_mime_type: "application/json"

      const jsonModel = this.genAI.getGenerativeModel({
        model: config.gemini.model,
        generationConfig: { responseMimeType: 'application/json' },
      });

      const result = await jsonModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return JSON.parse(text);
    } catch (error: any) {
      console.error('Error suggesting code improvements:', error);
      console.error('Error details:', {
        message: error?.message,
        apiKey: config.gemini.apiKey ? 'Set (hidden)' : 'Not set',
        model: config.gemini.model
      });
      
      const errorMessage = error?.message?.includes('API_KEY')
        ? 'API key configuration error. Please check Render environment variables.'
        : error?.message || 'Failed to suggest code improvements';
        
      throw new Error(errorMessage);
    }
  }
}

export const aiService = new AiService();
