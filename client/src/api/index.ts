import { getUserInformation, postUserImage, patchUserNickname, patchTotalSeconds } from '@api/user';
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
import { resetUser } from '@store/user';

export const API = {
  TYPE: {
    PATCH_TOTAL_SECONDS: patchTotalSeconds,
    PATCH_USER_NICKNAME: patchUserNickname,
    POST_USER_IMAGE: postUserImage,
    GET_USER_INFORMATION: getUserInformation,

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
      const { json, status } = await api(data);
      if (status < 400) return json;
      if (status === 401) {
        store.dispatch(resetUser({}));
      }
      throw new Error(json.error);
    } catch (error: any) {
      store.dispatch(setNoticeMessage({ errorMessage: error.message }));
    }
  },
};
