import { ReactNode } from 'react';
import { clsx } from '@/utils/helpers';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color = '#FF6B35', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-block px-3 py-1 text-xs font-bold uppercase tracking-wide',
        'border-2 border-brutal-black',
        className
      )}
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

