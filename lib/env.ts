import { z } from 'zod';

let envSchema = z.object({
  NODE_ENV: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_WEBID: z.string(),
  NEXTAUTH_DEBUG: z.string(),
  NEXT_PUBLIC_IDP_BASE_URL: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
