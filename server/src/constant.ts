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

export const NCP_ACCESS_KEY = process.env.NCP_ACCESS_KEY;
export const NCP_SECRET_KEY = process.env.NCP_SECRET_KEY;
export const NCP_REGION = process.env.NCP_REGION;

export const LOG_EVENT = Object.freeze({
  CLOSEUP_ON: 'closeupCount',
  CHAT_SENDING: 'chatCount',
  MARK_BROADCAST: 'hookCount',
  VOTE_START: 'pollCount',
  STATUS_VOTE_EXECUTING: 'dieCount',
  CHEERS_BROADCAST: 'cheersCount',
  UPDOWN_START: 'starterCount',
  EXIT: 'totalSeconds',
});

export const ERROR = {
  SESSION_EXPIRE: '로그인을 다시 해주세요!',
  NOT_EXIST_USER: '사용자가 존재하지 않습니다.',
  NOT_EXIST_ROOM: '존재하지 않는 방입니다.',
  NOT_EXIST_REQUEST: '엥 님 손 절 당했을 지 도, ,., . ?',
  INVALID_ID: '올바르지 않은 ID 입니다.',
  INVALID_DATA: '올바르지 않은 데이터입니다.',
  INVALID_TYPE: '올바르지 않은 타입입니다.',
  EXIST_FRIEND_REQUEST: '♡ 상대방이 이미 칭구 걸었지용가리 ^0^ ♡',
  PERMISSION_DENIED: '권한이 없습니다.',
  UNAUTHORIZED_ROOM: '입장이 제한된 방입니다.',
};

export const KEYWORDS = [
  '크레파스',
  '고구마',
  '감자',
  '부스트캠프',
  '코딩',
  '스파게티',
  '베스킨라빈스',
  '식혜',
  '컴퓨터',
  '스마트폰',
  '아이유',
  '크롱',
  '도라에몽',
  '드론',
  '수정과',
  '카메라',
  '기린',
  '고양이',
  '개',
  '사자',
  '늑대',
  '양',
  '김치',
  '콩나물',
  '항아리',
  '모기',
  '파리',
  '지네',
  '양말',
  '노트북',
  '애플',
  '바나나',
  '마우스',
  '멀티탭',
  '닌텐도',
  '람보르기니',
  '주전자',
  '접착제',
  '박사',
  '경영학',
  '철학',
  '컴퓨터공학',
  '자이언티',
  '유튜브',
  '떡볶이',
  '어묵',
  '삼겹살',
  '차돌박이',
  '고속도로',
  '스타크래프트',
  '축구',
  '농구',
  '야구',
  '볼링',
  '테니스',
  '마리오',
  '피아노',
  '바이올린',
  '드럼',
  '마이크',
  '큐브',
  '트와이스',
  '에스파',
  '뉴발란스',
  '나이키',
  '아디다스',
  '콘센트',
  '시계',
  '전자레인지',
  '소파',
  '창문',
  '네이버',
  '카카오',
  '라인',
  '배달의민족',
  '구글',
  '아마존',
  '헤드폰',
  'VR',
  '비트코인',
  '쓰레기통',
  '소고기',
  '양말',
  '옷걸이',
  '청하',
  '대선',
  '칵테일',
];

export const LIAR_KEYWORD = '라이어';
