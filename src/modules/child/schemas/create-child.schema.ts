import { z } from 'zod';

export const createChildBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  full_name: z.string().min(1, 'Nome completo é obrigatório'),
  nickname: z.string().optional(),
  birth_date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Data de nascimento inválida',
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
});

export type CreateChildBody = z.infer<typeof createChildBodySchema>;
