'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [leads, setLeads] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedLeads = localStorage.getItem('motion6_leads');
        const savedCampaigns = localStorage.getItem('motion6_campaigns');

        if (savedLeads) setLeads(JSON.parse(savedLeads));
        else {
            // Default mock leads
            const defaultLeads = [
                { id: 1, name: 'John Doe', company: 'TechCorp', email: 'john@techcorp.com', status: 'Active', icebreaker: '' },
                { id: 2, name: 'Jane Smith', company: 'Designly', email: 'jane@designly.io', status: 'Paused', icebreaker: '' }
            ];
            setLeads(defaultLeads);
            localStorage.setItem('motion6_leads', JSON.stringify(defaultLeads));
        }

        if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
        else {
            // Default mock campaigns
            const defaultCampaigns = [
                { id: 1, name: 'Q1 Outreach', leadsCount: 450, status: 'Running', sent: 120, opens: 85 },
                { id: 2, name: 'LinkedIn Followup', leadsCount: 120, status: 'Draft', sent: 0, opens: 0 }
            ];
            setCampaigns(defaultCampaigns);
            localStorage.setItem('motion6_campaigns', JSON.stringify(defaultCampaigns));
        }

        setIsLoaded(true);
    }, []);

    // Persistence Effect
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('motion6_leads', JSON.stringify(leads));
        }
    }, [leads, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('motion6_campaigns', JSON.stringify(campaigns));
        }
    }, [campaigns, isLoaded]);

    const addLead = (lead) => {
        const newLead = { ...lead, id: Date.now() };
        setLeads(prev => [newLead, ...prev]);
    };

    const addCampaign = (campaign) => {
        const newCampaign = {
            ...campaign,
            id: Date.now(),
            leadsCount: 0,
            status: 'Draft',
            sent: 0,
            opens: 0
        };
        setCampaigns(prev => [newCampaign, ...prev]);
    };

    const deleteLead = (id) => setLeads(prev => prev.filter(l => l.id !== id));
    const deleteCampaign = (id) => setCampaigns(prev => prev.filter(c => c.id !== id));

    const updateLeadIcebreaker = (id, icebreaker) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, icebreaker } : l));
    };

    return (
        <AppContext.Provider value={{
            leads,
            campaigns,
            addLead,
            addCampaign,
            deleteLead,
            deleteCampaign,
            updateLeadIcebreaker,
            isLoaded
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
