import request from '@utils/request';

export const postFriend = async (targetId: string) => {
  const result = await request.post({ url: '/friend', body: { targetId } });
  return result;
};

export const getSendFriend = async () => {
  const result = await request.get({ url: '/friend/send' });
  return result;
};

export const getReceiveFriend = async () => {
  const result = await request.get({ url: '/friend/receive' });
  return result;
};

export const getFriend = async () => {
  const result = await request.get({ url: '/friend' });
  return result;
};

export const patchSendFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/send', body: { targetId } });
  return result;
};

export const patchReceiveFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/receive', body: { targetId } });
  return result;
};

export const patchUnfriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/remove', body: { targetId } });
  return result;
};

export const patchFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/accept', body: { targetId } });
  return result;
};
