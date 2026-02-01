import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategoryFormData } from '@/lib/schemas';
import { Button } from '@/components/Button';

interface Step2Props {
  defaultValues: Partial<CategoryFormData>;
  onNext: (data: CategoryFormData) => void;
  onBack: () => void;
}

const categories = [
  {
    value: 'planner',
    title: 'Event Planner',
    description: 'Professional event planning and coordination services',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    value: 'performer',
    title: 'Performer',
    description: 'Artists, musicians, entertainers, and performers',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    value: 'crew',
    title: 'Crew & Staff',
    description: 'Technical crew, support staff, and service personnel',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function Step2Category({ defaultValues, onNext, onBack }: Step2Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  const selectedCategory = watch('category');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-light text-noir mb-3">
          Requirement Category
        </h2>
        <p className="text-charcoal/70 font-body font-light text-sm tracking-wide">
          Select the type of service you require
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((category) => (
          <label
            key={category.value}
            className={`
              relative border cursor-pointer transition-elegant group
              ${
                selectedCategory === category.value
                  ? 'border-bronze bg-bronze/5'
                  : 'border-champagne bg-ivory hover:border-bronze/50'
              }
            `}
          >
            <input
              type="radio"
              value={category.value}
              {...register('category')}
              className="sr-only"
            />
            <div className="p-8">
              <div
                className={`
                  mb-4 transition-smooth
                  ${selectedCategory === category.value ? 'text-bronze' : 'text-charcoal group-hover:text-bronze'}
                `}
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-display font-light text-noir mb-2">
                {category.title}
              </h3>
              <p className="text-xs font-body font-light text-charcoal/70 leading-relaxed">
                {category.description}
              </p>
            </div>
            {selectedCategory === category.value && (
              <div className="absolute top-4 right-4">
                <svg className="w-5 h-5 text-bronze" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>

      {errors.category && (
        <p className="text-xs text-red-600 font-body font-light animate-slideInRight">
          {errors.category.message}
        </p>
      )}

      <div className="pt-6 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
}