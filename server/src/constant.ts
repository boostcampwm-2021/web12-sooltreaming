export const PORT = process.env.PORT || '5000';

export const FRONT_HOST = process.env.FRONT_HOST;
export const FRONT_PORT = process.env.FRONT_PORT;
const getFrontBaseUrl = (): string => {
  const DEPLOYMENT = process.env.DEPLOYMENT;
  const _PORT = !FRONT_PORT ? '' : `:${FRONT_PORT}`;
  const PROTOCOL = DEPLOYMENT === 'production' ? 'https' : 'http';
  return `${PROTOCOL}://${FRONT_HOST}${_PORT}`;
};

export const FRONT_BASE_URL = getFrontBaseUrl();
export const AUTH_REDIRECT_URL = `${FRONT_BASE_URL}`;

export const BACK_HOST = process.env.BACK_HOST;
export const BACK_PORT = process.env.BACK_PORT;
const getBackBaseUrl = (): string => {
  const DEPLOYMENT = process.env.DEPLOYMENT;
  const _PORT = !BACK_PORT ? '' : `:${BACK_PORT}`;
  const PROTOCOL = DEPLOYMENT === 'production' ? 'https' : 'http';
  return `${PROTOCOL}://${BACK_HOST}${_PORT}`;
};

export const BACK_BASE_URL = getBackBaseUrl();

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const GITHUB_ID = process.env.GITHUB_ID;
export const GITHUB_SECRET = process.env.GITHUB_SECRET;

export const NAVER_ID = process.env.NAVER_ID;
export const NAVER_SECRET = process.env.NAVER_SECRET;

export const OAUTH_CALLBACK_URL = process.env.OAUTH_CALLBACK_URL;

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const STATUS_VOTE_NORMAL = 'STATUS_VOTE_NORMAL';
export const STATUS_VOTE_EXECUTING = 'STATUS_VOTE_EXECUTING';
export const STATUS_VOTE_VOTING = 'STATUS_VOTE_VOTING';

export const LOG_EVENT = Object.freeze({
  CLOSEUP_ON: 'closeupCount',
  CHAT_SENDING: 'chatCount',
  MARK_BROADCAST: 'hookCount',
  VOTE_START: 'pollCount',
  STATUS_VOTE_EXECUTING: 'dieCount',
  UPDOWN_START: 'starterCount',
});
