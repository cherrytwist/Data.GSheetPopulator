import { Logger } from 'winston';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { handleRequests } from './handle-requests';

export const assignOrgsAsMember = (
  client: AlkemioPopulatorClient,
  logger: Logger,
  communityId: string,
  orgIds: string[]
) => {
  const requests = orgIds.map(orgId =>
    client.alkemioLibClient.assignOrganizationAsCommunityMember(
      communityId,
      orgId
    )
  );

  return handleRequests(
    logger,
    requests,
    'Assigning org as community member failed with:'
  );
};
