import { createAction } from '@hooks/redux';
import type { UserStateType, FailureType, UserType } from '@ts-types/store';

const initialState: UserStateType = {
  id: '',
  imgUrl: '',
  nickname: '',
  isLoadingUser: false,
  errorStatus: '',
};

// 세션으로 로그인 요청하는 Types / Actions
export const [USER_LOGIN_REQUEST, userLoginRequest] = createAction<{}>('USER_LOGIN_REQUEST');
export const [USER_LOGIN_SUCCESS, userLoginSuccess] = createAction<UserType>('USER_LOGIN_SUCCESS');
export const [USER_LOGIN_FAILURE, userLoginFailure] =
  createAction<FailureType>('USER_LOGIN_FAILURE');

export const [SET_NICKNAME, setNickname] = createAction<string>('SET_NICKNAME');
export const [SET_IMAGE, setImage] = createAction<string>('SET_IMAGE');
export const [RESET_USER, resetUser] = createAction<{}>('RESET_USER');

// Actions -- Types
type userAction =
  | ReturnType<typeof userLoginRequest>
  | ReturnType<typeof userLoginSuccess>
  | ReturnType<typeof userLoginFailure>
  | ReturnType<typeof setNickname>
  | ReturnType<typeof setImage>
  | ReturnType<typeof resetUser>;

// Reducer
function userReducer(state: UserStateType = initialState, action: userAction): UserStateType {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoadingUser: true,
        errorStatus: '',
      };
    case USER_LOGIN_SUCCESS: {
      const { id, imgUrl, nickname } = action.payload as UserType;
      return {
        ...state,
        id,
        imgUrl,
        nickname,
        isLoadingUser: false,
        errorStatus: '',
      };
    }
    case USER_LOGIN_FAILURE: {
      let { message } = action.payload as FailureType;
      if (message === '401') message = '';
      return {
        ...state,
        isLoadingUser: false,
        errorStatus: message,
      };
    }
    case SET_NICKNAME: {
      const nickname = action.payload as string;
      return {
        ...state,
        nickname,
      };
    }
    case SET_IMAGE: {
      const imgUrl = action.payload as string;
      return {
        ...state,
        imgUrl,
      };
    }
    case RESET_USER: {
      return {
        id: '',
        imgUrl: '',
        nickname: '',
        isLoadingUser: false,
        errorStatus: '',
      };
    }
    default:
      return state;
  }
}

export default userReducer;
