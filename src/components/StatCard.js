import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

export default function StatCard({ name, value, trend, trendType, icon: Icon }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                    <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendType === 'up' ? 'text-primary bg-primary/10' : 'text-alert bg-alert/10'
                    }`}>
                    {trendType === 'up' ? <ArrowUpIcon className="w-3 h-3" /> : <ArrowDownIcon className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-500">{name}</h3>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </div>
        </div>
    );
}
