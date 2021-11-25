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
  if (status < 400) {
    const { information, nicknameLog } = json;
    return { information, nicknameLog };
  } else throw new Error(json.error.toString());
};

export const getUserNicknameLog = async (id) => {
  const { status, json } = await request.get({ url: '/user/nickname', query: { id } });
  if (status < 400) {
    return json.nicknameLog;
  } else throw new Error(json.error.toString());
};

export const patchUserNickname = async (newNickname) => {
  const { status, json } = await request.patch({
    url: '/user/nickname',
    body: { nickname: newNickname },
  });
  if (status < 400) {
    return json.message;
  } else throw new Error(json.error.toString());
};

export const postUserImage = async (newFile) => {
  const { status, json } = await request.post({
    url: '/user/image',
    headerOptions: {},
    body: newFile,
  });
  if (status < 400) {
    return json.imgUrl;
  } else throw new Error(json.error.toString());
};

export const patchTotalSeconds = async (exitTime) => {
  await request.patch({
    url: '/user/exit',
    body: { exitTime },
  });
  return;
};
