'use client';

import { useState } from 'react';
import {
    KeyIcon,
    UserCircleIcon,
    EnvelopeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    PlusIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
    const { apiSettings, updateApiSettings, senderProfiles, addSenderProfile, isLoaded } = useApp();
    const [localSettings, setLocalSettings] = useState(apiSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [showSavedMsg, setShowSavedMsg] = useState(false);

    const [newProfile, setNewProfile] = useState({ name: '', email: '', signature: '' });
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleSaveSettings = (e) => {
        e.preventDefault();
        setIsSaving(true);
        updateApiSettings(localSettings);
        setTimeout(() => {
            setIsSaving(false);
            setShowSavedMsg(true);
            setTimeout(() => setShowSavedMsg(false), 3000);
        }, 800);
    };

    const handleAddProfile = (e) => {
        e.preventDefault();
        addSenderProfile(newProfile);
        setNewProfile({ name: '', email: '', signature: '' });
        setShowProfileModal(false);
    };

    if (!isLoaded) return <div className="animate-pulse space-y-8 pt-12 max-w-4xl mx-auto">
        <div className="h-10 bg-slate-100 rounded-xl w-48"></div>
        <div className="h-64 bg-slate-50 rounded-3xl"></div>
    </div>;

    return (
        <div className="space-y-12 max-w-4xl mx-auto pb-20">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">Configuración</h1>
                <p className="text-slate-500 font-medium">Configura tu motor de alcance e identidad.</p>
            </div>

            {/* API Keys Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <KeyIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Infraestructura API</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Claves Globales</p>
                    </div>
                </div>
                <form onSubmit={handleSaveSettings} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Clave API Apollo</label>
                            <input
                                type="password"
                                value={localSettings.apolloKey}
                                onChange={(e) => setLocalSettings({ ...localSettings, apolloKey: e.target.value })}
                                placeholder="tu_clave_apollo"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Clave API Groq</label>
                            <input
                                type="password"
                                value={localSettings.groqKey}
                                onChange={(e) => setLocalSettings({ ...localSettings, groqKey: e.target.value })}
                                placeholder="gsk_..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Clave API Resend</label>
                            <input
                                type="password"
                                value={localSettings.resendKey}
                                onChange={(e) => setLocalSettings({ ...localSettings, resendKey: e.target.value })}
                                placeholder="re_..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                            {showSavedMsg && (
                                <span className="text-emerald-500 text-sm font-bold flex items-center gap-1 animate-in fade-in slide-in-from-left-2">
                                    <CheckCircleIcon className="w-4 h-4" />
                                    ¡Configuración guardada!
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isSaving ? 'ACTUALIZANDO...' : 'GUARDAR CONFIGURACIÓN'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Sender Profiles Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <UserCircleIcon className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Perfiles de Envío</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Identidades de Salida</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                    >
                        <PlusIcon className="w-4 h-4" />
                        AÑADIR PERFIL
                    </button>
                </div>
                <div className="divide-y divide-slate-50">
                    {senderProfiles.map(profile => (
                        <div key={profile.id} className="p-6 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-500">
                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{profile.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{profile.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                {profile.default && (
                                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg uppercase tracking-widest">Predeterminado</span>
                                )}
                                <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {senderProfiles.length === 0 && (
                        <div className="p-12 text-center">
                            <EnvelopeIcon className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold italic">No hay perfiles configurados.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
                        <h3 className="text-2xl font-black text-slate-900 mb-6 italic tracking-tight">Nueva Identidad Global</h3>
                        <form onSubmit={handleAddProfile} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nombre Visible</label>
                                <input
                                    required
                                    type="text"
                                    value={newProfile.name}
                                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                                    placeholder="ej. Juan Pérez"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Correo Electrónico</label>
                                <input
                                    required
                                    type="email"
                                    value={newProfile.email}
                                    onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
                                    placeholder="juan@empresa.com"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Firma</label>
                                <textarea
                                    rows={3}
                                    value={newProfile.signature}
                                    onChange={(e) => setNewProfile({ ...newProfile, signature: e.target.value })}
                                    placeholder="Saludos, Juan"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowProfileModal(false)}
                                    className="flex-1 py-4 bg-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-primary text-white font-black rounded-2xl hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95"
                                >
                                    Añadir Perfil
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
