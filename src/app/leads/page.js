import {
    UserPlusIcon,
    MagnifyingGlassIcon,
    CircleStackIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const leads = [
    { id: 1, name: 'Alice Freeman', company: 'TechFlow', position: 'CTO', email: 'alice@techflow.io', status: 'Enriched', avatar: 'AF' },
    { id: 2, name: 'Bob Richards', company: 'ScaleUp', position: 'VP Sales', email: 'bob@scaleup.com', status: 'New', avatar: 'BR' },
    { id: 3, name: 'Celia Murphy', company: 'Nova Labs', position: 'Marketing Director', email: 'celia@novalabs.co', status: 'Enriched', avatar: 'CM' },
    { id: 4, name: 'Daniel Craig', company: 'Everest OS', position: 'CEO', email: 'dan@everest.os', status: 'In Sequence', avatar: 'DC' },
];

export default function LeadsPage() {
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
                    <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <UserPlusIcon className="w-5 h-5" />
                        <span>Add Lead</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search leads by name, email or company..."
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                </div>
                <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
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
                    {leads.map((lead) => (
                        <div key={lead.id} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/80 transition-colors group">
                            <div className="col-span-4 px-2 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-primary">
                                    {lead.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer">{lead.name}</p>
                                    <p className="text-xs text-slate-400">{lead.email}</p>
                                </div>
                            </div>
                            <div className="col-span-3 px-2">
                                <p className="font-medium text-slate-700">{lead.company}</p>
                                <p className="text-xs text-slate-400">{lead.position}</p>
                            </div>
                            <div className="col-span-2 px-2 text-xs font-bold">
                                <span className={`px-2 py-1 rounded-full ${lead.status === 'Enriched' ? 'bg-indigo-50 text-primary' :
                                    lead.status === 'In Sequence' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-slate-100 text-slate-500'
                                    }`}>
                                    {lead.status}
                                </span>
                            </div>
                            <div className="col-span-3 px-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button title="Enrich with Apollo" className="p-1.5 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-all">
                                    <SparklesIcon className="w-5 h-5 " />
                                </button>
                                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-slate-300">
                                    Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
