import { call, put, all, fork, takeLatest, select } from 'redux-saga/effects';
import {
  REQUEST_INIT_INFO,
  successInitInfo,
  REQUEST_VIDEO_INFO,
  requestVideoInfo,
  successVideoInfo,
  SET_VIDEO_POWER,
  setVideoPower,
  REQUEST_AUDIO_INFO,
  requestAudioInfo,
  successAudioInfo,
  SET_AUDIO_POWER,
  setAudioPower,
  falseOnOffLoading,
} from '@store/device';
import customRTC from '@utils/customRTC';
import type { DeviceInitTypes } from '@ts-types/store';

// 처음 디바이스 셋팅
async function loadInfosWithDevices({ isVideoOn, isAudioOn }) {
  await customRTC.initStream();

  const videoDevices = await customRTC.getVideos();
  const videoInfo = videoDevices[0] ?? null;
  let videoTrack: MediaStreamTrack | null = null;
  if (isVideoOn) videoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId || '');
  const audioDevices = await customRTC.getAudios();
  const audioInfo = audioDevices[0] ?? null;
  let audioTrack: MediaStreamTrack | null = null;
  if (isAudioOn) audioTrack = await customRTC.getAudioTrack(audioInfo?.deviceId || '');

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
function* initInfos() {
  try {
    const { isVideoOn, isAudioOn } = yield select((state) => state.device);
    const result: DeviceInitTypes = yield call(loadInfosWithDevices, { isVideoOn, isAudioOn });
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
    const { stream, isVideoOn } = yield select((state) => state.device);
    const { videoInfo } = action.payload;
    if (!isVideoOn) return;

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
    const { stream, videoInfo, isAudioLoading } = yield select((state) => state.device);
    if (isAudioLoading) return;
    if (!isVideoOn) {
      stream.getVideoTracks().forEach((track) => track.stop());
      return yield put(falseOnOffLoading({}));
    }

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
    const { stream, isAudioOn } = yield select((state) => state.device);
    const { audioInfo } = action.payload;
    if (!isAudioOn) return;

    const result: { stream: MediaStream } = yield call(loadAudioStream, { audioInfo, stream });
    yield put(successAudioInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchAudioInfo() {
  yield takeLatest(REQUEST_AUDIO_INFO, changeAudioInfo);
}

function* changeAudioOn(action: ReturnType<typeof setAudioPower>) {
  try {
    const { isAudioOn } = action.payload;
    const { stream, audioInfo, isVideoLoading } = yield select((state) => state.device);
    if (isVideoLoading) return;
    if (!isAudioOn) {
      stream.getAudioTracks().forEach((track) => track.stop());
      return yield put(falseOnOffLoading({}));
    }

    const result: { stream: MediaStream } = yield call(loadAudioStream, {
      audioInfo,
      stream,
    });
    yield put(successAudioInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchAudioOn() {
  yield takeLatest(SET_AUDIO_POWER, changeAudioOn);
}

export default function* userSaga() {
  yield all([
    fork(watchInitInfo),
    fork(watchVideoInfo),
    fork(watchVideoOn),
    fork(watchAudioInfo),
    fork(watchAudioOn),
  ]);
}
