'use client';

import { useState } from 'react';
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
    PlusIcon,
    UserPlusIcon,
    SparklesIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

export default function LeadFinder({ onImport }) {
    const { apiSettings } = useApp();
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setHasSearched(true);

        // Simulation of Apollo Search
        setTimeout(() => {
            const mockResults = [
                { id: `res-${Date.now()}-1`, name: 'David Miller', company: query, email: `david@${query.toLowerCase().replace(/\s/g, '')}.com`, position: 'CTO' },
                { id: `res-${Date.now()}-2`, name: 'Emily White', company: query, email: `emily@${query.toLowerCase().replace(/\s/g, '')}.com`, position: 'VP Sales' },
                { id: `res-${Date.now()}-3`, name: 'Arjun Gupta', company: query, email: `arjun@${query.toLowerCase().replace(/\s/g, '')}.com`, position: 'Head of Product' },
            ];
            setResults(mockResults);
            setIsSearching(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="w-6 h-6 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by company domain or industry (e.g. stripe.com or AI SaaS)"
                        className="w-full bg-white border-2 border-slate-100 rounded-[32px] py-6 pl-16 pr-32 text-lg font-bold text-slate-900 shadow-xl shadow-slate-200/50 outline-none focus:border-primary/30 transition-all placeholder:text-slate-300"
                    />
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 text-white rounded-[24px] font-black text-sm hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSearching ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : 'FIND LEADS'}
                    </button>
                </form>
                {!apiSettings.apolloKey && (
                    <p className="text-center mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                        <SparklesIcon className="w-3 h-3 text-amber-500" />
                        Running on Motion Simulation Engine (Demo Mode)
                    </p>
                )}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(lead => (
                    <div key={lead.id} className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all group relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl font-black text-slate-400 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 italic tracking-tight">{lead.name}</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lead.position}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-500 mb-1">Company</p>
                                <p className="text-sm font-black text-slate-900">{lead.company}</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-500 mb-1">Email</p>
                                <p className="text-sm font-black text-slate-900 truncate">{lead.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onImport(lead)}
                            className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <PlusIcon className="w-4 h-4" />
                            IMPORT TO CRM
                        </button>
                    </div>
                ))}
            </div>

            {hasSearched && results.length === 0 && !isSearching && (
                <div className="py-20 text-center">
                    <MagnifyingGlassIcon className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold italic text-xl">No leads found for "{query}". Try a broader term.</p>
                </div>
            )}
        </div>
    );
}
