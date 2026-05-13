import { z } from 'zod';

export const listParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(val => Math.max(Number(val), 1)),

  limit: z
    .string()
    .optional()
    .default('5')
    .transform(val => Math.min(Math.max(Number(val), 1), 50)),

  search: z.string().optional().default(''),
});

export type ListParams = z.infer<typeof listParamsSchema>;
