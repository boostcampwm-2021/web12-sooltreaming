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
import { API } from '@api/index';
import type { FriendInfoType } from '@ts-types/store';

const getFriendListAPI = async () => {
  const { friendList } = await API.call(API.TYPE.GET_FRIEND);
  return friendList;
};
const getSendFriendListAPI = async () => {
  const { sendList } = await API.call(API.TYPE.GET_SEND_FRIEND);
  return sendList;
};
const getReceiveFriendListAPI = async () => {
  const { receiveList } = await API.call(API.TYPE.GET_RECEIVE_FRIEND);
  return receiveList;
};

function* getFriendList() {
  try {
    const result: FriendInfoType[] = yield call(getFriendListAPI);
    yield put(friendListSuccess(result));
  } catch ({ message }) {
    yield put(friendListFailure({ message: message as string }));
  }
}

function* getSendFriendList() {
  try {
    const result: FriendInfoType[] = yield call(getSendFriendListAPI);
    yield put(sendFriendListSuccess(result));
  } catch ({ message }) {
    yield put(sendFriendListFailure({ message: message as string }));
  }
}

function* getReceiveFriendList() {
  try {
    const result: FriendInfoType[] = yield call(getReceiveFriendListAPI);
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
