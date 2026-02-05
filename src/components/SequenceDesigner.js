'use client';

import { useState } from 'react';
import {
    EnvelopeIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    PlusIcon,
    TrashIcon,
    DevicePhoneMobileIcon,
    ExclamationCircleIcon,
    ClockIcon,
    ArrowsRightLeftIcon,
    HandThumbUpIcon,
    BoltIcon
} from '@heroicons/react/24/outline';

const stepTypes = [
    { type: 'email', name: 'Email', icon: EnvelopeIcon, color: 'text-blue-500', bg: 'bg-blue-50', description: 'Correo frío personalizado' },
    { type: 'linkedin_view', name: 'LinkedIn - Ver', icon: UserIcon, color: 'text-indigo-500', bg: 'bg-indigo-50', description: 'Ver perfil automáticamente' },
    { type: 'linkedin_connect', name: 'LinkedIn - Conectar', icon: PlusIcon, color: 'text-indigo-600', bg: 'bg-indigo-100', description: 'Solicitud de conexión' },
    { type: 'linkedin_message', name: 'LinkedIn - Mensaje', icon: ChatBubbleLeftRightIcon, color: 'text-indigo-700', bg: 'bg-indigo-200', description: 'Mensaje directo LinkedIn' },
    { type: 'linkedin_like', name: 'LinkedIn - Like', icon: HandThumbUpIcon, color: 'text-indigo-400', bg: 'bg-indigo-50', description: 'Like a post reciente' },
    { type: 'call', name: 'Llamada', icon: PhoneIcon, color: 'text-emerald-500', bg: 'bg-emerald-50', description: 'Tarea manual para llamar' },
    { type: 'whatsapp', name: 'WhatsApp', icon: DevicePhoneMobileIcon, color: 'text-green-500', bg: 'bg-green-50', description: 'Contacto móvil' },
    { type: 'condition', name: 'Si/No', icon: ArrowsRightLeftIcon, color: 'text-amber-500', bg: 'bg-amber-50', description: 'Lógica condicional' },
];

export default function SequenceDesigner({ sequence, setSequence }) {
    const [editingStepId, setEditingStepId] = useState(null);

    const addStep = (type) => {
        const stepInfo = stepTypes.find(s => s.type === type);
        const newStep = {
            id: Date.now(),
            type,
            name: stepInfo.name,
            delay: 1,
            subject: type === 'email' ? 'Pregunta rápida' : '',
            body: '',
            settings: {}
        };
        setSequence([...sequence, newStep]);
        setEditingStepId(newStep.id);
    };

    const removeStep = (id) => {
        setSequence(sequence.filter(s => s.id !== id));
    };

    const updateStep = (id, updates) => {
        setSequence(sequence.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col items-center">
                {sequence.map((step, index) => (
                    <div key={step.id} className="w-full flex flex-col items-center group/step">
                        {/* Delay Connector */}
                        {index > 0 && (
                            <div className="flex flex-col items-center py-6">
                                <div className="w-[1.5px] h-12 bg-slate-200" />
                                <div className="group/delay relative flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-slate-100 rounded-full shadow-lg shadow-slate-200/50 hover:border-primary/40 transition-all">
                                    <ClockIcon className="w-4 h-4 text-slate-400 group-hover/delay:text-primary transition-colors" />
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Esperar</span>
                                    <input
                                        type="number"
                                        value={step.delay}
                                        onChange={(e) => updateStep(step.id, { delay: parseInt(e.target.value) || 0 })}
                                        className="w-10 bg-slate-50 text-center font-black text-slate-900 rounded-lg py-0.5 outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Días</span>
                                </div>
                                <div className="w-[1.5px] h-12 bg-slate-200" />
                            </div>
                        )}

                        {/* Step Card */}
                        <div className={`w-full max-w-2xl bg-white border-2 rounded-[32px] transition-all shadow-xl overflow-hidden ${editingStepId === step.id ? 'border-primary shadow-primary/10' : 'border-slate-100 shadow-slate-200/20'}`}>
                            <div className="p-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${stepTypes.find(s => s.type === step.type)?.bg}`}>
                                            {(() => {
                                                const Icon = stepTypes.find(s => s.type === step.type)?.icon || ExclamationCircleIcon;
                                                return <Icon className={`w-7 h-7 ${stepTypes.find(s => s.type === step.type)?.color}`} />;
                                            })()}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-xl font-black text-slate-900 italic tracking-tight">{step.name}</h4>
                                                <span className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">Paso {index + 1}</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 mt-1">{stepTypes.find(s => s.type === step.type)?.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setEditingStepId(editingStepId === step.id ? null : step.id)}
                                            className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                                        >
                                            {editingStepId === step.id ? 'CERRAR' : 'EDITAR'}
                                        </button>
                                        <button
                                            onClick={() => removeStep(step.id)}
                                            className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {editingStepId === step.id && (
                                    <div className="mt-8 pt-8 border-t border-slate-50 space-y-6 animate-in slide-in-from-top-4 duration-300">
                                        {step.type === 'email' && (
                                            <div>
                                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Asunto del Email</label>
                                                <input
                                                    type="text"
                                                    value={step.subject}
                                                    onChange={(e) => updateStep(step.id, { subject: e.target.value })}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                                                    placeholder="Ingresa asunto..."
                                                />
                                            </div>
                                        )}

                                        {(step.type === 'email' || step.type === 'linkedin_message' || step.type === 'linkedin_connect') && (
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cuerpo del Mensaje</label>
                                                    <div className="flex gap-2">
                                                        {['firstName', 'company', 'industry'].map(tag => (
                                                            <button
                                                                key={tag}
                                                                onClick={() => updateStep(step.id, { body: step.body + ` {{${tag}}}` })}
                                                                className="px-2 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase rounded border border-primary/20 hover:bg-primary hover:text-white transition-all"
                                                            >
                                                                + {tag}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <textarea
                                                    rows={6}
                                                    value={step.body}
                                                    onChange={(e) => updateStep(step.id, { body: e.target.value })}
                                                    className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[28px] font-bold text-slate-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none italic"
                                                    placeholder="Hola {{firstName}}, vi lo que estás haciendo en {{company}}..."
                                                />
                                            </div>
                                        )}

                                        {step.type === 'condition' && (
                                            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <BoltIcon className="w-5 h-5 text-amber-500" />
                                                    <span className="font-black text-amber-700 italic">Lógica de Ramas</span>
                                                </div>
                                                <select className="w-full p-4 bg-white border border-amber-200 rounded-xl font-bold text-slate-900 outline-none">
                                                    <option>Si responde → Detener secuencia</option>
                                                    <option>Si abre 3 veces → Enviar variante alta intención</option>
                                                    <option>Si no conecta en LinkedIn → Enviar Email</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Flow Initiator / Add Step */}
                <div className="mt-12 group/add flex flex-col items-center">
                    <div className="w-[1.5px] h-10 bg-slate-100 mb-6 group-hover/add:h-14 group-hover/add:bg-primary/30 transition-all duration-500" />

                    <div className="bg-white p-2 rounded-[32px] border-2 border-slate-100 shadow-2xl flex items-center gap-2 group-hover/add:border-primary/20 transition-all">
                        <div className="px-6 py-4 bg-slate-900 rounded-[24px] text-white flex items-center gap-3">
                            <PlusIcon className="w-5 h-5" />
                            <span className="font-black text-xs uppercase tracking-widest">Añadir Paso</span>
                        </div>
                        <div className="flex gap-1 pr-2">
                            {stepTypes.map((st) => (
                                <button
                                    key={st.type}
                                    title={st.name}
                                    onClick={() => addStep(st.type)}
                                    className={`p-3 rounded-[18px] transition-all hover:scale-110 active:scale-90 ${st.bg} ${st.color}`}
                                >
                                    <st.icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {sequence.length === 0 && (
                <div className="py-24 text-center bg-slate-50/50 rounded-[48px] border-4 border-dashed border-slate-100 flex flex-col items-center">
                    <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-200 mb-6">
                        <BoltIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-300 italic mb-2 tracking-tight">Tu secuencia está vacía</h3>
                    <p className="text-slate-400 font-medium">Añade pasos arriba para comenzar a automatizar.</p>
                </div>
            )}
        </div>
    );
}
