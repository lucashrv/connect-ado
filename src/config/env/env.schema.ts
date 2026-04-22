import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  REDIS_URL: z.string().optional(),
  JWT_SECRET: z.string().min(10),
  SALT: z.coerce.number(),
});
