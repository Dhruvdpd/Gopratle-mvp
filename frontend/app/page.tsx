'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1EventDetails from '@/components/steps/Step1EventDetails';
import Step2Category from '@/components/steps/Step2Category';
import Step3PlannerDetails from '@/components/steps/Step3PlannerDetails';
import Step3PerformerDetails from '@/components/steps/Step3PerformerDetails';
import Step3CrewDetails from '@/components/steps/Step3CrewDetails';
import Step4Review from '@/components/steps/Step4Review';
import ProgressIndicator from '@/components/ProgressIndicator';
import { createRequirement } from '@/lib/api';
import type {
  EventDetailsFormData,
  CategoryFormData,
  PlannerDetailsFormData,
  PerformerDetailsFormData,
  CrewDetailsFormData,
} from '@/lib/schemas';

export default function HomePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [eventData, setEventData] = useState<Partial<EventDetailsFormData>>({});
  const [categoryData, setCategoryData] = useState<Partial<CategoryFormData>>({});
  const [detailsData, setDetailsData] = useState<any>({});

  const handleStep1Next = (data: EventDetailsFormData) => {
    setEventData(data);
    setCurrentStep(2);
  };

  const handleStep2Next = (data: CategoryFormData) => {
    setCategoryData(data);
    setCurrentStep(3);
  };

  const handleStep3Next = (
    data: PlannerDetailsFormData | PerformerDetailsFormData | CrewDetailsFormData
  ) => {
    setDetailsData(data);
    setCurrentStep(4);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        event: {
          name: eventData.name!,
          type: eventData.type!,
          startDate: eventData.startDate!,
          endDate: eventData.endDate,
          location: eventData.location!,
          venue: eventData.venue,
        },
        category: categoryData.category as 'planner' | 'performer' | 'crew',
        details: detailsData,
      };

      const response = await createRequirement(payload);

      if (response.success) {
        router.push('/success');
      } else {
        setError(response.message || 'Failed to create requirement');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1EventDetails defaultValues={eventData} onNext={handleStep1Next} />;
      case 2:
        return (
          <Step2Category
            defaultValues={categoryData}
            onNext={handleStep2Next}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        if (categoryData.category === 'planner') {
          return (
            <Step3PlannerDetails
              defaultValues={detailsData}
              onNext={handleStep3Next}
              onBack={() => setCurrentStep(2)}
            />
          );
        } else if (categoryData.category === 'performer') {
          return (
            <Step3PerformerDetails
              defaultValues={detailsData}
              onNext={handleStep3Next}
              onBack={() => setCurrentStep(2)}
            />
          );
        } else if (categoryData.category === 'crew') {
          return (
            <Step3CrewDetails
              defaultValues={detailsData}
              onNext={handleStep3Next}
              onBack={() => setCurrentStep(2)}
            />
          );
        }
        return null;
      case 4:
        return (
          <Step4Review
            eventData={eventData}
            categoryData={categoryData}
            detailsData={detailsData}
            onBack={() => setCurrentStep(3)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-pearl py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-display font-light text-noir mb-3 tracking-tight">
            Event Requirements
          </h1>
          <p className="text-charcoal/70 font-body font-light tracking-wide">
            A refined approach to event planning
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={4} />

        {/* Error Display */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 p-4 animate-slideInRight">
            <p className="text-sm text-red-800 font-body font-light">{error}</p>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-ivory border border-champagne p-8 md:p-12 shadow-sm">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-charcoal/50 font-body font-light tracking-wider uppercase">
            Step {currentStep} of 4
          </p>
        </div>
      </div>
    </div>
  );
}