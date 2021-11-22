import { getUserInformation, getUserNicknameLog, patchUserNickname } from '@src/api/user';
import { setNoticeMessage } from '@store/notice';
import { store } from '@src/store/store';

export const API = {
  TYPE: {
    PATCH_USER_NICKNAME: patchUserNickname,
    GET_USER_INFORMATION: getUserInformation,
    GET_USER_NICKNAME_LOG: getUserNicknameLog,
  },

  call: async function (api, data) {
    try {
      const resolve = await api(data);
      return resolve;
    } catch (error: any) {
      store.dispatch(setNoticeMessage({ errorMessage: error.message }));
    }
  },
};
