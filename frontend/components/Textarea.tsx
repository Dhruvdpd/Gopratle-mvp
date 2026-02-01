import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <label className="block text-sm font-body font-light text-charcoal mb-2 tracking-wide">
          {label}
        </label>
        <textarea
          ref={ref}
          rows={4}
          className={`
            w-full px-4 py-3.5 
            bg-ivory border border-champagne
            text-noir font-body font-light
            focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze
            transition-smooth
            placeholder:text-charcoal/40
            resize-none
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-600 font-body font-light animate-slideInRight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';