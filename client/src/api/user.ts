import request from '@utils/request';

export const loginWithSession = async () => {
  const result = await request.get({ url: '/auth/login' });
  const { status, json } = result;
  if (status === 202) {
    const { _id: id, imgUrl, nickname } = json;
    return { id, imgUrl, nickname };
  } else throw new Error(status.toString());
};

export const logoutAPI = async (callback) => {
  await request.get({
    url: '/auth/logout',
    options: { redirect: 'manual' as RequestRedirect },
  });
  callback();
};

export const getUserInformation = async (id) => {
  const result = await request.get({ url: '/user', query: { id } });
  return result;
};

export const patchUserNickname = async (newNickname) => {
  const result = await request.patch({
    url: '/user/nickname',
    body: { nickname: newNickname },
  });
  return result;
};

export const postUserImage = async (newFile) => {
  const result = await request.post({
    url: '/user/image',
    headerOptions: {},
    body: newFile,
  });
  return result;
};

export const patchTotalSeconds = async (exitTime) => {
  await request.patch({
    url: '/user/exit',
    body: { exitTime },
  });
  return;
};
