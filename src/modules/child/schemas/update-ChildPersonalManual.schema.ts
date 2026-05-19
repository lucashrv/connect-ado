import { z } from 'zod';

export const updateChildManualSchema = z.object({
  daily_routine: z.string().optional(),
  favorite_food: z.string().optional(),
  favorite_music: z.string().optional(),
  favorite_activity: z.string().optional(),
  hobbies: z.string().optional(),
  study_habits: z.string().optional(),
  fears: z.string().optional(),
  notes: z.string().optional(),
});

export type UpdateChildManualBody = z.infer<typeof updateChildManualSchema>;
