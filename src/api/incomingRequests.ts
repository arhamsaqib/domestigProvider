import {del, get, post} from './requestStructure';

export async function getProviderIncomingRequests(providerId: string) {
  var endpoint = 'provider-incoming-requests';
  const res = await get(endpoint + '/' + providerId);
  return res;
}
export async function rejectIncomingRequest(data: {
  provider_id: string;
  booking_id: string;
}) {
  var endpoint = 'reject-request';
  const res = await post(endpoint, data);
  return res;
}
export async function acceptIncomingRequest(data: {
  provider_id: string;
  booking_id: string;
}) {
  var endpoint = 'accept-request';
  const res = await post(endpoint, data);
  return res;
}
