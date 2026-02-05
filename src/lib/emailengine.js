export const emailEngineClient = {
    async sendEmail({ accountId, to, subject, text, html }) {
        const apiKey = process.env.EMAILENGINE_API_KEY;
        const baseUrl = process.env.EMAILENGINE_BASE_URL; // e.g., https://api.emailengine.app
        if (!apiKey) throw new Error('EmailEngine API key missing');

        const response = await fetch(`${baseUrl}/v1/account/${accountId}/outbox`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: { name: 'Me', address: 'me@example.com' },
                to: [{ address: to }],
                subject,
                text,
                html,
            }),
        });

        return response.json();
    },

    async listAccounts() {
        const apiKey = process.env.EMAILENGINE_API_KEY;
        const baseUrl = process.env.EMAILENGINE_BASE_URL;
        const response = await fetch(`${baseUrl}/v1/accounts`, {
            headers: { 'Authorization': `Bearer ${apiKey}` },
        });
        return response.json();
    }
};
