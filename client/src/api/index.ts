import {
  getUserInformation,
  getUserNicknameLog,
  postUserImage,
  patchUserNickname,
  patchTotalSeconds,
} from '@api/user';
import {
  postFriend,
  getSendFriend,
  getReceiveFriend,
  getFriend,
  patchSendFriend,
  patchReceiveFriend,
  patchUnfriend,
  patchFriend,
} from '@api/friend';

import { getRank } from '@api/rank';
import { setNoticeMessage } from '@store/notice';
import { store } from '@store/store';

export const API = {
  TYPE: {
    PATCH_TOTAL_SECONDS: patchTotalSeconds,
    PATCH_USER_NICKNAME: patchUserNickname,
    POST_USER_IMAGE: postUserImage,
    GET_USER_INFORMATION: getUserInformation,
    GET_USER_NICKNAME_LOG: getUserNicknameLog,

    POST_FRIEND: postFriend,
    GET_SEND_FRIEND: getSendFriend,
    GET_RECEIVE_FRIEND: getReceiveFriend,
    GET_FRIEND: getFriend,
    PATCH_SEND_FRIEND: patchSendFriend,
    PATCH_RECEIVE_FRIEND: patchReceiveFriend,
    PATCH_UNFRIEND: patchUnfriend,
    PATCH_FRIEND: patchFriend,

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
