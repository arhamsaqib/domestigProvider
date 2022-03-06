import {del, get, post} from './requestStructure';

export interface RegisterProvider {
  fuid: string;
  name: string;
  email: string;
  status: string;
  phone: string;
  location?: string;
  avatar?: string;
  longitude?: string;
  latitude?: string;
  country?: string;
}

const endpoint = 'provider';

export async function createProvider(data: RegisterProvider) {
  const res = await post(endpoint, data);
  return res;
}
export async function showProviderByFUID(fuid: string) {
  const res = await get(endpoint + '/' + fuid);
  return res;
}
export async function getProviderById(id: string) {
  var endpoint1 = 'get-provider-by-id';
  const res = await get(endpoint1 + '/' + id);
  return res;
}

export async function deleteProvider(id: string) {
  const res = await del(endpoint + '/' + id);
  return res;
}
