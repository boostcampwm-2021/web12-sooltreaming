const host = process.env.REACT_APP_BACK_HOST;
const port = process.env.REACT_APP_BACK_PORT;
const version = process.env.REACT_APP_BACK_VERSION;
const baseUrl = `http://${host}:${port}/api/${version}/`;

interface fetchParams {
  url: string;

  body?: Object;
  headerOptions?: HeadersInit;
  options?: RequestInit;
}

const customFetch =
  (method: string) =>
  async ({ url, body, headerOptions, options }: fetchParams) => {
    const resolve = await fetch(`${baseUrl}/${url}`, {
      ...(options ?? {}),
      method,
      headers: {
        ...(headerOptions ?? {}),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body ?? {}),
    });
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
