import { LoggerInstance } from 'next-auth';
import env from '@/lib/env';

const logger: Partial<LoggerInstance> & { info: (...params: any[]) => void} = {
  info(...params: string[]) {
    console.log('[NEXTAUTH INFO] ', ...params);
  },
  error(code, metadata) {
    console.log('[NEXTAUTH ERROR] ', metadata, code);
  },
  warn(code) {
    console.log('[NEXTAUTH WARNING] ', code);
  },
  debug: env.NODE_ENV !== "production" && env.NEXTAUTH_DEBUG === "1" ? (code, metadata) => {
    console.log('[NEXTAUTH DEBUG] ', metadata, code);
  } : undefined,
};

export default logger;
