import { createAction } from '@hooks/redux';
import type { DeviceStateType, DeviceInitTypes } from '@ts-types/store';

const initialState: DeviceStateType = {
  isVideoOn: false,
  isAudioOn: false,
  isSpeakerOn: true,
  videoInfo: null,
  audioInfo: null,
  speakerInfo: null,
  videoDevices: [],
  audioDevices: [],
  speakerDevices: [],
  stream: new MediaStream(),
  isLoading: true,
};

//
export const [SET_VIDEO_POWER, setVideoPower] =
  createAction<{ isVideoOn: boolean; videoInfo: MediaDeviceInfo | null; stream: MediaStream }>(
    'SET_VIDEO_POWER',
  );
export const [SET_AUDIO_POWER, setAudioPower] =
  createAction<{ isAudioOn: boolean }>('SET_AUDIO_POWER');
export const [SET_SPEAKER_POWER, setSpeakerPower] =
  createAction<{ isSpeakerOn: boolean }>('SET_SPEAKER_POWER');
export const [REQUEST_VIDEO_INFO, requestVideoInfo] =
  createAction<{ videoInfo: MediaDeviceInfo; stream: MediaStream }>('REQUEST_VIDEO_INFO');
export const [SUCCESS_VIDEO_INFO, successVideoInfo] =
  createAction<{ stream: MediaStream }>('SUCCESS_VIDEO_INFO');
export const [REQUEST_AUDIO_INFO, requestAudioInfo] =
  createAction<{ audioInfo: MediaDeviceInfo; stream: MediaStream }>('REQUEST_AUDIO_INFO');
export const [SUCCESS_AUDIO_INFO, successAudioInfo] =
  createAction<{ stream: MediaStream }>('SUCCESS_AUDIO_INFO');
export const [REQUEST_SPEAKER_INFO, requestSpeakerInfo] =
  createAction<{ speakerInfo: MediaDeviceInfo; stream: MediaStream }>('REQUEST_SPEAKER_INFO');

export const [REQUEST_INIT_INFO, requestInitInfo] = createAction<{}>('REQUEST_INIT_INFO');
export const [SUCCESS_INIT_INFO, successInitInfo] =
  createAction<DeviceInitTypes>('SUCCESS_INIT_INFO');

type deviceAction =
  | ReturnType<typeof setVideoPower>
  | ReturnType<typeof setAudioPower>
  | ReturnType<typeof setSpeakerPower>
  | ReturnType<typeof requestVideoInfo>
  | ReturnType<typeof successVideoInfo>
  | ReturnType<typeof requestAudioInfo>
  | ReturnType<typeof successAudioInfo>
  | ReturnType<typeof requestSpeakerInfo>
  | ReturnType<typeof requestInitInfo>
  | ReturnType<typeof successInitInfo>;

function deviceReducer(
  state: DeviceStateType = initialState,
  action: deviceAction,
): DeviceStateType {
  switch (action.type) {
    case SET_VIDEO_POWER: {
      const { isVideoOn } = action.payload as { isVideoOn: boolean };
      state.stream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoOn;
        if (isVideoOn === false) track.stop();
      });
      return {
        ...state,
        isVideoOn,
      };
    }
    case SET_AUDIO_POWER: {
      const { isAudioOn } = action.payload as { isAudioOn: boolean };
      state.stream.getAudioTracks().forEach((track) => (track.enabled = isAudioOn));
      return {
        ...state,
        isAudioOn,
      };
    }
    case SET_SPEAKER_POWER: {
      const { isSpeakerOn } = action.payload as { isSpeakerOn: boolean };
      return {
        ...state,
        isSpeakerOn,
      };
    }
    case REQUEST_VIDEO_INFO: {
      const { videoInfo } = action.payload as { videoInfo: MediaDeviceInfo };
      return {
        ...state,
        videoInfo,
      };
    }
    case REQUEST_AUDIO_INFO: {
      const { audioInfo } = action.payload as { audioInfo: MediaDeviceInfo };
      return {
        ...state,
        audioInfo,
      };
    }
    case REQUEST_SPEAKER_INFO: {
      const { speakerInfo } = action.payload as { speakerInfo: MediaDeviceInfo };
      return {
        ...state,
        speakerInfo,
      };
    }
    case SUCCESS_VIDEO_INFO: {
      const { stream } = action.payload as { stream: MediaStream };
      const { isVideoOn } = state;
      stream?.getVideoTracks().forEach((track) => (track.enabled = isVideoOn));
      return {
        ...state,
        stream,
      };
    }
    case SUCCESS_AUDIO_INFO: {
      const { stream } = action.payload as { stream: MediaStream };
      const { isAudioOn } = state;
      stream?.getAudioTracks().forEach((track) => (track.enabled = isAudioOn));
      return {
        ...state,
        stream,
      };
    }
    case REQUEST_INIT_INFO: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SUCCESS_INIT_INFO: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default deviceReducer;
