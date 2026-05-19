import { z } from 'zod';

export const updateChildHealthEducation = z.object({
  health_record: z.string().optional(),
  education_level: z.string().optional(),
});

export type UpdateChildHealthEducationBody = z.infer<
  typeof updateChildHealthEducation
>;
