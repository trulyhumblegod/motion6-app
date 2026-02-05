import {
    BellIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    LifebuoyIcon
} from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 fixed top-0 right-0 left-[var(--sidebar-width)] z-10 px-8 flex items-center justify-between transition-all duration-300">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors duration-200" />
                    <input
                        type="text"
                        placeholder="Buscar campañas, leads o dominios..."
                        className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200 outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95 group">
                    <PlusIcon className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    <span>NUEVA CAMPAÑA</span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2" />

                <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors duration-200 relative">
                        <BellIcon className="w-6 h-6" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-alert rounded-full border-2 border-white" />
                    </button>
                    <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors duration-200">
                        <LifebuoyIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
