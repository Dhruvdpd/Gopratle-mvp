import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { performerDetailsSchema, PerformerDetailsFormData } from '@/lib/schemas';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useState } from 'react';

interface Step3PerformerProps {
  defaultValues: Partial<PerformerDetailsFormData>;
  onNext: (data: PerformerDetailsFormData) => void;
  onBack: () => void;
}

const durationOptions = [
  { value: '30-min', label: '30 minutes' },
  { value: '1-hour', label: '1 hour' },
  { value: '2-hours', label: '2 hours' },
  { value: '3-hours', label: '3 hours' },
  { value: '4-hours+', label: '4+ hours' },
];

const audienceSizeOptions = [
  { value: '0-50', label: '0-50 people' },
  { value: '50-100', label: '50-100 people' },
  { value: '100-500', label: '100-500 people' },
  { value: '500-1000', label: '500-1,000 people' },
  { value: '1000+', label: '1,000+ people' },
];

const equipmentList = [
  'Sound system',
  'Microphones',
  'Lighting',
  'Stage setup',
  'Instruments',
  'Audio/Visual equipment',
];

export default function Step3PerformerDetails({ defaultValues, onNext, onBack }: Step3PerformerProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(defaultValues.equipmentNeeded || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PerformerDetailsFormData>({
    resolver: zodResolver(performerDetailsSchema),
    defaultValues: {
      ...defaultValues,
      equipmentNeeded: selectedEquipment,
    },
  });

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment) ? prev.filter((e) => e !== equipment) : [...prev, equipment]
    );
  };

  const onSubmit = (data: PerformerDetailsFormData) => {
    onNext({ ...data, equipmentNeeded: selectedEquipment });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-light text-noir mb-3">
          Performer Requirements
        </h2>
        <p className="text-charcoal/70 font-body font-light text-sm tracking-wide">
          Define your performance needs
        </p>
      </div>

      <div className="space-y-5">
        <Input
          label="Performance Type"
          placeholder="e.g., Live band, DJ, Solo artist, Dance troupe"
          {...register('performanceType')}
          error={errors.performanceType?.message}
        />

        <Select
          label="Performance Duration"
          options={durationOptions}
          {...register('duration')}
          error={errors.duration?.message}
        />

        <Input
          label="Genre / Style"
          placeholder="e.g., Jazz, Rock, Classical, Electronic"
          {...register('genre')}
          error={errors.genre?.message}
        />

        <Select
          label="Expected Audience Size"
          options={audienceSizeOptions}
          {...register('audienceSize')}
          error={errors.audienceSize?.message}
        />

        <div>
          <label className="block text-sm font-body font-light text-charcoal mb-3 tracking-wide">
            Equipment Needed
          </label>
          <div className="space-y-3 bg-ivory border border-champagne p-5">
            {equipmentList.map((equipment) => (
              <Controller
                key={equipment}
                name="equipmentNeeded"
                control={control}
                render={() => (
                  <Checkbox
                    label={equipment}
                    checked={selectedEquipment.includes(equipment)}
                    onChange={() => toggleEquipment(equipment)}
                  />
                )}
              />
            ))}
          </div>
        </div>

        <Textarea
          label="Additional Notes (Optional)"
          placeholder="Special requirements, setup needs, or preferences"
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