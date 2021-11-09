import { atom, selector } from 'recoil';
import customRTC from '@utils/customRTC';

const videoSelector = selector({
  key: 'videoSelector',
  get: async () => {
    const results = await customRTC.getVideos();
    return results[0] ?? null;
  },
});
const audioSelector = selector({
  key: 'audioSelector',
  get: async () => {
    const results = await customRTC.getAudios();
    return results[0] ?? null;
  },
});

export const videoState = atom<MediaDeviceInfo>({
  key: 'videoState',
  default: videoSelector,
});
export const audioState = atom<MediaDeviceInfo>({
  key: 'audioState',
  default: audioSelector,
});

export const videoActiveState = atom<boolean>({
  key: 'videoActiveState',
  default: false,
});
export const audioActiveState = atom<boolean>({
  key: 'audioActiveState',
  default: false,
});
