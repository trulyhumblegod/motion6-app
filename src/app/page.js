import StatCard from "@/components/StatCard";
import {
  EnvelopeIcon,
  CursorArrowRaysIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Emails Sent', value: '1,284', trend: '12%', trendType: 'up', icon: EnvelopeIcon },
  { name: 'Open Rate', value: '64.2%', trend: '4.3%', trendType: 'up', icon: CursorArrowRaysIcon },
  { name: 'Reply Rate', value: '18.5%', trend: '2.1%', trendType: 'down', icon: ChatBubbleLeftRightIcon },
  { name: 'Opportunities', value: '42', trend: '8%', trendType: 'up', icon: UserPlusIcon },
];

const activity = [
  { id: 1, user: 'Sarah Jenkins', action: 'opened an email', campaign: 'Outreach Q1', time: '2 mins ago' },
  { id: 2, user: 'Michael Scott', action: 'replied to sequence', campaign: 'Enterprise Sales', time: '15 mins ago' },
  { id: 3, user: 'Dwight Schrute', action: 'clicked a link', campaign: 'Paper Sales Lead', time: '1 hour ago' },
  { id: 4, user: 'Pam Beesly', action: 'added to campaign', campaign: 'Product Design', time: '3 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Dashboard</h1>
        <p className="text-slate-500 font-medium">Welcome back, let's initiate some motion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Outreach Performance</h3>
              <select className="bg-slate-50 border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="h-64 flex items-end gap-2 px-2 pb-2 border-b border-l border-slate-100">
              {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                <div key={i} className="flex-1 bg-primary/10 rounded-t-lg relative group transition-all duration-300 hover:bg-primary/20">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border border-slate-200 shadow-xl text-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-black">
                    {height * 10} emails
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day} className="text-xs font-medium text-slate-400">{day}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Active Campaigns</h3>
              <button className="text-primary text-sm font-semibold hover:underline">View all</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[1, 2, 3].map((c) => (
                <div key={c} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <EnvelopeIcon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">Campaign {c}: Growth Hackers</h4>
                      <p className="text-xs text-slate-500">Started 2 days ago • 142 leads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-500">65% opened</p>
                      <p className="text-[10px] text-slate-400">Target: 70%</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                      <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {activity.map((item) => (
                <div key={item.id} className="flex gap-4 group cursor-pointer">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-slate-200 transition-colors">
                      {item.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-slate-100 flex items-center justify-center shadow-sm">
                      <CursorArrowRaysIcon className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600">
                      <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.campaign} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2.5 text-sm font-semibold text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all active:scale-[0.98]">
              Load more activity
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-xl shadow-primary/5 text-slate-900 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="font-black text-xl mb-3 relative z-10 italic tracking-tighter">Velocity Pro</h3>
            <p className="text-slate-500 text-sm mb-6 relative z-10 leading-relaxed">Unlock unlimited light-speed enrichments and AI tokens.</p>
            <button className="w-full py-4 bg-primary text-white font-black rounded-2xl text-sm relative z-10 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
