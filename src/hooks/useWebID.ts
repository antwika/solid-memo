import useTypedSession from './useTypedSession';

export default function useWebID() {
  const session = useTypedSession();
  return session ? session.data.token.sub : undefined;
}
