import { getUserInformation, getUserNicknameLog, patchUserNickname } from '@api/user';
import {
  getSendFriend,
  getReceiveFriend,
  getFriend,
  deleteSendFriend,
  deleteReceiveFriend,
  deleteFriend,
  patchReceiveFriend,
} from '@api/friend';

import { getRank } from '@api/rank';
import { setNoticeMessage } from '@store/notice';
import { store } from '@src/store/store';

export const API = {
  TYPE: {
    PATCH_USER_NICKNAME: patchUserNickname,
    GET_USER_INFORMATION: getUserInformation,
    GET_USER_NICKNAME_LOG: getUserNicknameLog,
    GET_SENDFRIEND: getSendFriend,
    GET_RECEIVEFRIEND: getReceiveFriend,
    GET_FRIEND: getFriend,
    DELETE_SENDFRIEND: deleteSendFriend,
    DELETE_RECEIVEFRIEND: deleteReceiveFriend,
    DELETE_FRIEND: deleteFriend,
    PATCH_RECEIVEREIEND: patchReceiveFriend,
    GET_RANK: getRank,
  },

  call: async function (api, data = {}) {
    try {
      const resolve = await api(data);
      return resolve;
    } catch (error: any) {
      store.dispatch(setNoticeMessage({ errorMessage: error.message }));
    }
  },
};
