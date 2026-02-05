'use client';

import { useState } from 'react';
import {
    PlusIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
    EllipsisVerticalIcon,
    PlayIcon,
    PauseIcon,
    XMarkIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

import CampaignWizard from '@/components/CampaignWizard';

export default function CampaignsPage() {
    const { campaigns, deleteCampaign, isLoaded } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isLoaded) return <div className="animate-pulse flex space-y-4 flex-col pt-12">
        <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
        <div className="h-64 bg-slate-50 rounded-3xl w-full"></div>
    </div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">Campaigns</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor your motion sequences.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Create Campaign</span>
                </button>
            </div>

            {/* Campaign Wizard Overlay */}
            {isModalOpen && (
                <CampaignWizard onClose={() => setIsModalOpen(false)} />
            )}

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:border-slate-300">
                            <FunnelIcon className="w-3.5 h-3.5" />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:border-slate-300">
                            <ArrowsUpDownIcon className="w-3.5 h-3.5" />
                            Sort
                        </button>
                    </div>
                    <div className="text-xs font-medium text-slate-400 font-black">
                        {campaigns.length} CAMPAIGNS TOTAL
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="px-6 py-4">Campaign Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Leads</th>
                                <th className="px-6 py-4">Engagement</th>
                                <th className="px-6 py-4">Created</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${campaign.status === 'Running' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                                                <PlayIcon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{campaign.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${campaign.status === 'Running' ? 'bg-emerald-50 text-emerald-600' :
                                            campaign.status === 'Paused' ? 'bg-amber-50 text-amber-600' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                            {campaign.status || 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-slate-600 truncate max-w-[80px]">{campaign.leadsCount || 0}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Open</p>
                                                <p className="text-sm font-bold text-slate-700">{campaign.opens || 0}%</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Reply</p>
                                                <p className="text-sm font-bold text-slate-700">{campaign.replies || 0}%</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-400 uppercase italic text-[11px] truncate max-w-[100px]">{campaign.created}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all shadow-sm">
                                                {campaign.status === 'Running' ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={() => deleteCampaign(campaign.id)}
                                                className="p-1.5 text-slate-400 hover:text-alert hover:bg-rose-50 rounded-lg transition-all shadow-sm"
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
                        <div className="py-20 text-center space-y-4">
                            <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <PlusIcon className="w-10 h-10 text-slate-200" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight italic">No Campaigns active.</h3>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="text-primary font-bold hover:underline"
                            >
                                Let's build your first sequence
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
