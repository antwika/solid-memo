import { z } from 'zod';

export const getClientEnv = () => {
  const envSchema = z.object({
    NODE_ENV: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
  });
  return envSchema.parse(process.env);
}

export const getServerEnv = () => {
  const envSchema = z.object({
    NODE_ENV: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_DEBUG: z.string(),
  });
  return envSchema.parse(process.env);
}
