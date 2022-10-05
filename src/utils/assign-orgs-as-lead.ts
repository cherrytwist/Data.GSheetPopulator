import { Logger } from 'winston';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { handleRequests } from './handle-requests';

export const assignOrgsAsLead = (
  client: AlkemioPopulatorClient,
  logger: Logger,
  communityId: string,
  orgIds: string[]
) => {
  const requests = orgIds.map(orgId =>
    client.alkemioLibClient.assignOrganizationAsCommunityLead(
      communityId,
      orgId
    )
  );

  return handleRequests(
    logger,
    requests,
    'Assigning org as community lead failed with:'
  );
};
