import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import {
  USER_LOGIN_REQUEST,
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
} from '@store/user';
import { loginWithSession } from '@api/user';
import { UserStateType } from '@ts-types/store';

// 로그인
async function UserLoginAPI({}: any) {
  const data = await loginWithSession();
  return data;
}
function* LogInUser(action: ReturnType<typeof userLoginRequest>) {
  try {
    const result: UserStateType = yield call(UserLoginAPI, action.payload);
    yield put(userLoginSuccess(result));
  } catch ({ message }) {
    yield put(userLoginFailure({ message: message as string }));
  }
}
function* watchLogInUser() {
  yield takeLatest(USER_LOGIN_REQUEST, LogInUser);
}

export default function* userSaga() {
  yield all([fork(watchLogInUser)]);
}
