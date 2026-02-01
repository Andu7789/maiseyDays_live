/*
// import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  // return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
};

export const getGroomingAdvice = async (breed: string, coatCondition: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `As a professional dog groomer, provide expert advice for a ${breed} with a coat described as "${coatCondition}". Keep the tone friendly and professional. Suggest which services they might need and 2 quick tips for home care.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  return response.text;
};

export const getBreedRecommendation = async (description: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this description: "${description}". Based on this, identify the likely dog breed and recommend the best grooming service from these options: Full Groom, Bath & Brush, or Puppy Special. Return the result in a friendly way.`,
    config: {
      temperature: 0.5,
      maxOutputTokens: 300,
    },
  });

  return response.text;
};
*/
