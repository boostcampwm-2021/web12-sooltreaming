import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FRIEND_LIST_REQUEST,
  SEND_FRIEND_LIST_REQUEST,
  RECEIVE_FRIEND_LIST_REQUEST,
  friendListSuccess,
  friendListFailure,
  sendFriendListSuccess,
  sendFriendListFailure,
  receiveFriendListSuccess,
  receiveFriendListFailure,
} from '@store/friend';

import { getFriends, getSendFriends, getReceiveFriends } from '@api/user';

async function getFriendListAPI() {
  const data = await getFriends();
  return data;
}
async function getSendFriendListAPI() {
  const data = await getSendFriends();
  return data;
}
async function getReceiveFriendListAPI() {
  const data = await getReceiveFriends();
  return data;
}

function* getFriendList() {
  try {
    const result: string[] = yield call(getFriendListAPI);
    yield put(friendListSuccess(result));
  } catch ({ message }) {
    yield put(friendListFailure({ message: message as string }));
  }
}

function* getSendFriendList() {
  try {
    const result: string[] = yield call(getSendFriendListAPI);
    yield put(sendFriendListSuccess(result));
  } catch ({ message }) {
    yield put(sendFriendListFailure({ message: message as string }));
  }
}

function* getReceiveFriendList() {
  try {
    const result: string[] = yield call(getReceiveFriendListAPI);
    yield put(receiveFriendListSuccess(result));
  } catch ({ message }) {
    yield put(receiveFriendListFailure({ message: message as string }));
  }
}

export default function* friendSaga() {
  yield takeLatest(FRIEND_LIST_REQUEST, getFriendList);
  yield takeLatest(SEND_FRIEND_LIST_REQUEST, getSendFriendList);
  yield takeLatest(RECEIVE_FRIEND_LIST_REQUEST, getReceiveFriendList);
}
