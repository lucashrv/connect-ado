import { z } from 'zod';

export const createInstitutionBodySchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha precisa de pelo menos 6 caracteres'),
  name: z.string().min(1, 'Nome da instituição é obrigatório'),
  cnpj: z.string().length(14, 'CNPJ precisa de pelo menos 14 dígitos'),
  phone: z.string().min(10, 'Telefone é obrigatório'),
  full_address: z.string().min(5, 'Endereço é obrigatório'),
  legal_representative_name: z
    .string()
    .min(1, 'Nome completo do responsável é obrigatório'),
  foundation_date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Formato de data inválido',
  }),
  license_number: z.string().min(1, 'Número da licença é obrigatório'),
  website_url: z.url('Link do site inválido').optional().or(z.literal('')),
});

export type CreateInstitutionBody = z.infer<typeof createInstitutionBodySchema>;
