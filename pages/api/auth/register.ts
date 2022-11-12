import { registerClient } from "src/lib/solid";

let client: { clientId: string, clientSecret: string } | undefined;

export const lazyRegisterClient = async (idpBaseUrl: string) => {
  if (!client) client = await registerClient(idpBaseUrl);
  return client;
}
