'use server';
import { groqClient } from '@/lib/groq';

export async function testGroqConnection() {
    try {
        const testData = {
            position: 'Software Engineer',
            company: 'Motion6',
            bio: 'Expert in automation and clean UI.'
        };
        const result = await groqClient.generatePersonalization(testData);
        if (result) {
            return { success: true, message: 'Groq API Connected Successfully!', result };
        }
        return { success: false, message: 'Connection failed: No response from Groq.' };
    } catch (error) {
        return { success: false, message: `Connection failed: ${error.message}` };
    }
}
