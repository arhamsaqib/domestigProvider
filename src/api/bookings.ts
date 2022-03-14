import {del, get, post, put} from './requestStructure';

export interface bookingSubmission {
  provider_id?: string;
  verified?: string;
  instructions?: string;
  instructions_image?: string;
  latitude?: string;
  longitude?: string;
  services?: string;
  location?: string;
  status?: string;
}

const endpoint = 'bookings';

export async function updateBooking(
  bookingId: string,
  data: bookingSubmission,
) {
  const res = await put(endpoint + '/' + bookingId, data);
  return res;
}
export async function getProviderAllBookings(providerId: string) {
  const endp = 'show-provider-bookings';
  const res = await get(endp + '/' + providerId);
  return res;
}
