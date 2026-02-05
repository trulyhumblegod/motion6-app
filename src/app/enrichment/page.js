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
        <div className="space-y-12 max-w-6xl mx-auto pb-24 px-4">
            <div className="flex flex-col items-center text-center space-y-6 pt-10">
                <div className="inline-flex items-center gap-3 bg-primary/5 text-primary border border-primary/20 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/5">
                    <SparklesIcon className="w-4 h-4" />
                    Neural Processing Unit Active
                </div>
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">
                    AI LABORATORY
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
                    Sculpting hyper-personalized outreach at light speed using high-inference Llama models.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Personalization Wizard */}
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative z-10 flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <BoltIcon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">Personalizer</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Single Lead Enrichment</p>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Target Prospect</label>
                            <select
                                value={selectedLeadId}
                                onChange={(e) => setSelectedLeadId(e.target.value)}
                                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[20px] font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-lg appearance-none cursor-pointer hover:bg-white"
                            >
                                <option value="">Choose a prospect...</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id}>{lead.name} — {lead.company}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={!selectedLeadId || isGenerating}
                            className="w-full py-6 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all disabled:opacity-20 active:scale-95 group-hover:tracking-wider duration-300"
                        >
                            {isGenerating ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <SparklesIcon className="w-6 h-6" />}
                            {isGenerating ? 'GENERATING MOTION...' : 'CRAFT ICEBREAKER'}
                        </button>
                    </div>

                    {currentIcebreaker && (
                        <div className="relative z-10 p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 animate-in zoom-in-95 duration-500 shadow-inner">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                                    <ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Neural Output</span>
                            </div>
                            <p className="text-xl font-black text-slate-800 leading-tight italic">
                                "{currentIcebreaker}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Visual Stats & Logic */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[40px] p-12 relative overflow-hidden flex flex-col h-[400px] justify-end text-white border border-slate-800 shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -ml-32 -mb-32" />

                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                                <CpuChipIcon className="w-10 h-10 text-primary" />
                            </div>
                            <h2 className="text-5xl font-black leading-[0.9] tracking-tighter italic">NEURAL ENGINE</h2>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                Running on <span className="text-white font-black underline decoration-primary decoration-4 underline-offset-4">Llama 3.3 70B</span>. Processing personalization at ~250 tokens/sec.
                            </p>
                        </div>
                    </div>

                    {/* Diagnostic Mini-Card */}
                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg flex items-center justify-between group">
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${testStatus === 'success' ? 'bg-emerald-50 text-emerald-500 rotate-12' :
                                testStatus === 'error' ? 'bg-rose-50 text-rose-500 -rotate-12' :
                                    'bg-slate-50 text-slate-300'
                                }`}>
                                {testStatus === 'success' ? <CheckCircleIcon className="w-8 h-8" /> :
                                    testStatus === 'error' ? <XCircleIcon className="w-8 h-8" /> :
                                        <FireIcon className="w-8 h-8" />}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 italic tracking-tight">Core Connectivity</h4>
                                <p className="text-xs text-slate-400 font-medium">
                                    {testStatus === 'loading' ? 'Syncing with Groq...' :
                                        statusMessage || 'Diagnostic ready.'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={runApiTest}
                            className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all active:scale-90"
                        >
                            <ArrowPathIcon className={`w-6 h-6 ${testStatus === 'loading' ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
