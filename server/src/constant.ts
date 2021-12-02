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
export const GITHUB_IMG_URL = 'https://avatars.githubusercontent.com';

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

export const IMG_DELETE_TIME = 1000 * 60 * 5;

export const LOG_EVENT = Object.freeze({
  CLOSEUP_ON: 'closeupCount',
  CHAT_SENDING: 'chatCount',
  MARK_BROADCAST: 'hookCount',
  VOTE_START: 'pollCount',
  STATUS_VOTE_EXECUTING: 'dieCount',
  CHEERS_BROADCAST: 'cheersCount',
  UPDOWN_START: 'starterCount',
  DISCONNECT_USER: 'totalSeconds',
});

export const SUCCESS = {
  message: 'success',
};

export const ERROR = {
  SESSION_EXPIRE: '로그인을 다시 해주세요 ヽ(^。^)丿',
  NOT_EXIST_USER: '사용자가 존재하지 않습니다. ヽ( ຶ▮ ຶ)ﾉ!!!',
  NOT_EXIST_ROOM: '(;´・`)> 존재하지 않는 방입니다.',
  NOT_EXIST_REQUEST: '(;° ロ°) 엥 님 손 절 당했을 지 도, ,., . ?',
  INVALID_ID: '올바르지 않은 ID 입니다. ヽ( ຶ▮ ຶ)ﾉ!!!',
  INVALID_DATA: '올바르지 않은 데이터입니다. ヽ( ຶ▮ ຶ)ﾉ!!!',
  INVALID_TYPE: '올바르지 않은 타입입니다. ヽ( ຶ▮ ຶ)ﾉ!!!',
  EXIST_FRIEND_REQUEST: '♡ 상대방이 이미 칭구 걸었지용가리 ☆～（ゝ。∂）♡',
  PERMISSION_DENIED: '(;´・`)> 권한이 없습니다.',
  UNAUTHORIZED_ROOM: '(;´・`)> 입장이 제한된 방입니다.',

  CLOSE_ROOM: '(;´・`)> 방장이 방을 닫았습니다.',
  DELETED_ROOM: '방이 사라졌습니다. ヽ( ຶ▮ ຶ)ﾉ!!!',
};

export const KEYWORDS = [
  {
    subject: '물건',
    keyword: '크레파스',
  },
  {
    subject: '음식',
    keyword: '고구마',
  },
  {
    subject: '음식',
    keyword: '감자',
  },
  {
    subject: 'IT',
    keyword: '부스트캠프',
  },
  {
    subject: 'IT',
    keyword: '코딩',
  },
  {
    subject: '음식',
    keyword: '스파게티',
  },
  {
    subject: '음식',
    keyword: '베스킨라빈스',
  },
  {
    subject: '음식',
    keyword: '식혜',
  },
  {
    subject: 'IT',
    keyword: '컴퓨터',
  },
  {
    subject: 'IT',
    keyword: '스마트폰',
  },
  {
    subject: 'IT',
    keyword: '베스킨라빈스',
  },
  {
    subject: '인물',
    keyword: '아이유',
  },
  {
    subject: '인물',
    keyword: '크롱',
  },
  {
    subject: '인물',
    keyword: '도라에몽',
  },
  {
    subject: 'IT',
    keyword: '드론',
  },
  {
    subject: '음식',
    keyword: '수정과',
  },
  {
    subject: 'IT',
    keyword: '카메라',
  },
  {
    subject: '동식물',
    keyword: '기린',
  },
  {
    subject: '동식물',
    keyword: '고양이',
  },
  {
    subject: '동식물',
    keyword: '개',
  },
  {
    subject: '동식물',
    keyword: '사자',
  },
  {
    subject: '동식물',
    keyword: '늑대',
  },
  {
    subject: '동식물',
    keyword: '양',
  },
  {
    subject: '음식',
    keyword: '김치',
  },
  {
    subject: '음식',
    keyword: '콩나물',
  },
  {
    subject: '물건',
    keyword: '항아리',
  },
  {
    subject: '동식물',
    keyword: '모기',
  },
  {
    subject: '동식물',
    keyword: '파리',
  },
  {
    subject: '물건',
    keyword: '양말',
  },
  {
    subject: 'IT',
    keyword: '노트북',
  },
  {
    subject: 'IT',
    keyword: '애플',
  },
  {
    subject: '음식',
    keyword: '바나나',
  },
  {
    subject: 'IT',
    keyword: '마우스',
  },
  {
    subject: '물건',
    keyword: '멀티탭',
  },
  {
    subject: 'IT',
    keyword: '닌텐도',
  },
  {
    subject: '물건',
    keyword: '주전자',
  },
  {
    subject: '물건',
    keyword: '접착제',
  },
  {
    subject: '교육',
    keyword: '박사',
  },
  {
    subject: '교육',
    keyword: '경영학',
  },
  {
    subject: '교육',
    keyword: '철학',
  },
  {
    subject: '교육',
    keyword: '컴퓨터공학',
  },
  {
    subject: 'IT',
    keyword: '람보르기니',
  },
  {
    subject: '인물',
    keyword: '자이언티',
  },
  {
    subject: 'IT',
    keyword: '유튜브',
  },
  {
    subject: '음식',
    keyword: '떡볶이',
  },
  {
    subject: '음식',
    keyword: '어묵',
  },
  {
    subject: '음식',
    keyword: '삼겹살',
  },
  {
    subject: '음식',
    keyword: '차돌박이',
  },
  {
    subject: '일상',
    keyword: '고속도로',
  },
  {
    subject: 'IT',
    keyword: '스타크래프트',
  },
  {
    subject: '일상',
    keyword: '축구',
  },
  {
    subject: '일상',
    keyword: '농구',
  },
  {
    subject: '일상',
    keyword: '야구',
  },
  {
    subject: '일상',
    keyword: '볼링',
  },
  {
    subject: '일상',
    keyword: '테니스',
  },
  {
    subject: '인물',
    keyword: '마리오',
  },
  {
    subject: '물건',
    keyword: '피아노',
  },
  {
    subject: '물건',
    keyword: '바이올린',
  },
  {
    subject: '물건',
    keyword: '드럼',
  },
  {
    subject: '물건',
    keyword: '마이크',
  },
  {
    subject: '물건',
    keyword: '큐브',
  },
  {
    subject: '인물',
    keyword: '트와이스',
  },
  {
    subject: '인물',
    keyword: '에스파',
  },
  {
    subject: '일상',
    keyword: '뉴발란스',
  },
  {
    subject: '일상',
    keyword: '나이키',
  },
  {
    subject: '일상',
    keyword: '아디다스',
  },
  {
    subject: '물건',
    keyword: '콘센트',
  },
  {
    subject: '물건',
    keyword: '시계',
  },
  {
    subject: '물건',
    keyword: '전자레인지',
  },
  {
    subject: '물건',
    keyword: '소파',
  },
  {
    subject: '물건',
    keyword: '창문',
  },
  {
    subject: 'IT',
    keyword: '네이버',
  },
  {
    subject: 'IT',
    keyword: '카카오',
  },
  {
    subject: 'IT',
    keyword: '라인',
  },
  {
    subject: 'IT',
    keyword: '배달의민족',
  },
  {
    subject: 'IT',
    keyword: '구글',
  },
  {
    subject: 'IT',
    keyword: '아마존',
  },
  {
    subject: '물건',
    keyword: '헤드폰',
  },
  {
    subject: 'IT',
    keyword: 'VR',
  },
  {
    subject: 'IT',
    keyword: '비트코인',
  },
  {
    subject: '물건',
    keyword: '쓰레기통',
  },
  {
    subject: '음식',
    keyword: '소고기',
  },
  {
    subject: '물건',
    keyword: '옷걸이',
  },
  {
    subject: '인물',
    keyword: '청하',
  },
  {
    subject: '음식',
    keyword: '대선',
  },
  {
    subject: '음식',
    keyword: '참이슬',
  },
  {
    subject: '음식',
    keyword: '칵테일',
  },
  {
    subject: '음식',
    keyword: '부침개',
  },
];

export const LIAR_KEYWORD = {
  subject: '',
  keyword: '라이어',
};
