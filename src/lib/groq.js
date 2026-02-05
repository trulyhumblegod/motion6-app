export const groqClient = {
    async generatePersonalization(leadData) {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) throw new Error('Groq API key missing');

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama3-70b-8192',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a cold outreach expert. Write a short, non-spammy icebreaker for the following lead.'
                    },
                    {
                        role: 'user',
                        content: `Lead Position: ${leadData.position}, Company: ${leadData.company}, Recent Bio: ${leadData.bio}`
                    }
                ],
            }),
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content;
    }
};
