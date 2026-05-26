import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  content: z.string().min(5, 'O conteúdo deve ter pelo menos 5 caracteres'),
  photo_url: z.url('URL da foto inválida').nullable().optional(),
});

export type CreatePostBody = z.infer<typeof createPostSchema>;
