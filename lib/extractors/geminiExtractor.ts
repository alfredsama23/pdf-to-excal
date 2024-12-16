import { geminiModel } from '../config/gemini';
import { GeminiResponse } from '../types';

const EXTRACTION_PROMPT = `Extract meaningful information from this content. Focus on:
- Names
- Email addresses
- Phone numbers
- Dates
- Addresses
- Any other relevant structured data

Format the response as JSON with clear key-value pairs. Only include fields where data was found.`;

export async function extractWithGemini(
  content: string | Blob,
  mimeType: string
): Promise<GeminiResponse> {
  try {
    let result;
    
    if (typeof content === 'string') {
      // Text content
      const prompt = \`\${EXTRACTION_PROMPT}\n\nContent:\n\${content}\`;
      result = await geminiModel.generateContent(prompt);
    } else {
      // File content (PDF/Image)
      const fileData = {
        inlineData: {
          data: await blobToBase64(content),
          mimeType
        }
      };
      result = await geminiModel.generateContent([EXTRACTION_PROMPT, fileData]);
    }

    const response = await result.response;
    const text = response.text();
    
    try {
      // Try to parse as JSON first
      const structuredData = JSON.parse(text);
      return { text, structuredData };
    } catch {
      // If not valid JSON, return raw text
      return {
        text,
        structuredData: { rawText: text }
      };
    }
  } catch (error) {
    throw new Error(\`Gemini API extraction failed: \${error.message}\`);
  }
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to convert blob to base64'));
    reader.readAsDataURL(blob);
  });
}