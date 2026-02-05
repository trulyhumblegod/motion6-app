'use client';

import { useState } from 'react';
import {
    UserPlusIcon,
    MagnifyingGlassIcon,
    CircleStackIcon,
    SparklesIcon,
    XMarkIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

export default function LeadsPage() {
    const { leads, addLead, deleteLead, isLoaded } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({ name: '', email: '', company: '', position: 'Marketing' });

    // Filter leads based on search query
    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newLead.name || !newLead.email) return;

        addLead({
            ...newLead,
            status: 'New',
            avatar: newLead.name.split(' ').map(n => n[0]).join('').toUpperCase()
        });
        setNewLead({ name: '', email: '', company: '', position: 'Marketing' });
        setIsModalOpen(false);
    };

    if (!isLoaded) return <div className="animate-pulse space-y-4 pt-12">
        <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
        <div className="h-48 bg-slate-50 rounded-3xl w-full"></div>
    </div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Leads</h1>
                    <p className="text-slate-500 font-medium">Manage and enrich your prospects with high velocity.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
                        <CircleStackIcon className="w-5 h-5" />
                        <span>Import CSV</span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <UserPlusIcon className="w-5 h-5" />
                        <span>Add Lead</span>
                    </button>
                </div>
            </div>

            {/* Add Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">New Prospect</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                <XMarkIcon className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <form onSubmit={handleAdd} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        required
                                        value={newLead.name}
                                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Business Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={newLead.email}
                                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Company</label>
                                    <input
                                        type="text"
                                        value={newLead.company}
                                        onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Position</label>
                                    <input
                                        type="text"
                                        value={newLead.position}
                                        onChange={(e) => setNewLead({ ...newLead, position: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 mt-4 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]"
                            >
                                Secure Lead
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search leads by name, email or company..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
                <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    Filters
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-sm">
                <div className="grid grid-cols-12 bg-slate-50/50 p-4 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    <div className="col-span-4 px-2">Lead Name</div>
                    <div className="col-span-3 px-2">Company</div>
                    <div className="col-span-2 px-2">Status</div>
                    <div className="col-span-3 px-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-slate-50">
                    {filteredLeads.map((lead) => (
                        <div key={lead.id} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/80 transition-colors group">
                            <div className="col-span-4 px-2 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-black text-primary">
                                    {lead.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{lead.name}</p>
                                    <p className="text-xs text-slate-400 font-medium">{lead.email}</p>
                                </div>
                            </div>
                            <div className="col-span-3 px-2">
                                <p className="font-bold text-slate-700">{lead.company}</p>
                                <p className="text-[11px] text-slate-400 font-black uppercase tracking-tight">{lead.position}</p>
                            </div>
                            <div className="col-span-2 px-2 text-[10px] font-black uppercase">
                                <span className={`px-2 py-1 rounded-full ${lead.status === 'Enriched' ? 'bg-indigo-50 text-primary' :
                                    lead.status === 'In Sequence' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-slate-100 text-slate-500'
                                    }`}>
                                    {lead.status}
                                </span>
                            </div>
                            <div className="col-span-3 px-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button title="Enrich with Apollo" className="p-1.5 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm">
                                    <SparklesIcon className="w-5 h-5 " />
                                </button>
                                <button
                                    onClick={() => deleteLead(lead.id)}
                                    className="p-1.5 text-slate-400 hover:text-alert hover:bg-rose-50 rounded-lg transition-all shadow-sm"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredLeads.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-slate-400 font-black italic">No leads matches your search criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
