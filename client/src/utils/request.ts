import { BACK_BASE_URL, BACK_VERSION } from '@constant/envs';

const BASE_URL = `${BACK_BASE_URL}/api/${BACK_VERSION}`;

interface fetchParams {
  url: string;
  query?: { [key: string]: string };
  body?: FormData | Object;
  headerOptions?: HeadersInit;
  options?: RequestInit;
}

const customFetch =
  (method: string) =>
  async ({ url, query, body = new FormData(), headerOptions, options }: fetchParams) => {
    const query_string = query
      ? `?${Object.entries(query)
          .reduce((prev, [key, value]) => [...prev, `${key}=${value}`], [] as Array<string>)
          .join('&')}`
      : '';

    if (body.toString() !== '[object FormData]') {
      body = Object.entries(body).reduce((form, [key, value]) => {
        form.append(key, value);
        return form;
      }, new FormData());
    }

    const init = {
      ...(options ?? {}),
      method,
      credentials: 'include' as RequestCredentials,
      headers: {
        ...(headerOptions ?? { 'Content-Type': 'application/json' }),
      },
    };

    if (method !== 'GET') init.body = body as FormData;
    const resolve = await fetch(`${BASE_URL}${url}${query_string}`, init);
    const { status } = resolve;
    const json = await resolve.json();
    return { json, status };
  };

const request = {
  get: customFetch('GET'),
  post: customFetch('POST'),
  patch: customFetch('PATCH'),
  delete: customFetch('DELETE'),
};

export default request;
