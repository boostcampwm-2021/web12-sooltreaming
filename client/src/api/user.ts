import request from '@utils/request';

export const loginWithSession = async () => {
  const result = await request.get({ url: '/auth/login' });
  const { status, json } = result;
  if (status === 202) {
    const { _id: id, imgUrl, nickname } = json;
    return { id, imgUrl, nickname };
  } else throw new Error(status.toString());
};

export const getUserInformation = async (id) => {
  const { status, json } = await request.get({ url: '/user', query: { id } });
  if (status === 200) {
    const nicknameLog = [ ...json.user.nicknameLog ];
    delete json.user.nicknameLog;
    return { nicknameLog, information: json.user };
  } else throw new Error(json.error.toString());
};

export const getUserNicknameLog = async (id) => {
  const { status, json } = await request.get({ url: '/user/nickname', query: { id } });
  if (status === 200) {
    return json.nicknameLog;
  } else throw new Error(json.error.toString());
};

export const patchUserNickname = async (newNickname) => {
  const { status, json } = await request.patch({
    url: '/user/nickname',
    body: { nickname: newNickname },
  });
  if (status === 200) {
    return json.message;
  } else throw new Error(json.error.toString());
};

export const postUserImage = async (newFile) => {
  const { status, json } = await request.post({
    url: '/user/image',
    headerOptions: {},
    body: newFile,
  });
  if (status === 200) {
    return json.imgUrl;
  } else throw new Error(json.error.toString());
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
