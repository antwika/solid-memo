import { getServerEnv } from 'src/lib/env';
import { LoggerInstance } from 'next-auth';

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
  debug: getServerEnv().NODE_ENV !== "production" && getServerEnv().NEXTAUTH_DEBUG === "1" ? (code, metadata) => {
    console.log('[NEXTAUTH DEBUG] ', metadata, code);
  } : undefined,
};

export default logger;
