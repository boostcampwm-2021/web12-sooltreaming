import request from '@utils/request';

export const loginWithSession = async () => {
  const result = await request.get({ url: '/auth/login' });
  const { status, json } = result;
  if (status === 202) {
    const { _id: id, imgUrl, nickname } = json;
    return { id, imgUrl, nickname };
  } else throw new Error(status.toString());
};

export const patchUserNickname = async (newNickname) => {
  const { status } = await request.patch({
    url: '/user/nickname',
    body: { nickname: newNickname },
  });
  return status < 400;
};

export const getFriends = async () => {
  const result = await request.get({ url: '/friend/list' });
  const { status, json } = result;
  if (status === 200) {
    return json.friends;
  } else throw new Error(status.toString());
};

export const getSendFriends = async () => {
  const result = await request.get({ url: '/friend/sendList' });
  const { status, json } = result;
  if (status === 200) {
    return json.sendFriends;
  } else throw new Error(status.toString());
};

export const getReceiveFriends = async () => {
  const result = await request.get({ url: '/friend/receiveList' });
  const { status, json } = result;
  if (status === 200) {
    return json.receiveFriends;
  } else throw new Error(status.toString());
};

export const requestFriend = async (targetId: string) => {
  const result = await request.post({ url: '/friend', body: { targetId } });
  const { status, json } = result;
  if (status === 201) {
    return json;
  } else throw new Error(status.toString());
};

};
