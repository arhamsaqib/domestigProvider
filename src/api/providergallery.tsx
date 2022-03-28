import {del, get, post} from './requestStructure';

const endpoint = 'provider-gallery';

interface Generate {
  provider_id?: string;
  image?: string;
}

export async function saveProviderGalleryImage(data: Generate) {
  const res = await post(endpoint, data);
  return res;
}
export async function getProviderGallery(id: string) {
  const res = await get(endpoint + '/' + id);
  return res;
}
