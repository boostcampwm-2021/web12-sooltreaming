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
