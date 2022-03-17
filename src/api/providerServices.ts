import {del, get, post, put} from './requestStructure';

export interface ProviderServices {
  provider_id?: string;
  status?: string;
  rate?: string;
  services?: any;
  category_name?: string;
}

const endpoint = 'provider-services';

export async function saveProviderServices(data: ProviderServices) {
  const res = await post(endpoint, data);
  return res;
}
export async function getProviderServiceInfo(data: ProviderServices) {
  const res = await post(endpoint, data);
  return res;
}
export async function showProviderServicesByCategoryName(data: {
  provider_id?: string;
  category_name?: string;
}) {
  const endp = 'provider-services-by-categoryname';
  const res = await post(endp, data);
  return res;
}
