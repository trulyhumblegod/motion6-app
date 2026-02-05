'use client';

import StatCard from "@/components/StatCard";
import {
  EnvelopeIcon,
  CursorArrowRaysIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useApp } from "@/context/AppContext";
import Link from 'next/link';

export default function Dashboard() {
  const { leads, campaigns, isLoaded } = useApp();

  const stats = [
    { name: 'Total leads', value: leads.length.toString(), trend: '+5%', trendType: 'up', icon: UserPlusIcon },
    { name: 'Active Campaigns', value: campaigns.length.toString(), trend: '+2', trendType: 'up', icon: RocketLaunchIcon },
    { name: 'Enrichment Credits', value: '450', trend: '85%', trendType: 'up', icon: SparklesIcon },
    { name: 'Replied Today', value: '12', trend: '2.1%', trendType: 'down', icon: ChatBubbleLeftRightIcon },
  ];

  if (!isLoaded) return <div className="animate-pulse space-y-8 pt-12">
    <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
    <div className="grid grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-slate-50 rounded-2xl"></div>)}
    </div>
  </div>;

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
              <Link href="/campaigns" className="text-primary text-sm font-bold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-slate-50">
              {campaigns.slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <EnvelopeIcon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{campaign.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{campaign.status} • {campaign.leadsCount || 0} leads</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-black text-emerald-500">{campaign.opens || 0}% opened</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">REALTIME</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-sm">
                      <EllipsisHorizontalIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {campaigns.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-slate-400 font-bold italic">No active campaigns.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {leads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="flex gap-4 group cursor-pointer">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 group-hover:bg-slate-200 transition-colors">
                      {lead.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-slate-100 flex items-center justify-center shadow-sm">
                      <CursorArrowRaysIcon className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 font-medium">
                      <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{lead.name}</span> detected at {lead.company}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-bold uppercase tracking-widest">Enrichment Ready</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-xl shadow-primary/5 text-slate-900 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="font-black text-xl mb-3 relative z-10 italic tracking-tighter">Velocity Pro</h3>
            <p className="text-slate-500 text-sm mb-6 relative z-10 leading-relaxed font-medium">Unlock unlimited light-speed enrichments and AI tokens.</p>
            <button className="w-full py-4 bg-primary text-white font-black rounded-2xl text-sm relative z-10 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
