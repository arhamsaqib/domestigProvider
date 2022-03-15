import {del, get, post, put} from './requestStructure';

export interface Review {
  provider_id?: string;
  booking_id?: string;
  customer_id?: string;
  rating?: string;
  stars?: string;
}

const endpoint = 'customer-reviews';

export async function saveCustomerReview(data: Review) {
  const res = await post(endpoint, data);
  return res;
}
export async function getCustomerReviews(customerId: any) {
  const res = await get(endpoint + '/' + customerId);
  return res;
}
