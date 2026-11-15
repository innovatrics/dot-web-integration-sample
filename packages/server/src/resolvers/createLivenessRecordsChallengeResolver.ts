import type { LivenessChallengeRequest, LivenessChallengeResponse } from '@innovatrics/dis-client-sdk';

import { createCustomerLivenessApi, createLivenessRecordsChallengeApi } from '../api/customersLivenessApi.ts';
import { createCustomer } from '../api/utils/customer.ts';

export const createLivenessRecordsChallengeResolver = async (
  livenessType: LivenessChallengeRequest['type'],
  customerId: string,
  isLivenessCreated?: boolean,
): Promise<LivenessChallengeResponse> => {
  const customerLink = await createCustomer(customerId);

  if (!isLivenessCreated) {
    await createCustomerLivenessApi(customerLink);
  }

  return createLivenessRecordsChallengeApi(customerId, livenessType);
};
