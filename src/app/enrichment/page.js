'use client';

import { useState } from 'react';
import {
    SparklesIcon,
    BoltIcon,
    CpuChipIcon,
    FireIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { testGroqConnection } from '@/app/actions/testApi';

export default function EnrichmentPage() {
    const [testStatus, setTestStatus] = useState(null); // 'loading', 'success', 'error'
    const [statusMessage, setStatusMessage] = useState('');

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

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    <SparklesIcon className="w-4 h-4" />
                    Motion Intelligence Lab
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">AI Lab</h1>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                        <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                            <BoltIcon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">Automated Icebreakers</h3>
                        <p className="text-base text-slate-500 mb-8 leading-relaxed">Scan LinkedIn profiles and website data to generate unique opening lines for every lead.</p>
                        <button className="w-full py-4 bg-primary text-white rounded-2xl font-black hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95">
                            Configure Workflow
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                            <FireIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-3">Pain Point Analysis</h3>
                        <p className="text-base text-slate-500 mb-8 leading-relaxed">Let the AI analyze company recent news and job posts to identify their current challenges.</p>
                        <button className="w-full py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all duration-300 active:scale-95">
                            Start Analysis
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-40 -mt-40" />
                    <div className="relative z-10 space-y-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <CpuChipIcon className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 leading-tight tracking-tighter italic">Motion Intelligence</h2>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            We leverage lightning-fast inference to process lead data in milliseconds, allowing you to personalize thousands of emails in minutes.
                        </p>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-200" />
                                LinkedIn Sync Active
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-700">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-200" />
                                Apollo Enrichment Connected
                            </div>
                        </div>
                        <button className="mt-8 w-full py-4 text-white bg-primary rounded-2xl font-black hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95">
                            Optimize Performance
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
