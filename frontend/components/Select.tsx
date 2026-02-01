import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <label className="block text-sm font-body font-light text-charcoal mb-2 tracking-wide">
          {label}
        </label>
        <select
          ref={ref}
          className={`
            w-full px-4 py-3.5 
            bg-ivory border border-champagne
            text-noir font-body font-light
            focus:outline-none focus:border-bronze focus:ring-1 focus:ring-bronze
            transition-smooth
            appearance-none
            cursor-pointer
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-[42px] pointer-events-none">
          <svg
            className="w-4 h-4 text-charcoal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-600 font-body font-light animate-slideInRight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';