import { envSchema } from './env.schema';

export function validateEnv(config: Record<string, unknown>) {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    console.error('Invalid .env:');

    parsed.error.issues.forEach(err => {
      console.error(`- ${err.path.join('.')}: ${err.message}`);
    });

    process.exit(1);
  }

  return parsed.data;
}
