import request from '@utils/request';

export const postFriend = async (targetId: string) => {
  const result = await request.post({ url: '/friend', body: { targetId } });
  const { status, json } = result;
  if (status < 400) {
    return json;
  } else throw new Error(json.error.toString());
};

export const getSendFriend = async () => {
  const result = await request.get({ url: '/friend/send' });
  const { status, json } = result;
  if (status < 400) {
    return json.sendList;
  } else throw new Error(json.error.toString());
};

export const getReceiveFriend = async () => {
  const result = await request.get({ url: '/friend/receive' });
  const { status, json } = result;
  if (status < 400) {
    return json.receiveList;
  } else throw new Error(json.error.toString());
};

export const getFriend = async () => {
  const result = await request.get({ url: '/friend' });
  const { status, json } = result;
  if (status < 400) {
    return json.friendList;
  } else throw new Error(json.error.toString());
};

export const patchSendFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/send', body: { targetId } });
  const { status, json } = result;
  if (status < 400) {
    return json;
  } else throw new Error(json.error.toString());
};

export const patchReceiveFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/receive', body: { targetId } });
  const { status, json } = result;
  if (status < 400) {
    return json;
  } else throw new Error(json.error.toString());
};

export const patchUnfriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/remove', body: { targetId } });
  const { status, json } = result;
  if (status < 400) {
    return json;
  } else throw new Error(json.error.toString());
};

export const patchFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend/accept', body: { targetId } });
  const { status, json } = result;
  if (status < 400) {
    return json;
  } else throw new Error(json.error.toString());
};
