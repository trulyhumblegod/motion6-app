'use client';

import { useState } from 'react';
import {
    SparklesIcon,
    BoltIcon,
    CpuChipIcon,
    FireIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
    UserIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { testGroqConnection } from '@/app/actions/testApi';
import { generateLeadIcebreaker } from '@/app/actions/personalize';
import { useApp } from '@/context/AppContext';

export default function EnrichmentPage() {
    const { leads, updateLeadIcebreaker, isLoaded } = useApp();
    const [testStatus, setTestStatus] = useState(null); // 'loading', 'success', 'error'
    const [statusMessage, setStatusMessage] = useState('');

    // Personalization Wizard State
    const [selectedLeadId, setSelectedLeadId] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentIcebreaker, setCurrentIcebreaker] = useState('');

    const runApiTest = async () => {
        setTestStatus('loading');
        try {
            const result = await testGroqConnection();
            if (result.success) {
                setTestStatus('success');
                setStatusMessage('System Online: Groq AI Connected.');
            } else {
                setTestStatus('error');
                setStatusMessage(result.message);
            }
        } catch (error) {
            setTestStatus('error');
            setStatusMessage('Connection failed: Check Vercel logs.');
        }
    };

    const handleGenerate = async () => {
        const lead = leads.find(l => l.id.toString() === selectedLeadId);
        if (!lead) return;

        setIsGenerating(true);
        setCurrentIcebreaker('');

        try {
            const result = await generateLeadIcebreaker(lead);
            if (result.success) {
                setCurrentIcebreaker(result.icebreaker);
                updateLeadIcebreaker(lead.id, result.icebreaker);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert('AI Generation Failed.');
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isLoaded) return <div className="animate-pulse pt-20 flex flex-col items-center">
        <div className="h-12 bg-slate-100 rounded-full w-64 mb-4"></div>
        <div className="h-4 bg-slate-50 rounded-full w-96"></div>
    </div>;

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <SparklesIcon className="w-4 h-4" />
                    Motion Intelligence Lab
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">AI Lab</h1>
                <p className="text-slate-500 text-lg font-medium">Generate hyper-personalized icebreakers at light speed.</p>
            </div>

            {/* Diagnostic Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${testStatus === 'success' ? 'bg-emerald-50 text-emerald-500' :
                        testStatus === 'error' ? 'bg-rose-50 text-rose-500' :
                            'bg-slate-50 text-slate-400'
                        }`}>
                        {testStatus === 'success' ? <CheckCircleIcon className="w-7 h-7" /> :
                            testStatus === 'error' ? <XCircleIcon className="w-7 h-7" /> :
                                <CpuChipIcon className="w-7 h-7" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">API Connectivity Status</h4>
                        <p className="text-sm text-slate-500 font-medium">
                            {testStatus === 'loading' ? 'Verifying system links...' :
                                statusMessage || 'Integrate your keys to start generating.'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={runApiTest}
                    disabled={testStatus === 'loading'}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                >
                    {testStatus === 'loading' && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
                    Test Connectivity
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                {/* Personalization Wizard */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <BoltIcon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">Personalization Wizard</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Select Lead to Personalize</label>
                            <select
                                value={selectedLeadId}
                                onChange={(e) => setSelectedLeadId(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            >
                                <option value="">Choose a prospect...</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id}>{lead.name} ({lead.company})</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={!selectedLeadId || isGenerating}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all disabled:opacity-30 active:scale-95"
                        >
                            {isGenerating ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5" />}
                            {isGenerating ? 'GENERATE IN PROGRESS...' : 'GENERATE ICEBREAKER'}
                        </button>
                    </div>

                    {currentIcebreaker && (
                        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-center gap-2 mb-3">
                                <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-emerald-600" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase">AI-Generated Result</span>
                            </div>
                            <p className="text-sm font-bold text-slate-800 leading-relaxed italic">
                                "{currentIcebreaker}"
                            </p>
                        </div>
                    )}
                </div>

                <div className="bg-slate-900 rounded-3xl p-10 relative overflow-hidden flex flex-col justify-center text-white">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -mr-40 -mt-40" />
                    <div className="relative z-10 space-y-8">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                            <CpuChipIcon className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-4xl font-black leading-tight tracking-tighter italic">Motion Intelligence</h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-medium">
                            We leverage lightning-fast <span className="text-white font-bold">Llama 3.3</span> inference on Groq to process lead data in milliseconds.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-sm font-bold">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                                LinkedIn Sync Active
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                                Apollo Enrichment Connected
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
