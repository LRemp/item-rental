import { useCallback } from 'react';

interface RequestParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Add more methods if needed
  authenticate: boolean; // Use authentication header if true
  body?: Record<string, any>; // Use Record<string, any> for flexible body data
}

const useApi = () => {
  const request = useCallback(({ endpoint, method, body }: RequestParams) => {
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: body ? JSON.stringify(body) : undefined,
    };
    console.log(endpoint, requestOptions);
    return fetch(endpoint, requestOptions)
      .then(async (resp) => {
        console.log(resp);
        return resp.json();
      })
      .catch((err) => {
        console.error(err);
        throw new Error('Failed to fetch data');
      });
  }, []);

  return request;
};

export default useApi;
