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
  debug: (code, metadata) => {
    console.log('[NEXTAUTH DEBUG] ', metadata, code);
  },
};

export default logger;
