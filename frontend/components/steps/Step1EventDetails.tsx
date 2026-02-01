import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventDetailsSchema, EventDetailsFormData } from '@/lib/schemas';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';

interface Step1Props {
  defaultValues: Partial<EventDetailsFormData>;
  onNext: (data: EventDetailsFormData) => void;
}

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'concert', label: 'Concert' },
  { value: 'festival', label: 'Festival' },
  { value: 'conference', label: 'Conference' },
  { value: 'party', label: 'Party' },
  { value: 'other', label: 'Other' },
];

export default function Step1EventDetails({ defaultValues, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventDetailsFormData>({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-light text-noir mb-3">
          Event Details
        </h2>
        <p className="text-charcoal/70 font-body font-light text-sm tracking-wide">
          Begin by sharing the essence of your event
        </p>
      </div>

      <div className="space-y-5">
        <Input
          label="Event Name"
          placeholder="Enter the name of your event"
          {...register('name')}
          error={errors.name?.message}
        />

        <Select
          label="Event Type"
          options={eventTypes}
          {...register('type')}
          error={errors.type?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Start Date"
            type="date"
            {...register('startDate')}
            error={errors.startDate?.message}
          />

          <Input
            label="End Date (Optional)"
            type="date"
            {...register('endDate')}
            error={errors.endDate?.message}
          />
        </div>

        <Input
          label="Location"
          placeholder="City, State or Address"
          {...register('location')}
          error={errors.location?.message}
        />

        <Input
          label="Venue (Optional)"
          placeholder="Specific venue name"
          {...register('venue')}
        />
      </div>

      <div className="pt-6 flex justify-end">
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </div>
    </form>
  );
}