'use client';

import { usePathname, useRouter } from 'next/navigation';
import { clsx } from '@/utils/helpers';
import {
  MdHome,
  MdCalendarMonth,
  MdSchool,
  MdBarChart,
  MdPerson,
} from 'react-icons/md';

const navItems = [
  { icon: MdHome, label: 'Início', path: '/dashboard' },
  { icon: MdCalendarMonth, label: 'Calendário', path: '/calendar' },
  { icon: MdSchool, label: 'Matérias', path: '/subjects' },
  { icon: MdBarChart, label: 'Relatórios', path: '/reports' },
  { icon: MdPerson, label: 'Perfil', path: '/profile' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-brutal border-brutal-black shadow-brutal-lg no-print safe-bottom"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="flex items-center justify-around h-20 max-w-7xl mx-auto px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = pathname === path;
          return (
            <button
              key={path}
              onClick={() => router.push(path)}
              className={clsx(
                'flex flex-col items-center justify-center flex-1 h-full min-w-[60px]',
                'transition-all duration-200 border-2',
                isActive
                  ? 'bg-primary text-white border-brutal-black shadow-brutal-sm scale-105'
                  : 'text-brutal-black hover:bg-gray-100 border-transparent'
              )}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={clsx('text-2xl mb-1 transition-transform', isActive && 'scale-110')} />
              <span className="text-xs font-bold uppercase tracking-wide hidden sm:block">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

