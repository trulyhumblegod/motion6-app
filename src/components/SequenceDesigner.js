'use client';

import {
    EnvelopeIcon,
    UserIcon,
    ChatBubbleLeftRightIcon,
    PhoneIcon,
    PlusIcon,
    TrashIcon,
    DevicePhoneMobileIcon,
    ExclamationCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

const stepTypes = [
    { type: 'email', name: 'Email', icon: EnvelopeIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
    { type: 'linkedin_view', name: 'LinkedIn - View', icon: UserIcon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { type: 'linkedin_connect', name: 'LinkedIn - Connect', icon: PlusIcon, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { type: 'linkedin_message', name: 'LinkedIn - Message', icon: ChatBubbleLeftRightIcon, color: 'text-indigo-700', bg: 'bg-indigo-200' },
    { type: 'call', name: 'Call', icon: PhoneIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { type: 'whatsapp', name: 'WhatsApp', icon: DevicePhoneMobileIcon, color: 'text-green-500', bg: 'bg-green-50' },
];

export default function SequenceDesigner({ sequence, setSequence }) {

    const addStep = (type) => {
        const stepInfo = stepTypes.find(s => s.type === type);
        const newStep = {
            id: Date.now(),
            type,
            name: stepInfo.name,
            delay: 1, // Default 1 day
            settings: {}
        };
        setSequence([...sequence, newStep]);
    };

    const removeStep = (id) => {
        setSequence(sequence.filter(s => s.id !== id));
    };

    const updateStep = (id, updates) => {
        setSequence(sequence.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center">
                {sequence.map((step, index) => (
                    <div key={step.id} className="w-full flex flex-col items-center group/step">
                        {/* Delay Node */}
                        {index > 0 && (
                            <div className="flex flex-col items-center py-4">
                                <div className="w-0.5 h-8 bg-slate-200" />
                                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-full shadow-sm text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-primary/30 transition-all">
                                    <ClockIcon className="w-3 h-3" />
                                    Wait
                                    <input
                                        type="number"
                                        value={step.delay}
                                        onChange={(e) => updateStep(step.id, { delay: parseInt(e.target.value) || 0 })}
                                        className="w-8 bg-transparent text-center focus:outline-none text-slate-900"
                                    />
                                    Days
                                </div>
                                <div className="w-0.5 h-8 bg-slate-200" />
                            </div>
                        )}

                        {/* Step Card */}
                        <div className="w-full max-w-lg bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all relative">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stepTypes.find(s => s.type === step.type)?.bg}`}>
                                        {(() => {
                                            const Icon = stepTypes.find(s => s.type === step.type)?.icon || ExclamationCircleIcon;
                                            return <Icon className={`w-6 h-6 ${stepTypes.find(s => s.type === step.type)?.color}`} />;
                                        })()}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 italic tracking-tight">{step.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step {index + 1}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => removeStep(step.id)}
                                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover/step:opacity-100"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Step Options Preview */}
                            <div className="mt-4 pt-4 border-t border-slate-50">
                                <p className="text-xs text-slate-400 font-medium italic">
                                    {step.type === 'email' ? 'Subject: {{subject}} • Body: Hi {{firstName}}...' :
                                        step.type.includes('linkedin') ? 'Automated action via Motion Core' :
                                            'Manual task generated in inbox'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add Step Button Area */}
                <div className="mt-8 flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-slate-100 mb-4" />
                    <div className="flex flex-wrap justify-center gap-2 max-w-xl">
                        {stepTypes.map((st) => (
                            <button
                                key={st.type}
                                onClick={() => addStep(st.type)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-primary/20 hover:text-primary hover:shadow-lg hover:shadow-primary/5 transition-all"
                            >
                                <st.icon className="w-4 h-4" />
                                {st.name.split(' - ').pop()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {sequence.length === 0 && (
                <div className="py-20 text-center bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-200">
                    <PlusIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-400 italic">Add your first sequence step above</h3>
                </div>
            )}
        </div>
    );
}
