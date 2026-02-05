'use client';

import { useState } from 'react';
import LeadFinder from '@/components/LeadFinder';
import { useApp } from '@/context/AppContext';
import {
    MagnifyingGlassIcon,
    CircleStackIcon,
    UserPlusIcon,
    SparklesIcon,
    TrashIcon,
    DocumentArrowUpIcon,
    TableCellsIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function LeadsPage() {
    const { leads, addLead, deleteLead, isLoaded } = useApp();
    const [activeTab, setActiveTab] = useState('prospecting'); // 'crm' or 'prospecting'
    const [importSource, setImportSource] = useState('apollo'); // 'apollo', 'csv', 'paste'
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pasteData, setPasteData] = useState('');
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

    const handlePasteImport = () => {
        const lines = pasteData.split('\n').filter(l => l.trim() && l.includes('@'));
        lines.forEach(line => {
            const email = line.trim();
            addLead({ name: email.split('@')[0], email, company: 'Imported', position: 'Lead' });
        });
        setPasteData('');
        setActiveTab('crm');
    };

    const handleCsvSimulate = () => {
        // Simulate CSV parsing
        const mockCsvLeads = [
            { name: 'Sarah Miller', email: 'sarah@stripe.com', company: 'Stripe', position: 'Product Lead' },
            { name: 'James Wilson', email: 'j.wilson@vercel.com', company: 'Vercel', position: 'CTO' },
            { name: 'Elena Rodriguez', email: 'elena@airbnb.com', company: 'Airbnb', position: 'Head of Growth' }
        ];
        mockCsvLeads.forEach(l => addLead(l));
        alert('Importación CSV Simulada: 3 leads añadidos al CRM.');
        setActiveTab('crm');
    };

    if (!isLoaded) return <div className="animate-pulse space-y-8 pt-12 max-w-6xl mx-auto">
        <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
        <div className="h-48 bg-slate-50 rounded-[40px] w-full"></div>
    </div>;

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20 px-4">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10">
                <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic leading-none">
                        CENTRO DE PROSPECCIÓN
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Encuentra, enriquece y gestiona tus prospectos de alta fidelidad.</p>
                </div>
                <div className="flex bg-slate-100 p-1.5 rounded-[22px] border border-slate-200 shadow-inner">
                    <button
                        onClick={() => setActiveTab('prospecting')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'prospecting' ? 'bg-white text-primary shadow-lg shadow-primary/10' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <MagnifyingGlassIcon className="w-4 h-4" />
                        Capturar Lead
                    </button>
                    <button
                        onClick={() => setActiveTab('crm')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'crm' ? 'bg-white text-primary shadow-lg shadow-primary/10' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <CircleStackIcon className="w-4 h-4" />
                        Inteligencia CRM
                    </button>
                    <div className="relative flex items-center px-4 ml-2 border-l border-slate-200">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {leads.length} GUARDADOS
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            {activeTab === 'prospecting' ? (
                <div className="space-y-10 animate-in fade-in duration-500">
                    {/* Import Source Selector */}
                    {/* Import Source Selector */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={() => setImportSource('apollo')}
                            className={`p-8 rounded-[32px] border-2 text-left transition-all group ${importSource === 'apollo' ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform mb-6">
                                <MagnifyingGlassIcon className={`w-7 h-7 ${importSource === 'apollo' ? 'text-primary' : ''}`} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Apollo Global</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Buscador de Leads</p>
                        </button>

                        <button
                            onClick={() => setImportSource('csv')}
                            className={`p-8 rounded-[32px] border-2 text-left transition-all group ${importSource === 'csv' ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform mb-6">
                                <DocumentArrowUpIcon className={`w-7 h-7 ${importSource === 'csv' ? 'text-primary' : ''}`} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Bóveda CSV</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Subir Archivo</p>
                        </button>

                        <button
                            onClick={() => setImportSource('paste')}
                            className={`p-8 rounded-[32px] border-2 text-left transition-all group ${importSource === 'paste' ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform mb-6">
                                <TableCellsIcon className={`w-7 h-7 ${importSource === 'paste' ? 'text-primary' : ''}`} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 italic tracking-tight">Inyección Directa</h3>
                            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Pegar Emails</p>
                        </button>
                    </div>

                    {/* Active Source Area */}
                    <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50">
                        {importSource === 'apollo' && <LeadFinder onImport={handleImportLead} />}

                        {importSource === 'csv' && (
                            <div className="py-20 flex flex-col items-center text-center space-y-8">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 animate-bounce">
                                    <DocumentArrowUpIcon className="w-12 h-12" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">Subir Datos CSV</h3>
                                    <p className="text-slate-500 font-medium max-w-sm mx-auto mt-2">Exporta desde LinkedIn o Apollo y suelta aquí para ingestar al CRM.</p>
                                </div>
                                <button
                                    onClick={handleCsvSimulate}
                                    className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg hover:bg-primary shadow-xl shadow-primary/20 transition-all active:scale-95"
                                >
                                    SELECCIONAR ARCHIVO
                                </button>
                            </div>
                        )}

                        {importSource === 'paste' && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">Inyección Directa</h3>
                                        <p className="text-slate-500 font-medium">Pega una lista de correos (uno por línea) para importación veloz.</p>
                                    </div>
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                                        <TableCellsIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <textarea
                                    rows={8}
                                    value={pasteData}
                                    onChange={(e) => setPasteData(e.target.value)}
                                    className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[32px] font-bold text-slate-900 outline-none focus:border-primary/30 transition-all placeholder:text-slate-200 text-lg"
                                    placeholder="alex@example.com&#10;sarah@company.io&#10;..."
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handlePasteImport}
                                        disabled={!pasteData.trim()}
                                        className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-[24px] font-black text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-20 translate-y-4"
                                    >
                                        INYECTAR LEADS <ArrowRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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
                                placeholder="Buscar leads por nombre, email o empresa..."
                                className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:shadow-xl hover:bg-primary transition-all active:scale-95"
                        >
                            <UserPlusIcon className="w-4 h-4" />
                            Entrada Manual
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                        <div className="grid grid-cols-12 bg-slate-50/50 p-6 font-black text-slate-400 uppercase tracking-widest text-[10px] border-b border-slate-50">
                            <div className="col-span-5">Identidad</div>
                            <div className="col-span-3">Datos de Rendimiento</div>
                            <div className="col-span-2">Estado Motion</div>
                            <div className="col-span-2 text-right">Acciones</div>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {filteredLeads.map((lead) => (
                                <div key={lead.id} className="grid grid-cols-12 p-6 items-center hover:bg-slate-50/50 transition-all group">
                                    <div className="col-span-5 flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            {lead.avatar || lead.name?.split(' ').map(n => n[0]).join('')}
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
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1 italic">{lead.icebreaker ? '🧠 Enriquecido' : 'Contacto Directo'}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${lead.status === 'Enriched' || lead.icebreaker ? 'bg-amber-50 text-amber-600' :
                                            lead.status === 'In Sequence' ? 'bg-emerald-50 text-emerald-600' :
                                                'bg-slate-100 text-slate-400'
                                            }`}>
                                            {lead.icebreaker ? 'Enriquecido' : (lead.status || 'Nuevo')}
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
                                    <p className="text-slate-400 font-black italic text-xl">Tu CRM está vacío. Hora de cazar.</p>
                                    <button onClick={() => setActiveTab('prospecting')} className="text-primary font-black mt-4 uppercase tracking-widest text-xs hover:underline">Abrir Buscador</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Simple Add Lead Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[40px] w-full max-w-sm p-10 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                        <h3 className="text-3xl font-black text-slate-900 mb-6 italic tracking-tight">Prospecto Manual</h3>
                        <form onSubmit={handleCRMAdd} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Nombre Completo</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    value={newLead.name}
                                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                    placeholder="ej. David Miller"
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Correo Electrónico</label>
                                <input
                                    required
                                    type="email"
                                    value={newLead.email}
                                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                    placeholder="david@company.com"
                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="py-5 bg-slate-50 text-slate-500 font-black rounded-2xl text-[10px] uppercase tracking-widest">Cancelar</button>
                                <button type="submit" className="py-5 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/20">Asegurar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
