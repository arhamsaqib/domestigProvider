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
  rate?: string;
}) {
  var endpoint = 'accept-request';
  const res = await post(endpoint, data);
  return res;
}
export async function getProviderInProgress(id: string) {
  var endpoint = 'provider-inprogress-booking';
  const res = await get(endpoint + '/' + id);
  return res;
}
export async function verifyBooking(bookingId: string) {
  var endpoint = 'verify-booking';
  const res = await get(endpoint + '/' + bookingId);
  return res;
}
