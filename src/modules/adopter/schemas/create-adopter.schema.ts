import { z } from 'zod';

export const createAdopterBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  full_name: z.string().min(1, 'Nome completo é obrigatório'),
  cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
  phone: z.string().min(10, 'Telefone é obrigatório'),
  birth_date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Data de nascimento inválida',
  }),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().min(5, 'Endereço é obrigatório'),
  occupation: z.string(),
});

export type CreateAdopterBody = z.infer<typeof createAdopterBodySchema>;
