import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from '@/utils/helpers';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center cursor-pointer group">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className={clsx(
              'appearance-none w-6 h-6 border-brutal border-brutal-black bg-white',
              'checked:bg-primary checked:border-brutal-black',
              'cursor-pointer transition-all',
              'focus:ring-4 focus:ring-primary',
              className
            )}
            {...props}
          />
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none hidden peer-checked:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        {label && (
          <span className="ml-3 font-bold text-base group-hover:text-primary transition-colors">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

