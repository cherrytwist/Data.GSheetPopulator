import { Logger } from 'winston';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { handleRequests } from './handle-requests';
import { CommunityRole } from '@alkemio/client-lib';

export const assignOrgsAsMember = (
  client: AlkemioPopulatorClient,
  logger: Logger,
  communityId: string,
  orgIds: string[]
) => {
  const requests = orgIds.map(orgId =>
    client.assignCommunityRoleToOrg(orgId, communityId, CommunityRole.Member)
  );

  return handleRequests(
    logger,
    requests,
    'Assigning org as community member failed with:'
  );
};
