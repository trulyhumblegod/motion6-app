'use client';

import StatCard from "@/components/StatCard";
import {
  EnvelopeIcon,
  CursorArrowRaysIcon,
  ChatBubbleLeftRightIcon,
  UserPlusIcon,
  EllipsisHorizontalIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useApp } from "@/context/AppContext";
import Link from 'next/link';

export default function Dashboard() {
  const { leads, campaigns, isLoaded } = useApp();

  const stats = [
    { name: 'Motion Force', value: leads.length.toString(), trend: '+12%', trendType: 'up', icon: UserPlusIcon },
    { name: 'Active Waves', value: campaigns.length.toString(), trend: '+3', trendType: 'up', icon: RocketLaunchIcon },
    { name: 'AI Resonance', value: '98%', trend: 'OPTIMAL', trendType: 'up', icon: SparklesIcon },
    { name: 'Conversion Puls', value: '14.2%', trend: '5.1%', trendType: 'up', icon: ChatBubbleLeftRightIcon },
  ];

  if (!isLoaded) return (
    <div className="animate-pulse space-y-12 pt-12">
      <div className="space-y-4">
        <div className="h-12 bg-slate-100 rounded-2xl w-64"></div>
        <div className="h-4 bg-slate-50 rounded-lg w-96"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-white border border-slate-100 rounded-[32px]"></div>)}
      </div>
      <div className="h-96 bg-slate-50 rounded-[48px] w-full"></div>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">COMMAND CENTER</h1>
          <p className="text-slate-500 font-medium text-lg mt-3">Welcome back. Your outreach ecosystem is at peak performance.</p>
        </div>
        <Link href="/campaigns" className="bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3">
          INITIATE MOTION <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[40px] border-2 border-slate-50 shadow-xl shadow-slate-200/40 hover:border-primary/20 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                <stat.icon className="w-7 h-7" />
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${stat.trendType === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{stat.name}</h3>
            <p className="text-4xl font-black text-slate-900 italic tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-10 rounded-[48px] border-2 border-slate-50 shadow-2xl shadow-slate-200/30">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">Outreach Velocity</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Activity over last 7 days</p>
              </div>
              <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                <button className="px-5 py-2 bg-white text-primary text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">VOLUME</button>
                <button className="px-5 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-slate-600">INTENT</button>
              </div>
            </div>
            <div className="h-80 flex items-end gap-4 px-2 pb-2">
              {[40, 70, 45, 95, 65, 85, 55].map((height, i) => (
                <div key={i} className="flex-1 bg-slate-50 rounded-[20px] relative group overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-indigo-500 rounded-t-[20px] transition-all duration-1000 ease-out shadow-lg shadow-primary/20"
                    style={{ height: `${height}%` }}
                  />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-4">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <span key={day} className="text-[10px] font-black text-slate-300 tracking-widest">{day}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[48px] border-2 border-slate-50 shadow-2xl shadow-slate-200/30 overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900 italic tracking-tight">Live Campaigns</h3>
              <Link href="/campaigns" className="bg-slate-50 text-slate-400 hover:text-primary p-3 rounded-2xl transition-all">
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {campaigns.slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="p-8 hover:bg-slate-50/50 transition-all flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-all">
                      <EnvelopeIcon className="w-7 h-7 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 italic tracking-tight">{campaign.name}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{campaign.status} • {campaign.leadsCount || 0} TOTAL LEADS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="text-right">
                      <p className="text-2xl font-black text-emerald-500 italic leading-none">{campaign.opens || 24}%</p>
                      <p className="text-[9px] text-slate-300 font-black uppercase tracking-tighter mt-1">OPEN RATE</p>
                    </div>
                    <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 text-slate-300 rounded-xl hover:text-slate-900 hover:shadow-lg transition-all">
                      <EllipsisHorizontalIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
              {campaigns.length === 0 && (
                <div className="py-24 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-6">
                    <BoltIcon className="w-10 h-10" />
                  </div>
                  <p className="text-xl text-slate-400 font-black italic">No energy in the system. Start a campaign.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[48px] border-2 border-slate-50 shadow-2xl shadow-slate-200/30">
            <h3 className="text-2xl font-black text-slate-900 italic tracking-tight mb-8">Signal Stream</h3>
            <div className="space-y-8">
              {leads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex gap-4 group cursor-pointer">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 group-hover:scale-110 transition-transform">
                      {lead.avatar || lead.name[0]}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-slate-50 flex items-center justify-center shadow-lg">
                      <CursorArrowRaysIcon className="w-3 h-3 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      <span className="group-hover:text-primary transition-colors cursor-pointer">{lead.name}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{lead.company}</p>
                    <p className="text-[9px] text-primary font-black uppercase tracking-tighter mt-1">ENRICHMENT DETECTED</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[48px] shadow-2xl shadow-primary/20 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <SparklesIcon className="w-12 h-12 text-primary/20 group-hover:text-primary/40 transition-colors" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">PREMIUM TIER</span>
            <h3 className="font-black text-3xl mb-4 relative z-10 italic tracking-tighter leading-none">VELOCITY PRO</h3>
            <p className="text-slate-400 text-sm mb-8 relative z-10 font-medium leading-relaxed">Scale your motion to 10k prospects/mo and unlock deep-fake AI personalization.</p>
            <button className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl text-xs uppercase tracking-widest relative z-10 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-1 transition-all active:scale-95">
              UPGRADE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
