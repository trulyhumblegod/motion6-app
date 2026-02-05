'use server';

export async function searchApolloLeads(query, apiKeyOverride = null) {
    const apiKey = apiKeyOverride || process.env.APOLLO_API_KEY;

    if (!apiKey) {
        return { success: false, error: 'missing_key' };
    }

    try {
        const response = await fetch('https://api.apollo.io/api/v1/mixed_people/api_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': apiKey,
            },
            body: JSON.stringify({
                q_organization_domains: query,
                page: 1,
                per_page: 6
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Apollo API Error:', response.status, errorText);
            return { success: false, error: 'api_error', details: errorText };
        }

        const data = await response.json();

        // Transform data to match our app's expected format
        const people = data.people?.map(person => ({
            id: person.id,
            name: `${person.first_name || ''} ${person.last_name || ''}`.trim() || 'Desconocido',
            company: person.organization?.name || query,
            email: person.email || 'Email no disponible',
            position: person.title || 'Desconocido',
            avatar: (person.first_name?.[0] || '') + (person.last_name?.[0] || '')
        })) || [];

        return { success: true, people };

    } catch (error) {
        console.error('Apollo Server Action Error:', error);
        return { success: false, error: 'server_error' };
    }
}
