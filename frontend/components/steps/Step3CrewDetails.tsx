import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { crewDetailsSchema, CrewDetailsFormData } from '@/lib/schemas';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useState } from 'react';

interface Step3CrewProps {
  defaultValues: Partial<CrewDetailsFormData>;
  onNext: (data: CrewDetailsFormData) => void;
  onBack: () => void;
}

const teamSizeOptions = [
  { value: '1-5', label: '1-5 people' },
  { value: '6-10', label: '6-10 people' },
  { value: '11-20', label: '11-20 people' },
  { value: '21-50', label: '21-50 people' },
  { value: '50+', label: '50+ people' },
];

const shiftDurationOptions = [
  { value: '4-hours', label: '4 hours' },
  { value: '6-hours', label: '6 hours' },
  { value: '8-hours', label: '8 hours' },
  { value: '10-hours', label: '10 hours' },
  { value: '12-hours+', label: '12+ hours' },
];

const experienceLevelOptions = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'experienced', label: 'Experienced' },
  { value: 'expert', label: 'Expert' },
];

const rolesList = [
  'Setup crew',
  'Security personnel',
  'Catering staff',
  'Technical support',
  'Cleanup crew',
  'Registration staff',
];

const skillsList = [
  'Event setup/breakdown',
  'Customer service',
  'Technical expertise',
  'Safety protocols',
  'Team coordination',
  'Problem solving',
];

export default function Step3CrewDetails({ defaultValues, onNext, onBack }: Step3CrewProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(defaultValues.roles || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(defaultValues.skillsRequired || []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CrewDetailsFormData>({
    resolver: zodResolver(crewDetailsSchema),
    defaultValues: {
      ...defaultValues,
      roles: selectedRoles,
      skillsRequired: selectedSkills,
    },
  });

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const onSubmit = (data: CrewDetailsFormData) => {
    onNext({ ...data, roles: selectedRoles, skillsRequired: selectedSkills });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fadeInUp">
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-display font-light text-noir mb-3">
          Crew Requirements
        </h2>
        <p className="text-charcoal/70 font-body font-light text-sm tracking-wide">
          Specify your crew and staffing needs
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-body font-light text-charcoal mb-3 tracking-wide">
            Required Roles
          </label>
          <div className="space-y-3 bg-ivory border border-champagne p-5">
            {rolesList.map((role) => (
              <Controller
                key={role}
                name="roles"
                control={control}
                render={() => (
                  <Checkbox
                    label={role}
                    checked={selectedRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                  />
                )}
              />
            ))}
          </div>
          {errors.roles && (
            <p className="mt-1.5 text-xs text-red-600 font-body font-light animate-slideInRight">
              {errors.roles.message}
            </p>
          )}
        </div>

        <Select
          label="Team Size"
          options={teamSizeOptions}
          {...register('teamSize')}
          error={errors.teamSize?.message}
        />

        <Select
          label="Shift Duration"
          options={shiftDurationOptions}
          {...register('shiftDuration')}
          error={errors.shiftDuration?.message}
        />

        <div>
          <label className="block text-sm font-body font-light text-charcoal mb-3 tracking-wide">
            Skills Required
          </label>
          <div className="space-y-3 bg-ivory border border-champagne p-5">
            {skillsList.map((skill) => (
              <Controller
                key={skill}
                name="skillsRequired"
                control={control}
                render={() => (
                  <Checkbox
                    label={skill}
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                )}
              />
            ))}
          </div>
          {errors.skillsRequired && (
            <p className="mt-1.5 text-xs text-red-600 font-body font-light animate-slideInRight">
              {errors.skillsRequired.message}
            </p>
          )}
        </div>

        <Select
          label="Experience Level"
          options={experienceLevelOptions}
          {...register('experienceLevel')}
          error={errors.experienceLevel?.message}
        />

        <Textarea
          label="Additional Notes (Optional)"
          placeholder="Special requirements, certifications needed, or other details"
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