import { ReactNode } from 'react';
import { clsx } from '@/utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export default function Card({
  children,
  className,
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        'card-brutal p-5',
        hoverable && 'cursor-pointer transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

