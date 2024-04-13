import { Logger } from 'winston';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { handleRequests } from './handle-requests';
import { CommunityRole } from '@alkemio/client-lib';

export const assignUserAsLead = (
  client: AlkemioPopulatorClient,
  logger: Logger,
  communityId: string,
  userNameIds: string[]
) => {
  const requests = userNameIds.map(nameId =>
    client.assignCommunityRoleToUser(nameId, communityId, CommunityRole.Lead)
  );

  return handleRequests(
    logger,
    requests,
    'Assigning user as community lead failed with:'
  );
};
