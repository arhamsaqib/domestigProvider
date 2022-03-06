import {del, get, post} from './requestStructure';

export async function getCustomerById(id: string) {
  var endpoint = 'get-customer-by-id';
  const res = await get(endpoint + '/' + id);
  return res;
}
