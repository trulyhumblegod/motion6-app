export const groqClient = {
    async generatePersonalization(leadData) {
        return this.chat('You are a cold outreach expert. Write a short, non-spammy icebreaker for the following lead.',
            `Lead Position: ${leadData.position}, Company: ${leadData.company}, Recent Bio: ${leadData.bio}`);
    },

    async chat(systemPrompt, userPrompt) {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) throw new Error('Groq API key missing');

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            }),
        });

        const data = await response.json();
        return data.choices?.[0]?.message?.content;
    }
};
