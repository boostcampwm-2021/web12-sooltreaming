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
  const sendResult = await request.post({ url: `/friend/send`, body: { targetId } });
  const { status: sendStatus } = sendResult;
  if (sendStatus !== 201) throw new Error(sendStatus.toString());

  const receiveResult = await request.post({ url: '/friend/receive', body: { targetId } });
  const { status: receiveStatus } = receiveResult;
  if (receiveStatus !== 201) throw new Error(receiveStatus.toString());
};
