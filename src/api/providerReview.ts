import {del, get, post, put} from './requestStructure';

export interface Review {
  provider_id?: string;
  booking_id?: string;
  customer_id?: string;
  rating?: string;
  stars?: string;
}

const endpoint = 'provider-reviews';

export async function getProviderReviews(providerId: any) {
  const res = await get(endpoint + '/' + providerId);
  return res;
}
