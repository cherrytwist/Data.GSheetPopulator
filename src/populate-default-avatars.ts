import { createLogger } from './utils/create-logger';
import * as dotenv from 'dotenv';
import { createConfigUsingEnvVars } from './utils/create-config-using-envvars';
import { AlkemioPopulatorClient } from './client/AlkemioPopulatorClient';

const main = async () => {
  dotenv.config();
  const logger = createLogger();

  const config = createConfigUsingEnvVars();
  const alkemioPopulatorClient = new AlkemioPopulatorClient(config, logger);
  await alkemioPopulatorClient.initialise();
  logger.info(
    `Alkemio server: ${alkemioPopulatorClient.config.apiEndpointPrivateGraphql}`
  );

  const users = await alkemioPopulatorClient.alkemioLibClient.users();
  logger.info(`Users count: ${users?.length}`);
  if (users) {
    for (const user of users) {
      const avatar = user.profile.visual?.uri;
      logger.info(`user (${user.profile.displayName}) has avatar: ${avatar}`);
      if (!avatar || avatar.length == 0) {
        const profileID = user.profile?.id;
        if (profileID) {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          await alkemioPopulatorClient.alkemioLibClient.updateProfile(
            profileID,
            `https://eu.ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=${randomColor}&color=ffffff`
          );
        }
      }
    }
  }
};

main().catch(error => {
  console.error(error);
});
