import { getUserInformation, getUserNicknameLog, patchUserNickname } from '@api/user';
import {  getReceiveFriend, patchReceiveFriend, deleteReceiveFriend } from '@api/friend';
import { setNoticeMessage } from '@store/notice';
import { store } from '@src/store/store';

export const API = {
  TYPE: {
    PATCH_USER_NICKNAME: patchUserNickname,
    GET_USER_INFORMATION: getUserInformation,
    GET_USER_NICKNAME_LOG: getUserNicknameLog,
    GET_RECEIVEFRIEND: getReceiveFriend,
    DELETE_RECEIVEFRIEND: deleteReceiveFriend,
    PATHCH_RECEIVEREIEND : patchReceiveFriend,
  },

  call: async function (api, data={}) {
    try {
      const resolve = await api(data);
      return resolve;
    } catch (error: any) {
      store.dispatch(setNoticeMessage({ errorMessage: error.message }));
    }
  },
};
