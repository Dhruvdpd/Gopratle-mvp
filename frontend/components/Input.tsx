import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <label className="block text-sm font-body font-light text-charcoal mb-2 tracking-wide">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            w-full px-4 py-3.5 
            bg-ivory border border-champagne
            text-noir font-body font-light
            focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze
            transition-smooth
            placeholder:text-charcoal/40
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

Input.displayName = 'Input';