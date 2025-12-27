
import { GoogleGenAI, Type } from "@google/genai";
import { Device, DeviceAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    sustainabilityScore: {
      type: Type.NUMBER,
      description: "A score from 0 to 100 based on repairability, age, and market demand in India.",
    },
    recommendation: {
      type: Type.STRING,
      description: "One of 'Repair', 'Resell', or 'Recycle' based on circular economy priorities.",
    },
    lifecycleStage: {
      type: Type.STRING,
      description: "Identification of where the device stands (e.g., Prime, Mature, End-of-life).",
    },
    breakdown: {
      type: Type.OBJECT,
      properties: {
        recyclable: { type: Type.ARRAY, items: { type: Type.STRING } },
        hazardous: { type: Type.ARRAY, items: { type: Type.STRING } },
        repairable: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["recyclable", "hazardous", "repairable"],
    },
    indiaSpecificSteps: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of actionable next steps like specific platforms (Cashify, OLX, Karo Sambhav, etc).",
    },
    educationalInsight: {
      type: Type.STRING,
      description: "Short educational note about the components or disposal impacts.",
    },
  },
  required: ["sustainabilityScore", "recommendation", "lifecycleStage", "breakdown", "indiaSpecificSteps", "educationalInsight"],
};

export const analyzeDevice = async (device: Device): Promise<DeviceAnalysis> => {
  const prompt = `
    As ReVibe (Senior Sustainability Consultant for India), analyze this device:
    - Name: ${device.brand} ${device.model}
    - Category: ${device.category}
    - Age: ${new Date().getFullYear() - device.purchaseYear} years
    - Current Condition: ${device.status}

    Prioritize Circular Economy (Repair > Resell > Recycle).
    Consider India's E-Waste Management Rules 2022 and available infrastructure in India (Urban Company, Cashify, Karo Sambhav, Namo e-waste).
    
    Provide a detailed breakdown of:
    - Recyclable parts (Gold, Copper, Plastic, etc.)
    - Hazardous parts (Lead, Mercury, Lithium-ion battery, etc.)
    - Repairable modules (Screen, Charging Port, etc.)

    Keep the tone encouraging and non-judgmental.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
      },
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const getQuickAdvice = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: "You are ReVibe, an AI-powered e-waste advisor for India. Keep answers concise, helpful, and focused on Indian e-waste rules and sustainability. Use emojis.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Something went wrong. Let's try again later.";
  }
};
