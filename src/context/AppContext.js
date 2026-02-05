'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [leads, setLeads] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [senderProfiles, setSenderProfiles] = useState([]);
    const [apiSettings, setApiSettings] = useState({
        apolloKey: '',
        groqKey: '',
        resendKey: ''
    });
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial load from localStorage
    useEffect(() => {
        const savedLeads = localStorage.getItem('motion6_leads');
        const savedCampaigns = localStorage.getItem('motion6_campaigns');
        const savedProfiles = localStorage.getItem('motion6_profiles');
        const savedApiSettings = localStorage.getItem('motion6_settings');

        if (savedLeads) setLeads(JSON.parse(savedLeads));
        else {
            const defaultLeads = [
                { id: 1, name: 'Alex Rivera', company: 'NextGen SaaS', email: 'alex@nextgen.io', position: 'CEO', avatar: 'AR' },
                { id: 2, name: 'Sarah Chen', company: 'Flow State', email: 'sarah@flowstate.ai', position: 'Growth Lead', avatar: 'SC' }
            ];
            setLeads(defaultLeads);
        }

        if (savedCampaigns) setCampaigns(JSON.parse(savedCampaigns));
        else {
            const defaultCampaigns = [
                {
                    id: 1,
                    name: 'Enterprise Reach - Q1',
                    status: 'Running',
                    leadsCount: 842,
                    sent: 412,
                    opens: 68,
                    sequence: [
                        { type: 'email', name: 'Initial Touch', delay: 0 },
                        { type: 'linkedin_view', name: 'Profile View', delay: 1 },
                        { type: 'email', name: 'Follow up', delay: 3 }
                    ]
                }
            ];
            setCampaigns(defaultCampaigns);
        }

        if (savedProfiles) setSenderProfiles(JSON.parse(savedProfiles));
        else {
            const defaultProfiles = [
                { id: 1, name: 'John Doe', email: 'john@motion6.app', signature: 'Best, John', default: true }
            ];
            setSenderProfiles(defaultProfiles);
        }

        if (savedApiSettings) setApiSettings(JSON.parse(savedApiSettings));

        setIsLoaded(true);
    }, []);

    // Persistence Effects
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('motion6_leads', JSON.stringify(leads));
            localStorage.setItem('motion6_campaigns', JSON.stringify(campaigns));
            localStorage.setItem('motion6_profiles', JSON.stringify(senderProfiles));
            localStorage.setItem('motion6_settings', JSON.stringify(apiSettings));
        }
    }, [leads, campaigns, senderProfiles, apiSettings, isLoaded]);

    const addLead = (lead) => {
        const newLead = { ...lead, id: Date.now(), avatar: lead.name.split(' ').map(n => n[0]).join('') };
        setLeads(prev => [newLead, ...prev]);
    };

    const addCampaign = (campaignData) => {
        const newCampaign = {
            id: Date.now(),
            name: campaignData.name || 'Untitled Campaign',
            status: 'Draft',
            leadsCount: campaignData.leads?.length || 0,
            sent: 0,
            opens: 0,
            sequence: campaignData.sequence || [],
            settings: campaignData.settings || {},
            created: new Date().toISOString()
        };
        setCampaigns(prev => [newCampaign, ...prev]);
        return newCampaign;
    };

    const deleteLead = (id) => setLeads(prev => prev.filter(l => l.id !== id));
    const deleteCampaign = (id) => setCampaigns(prev => prev.filter(c => c.id !== id));

    const updateCampaign = (id, updates) => {
        setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const updateApiSettings = (settings) => {
        setApiSettings(prev => ({ ...prev, ...settings }));
    };

    const addSenderProfile = (profile) => {
        setSenderProfiles(prev => [...prev, { ...profile, id: Date.now() }]);
    };

    const updateLeadIcebreaker = (id, icebreaker) => {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, icebreaker } : l));
    };

    return (
        <AppContext.Provider value={{
            leads,
            campaigns,
            senderProfiles,
            apiSettings,
            isLoaded,
            addLead,
            addCampaign,
            deleteLead,
            deleteCampaign,
            updateCampaign,
            updateApiSettings,
            addSenderProfile,
            updateLeadIcebreaker
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
