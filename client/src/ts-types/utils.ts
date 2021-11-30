export type fetchParams = {
  url: string;
  query?: { [key: string]: string };
  body?: FormData | Object;
  headerOptions?: HeadersInit;
  options?: RequestInit;
};
