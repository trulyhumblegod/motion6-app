'use client';

import { useState } from 'react';
import {
    XMarkIcon,
    SparklesIcon,
    PencilSquareIcon,
    UserGroupIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    TableCellsIcon,
    DocumentArrowUpIcon,
    MagnifyingGlassIcon,
    BoltIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import SequenceDesigner from './SequenceDesigner';
import { useApp } from '@/context/AppContext';

import { generateAiSequence } from '@/app/actions/aiHelper';

export default function CampaignWizard({ onClose }) {
    const { addCampaign } = useApp();
    const [step, setStep] = useState(1);
    const [configType, setConfigType] = useState(null); // 'ai' or 'manual'

    // Form States
    const [campaignData, setCampaignData] = useState({
        name: '',
        product: '',
        audience: '',
        goal: 'demo',
        tone: 'professional',
        leads: [],
        sequence: []
    });

    const [isGenerating, setIsGenerating] = useState(false);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleCreate = () => {
        addCampaign(campaignData);
        onClose();
    };

    const handleAiGenerate = async () => {
        setIsGenerating(true);
        try {
            const result = await generateAiSequence(campaignData);
            if (result.success) {
                setCampaignData(prev => ({
                    ...prev,
                    name: result.data.campaignName,
                    sequence: result.data.sequence
                }));
                setStep(4); // Skip to Sequence Step
            } else {
                alert(`AI Failed: ${result.message}`);
            }
        } catch (error) {
            alert('Something went wrong during generation.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] shadow-2xl border border-white/20 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <RocketLaunchIcon className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">Asistente de Campaña</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">
                                Paso {step} de 5 • {step === 1 ? 'Selección' : step === 2 ? 'Configuración' : step === 3 ? 'Prospectos' : step === 4 ? 'Secuencia' : 'Lanzamiento'}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                        <XMarkIcon className="w-6 h-6 text-slate-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-10">

                    {/* Step 1: Selection */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center py-10">
                            <button
                                onClick={() => { setConfigType('ai'); nextStep(); }}
                                className="group p-8 rounded-[32px] border-2 border-slate-100 hover:border-primary bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all text-left space-y-6"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <SparklesIcon className="w-10 h-10 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 italic tracking-tight">Generador con IA</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">Deja que la IA construya tu secuencia multicanal, redacte el contenido e identifique ganchos en segundos.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest">
                                    Más Popular <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </button>

                            <button
                                onClick={() => { setConfigType('manual'); nextStep(); }}
                                className="group p-8 rounded-[32px] border-2 border-slate-100 hover:border-slate-900 bg-white hover:shadow-2xl hover:shadow-slate-900/5 transition-all text-left space-y-6"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <PencilSquareIcon className="w-10 h-10 text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 italic tracking-tight">Crear desde Cero</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">Control total. Define tus pasos, escribe tus propias plantillas y configura intervalos de espera.</p>
                                </div>
                                <div className="inline-flex items-center gap-2 text-slate-400 font-black text-sm uppercase tracking-widest">
                                    Usuario Avanzado <ArrowRightIcon className="w-4 h-4" />
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Step 2: Configuration */}
                    {step === 2 && (
                        <div className="max-w-2xl mx-auto space-y-8">
                            {configType === 'ai' ? (
                                <>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">¿Qué estás vendiendo?</label>
                                            <input
                                                autoFocus
                                                type="text"
                                                value={campaignData.product}
                                                onChange={(e) => setCampaignData({ ...campaignData, product: e.target.value })}
                                                placeholder="ej. Automatización CRM con IA"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">¿Quién es tu público objetivo?</label>
                                            <input
                                                type="text"
                                                value={campaignData.audience}
                                                onChange={(e) => setCampaignData({ ...campaignData, audience: e.target.value })}
                                                placeholder="ej. Fundadores SaaS serie A"
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Objetivo Principal</label>
                                                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none">
                                                    <option value="demo">Agendar Demo</option>
                                                    <option value="reply">Obtener Respuesta</option>
                                                    <option value="connection">Red LinkedIn</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Tono de Voz</label>
                                                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 outline-none">
                                                    <option value="professional">Profesional</option>
                                                    <option value="friendly">Cálido y Amigable</option>
                                                    <option value="bold">Directo y Audaz</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAiGenerate}
                                        disabled={isGenerating || !campaignData.product}
                                        className="w-full py-5 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-[24px] font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isGenerating ? <BoltIcon className="w-6 h-6 animate-pulse" /> : <SparklesIcon className="w-6 h-6" />}
                                        {isGenerating ? 'LA IA ESTÁ CONSTRUYENDO TU CAMPAÑA...' : 'GENERAR SECUENCIA IA'}
                                    </button>
                                </>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Nombre de Campaña</label>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={campaignData.name}
                                            onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                                            placeholder="ej. Desarrollo Ventas - Solo Alta Fidelidad"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-xl"
                                        />
                                    </div>
                                    <button
                                        onClick={nextStep}
                                        className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95"
                                    >
                                        CONTINUAR A PROSPECTOS
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Leads */}
                    {step === 3 && (
                        <div className="space-y-10 max-w-3xl mx-auto">
                            <div className="text-center space-y-2">
                                <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">¿A quién estamos contactando?</h3>
                                <p className="text-slate-500 font-medium">Importa tus prospectos desde CSV, Apollo o pégalos abajo.</p>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <button className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-primary/30 transition-all group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary">
                                        <DocumentArrowUpIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Subir CSV</span>
                                </button>
                                <button className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-indigo-500/30 transition-all group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500">
                                        <MagnifyingGlassIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Buscador Apollo</span>
                                </button>
                                <button className="flex flex-col items-center gap-4 p-6 bg-primary/5 rounded-3xl border-2 border-primary/20 transition-all">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
                                        <TableCellsIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Pegar Directo</span>
                                </button>
                            </div>

                            <textarea
                                rows={6}
                                className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[32px] font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 outline-none resize-none placeholder:text-slate-300"
                                placeholder="Pega emails aquí (uno por línea)..."
                                onChange={(e) => {
                                    const emails = e.target.value.split('\n').filter(e => e.includes('@'));
                                    setCampaignData({ ...campaignData, leads: emails.map(m => ({ email: m })) });
                                }}
                            />

                            <div className="flex justify-between items-center bg-slate-50 p-6 rounded-[24px]">
                                <div className="text-sm font-bold text-slate-500">
                                    <span className="text-primary">{campaignData.leads.length}</span> prospectos detectados
                                </div>
                                <button
                                    onClick={nextStep}
                                    className="px-8 py-3 bg-primary text-white rounded-xl font-black text-sm flex items-center gap-2 hover:shadow-lg transition-all"
                                >
                                    DISEÑAR SECUENCIA <ArrowRightIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Sequence Designer */}
                    {step === 4 && (
                        <div className="space-y-8">
                            <div className="text-center space-y-2">
                                <h3 className="text-3xl font-black text-slate-900 italic tracking-tight">Secuencia de Contacto</h3>
                                <p className="text-slate-500 font-medium">Diseña el camino para tus prospectos. Motion6 automatiza el resto.</p>
                            </div>
                            <SequenceDesigner
                                sequence={campaignData.sequence}
                                setSequence={(seq) => setCampaignData({ ...campaignData, sequence: seq })}
                            />
                            <div className="flex justify-center pt-10">
                                <button
                                    onClick={nextStep}
                                    disabled={campaignData.sequence.length === 0}
                                    className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black text-xl flex items-center gap-4 hover:shadow-2xl transition-all disabled:opacity-20 active:scale-95"
                                >
                                    IR AL LANZAMIENTO 🚀
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Launch */}
                    {step === 5 && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Side: Configuration & Summary */}
                                <div className="space-y-8">
                                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-900/20">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                                <RocketLaunchIcon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black italic tracking-tight">Chequeo Vital</h3>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">Listo para despliegue</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Campaña</span>
                                                <span className="font-black italic text-primary">{campaignData.name || 'Velocity Alpha'}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Prospectos</span>
                                                <span className="font-black">{campaignData.leads.length} Leads</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profundidad Secuencia</span>
                                                <span className="font-black text-emerald-400">{campaignData.sequence.length} Pasos</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sending Rhythm */}
                                    <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-lg font-black text-slate-900 italic tracking-tight">Ritmo de Envío</h4>
                                                <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Límite de Envíos</p>
                                            </div>
                                            <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">Optimizado</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <span>Envío Lineal</span>
                                                <span>50 / Día</span>
                                            </div>
                                            <input
                                                type="range"
                                                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                                min="10"
                                                max="200"
                                                defaultValue="50"
                                            />
                                            <p className="text-[10px] text-slate-400 font-medium italic">Recomendamos empezar lento para calentar tu IP.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Lead Preview */}
                                <div className="bg-slate-50 border-2 border-slate-100 rounded-[32px] overflow-hidden flex flex-col">
                                    <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vista Previa Prospectos</span>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Verificado</span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                        {campaignData.leads.map((l, i) => (
                                            <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 uppercase">
                                                        {l.email[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-slate-900 italic">{l.email}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Esperando Inicio</p>
                                                    </div>
                                                </div>
                                                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/20" />
                                            </div>
                                        ))}
                                        {campaignData.leads.length === 0 && (
                                            <div className="py-20 text-center text-slate-300 italic font-medium">Sin prospectos seleccionados</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCreate}
                                className="w-full py-6 bg-primary text-white rounded-[32px] font-black text-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-4"
                            >
                                INICIAR CAMPAÑA <RocketLaunchIcon className="w-8 h-8" />
                            </button>
                        </div>
                    )}

                </div>

                {/* Footer Controls */}
                {step > 1 && (
                    <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/20">
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-2 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-all"
                        >
                            <ArrowLeftIcon className="w-4 h-4" /> Atrás
                        </button>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all ${step === i ? 'bg-primary w-4' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                        <div className="w-16" /> {/* Spacer */}
                    </div>
                )}
            </div>
        </div>
    );
}

function CheckCircleIcon({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}
