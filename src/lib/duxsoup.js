export const duxSoupClient = {
    async triggerLinkedInAction(profileUrl, actionType) {
        const apiKey = process.env.DUXSOUP_API_KEY;
        if (!apiKey) throw new Error('Dux-Soup API key missing');

        const response = await fetch('https://api.dux-soup.com/v1/remote-control', {
            method: 'POST',
            headers: {
                'X-Dux-Soup-Key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: actionType, // e.g., 'visit', 'connect', 'message'
                params: {
                    profile: profileUrl,
                    message: 'Hi, I noticed your profile...'
                }
            }),
        });

        return response.json();
    }
};
