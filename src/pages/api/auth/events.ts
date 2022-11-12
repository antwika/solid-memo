import { EventCallbacks } from 'next-auth';
import logger from './logger';

const events: Partial<EventCallbacks> = {
  signIn: (user) => {
    logger.info('User successfully signed in:', user.user, 'provider:', user.account!.provider);
  },
  signOut: (token) => {
    logger.info('Signing out user:', token.token.webid);
  },
};

export default events;
