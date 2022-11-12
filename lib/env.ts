import { z } from 'zod';

let envSchema = z.object({
  NODE_ENV: z.string(),
  BASE_URL: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_DEBUG: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
