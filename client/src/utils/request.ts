import { BACK_BASE_URL, BACK_VERSION } from '@constant/envs';

const BASE_URL = `${BACK_BASE_URL}/api/${BACK_VERSION}`;

interface fetchParams {
  url: string;
  query?: { [key: string]: string };
  body?: Object;
  headerOptions?: HeadersInit;
  options?: RequestInit;
}

const customFetch =
  (method: string) =>
  async ({ url, query, body, headerOptions, options }: fetchParams) => {
    const query_string = query
      ? `?${Object.entries(query)
          .reduce((prev, [key, value]) => [...prev, `${key}=${value}`], [] as Array<string>)
          .join('&')}`
      : '';

    const init = {
      ...(options ?? {}),
      method,
      credentials: 'include' as RequestCredentials,
      headers: {
        ...(headerOptions ?? {}),
        'Content-Type': 'application/json',
      },
    };
    if (method === 'POST' || method === 'PATCH') init['body'] = JSON.stringify(body ?? {});
    const resolve = await fetch(`${BASE_URL}${url}${query_string}`, init);
    const { status } = resolve;
    const json = await resolve.json();
    return { json, status };
  };

const request = {
  get: customFetch('GET'),
  post: customFetch('POST'),
  patch: customFetch('PATCH'),
};

export default request;
