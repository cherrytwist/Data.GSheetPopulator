import * as dotenv from 'dotenv';
import { CherrytwistClient } from '@cherrytwist/client-lib';

export const createClientUsingEnvVars = async () => {
  dotenv.config();

  const server = process.env.CT_SERVER || 'http://localhost:4455/graphql';
  const apiEndpointConfig = () =>
    process.env.AUTH_ORY_KRATOS_PUBLIC_BASE_URL ?? 'http://localhost:4433/';
  const ctClient = new CherrytwistClient();
  await ctClient.configureGraphqlClient({
    graphqlEndpoint: server,
    authInfo: {
      credentials: {
        email: process.env.AUTH_ADMIN_EMAIL ?? 'admin@cherrytwist.org',
        password: process.env.AUTH_ADMIN_PASSWORD ?? '!Rn5Ez5FuuyUNc!',
      },
      apiEndpointFactory: apiEndpointConfig,
    },
  });
  return ctClient;
};
