import * as dotenv from 'dotenv';
import { CherrytwistClient } from '@cherrytwist/client-lib';

export const createClientUsingEnvVars = async () => {
  dotenv.config();

  const server = process.env.CT_SERVER || 'http://localhost:4455/graphql';
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: server,
  });

  const authenticationEnabled = await ctClient.isAuthenticationEnabled();
  if (authenticationEnabled) {
    ctClient.config.authInfo = {
      credentials: {
        email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@cherrytwist.org',
        password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
      },
    };

    await ctClient.enableAuthentication();
  }
  return ctClient;
};
