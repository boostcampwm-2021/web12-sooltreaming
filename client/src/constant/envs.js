const getBackBaseUrl = () => {
  const DEPLOYMENT = process.env.REACT_APP_DEPLOYMENT;
  const _PORT = process.env.REACT_APP_BACK_PORT;
  const BACK_PORT = !_PORT ? '' : `:${_PORT}`;
  const BACK_HOST = process.env.REACT_APP_BACK_HOST || '';
  const PROTOCOL = DEPLOYMENT === 'production' ? 'https' : 'http';
  return `${PROTOCOL}://${BACK_HOST}${BACK_PORT}`;
};

export const BACK_BASE_URL = getBackBaseUrl();
export const GITHUB_ID = process.env.REACT_APP_GITHUB_ID;
