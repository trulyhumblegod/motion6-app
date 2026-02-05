'use client';

import { useState } from 'react';
import {
    PlusIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
    EllipsisHorizontalIcon,
    PlayIcon,
    PauseIcon,
    XMarkIcon,
    TrashIcon,
    RocketLaunchIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

import CampaignWizard from '@/components/CampaignWizard';

export default function CampaignsPage() {
    const { campaigns, deleteCampaign, isLoaded } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isLoaded) return (
        <div className="animate-pulse space-y-12 pt-12">
            <div className="h-12 bg-slate-100 rounded-2xl w-64"></div>
            <div className="h-96 bg-white border border-slate-100 rounded-[48px] w-full"></div>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">WAVES</h1>
                    <p className="text-slate-500 font-medium text-lg mt-3">Active motion sequences and deployment logs.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                >
                    <PlusIcon className="w-6 h-6" />
                    <span>LAUNCH NEW WAVE</span>
                </button>
            </div>

            {/* Campaign Wizard Overlay */}
            {isModalOpen && (
                <CampaignWizard onClose={() => setIsModalOpen(false)} />
            )}

            <div className="bg-white rounded-[48px] border-2 border-slate-50 shadow-2xl shadow-slate-200/30 overflow-hidden">
                <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                            <FunnelIcon className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                            <ArrowsUpDownIcon className="w-4 h-4" />
                            Sort
                        </button>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-6">
                        {campaigns.length} OPERATIONAL WAVES
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest px-8">
                                <th className="px-10 py-6">Wave Identifier</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6">Force</th>
                                <th className="px-10 py-6">Resonance</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-slate-50/50 transition-all group cursor-pointer">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${campaign.status === 'Running' ? 'bg-emerald-50 border-emerald-100 text-emerald-500' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                                                <RocketLaunchIcon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <span className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors italic tracking-tight">{campaign.name}</span>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">UUID: {campaign.id.toString().substring(0, 8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${campaign.status === 'Running' ? 'bg-emerald-50 text-emerald-600' :
                                            campaign.status === 'Paused' ? 'bg-amber-50 text-amber-600' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                            {campaign.status || 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-slate-900 italic leading-none">{campaign.leadsCount || 0}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mt-1">LEADS LOADED</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">OPEN</p>
                                                <p className="text-xl font-black text-slate-900 italic">{campaign.opens || 0}%</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">REPLY</p>
                                                <p className="text-xl font-black text-slate-900 italic">{campaign.replies || 0}%</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-50 text-slate-400 hover:text-primary hover:border-primary/20 rounded-xl transition-all shadow-sm">
                                                {campaign.status === 'Running' ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteCampaign(campaign.id); }}
                                                className="w-12 h-12 flex items-center justify-center bg-white border-2 border-slate-50 text-slate-400 hover:text-rose-500 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {campaigns.length === 0 && (
                        <div className="py-32 text-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 text-slate-200">
                                <RocketLaunchIcon className="w-12 h-12" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 italic tracking-tight italic">No waves detected in the system.</h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-6 text-primary font-black uppercase tracking-widest text-xs hover:underline flex items-center gap-2 mx-auto"
                            >
                                INITIATE FIRST SEQUENCE <ArrowRightIcon className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
