import { atom, selector } from 'recoil';

export type UserTypes = {
  id: string;
  nickname: string;
};

export const userIDState = atom<string>({
  key: 'userIDState',
  default: '',
});

export const userNicknameState = atom<string>({
  key: 'userNicknameState',
  default: '',
});

export const userState = selector({
  key: 'userState',
  get: ({ get }) => ({
    id: get(userIDState),
    nickname: get(userNicknameState),
  }),
  set: ({ set }, newState: any) => {
    set(userIDState, newState.id);
    set(userNicknameState, newState.nickname);
  },
});
