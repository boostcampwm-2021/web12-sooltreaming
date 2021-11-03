import { atom } from 'recoil';

export const errorMessageState = atom<string>({
  key: 'errorMessageState',
  default: '',
});

export const chatCountState = atom<Number>({
  key: 'chatCountState',
  default: 0,
});
