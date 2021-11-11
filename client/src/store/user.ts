import { atom, selector } from 'recoil';

export type UserTypes = {
  id: string;
  nickname: string;
  imgUrl: string;
};

export const userIDState = atom<string>({
  key: 'userIDState',
  default: '',
});

export const userNicknameState = atom<string>({
  key: 'userNicknameState',
  default: '',
});

export const userImageState = atom<string>({
  key: 'userImageState',
  default: '',
});

export const userState = selector<UserTypes>({
  key: 'userState',
  get: ({ get }) => ({
    id: get(userIDState),
    nickname: get(userNicknameState),
    imgUrl: get(userImageState),
  }),
  // recoil 에서 DefaultValue를 지정함에 있어 오류 발생
  set: ({ set }, newState: UserTypes | any) => {
    set(userIDState, newState?.id ?? '');
    set(userNicknameState, newState?.nickname ?? '');
    set(userImageState, newState?.imgUrl ?? '');
  },
});
