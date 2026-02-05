'use client';

import { useState } from 'react';
import LeadFinder from '@/components/LeadFinder';
import { useApp } from '@/context/AppContext';
import {
    MagnifyingGlassIcon,
    CircleStackIcon,
    UserPlusIcon,
    SparklesIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export default function LeadsPage() {
    const { leads, addLead, deleteLead, isLoaded } = useApp();
    const [activeTab, setActiveTab] = useState('prospecting'); // 'crm' or 'prospecting'
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({ name: '', email: '', company: '', position: 'Growth' });

    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCRMAdd = (e) => {
        e.preventDefault();
        addLead(newLead);
        setNewLead({ name: '', email: '', company: '', position: 'Growth' });
        setIsModalOpen(false);
    };

    const handleImportLead = (lead) => {
        addLead(lead);
    };

    if (!isLoaded) return <div className="animate-pulse space-y-8 pt-12 max-w-6xl mx-auto">
        <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
        <div className="h-48 bg-slate-50 rounded-[40px] w-full"></div>
    </div>;

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            {/* Header Area */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Prospecting Workspace</h1>
                    <p className="text-slate-500 font-medium">Find, enrich, and manage your high-fidelity leads.</p>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-[22px] border border-slate-200 shadow-inner">
                    <button
                        onClick={() => setActiveTab('prospecting')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'prospecting' ? 'bg-white text-primary shadow-lg shadow-primary/10' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <MagnifyingGlassIcon className="w-4 h-4" />
                        Find Leads
                    </button>
                    <button
                        onClick={() => setActiveTab('crm')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'crm' ? 'bg-white text-primary shadow-lg shadow-primary/10' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <CircleStackIcon className="w-4 h-4" />
                        CRM List
                    </button>
                </div>
            </div>

            {/* Content Tabs */}
            {activeTab === 'prospecting' ? (
                <LeadFinder onImport={handleImportLead} />
            ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* CRM Toolbar */}
                    <div className="flex gap-4">
                        <div className="flex-1 relative group">
                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search leads by name, email or company..."
                                className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                        >
                            <UserPlusIcon className="w-4 h-4" />
                            Add Prospect
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                        <div className="grid grid-cols-12 bg-slate-50/50 p-6 font-black text-slate-400 uppercase tracking-widest text-[10px] border-b border-slate-50">
                            <div className="col-span-5">Identity</div>
                            <div className="col-span-3">Performance Data</div>
                            <div className="col-span-2">Motion Status</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {filteredLeads.map((lead) => (
                                <div key={lead.id} className="grid grid-cols-12 p-6 items-center hover:bg-slate-50/50 transition-all group">
                                    <div className="col-span-5 flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            {lead.avatar || lead.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-lg italic tracking-tight group-hover:text-primary transition-colors cursor-pointer">{lead.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs font-bold text-slate-400">{lead.company}</span>
                                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{lead.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="text-xs font-bold text-slate-700">{lead.email}</p>
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">Direct Contact</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${lead.status === 'Enriched' ? 'bg-amber-50 text-amber-600' :
                                            lead.status === 'In Sequence' ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-slate-100 text-slate-400'
                                            }`}>
                                            {lead.status || 'New'}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button title="Spark Enrichment" className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-lg hover:shadow-primary/5 border border-transparent hover:border-slate-100">
                                            <SparklesIcon className="w-5 h-5 " />
                                        </button>
                                        <button
                                            onClick={() => deleteLead(lead.id)}
                                            className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredLeads.length === 0 && (
                                <div className="py-24 text-center">
                                    <CircleStackIcon className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                                    <p className="text-slate-400 font-black italic text-xl">Your CRM is empty. Time to hunt.</p>
                                    <button onClick={() => setActiveTab('prospecting')} className="text-primary font-black mt-4 uppercase tracking-widest text-xs hover:underline">Launch Lead Finder</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Simple Add Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 italic tracking-tight">Manual Prospect</h3>
                        <form onSubmit={handleCRMAdd} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    value={newLead.name}
                                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                    placeholder="e.g. David Miller"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={newLead.email}
                                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                    placeholder="david@company.com"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="py-4 bg-slate-50 text-slate-500 font-black rounded-2xl text-xs uppercase tracking-widest">Cancel</button>
                                <button type="submit" className="py-4 bg-primary text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-lg shadow-primary/20">Secure</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
