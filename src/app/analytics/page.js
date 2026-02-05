'use client';

import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    UserGroupIcon,
    CursorArrowRaysIcon,
    ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

export default function Analytics() {
    const { leads, campaigns, isLoaded } = useApp();

    const stats = [
        { name: 'Total Leads', value: leads.length.toString(), trend: '+5.2%', trendType: 'up' },
        { name: 'Alcance Activo', value: (leads.length * 4.2).toFixed(0), trend: '+2.4%', trendType: 'up' },
        { name: 'Respuesta Global', value: '22.1%', trend: '+12%', trendType: 'up' },
        { name: 'Entregabilidad', value: '99.2%', trend: '-0.3%', trendType: 'up' },
    ];

    if (!isLoaded) return <div className="animate-pulse space-y-8 pt-12">
        <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
        <div className="h-32 bg-slate-50 rounded-3xl w-full"></div>
    </div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-6xl font-black text-slate-900 tracking-tighter italic leading-none">INTELIGENCIA</h1>
                    <p className="text-slate-500 font-medium text-lg mt-3">Análisis profundo de tu rendimiento de movimiento.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.name}</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trendType === 'up' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                                }`}>
                                {stat.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight italic">Alcance de Campaña</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-primary rounded-full" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Envíos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-indigo-200 rounded-full" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Aperturas</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-4 px-2">
                        {[40, 65, 45, 85, 55, 75, 95].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="w-full flex flex-col-reverse gap-1 h-full">
                                    <div className="w-full bg-primary rounded-lg transition-all duration-500" style={{ height: `${val}%` }} />
                                    <div className="w-full bg-indigo-100 rounded-lg transition-all duration-500" style={{ height: `${val * 0.7}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-300 uppercase">{['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight italic">Embudo de Conversión</h2>
                    <div className="space-y-6">
                        {[
                            { label: 'Identificados', value: leads.length, color: 'bg-slate-100', width: 'w-full' },
                            { label: 'Contactados', value: Math.floor(leads.length * 0.8), color: 'bg-primary/20', width: 'w-[80%]' },
                            { label: 'Interactuaron', value: Math.floor(leads.length * 0.4), color: 'bg-primary/40', width: 'w-[40%]' },
                            { label: 'Oportunidades', value: Math.floor(leads.length * 0.15), color: 'bg-primary', width: 'w-[15%]' },
                        ].map((item) => (
                            <div key={item.label} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-600">{item.label}</span>
                                    <span className="font-black text-slate-900">{item.value}</span>
                                </div>
                                <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} ${item.width} rounded-full transition-all duration-1000`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black text-slate-900 mb-8 tracking-tight italic">Inteligencia de Leads</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Top Industrias</h4>
                        <div className="space-y-3">
                            {[
                                { name: 'SaaS', val: '45%' },
                                { name: 'Fintech', val: '22%' },
                                { name: 'HealthTech', val: '18%' },
                            ].map(item => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                    <span className="text-sm font-black text-primary">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Cargos</h4>
                        <div className="space-y-3">
                            {[
                                { name: 'Fundador/CEO', val: '52%' },
                                { name: 'Director de Ventas', val: '31%' },
                                { name: 'Growth Lead', val: '17%' },
                            ].map(item => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                    <span className="text-sm font-black text-primary">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Mejor Hora de Envío</h4>
                        <div className="space-y-3">
                            {[
                                { name: 'Mar, 10:00 AM', val: 'Alta' },
                                { name: 'Mié, 02:00 PM', val: 'Media' },
                                { name: 'Jue, 09:00 AM', val: 'Alta' },
                            ].map(item => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 text-[10px] font-black rounded-lg">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
