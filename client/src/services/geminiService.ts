/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  }
  try {
    return (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || '';
  } catch {
    return '';
  }
};

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the Lead Systems Architect & AI Consultant for 'TITANIUM SOLUTIONS' (TNSSYS.TECH).
      
      Brand Core:
      - Slogan: "IT Support • AI Integration • Training"
      - Philosophy: "We don't just solve problems; we engineer systems that prevent them and AI that capitalizes on opportunities before they vanish."
      - Core Pillars:
        1. Managed IT: Cybersecurity hardening, Cloud infrastructure (AWS/GCP/Azure), Zero-Trust networks, 24/7 disaster recovery & uptime monitoring.
        2. AI Implementation (CORE FOCUS): Bespoke neural networks, custom LLM fine-tuning, RAG enterprise pipelines, predictive analytics, autonomous process automation.
        3. Corporate Training: Upskilling engineering & executive teams with AI literacy, prompt engineering masterclasses, and AI safety & ethics compliance.
      
      Tone:
      - Authoritative, precise, cybernetic, visionary yet grounded in enterprise ROI and rock-solid engineering.
      - Crisp, structured answers using technical clarity.
      - If a user asks for architecture advice or a quote/scope estimation, provide a structured recommendation and invite them to submit their inquiry via the "Start a Project" modal.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    // Provide intelligent fallback response if API key is not yet configured
    if (message.toLowerCase().includes('it') || message.toLowerCase().includes('cloud')) {
      return "Titanium Solutions Managed IT encompasses 24/7 proactive telemetry, automated failover disaster recovery, and Zero-Trust cloud network architecture. We guarantee 99.99% operational continuity for critical enterprise workloads.";
    } else if (message.toLowerCase().includes('ai') || message.toLowerCase().includes('model') || message.toLowerCase().includes('llm')) {
      return "Our Core Focus in AI Implementation spans bespoke transformer fine-tuning, high-throughput RAG search systems, and automated predictive decision engines tailored to your proprietary enterprise datasets.";
    } else if (message.toLowerCase().includes('training') || message.toLowerCase().includes('workshop')) {
      return "Titanium Corporate Training delivers hands-on prompt engineering, AI safety/governance compliance, and full-stack workflow automation seminars tailored to your cross-functional departments.";
    }
    return "Titanium Systems Architecture is active. Please ask about our Managed IT frameworks, custom AI model deployments, or Corporate Training programs.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Transmission interrupted. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Titanium Systems node temporarily busy. Please try again or submit your inquiry through the Start a Project modal.";
  }
};
