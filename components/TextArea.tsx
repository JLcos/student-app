import { TextareaHTMLAttributes, forwardRef } from 'react';
import { clsx } from '@/utils/helpers';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-bold uppercase tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={clsx(
            'input-brutal w-full min-h-[120px] resize-y',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm font-bold text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;

