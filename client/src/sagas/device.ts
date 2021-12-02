import { call, put, all, fork, takeLatest, select } from 'redux-saga/effects';
import {
  SET_VIDEO_POWER,
  setVideoPower,
  REQUEST_INIT_INFO,
  requestInitInfo,
  successInitInfo,
  REQUEST_VIDEO_INFO,
  requestVideoInfo,
  successVideoInfo,
  REQUEST_AUDIO_INFO,
  requestAudioInfo,
  successAudioInfo,
} from '@store/device';
import customRTC from '@utils/customRTC';
import type { DeviceInitTypes } from '@ts-types/store';

// 처음 디바이스 셋팅
async function loadInfosWithDevices({}) {
  await customRTC.initStream();

  const videoDevices = await customRTC.getVideos();
  const videoInfo = videoDevices[0] ?? null;
  const videoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId || '');
  const audioDevices = await customRTC.getAudios();
  const audioInfo = audioDevices[0] ?? null;
  const audioTrack = await customRTC.getAudioTrack(audioInfo?.deviceId || '');

  const speakerDevices = await customRTC.getSpeakers();
  const speakerInfo = speakerDevices[0] ?? null;
  const stream = customRTC.createStream({ audioTrack, videoTrack });
  return {
    videoDevices,
    videoInfo,
    audioDevices,
    audioInfo,
    speakerDevices,
    speakerInfo,
    stream,
  };
}
function* initInfos(action: ReturnType<typeof requestInitInfo>) {
  try {
    const result: DeviceInitTypes = yield call(loadInfosWithDevices, action.payload);
    yield put(successInitInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchInitInfo() {
  yield takeLatest(REQUEST_INIT_INFO, initInfos);
}

// 비디오 트랙 변경에 따른 스트림 변경
async function loadVideoStream({ videoInfo, stream }) {
  if (!videoInfo) return;
  const newStream = stream.clone();
  newStream?.getVideoTracks().forEach((track) => {
    track.stop();
    newStream.removeTrack(track);
  });

  const newVideoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId ?? '');
  if (!!newVideoTrack) newStream.addTrack(newVideoTrack);
  return { stream: newStream };
}
function* changeVideoInfo(action: ReturnType<typeof requestVideoInfo>) {
  try {
    const stream = yield select((state) => state.device.stream);
    const { videoInfo } = action.payload;

    const result: { stream: MediaStream } = yield call(loadVideoStream, { videoInfo, stream });
    yield put(successVideoInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchVideoInfo() {
  yield takeLatest(REQUEST_VIDEO_INFO, changeVideoInfo);
}

function* changeVideoOn(action: ReturnType<typeof setVideoPower>) {
  try {
    const { isVideoOn } = action.payload;
    const { stream, videoInfo } = yield select((state) => state.device);
    if (!isVideoOn) return stream.getVideoTracks().forEach((track) => track.stop());

    const result: { stream: MediaStream } = yield call(loadVideoStream, {
      videoInfo,
      stream,
    });
    yield put(successVideoInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchVideoOn() {
  yield takeLatest(SET_VIDEO_POWER, changeVideoOn);
}

// 오디오 트랙 변경에 따른 스트림 변경
async function loadAudioStream({ audioInfo, stream }) {
  if (!audioInfo) return;
  const newStream = stream.clone();

  newStream?.getAudioTracks().forEach((track) => {
    track.stop();
    newStream.removeTrack(track);
  });

  const newAudioTrack = await customRTC.getAudioTrack(audioInfo?.deviceId ?? '');
  if (!!newAudioTrack) newStream.addTrack(newAudioTrack);

  return { stream: newStream };
}
function* changeAudioInfo(action: ReturnType<typeof requestAudioInfo>) {
  try {
    const stream = yield select((state) => state.device.stream);
    const { audioInfo } = action.payload;

    const result: { stream: MediaStream } = yield call(loadAudioStream, { audioInfo, stream });
    yield put(successAudioInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchAudioInfo() {
  yield takeLatest(REQUEST_AUDIO_INFO, changeAudioInfo);
}

export default function* userSaga() {
  yield all([fork(watchInitInfo), fork(watchVideoInfo), fork(watchVideoOn), fork(watchAudioInfo)]);
}
