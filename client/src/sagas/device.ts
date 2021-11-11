import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import {
  DeviceInitTypes,
  REQUEST_INIT_INFO,
  requestInitInfo,
  successInitInfo,
} from '@store/device';
import customRTC from '@utils/customRTC';

// 로그인
async function LoadInfo({}) {
  const videoDevices = await customRTC.getVideos();
  const videoInfo = videoDevices[0] ?? null;
  const audioDevices = await customRTC.getAudios();
  const audioInfo = audioDevices[0] ?? null;
  return { videoDevices, videoInfo, audioDevices, audioInfo };
}
function* InitInfo(action: ReturnType<typeof requestInitInfo>) {
  try {
    const result: DeviceInitTypes = yield call(LoadInfo, action.payload);
    yield put(successInitInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchInitInfo() {
  yield takeLatest(REQUEST_INIT_INFO, InitInfo);
}

export default function* userSaga() {
  yield all([fork(watchInitInfo)]);
}
