interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: 'Event' },
  { number: 2, label: 'Category' },
  { number: 3, label: 'Details' },
  { number: 4, label: 'Review' },
];

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  font-display text-sm transition-elegant
                  ${
                    currentStep >= step.number
                      ? 'bg-bronze text-ivory border-2 border-bronze'
                      : 'bg-pearl text-charcoal border-2 border-champagne'
                  }
                `}
              >
                {currentStep > step.number ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`
                  mt-2 text-xs font-body font-light tracking-wider uppercase
                  ${currentStep >= step.number ? 'text-bronze' : 'text-charcoal/50'}
                `}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px bg-champagne mx-2 mt-[-20px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}