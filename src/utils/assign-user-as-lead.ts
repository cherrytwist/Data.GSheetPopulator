import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { handleRequests } from './handle-requests';

export const assignUserAsLead = (
  client: AlkemioClient,
  logger: Logger,
  communityId: string,
  userNameIds: string[]
) => {
  const requests = userNameIds.map(nameId =>
    client.assignOrganizationAsCommunityLead(communityId, nameId)
  );

  return handleRequests(
    logger,
    requests,
    'Assigning user as community lead failed with:'
  );
};
