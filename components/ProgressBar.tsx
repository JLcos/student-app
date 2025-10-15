import { clsx } from '@/utils/helpers';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max = 100,
  color = '#FF6B35',
  showLabel = true,
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-4',
    md: 'h-8',
    lg: 'h-12',
  };

  return (
    <div className="w-full">
      <div className={clsx('relative bg-brutal-gray border-brutal border-brutal-black', sizes[size])}>
        <div
          className={clsx(
            'absolute top-0 left-0 h-full border-r-brutal border-brutal-black transition-all duration-500',
            animated && 'animate-progress'
          )}
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  );
}

