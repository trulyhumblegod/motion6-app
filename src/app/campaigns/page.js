import {
    PlusIcon,
    FunnelIcon,
    ArrowsUpDownIcon,
    EllipsisVerticalIcon,
    PlayIcon,
    PauseIcon
} from '@heroicons/react/24/outline';

const campaigns = [
    { id: 1, name: 'Growth Hackers Outreach', status: 'Running', leads: 450, opened: '64%', replied: '12%', created: 'Jan 12, 2026' },
    { id: 2, name: 'Enterprise Sales Q1', status: 'Paused', leads: 1200, opened: '52%', replied: '8%', created: 'Jan 15, 2026' },
    { id: 3, name: 'Product Launch Beta', status: 'Draft', leads: 0, opened: '0%', replied: '0%', created: 'Feb 1, 2026' },
    { id: 4, name: 'SEO Agencies Hunt', status: 'Running', leads: 820, opened: '71%', replied: '15%', created: 'Feb 4, 2026' },
];

export default function CampaignsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Campaigns</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor your motion sequences.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0">
                    <PlusIcon className="w-5 h-5" />
                    <span>Create Campaign</span>
                </button>
            </div>

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
                    <div className="text-xs font-medium text-slate-400">
                        Showing {campaigns.length} campaigns
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
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <PlayIcon className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{campaign.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${campaign.status === 'Running' ? 'bg-emerald-50 text-emerald-600' :
                                            campaign.status === 'Paused' ? 'bg-amber-50 text-amber-600' :
                                                'bg-slate-100 text-slate-600'
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{campaign.leads}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Open</p>
                                                <p className="text-sm font-bold text-slate-700">{campaign.opened}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Reply</p>
                                                <p className="text-sm font-bold text-slate-700">{campaign.replied}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{campaign.created}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all">
                                                {campaign.status === 'Running' ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                                                <EllipsisVerticalIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
