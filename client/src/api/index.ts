import {
  getUserInformation,
  getUserNicknameLog,
  postUserImage,
  patchUserNickname,
  patchTotalSeconds,
} from '@api/user';
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
    PATCH_TOTAL_SECONDS: patchTotalSeconds,
    PATCH_USER_NICKNAME: patchUserNickname,
    POST_USER_IMAGE: postUserImage,
    GET_USER_INFORMATION: getUserInformation,
    GET_USER_NICKNAME_LOG: getUserNicknameLog,
    GET_SENDFRIEND: getSendFriend,
    GET_RECEIVEFRIEND: getReceiveFriend,
    GET_FRIEND: getFriend,
    DELETE_SENDFRIEND: deleteSendFriend,
    DELETE_RECEIVEFRIEND: deleteReceiveFriend,
    PATCH_RECEIVEFRIEND: patchReceiveFriend,
    DELETE_FRIEND: deleteFriend,
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
