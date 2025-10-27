import type { LivenessChallengeRequest, LivenessChallengeResponse } from '@innovatrics/dis-client-sdk';

import { createCustomerLivenessApi, createLivenessRecordsChallengeApi } from '../../api/customersLivenessApi.js';
import createCustomer from '../../api/utils/createCustomer.js';
import { getLastURLSegment } from '../../api/utils/getLastURLSegment.js';

export const createLivenessRecordsChallengeResolver = async (
  livenessType: LivenessChallengeRequest['type'],
  customerApiLink?: string,
  isLivenessCreated?: boolean,
): Promise<LivenessChallengeResponse> => {
  const customerLink = await createCustomer(customerApiLink);

  if (!isLivenessCreated) {
    await createCustomerLivenessApi(customerLink);
  }

  const customerId = getLastURLSegment(customerLink);

  return createLivenessRecordsChallengeApi(customerId, livenessType);
};
