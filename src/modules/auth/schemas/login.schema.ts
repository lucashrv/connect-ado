import { z } from 'zod';

export const loginBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
