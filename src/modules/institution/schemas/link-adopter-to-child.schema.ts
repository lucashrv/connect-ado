import { z } from 'zod';

export const linkAdopterToChildBodySchema = z.object({
  adopterId: z.uuid(),
  childId: z.uuid(),
});

export type LinkAdopterToChildBody = z.infer<
  typeof linkAdopterToChildBodySchema
>;
