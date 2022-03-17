import {del, get, post} from './requestStructure';

const endpoint = 'customer-notifications';

interface notifications {
  provider_id?: string;
  customer_id?: string;
  booking_id?: string;
  description?: string;
  category?: string;
  status?: string;
}

export async function generateCustomerNotification(data: notifications) {
  const res = await post(endpoint, data);
  return res;
}
export async function getCustomerNotifications(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
