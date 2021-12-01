import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
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
// videoInfo는 현재 비디오 상태, stream은 현재 스트림 상태
async function loadVideoStream({ videoInfo, stream }) {
  // 비디오인포가 없으면 그대로 반환
  if (!videoInfo) return;
  // 스트림 복제
  const newStream = stream.clone();
  // 새로운 스트림에서 트랙들 멈추고 제거
  newStream?.getVideoTracks().forEach((track) => {
    track.stop();
    newStream.removeTrack(track);
  });
  // 비디오트랙 연결
  const newVideoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId ?? '');
  // 트랙이 아예 없는 경우 비디오트랙 추가
  if (!!newVideoTrack) newStream.addTrack(newVideoTrack);
  // 새로운 스트림 반환
  return { stream: newStream };
}
function* changeVideoInfo(action: ReturnType<typeof requestVideoInfo>) {
  try {
    // call은 함수와 파라미터를 받고, 해당 함수에 파라미터를 넣어서 진행합니다.
    const result: { stream: MediaStream } = yield call(loadVideoStream, action.payload);
    yield put(successVideoInfo(result));
  } catch ({ message }) {
    console.error(message);
  }
}
function* watchVideoInfo() {
  // takeLatest는 가장 마지막으로 실행된 작업만 수행한다.
  yield takeLatest(REQUEST_VIDEO_INFO, changeVideoInfo);
}

async function ReconnectVideoStream({ isVideoOn, videoInfo, stream }) {
  // 비디오인포가 없으면 그대로 반환
  if (!isVideoOn) return;
  // 스트림 복제
  const newStream = stream.clone();
  // 새로운 스트림에서 트랙들 멈추고 제거
  newStream?.getVideoTracks().forEach((track) => {
    track.stop();
    newStream.removeTrack(track);
  });
  // 비디오트랙 연결
  const newVideoTrack = await customRTC.getVideoTrack(videoInfo?.deviceId ?? '');
  // 트랙이 아예 없는 경우 비디오트랙 추가
  if (!!newVideoTrack) newStream.addTrack(newVideoTrack);
  // 새로운 스트림 반환
  return { stream: newStream };
}

function* changeVideoOn(action: ReturnType<typeof setVideoPower>) {
  try {
    // call은 함수와 파라미터를 받고, 해당 함수에 파라미터를 넣어서 진행합니다.
    const result: { stream: MediaStream } = yield call(ReconnectVideoStream, action.payload);
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
    const result: { stream: MediaStream } = yield call(loadAudioStream, action.payload);
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
