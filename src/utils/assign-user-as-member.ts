import { Logger } from 'winston';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { handleRequests } from './handle-requests';
import { CommunityRole } from '@alkemio/client-lib';

export const assignUserAsMember = (
  client: AlkemioPopulatorClient,
  logger: Logger,
  communityId: string,
  userNameIds: string[]
) => {
  const requests = userNameIds.map(nameId =>
    client.assignCommunityRoleToUser(communityId, nameId, CommunityRole.Member)
  );

  return handleRequests(
    logger,
    requests,
    'Assigning user as community lead failed with:'
  );
};
