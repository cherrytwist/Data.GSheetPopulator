import { isPromiseFulfilled } from './is-promise-fulfilled';
import { Logger } from 'winston';

export const handleRequests = <T>(
  logger: Logger,
  requests: Promise<T>[],
  errorMsg: string
) => {
  return Promise.allSettled(requests).then(results =>
    results.map(result => {
      if (isPromiseFulfilled(result)) {
        return result.value;
      } else {
        logger.error(errorMsg, result.reason);
        return undefined;
      }
    })
  );
};
