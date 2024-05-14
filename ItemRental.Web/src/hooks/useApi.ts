/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { useCallback } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

interface RequestParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Add more methods if needed
  authenticate: boolean; // Use authentication header if true
  body?: Record<string, any>; // Use Record<string, any> for flexible body data
}

const useApi = () => {
  const authHeader = useAuthHeader() as string;

  const request = useCallback(({ endpoint, method, authenticate, body }: RequestParams) => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json; charset=UTF-8');
    if (authenticate) {
      requestHeaders.set('Authorization', authHeader);
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      body: body instanceof FormData ? body : JSON.stringify(body),
    };
    return fetch(endpoint, requestOptions).then(async (result: any) => {
      if (result.ok) {
        await new Promise((resolve) => setTimeout(resolve, 0));
        return result.status === 200 ? await result.json() : {};
      }
      const errorData = await result.json();

      throw {
        status: result.status,
        statusText: result.statusText,
        code: errorData.code,
        description: errorData.description,
      };
    });
  }, []);

  return request;
};

export default useApi;
