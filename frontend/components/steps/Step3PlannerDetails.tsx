import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { plannerDetailsSchema, PlannerDetailsFormData } from '@/lib/schemas';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useEffect } from 'react';

interface Step3PlannerProps {
  defaultValues: Partial<PlannerDetailsFormData>;
  onNext: (data: PlannerDetailsFormData) => void;
  onBack: () => void;
}

const experienceOptions = [
  { value: '0-2', label: '0-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '10+', label: '10+ years' },
];

const budgetOptions = [
  { value: 'under-10k', label: 'Under $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k+', label: '$100,000+' },
];

const guestCountOptions = [
  { value: '0-50', label: '0-50 guests' },
  { value: '50-100', label: '50-100 guests' },
  { value: '100-200', label: '100-200 guests' },
  { value: '200-500', label: '200-500 guests' },
  { value: '500+', label: '500+ guests' },
];

const servicesList = [
  'Full event planning',
  'Day-of coordination',
  'Vendor management',
  'Budget planning',
  'Timeline creation',
  'Design & decor',
];

export default function Step3PlannerDetails({ defaultValues, onNext, onBack }: Step3PlannerProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<PlannerDetailsFormData>({
    resolver: zodResolver(plannerDetailsSchema),
    defaultValues: {
      experienceYears: defaultValues.experienceYears || '',
      specialization: defaultValues.specialization || '',
      budget: defaultValues.budget || '',
      guestCount: defaultValues.guestCount || '',
      services: defaultValues.services || [],
      additionalNotes: defaultValues.additionalNotes || '',
    },
  });

  // Register the services field
  useEffect(() => {
    register('services');
  }, [register]);

  const selectedServices = watch('services') || [];

  const toggleService = (service: string) => {
    const newServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    
    setValue('services', newServices);
    // Trigger validation after a short delay to ensure state is updated
    setTimeout(() => trigger('services'), 0);
  };

  const onSubmit = (data: PlannerDetailsFormData) => {
    console.log('Submitting planner data:', data);
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-light text-noir mb-3">
          Planner Requirements
        </h2>
        <p className="text-charcoal/70 font-body font-light text-sm tracking-wide">
          Specify your event planning needs
        </p>
      </div>

      <div className="space-y-5">
        <Select
          label="Required Experience"
          options={experienceOptions}
          {...register('experienceYears')}
          error={errors.experienceYears?.message}
        />

        <Input
          label="Specialization"
          placeholder="e.g., Luxury weddings, Corporate events"
          {...register('specialization')}
          error={errors.specialization?.message}
        />

        <Select
          label="Budget Range"
          options={budgetOptions}
          {...register('budget')}
          error={errors.budget?.message}
        />

        <Select
          label="Expected Guest Count"
          options={guestCountOptions}
          {...register('guestCount')}
          error={errors.guestCount?.message}
        />

        <div>
          <label className="block text-sm font-body font-light text-charcoal mb-3 tracking-wide">
            Services Required
          </label>
          <div className="space-y-3 bg-ivory border border-champagne p-5">
            {servicesList.map((service) => (
              <Checkbox
                key={service}
                label={service}
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
              />
            ))}
          </div>
          {errors.services && (
            <p className="mt-1.5 text-xs text-red-600 font-body font-light animate-slideInRight">
              {errors.services.message}
            </p>
          )}
        </div>

        <Textarea
          label="Additional Notes (Optional)"
          placeholder="Any specific requirements or preferences"
          {...register('additionalNotes')}
        />
      </div>

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