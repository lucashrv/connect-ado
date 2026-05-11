import { z } from 'zod';

export const linkAdopterBodySchema = z.object({
  email: z.email('E-mail inválido'),
});

export type LinkAdopterBody = z.infer<typeof linkAdopterBodySchema>;
