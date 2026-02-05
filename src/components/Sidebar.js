import Image from 'next/image';
import Link from 'next/link';
import {
  Squares2X2Icon,
  PaperAirplaneIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Squares2X2Icon },
  { name: 'Campaigns', href: '/campaigns', icon: PaperAirplaneIcon },
  { name: 'Leads', href: '/leads', icon: UserGroupIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Enrichment', href: '/enrichment', icon: MagnifyingGlassIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-[var(--sidebar-width)] h-screen bg-white border-r border-slate-100 text-slate-600 p-6 fixed left-0 top-0 z-20 transition-all duration-300">
      <div className="flex items-center justify-center py-4 mb-2">
        <div className="relative w-full h-10 flex items-center justify-center px-6">
          <Image
            src="/logo_v2.png"
            alt="Motion6 Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
          >
            <item.icon className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
            <span className="font-bold text-sm tracking-tight">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition-all duration-300 group/user">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary border border-primary/20 group-hover/user:scale-110 transition-transform">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 leading-none group-hover/user:text-primary transition-colors">John Doe</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Velocity Pro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
