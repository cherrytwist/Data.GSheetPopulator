import { Logger } from 'winston';
import { AlkemioPopulatorClient } from '../client/AlkemioPopulatorClient';
import { handleRequests } from './handle-requests';

export const assignUserAsMember = (
  client: AlkemioPopulatorClient,
  logger: Logger,
  communityId: string,
  userNameIds: string[]
) => {
  const requests = userNameIds.map(nameId =>
    client.alkemioLibClient.assignUserAsCommunityMember(communityId, nameId)
  );

  return handleRequests(
    logger,
    requests,
    'Assigning user as community lead failed with:'
  );
};
