'use server';
import { groqClient } from '@/lib/groq';

export async function generateLeadIcebreaker(leadData) {
    try {
        if (!leadData.name || !leadData.company) {
            throw new Error('Lead name and company are required');
        }

        const personalization = await groqClient.generatePersonalization({
            position: leadData.position || 'Professional',
            company: leadData.company,
            bio: leadData.bio || `A key stakeholder at ${leadData.company}`
        });

        if (personalization) {
            return { success: true, icebreaker: personalization };
        }
        return { success: false, message: 'AI returned an empty response.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
