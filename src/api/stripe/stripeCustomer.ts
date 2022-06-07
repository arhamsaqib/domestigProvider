import {STRIPE_BASE_URL} from '../../constants/url';

interface StripeUserProps {
  type?: 'custom' | 'express' | 'standard';
  country?: string;
  email?: string;
  business_type?: 'individual' | 'company' | 'non_profit';
}
interface StripeUpdateProps {
  account_token: string;
}

export const createStripeAccount = async (data: StripeUserProps) => {
  const endpoint = STRIPE_BASE_URL + '/v1/accounts';
  const query =
    '?type=' +
    data.type +
    '&country=' +
    data.country +
    '&email=' +
    data.email +
    '&capabilities[card_payments][requested]=true' +
    '&capabilities[transfers][requested]=true' +
    '&business_type=' +
    data.business_type;
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
export const getStripeCustomer = async (stripeId: string) => {
  const endpoint = STRIPE_BASE_URL + '/v1/accounts/' + stripeId;

  return fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Bearer ' +
        'sk_test_51L2bzJDPoMFOHLWbr12HARtXLyBiuCJzMVKn1Ala2ETrQAZDMPlvaNsCMGayB5Oq5iZegDFSJSZ9PQ1ucFE58ooz00xRF9eRO3',
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error, 'error');
    });
};

export const updateStripeUserAccount = async (
  data: StripeUpdateProps,
  stripeId: any,
) => {
  const endpoint = STRIPE_BASE_URL + '/v1/accounts/' + stripeId;
  const query = '?external_account=' + data.account_token;
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
