export const resendClient = {
    async sendEmail({ to, subject, html }) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) throw new Error('Resend API key missing');

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Motion6 <onboarding@resend.dev>',
                to,
                subject,
                html,
            }),
        });

        return response.json();
    }
};
