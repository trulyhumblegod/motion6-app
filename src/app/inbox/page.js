'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    UserCircleIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowUpRightIcon,
    ClockIcon,
    CheckCircleIcon,
    PaperAirplaneIcon,
    FaceSmileIcon
} from '@heroicons/react/24/outline';

const mockMessages = [
    {
        id: 1,
        leadName: 'Alex Rivera',
        company: 'NextGen SaaS',
        channel: 'email',
        subject: 'Re: Pregunta rápida sobre crecimiento',
        preview: '¡Gracias por contactar! Me encantaría ver una demo la próxima semana...',
        time: '14:20',
        unread: true,
        avatar: 'AR',
        status: 'replied'
    },
    {
        id: 2,
        leadName: 'Sarah Chen',
        company: 'Flow State',
        channel: 'linkedin',
        subject: 'Mensaje LinkedIn',
        preview: 'Tu perfil apareció en mi feed. Interesante trabajo el que están haciendo.',
        time: '10:05',
        unread: false,
        avatar: 'SC',
        status: 'interested'
    },
    {
        id: 3,
        leadName: 'David Miller',
        company: 'Scale Ops',
        channel: 'whatsapp',
        subject: 'Chat WhatsApp',
        preview: '¿Podemos mover nuestra llamada a las 3pm en su lugar?',
        time: 'Ayer',
        unread: false,
        avatar: 'DM',
        status: 'pending'
    }
];

export default function InboxPage() {
    const { leads } = useApp();
    const [selectedThread, setSelectedThread] = useState(mockMessages[0]);
    const [reply, setReply] = useState('');

    return (
        <div className="flex h-[calc(100vh-120px)] -mt-10 -mx-8 overflow-hidden bg-white border-t border-slate-100">
            {/* Thread List */}
            <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/30">
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black text-slate-900 italic tracking-tight">Bandeja Prioritaria</h1>
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg">3 NUEVOS</span>
                    </div>
                    <div className="relative group">
                        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Filtrar por lead o empresa..."
                            className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['Todos', 'Email', 'LinkedIn', 'WhatsApp'].map(t => (
                            <button key={t} className="px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {mockMessages.map((msg) => (
                        <div
                            key={msg.id}
                            onClick={() => setSelectedThread(msg)}
                            className={`p-6 cursor-pointer transition-all hover:bg-white relative group ${selectedThread?.id === msg.id ? 'bg-white' : ''}`}
                        >
                            {selectedThread?.id === msg.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                            )}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 shadow-sm group-hover:scale-110 transition-transform">
                                    {msg.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-black text-slate-900 italic truncate leading-none">{msg.leadName}</h4>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase">{msg.time}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{msg.company}</p>
                                    <p className="text-xs text-slate-500 font-medium truncate italic">{msg.preview}</p>
                                </div>
                            </div>
                            <div className="absolute right-6 bottom-6 flex gap-1">
                                {msg.channel === 'email' && <EnvelopeIcon className="w-3 h-3 text-blue-400" />}
                                {msg.channel === 'linkedin' && <UserCircleIcon className="w-3 h-3 text-indigo-400" />}
                                {msg.channel === 'whatsapp' && <ChatBubbleLeftRightIcon className="w-3 h-3 text-green-400" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedThread ? (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-xs font-black text-primary">
                                    {selectedThread.avatar}
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 italic tracking-tight">{selectedThread.leadName}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400">{selectedThread.company}</span>
                                        <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Ver Perfil CRM</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                                    <CheckCircleIcon className="w-6 h-6" />
                                </button>
                                <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest px-4">
                                    Pausar Secuencia
                                </button>
                            </div>
                        </div>

                        {/* Messages Content */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/20">
                            {/* Inbound */}
                            <div className="flex gap-4 max-w-2xl">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex-shrink-0" />
                                <div className="space-y-2">
                                    <div className="bg-white border border-slate-100 p-6 rounded-[24px] rounded-tl-none shadow-sm">
                                        <p className="text-sm text-slate-700 font-medium leading-relaxed italic">
                                            {selectedThread.preview}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{selectedThread.time} • VIA {selectedThread.channel}</span>
                                </div>
                            </div>

                            {/* Outbound Simulation */}
                            <div className="flex flex-row-reverse gap-4 max-w-2xl ml-auto">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex-shrink-0" />
                                <div className="space-y-2 text-right">
                                    <div className="bg-slate-900 text-white p-6 rounded-[24px] rounded-tr-none shadow-xl">
                                        <p className="text-sm font-medium leading-relaxed">
                                            Hola {selectedThread.leadName}, ¡gracias por responder! Me encantaría mostrarte cómo podemos automatizar tus secuencias de movimiento. ¿Estás libre el próximo martes a las 10am?
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Leído hace 1h</span>
                                </div>
                            </div>
                        </div>

                        {/* Reply Area */}
                        <div className="p-8 border-t border-slate-50">
                            <div className="bg-slate-50 rounded-[32px] p-2 flex flex-col focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder={`Responder a ${selectedThread.leadName}...`}
                                    className="w-full bg-transparent p-6 outline-none text-sm font-medium italic min-h-[120px] resize-none"
                                />
                                <div className="flex items-center justify-between p-4 px-6 border-t border-slate-100/50">
                                    <div className="flex gap-4">
                                        <button className="text-slate-400 hover:text-primary transition-colors"><FaceSmileIcon className="w-5 h-5" /></button>
                                        <button className="text-slate-400 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-widest">Personalizar con IA</button>
                                    </div>
                                    <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                        ENVIAR RESPUESTA <PaperAirplaneIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
                        <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-slate-200 mb-8">
                            <EnvelopeIcon className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-300 italic tracking-tight">Selecciona una conversación para comenzar</h3>
                        <p className="text-slate-400 font-medium mt-2">Todos tus leads multicanal en una vista unificada.</p>
                    </div>
                )}
            </div>

            {/* Profile Context Side (Optional but recommended for SaaS) */}
            <div className="w-1/4 border-l border-slate-100 bg-white p-8 space-y-10 overflow-y-auto">
                <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2">Línea de Tiempo</h3>
                    <div className="space-y-6">
                        {[
                            { icon: ClockIcon, text: 'Secuencia iniciada', time: 'hace 3 días' },
                            { icon: EnvelopeIcon, text: 'Email enviado', time: 'hace 2 días' },
                            { icon: ArrowUpRightIcon, text: 'Clic en enlace del email', time: 'hace 1 día' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 relative">
                                {i < 2 && <div className="absolute left-[13px] top-8 w-0.5 h-6 bg-slate-100" />}
                                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                                    <item.icon className="w-4 h-4 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-700">{item.text}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-50 pb-2">Inteligencia</h3>
                    <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Puntuación de Intención</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-primary italic leading-none">88/100</span>
                            <span className="text-xs font-bold text-indigo-400 mb-1">ALTA INTENCIÓN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
