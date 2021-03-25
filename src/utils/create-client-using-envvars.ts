import * as dotenv from 'dotenv';
import { CherrytwistClient } from '@cherrytwist/client-lib';

export const createClientUsingEnvVars = async () => {
  dotenv.config();

  const server = process.env.CT_SERVER || 'http://localhost:4000/graphql';
  const accessToken = process.env.CT_ACCESS_TOKEN || 'eyNotSet';
  const ctClient = new CherrytwistClient({
    graphqlEndpoint: server,
    accessToken: `${accessToken}`,
  });

  return ctClient;
};
