
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const translateText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  if (!text.trim()) {
    return "";
  }

  const prompt = `
    You are an expert translator. Your task is to translate the given text accurately and naturally.
    - Translate from: ${sourceLang}
    - Translate to: ${targetLang}
    
    Please provide ONLY the translated text, with no additional commentary, phrases like "Here is the translation:", or any introductory text.
    
    Text to translate:
    ---
    ${text}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to translate text. Please try again.");
  }
};
