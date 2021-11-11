import { createAction } from '@hooks/redux';

export type DeviceStateType = {
  isVideoOn: boolean;
  isAudioOn: boolean;
  videoInfo: MediaDeviceInfo | null;
  audioInfo: MediaDeviceInfo | null;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  isLoading: boolean;
};
const initialState: DeviceStateType = {
  isVideoOn: false,
  isAudioOn: false,
  videoInfo: null,
  audioInfo: null,
  videoDevices: [],
  audioDevices: [],
  isLoading: true,
};

export const [SET_VIDEO_POWER, setVideoPower] =
  createAction<{ isVideoOn: boolean }>('SET_VIDEO_POWER');
export const [SET_AUDIO_POWER, setAudioPower] =
  createAction<{ isAudioOn: boolean }>('SET_AUDIO_POWER');

export const [SET_VIDEO_INFO, setVideoInfo] =
  createAction<{ videoInfo: MediaDeviceInfo }>('SET_VIDEO_INFO');
export const [SET_AUDIO_INFO, setAudioInfo] =
  createAction<{ audioInfo: MediaDeviceInfo }>('SET_AUDIO_INFO');

export type DeviceInitTypes = {
  videoInfo: MediaDeviceInfo | null;
  audioInfo: MediaDeviceInfo | null;
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
};
export const [REQUEST_INIT_INFO, requestInitInfo] = createAction<{}>('REQUEST_INIT_INFO');
export const [SUCCESS_INIT_INFO, successInitInfo] =
  createAction<DeviceInitTypes>('SUCCESS_INIT_INFO');

type deviceAction =
  | ReturnType<typeof setVideoPower>
  | ReturnType<typeof setAudioPower>
  | ReturnType<typeof setVideoInfo>
  | ReturnType<typeof setAudioInfo>
  | ReturnType<typeof requestInitInfo>
  | ReturnType<typeof successInitInfo>;

function deviceReducer(
  state: DeviceStateType = initialState,
  action: deviceAction,
): DeviceStateType {
  switch (action.type) {
    case SET_VIDEO_POWER: {
      const { isVideoOn } = action.payload as { isVideoOn: boolean };
      return {
        ...state,
        isVideoOn,
      };
    }
    case SET_AUDIO_POWER: {
      const { isAudioOn } = action.payload as { isAudioOn: boolean };
      return {
        ...state,
        isAudioOn,
      };
    }
    case SET_VIDEO_INFO: {
      const { videoInfo } = action.payload as { videoInfo: MediaDeviceInfo };
      return {
        ...state,
        videoInfo,
      };
    }
    case SET_AUDIO_INFO: {
      const { audioInfo } = action.payload as { audioInfo: MediaDeviceInfo };
      return {
        ...state,
        audioInfo,
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
