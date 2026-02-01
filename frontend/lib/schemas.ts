import { z } from 'zod';

// Step 1: Event Details Schema
export const eventDetailsSchema = z.object({
  name: z.string().min(3, 'Event name must be at least 3 characters'),
  type: z.enum(['wedding', 'corporate', 'concert', 'festival', 'conference', 'party', 'other'], {
    required_error: 'Please select an event type',
  }),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  venue: z.string().optional(),
}).refine(
  (data) => {
    if (data.endDate) {
      return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
  },
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
);

// Step 2: Category Selection Schema
export const categorySchema = z.object({
  category: z.enum(['planner', 'performer', 'crew'], {
    required_error: 'Please select a requirement category',
  }),
});

// Step 3: Category-specific Details Schemas
export const plannerDetailsSchema = z.object({
  experienceYears: z.string().min(1, 'Experience is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  budget: z.string().min(1, 'Budget range is required'),
  guestCount: z.string().min(1, 'Expected guest count is required'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  additionalNotes: z.string().optional(),
});

export const performerDetailsSchema = z.object({
  performanceType: z.string().min(1, 'Performance type is required'),
  duration: z.string().min(1, 'Duration is required'),
  genre: z.string().min(1, 'Genre is required'),
  equipmentNeeded: z.array(z.string()),
  audienceSize: z.string().min(1, 'Expected audience size is required'),
  additionalNotes: z.string().optional(),
});

export const crewDetailsSchema = z.object({
  roles: z.array(z.string()).min(1, 'Select at least one role'),
  teamSize: z.string().min(1, 'Team size is required'),
  shiftDuration: z.string().min(1, 'Shift duration is required'),
  skillsRequired: z.array(z.string()).min(1, 'Select at least one skill'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  additionalNotes: z.string().optional(),
});

// Combined schema for validation
export const getDetailsSchema = (category: string) => {
  switch (category) {
    case 'planner':
      return plannerDetailsSchema;
    case 'performer':
      return performerDetailsSchema;
    case 'crew':
      return crewDetailsSchema;
    default:
      return z.object({});
  }
};

// Full form schema (for final validation)
export const fullFormSchema = eventDetailsSchema
  .and(categorySchema)
  .and(
    z.object({
      details: z.record(z.any()),
    })
  );

export type EventDetailsFormData = z.infer<typeof eventDetailsSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type PlannerDetailsFormData = z.infer<typeof plannerDetailsSchema>;
export type PerformerDetailsFormData = z.infer<typeof performerDetailsSchema>;
export type CrewDetailsFormData = z.infer<typeof crewDetailsSchema>;