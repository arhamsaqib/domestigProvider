import {del, get, post} from './requestStructure';

export async function getProviderIncomingRequests(providerId: string) {
  var endpoint = 'provider-incoming-requests';
  const res = await get(endpoint + '/' + providerId);
  return res;
}
