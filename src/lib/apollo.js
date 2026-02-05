export const apolloClient = {
    async searchLeads(query) {
        const apiKey = process.env.APOLLO_API_KEY;
        if (!apiKey) throw new Error('Apollo API key missing');

        const response = await fetch('https://api.apollo.io/v1/mixed_people/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': apiKey,
            },
            body: JSON.stringify({ q_organization_domains: query }),
        });

        return response.json();
    },

    async enrichLead(email) {
        const apiKey = process.env.APOLLO_API_KEY;
        const response = await fetch(`https://api.apollo.io/v1/people/match?email=${email}`, {
            headers: { 'X-Api-Key': apiKey },
        });
        return response.json();
    }
};
