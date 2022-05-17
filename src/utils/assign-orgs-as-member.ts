import { AlkemioClient } from '@alkemio/client-lib';
import { Logger } from 'winston';
import { handleRequests } from './handle-requests';

export const assignOrgsAsMember = (
  client: AlkemioClient,
  logger: Logger,
  communityId: string,
  orgIds: string[]
) => {
  const requests = orgIds.map(orgId =>
    client.assignOrganizationAsCommunityMember(communityId, orgId)
  );

  return handleRequests(
    logger,
    requests,
    'Assigning org as community member failed with:'
  );
};
