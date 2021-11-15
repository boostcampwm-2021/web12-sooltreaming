export const DEPLOYMENT = process.env.REACT_APP_DEPLOYMENT;

const getBackBaseUrl = () => {
  const _PORT = process.env.REACT_APP_BACK_PORT;
  const BACK_PORT = !_PORT ? '' : `:${_PORT}`;
  const BACK_HOST = process.env.REACT_APP_BACK_HOST || '';
  const PROTOCOL = DEPLOYMENT === 'production' ? 'https' : 'http';
  return `${PROTOCOL}://${BACK_HOST}${BACK_PORT}`;
};

export const BACK_BASE_URL = getBackBaseUrl();
export const BACK_VERSION = process.env.REACT_APP_BACK_VERSION;
export const GITHUB_ID = process.env.REACT_APP_GITHUB_ID;
export const NAVER_ID = process.env.REACT_APP_NAVER_ID;
export const NAVER_REDIRECT_URL = `${BACK_BASE_URL}/api/${BACK_VERSION}/auth/naver`;
