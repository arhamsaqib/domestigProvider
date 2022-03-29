import {get} from './requestStructure';

const endpoint = 'version-p';

export async function getLatestVersion() {
  const res = await get(endpoint);
  return res;
}
