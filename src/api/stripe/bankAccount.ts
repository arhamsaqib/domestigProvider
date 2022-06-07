import {STRIPE_BASE_URL} from '../../constants/url';

interface AccountTokenProps {
  country: string;
  currency: string;
  name: string;
  type: string;
  accountNumber: string;
  customer: string;
  routingNumber: string;
}

export const createAccountToken = async (data: AccountTokenProps) => {
  const endpoint = STRIPE_BASE_URL + '/v1/tokens';
  const query =
    '?bank_account[country]=' +
    data.country +
    '&bank_account[currency]=' +
    data.currency +
    '&bank_account[account_holder_name]=' +
    data.name +
    '&bank_account[account_holder_type]=' +
    data.type +
    '&bank_account[account_number]=' +
    data.accountNumber +
    '&bank_account[routing_number]=' +
    data.routingNumber;
  return fetch(endpoint + query, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' +
        'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};
