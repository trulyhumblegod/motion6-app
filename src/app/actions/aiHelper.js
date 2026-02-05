'use server';
import { groqClient } from '@/lib/groq';

export async function generateAiSequence(config) {
    try {
        const systemPrompt = `You are a world-class cold outreach architect for Motion6. 
        Your goal is to build a high-conversion multi-channel sequence.
        Respond ONLY in JSON format.
        
        JSON Structure:
        {
            "campaignName": "string",
            "sequence": [
                {
                    "id": number,
                    "type": "email" | "linkedin_view" | "linkedin_connect" | "linkedin_message" | "linkedin_like",
                    "name": "string (step label)",
                    "delay": number (days to wait),
                    "subject": "string (only for email)",
                    "body": "string (the message content with {{firstName}} variables)"
                }
            ]
        }`;

        const userPrompt = `Build a campaign for:
        Product: ${config.product}
        Audience: ${config.audience}
        Goal: ${config.goal}
        Tone: ${config.tone}
        Pain Points: ${config.painPoints || 'Not specified'}`;

        const result = await groqClient.chat(systemPrompt, userPrompt);
        const data = JSON.parse(result);

        return { success: true, data };
    } catch (error) {
        console.error('AI Sequence Error:', error);
        return { success: false, message: error.message };
    }
}
