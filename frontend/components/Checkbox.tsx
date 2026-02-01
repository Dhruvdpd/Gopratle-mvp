import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-start space-x-3 cursor-pointer group">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`
            w-5 h-5 border transition-smooth
            ${
              checked
                ? 'bg-bronze border-bronze'
                : 'bg-ivory border-champagne group-hover:border-bronze'
            }
          `}
        >
          {checked && (
            <svg
              className="w-full h-full text-ivory p-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <span className="text-sm font-body font-light text-charcoal leading-tight pt-0.5">
        {label}
      </span>
    </label>
  );
};