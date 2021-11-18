import { all, call } from 'redux-saga/effects';
import user from '@sagas/user';
import device from '@sagas/device';
import friend from '@sagas/friend';
export default function* rootSaga() {
  yield all([call(user), call(device), call(friend)]);
}
