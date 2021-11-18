import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FRIEND_LIST_REQUEST,
  SEND_FRIEND_LIST_REQUEST,
  RECEIVE_FRIEND_LIST_REQUEST,
  REQUEST_FRIEND,
  friendListSuccess,
  friendListFailuer,
  sendFriendListSuccess,
  sendFriendListFailuer,
  receiveFriendListSuccess,
  receiveFriendListFailuer,
  requestFriendFailuer,
} from '@store/friend';

import { getFriends, getSendFriends, getReceiveFriends, requestFriend } from '@api/user';

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
async function requestFriendAPI(targetId) {
  await requestFriend(targetId);
}

function* getFriendList() {
  try {
    const result: string[] = yield call(getFriendListAPI);
    yield put(friendListSuccess(result));
  } catch ({ message }) {
    yield put(friendListFailuer({ message: message as string }));
  }
}

function* getSendFriendList() {
  try {
    const result: string[] = yield call(getSendFriendListAPI);
    yield put(sendFriendListSuccess(result));
  } catch ({ message }) {
    yield put(sendFriendListFailuer({ message: message as string }));
  }
}

function* getReceiveFriendList() {
  try {
    const result: string[] = yield call(getReceiveFriendListAPI);
    yield put(receiveFriendListSuccess(result));
  } catch ({ message }) {
    yield put(receiveFriendListFailuer({ message: message as string }));
  }
}

function* requestFriendAndUpdate(action) {
  try {
    yield call(requestFriendAPI, action.payload);
    yield getSendFriendList();
    yield getReceiveFriendList();
  } catch ({ message }) {
    yield put(requestFriendFailuer({ message: message as string }));
  }
}

export default function* friendSaga() {
  yield takeLatest(FRIEND_LIST_REQUEST, getFriendList);
  yield takeLatest(SEND_FRIEND_LIST_REQUEST, getSendFriendList);
  yield takeLatest(RECEIVE_FRIEND_LIST_REQUEST, getReceiveFriendList);
  yield takeEvery(REQUEST_FRIEND, requestFriendAndUpdate);
}
