import {del, get, post} from './requestStructure';

const endpoint = 'provider-documents';

interface Save {
  provider_id: string;
  idName?: string;
  name?: string;
  image?: string;
}

export async function saveProviderDocument(data: Save) {
  const res = await post(endpoint, data);
  return res;
}
export async function getProviderDocuments(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
