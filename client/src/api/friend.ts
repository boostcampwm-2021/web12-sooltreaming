import request from '@utils/request';

export const getSendFriend = async () => {
  const result = await request.get({ url: '/friend/fullSendFriend'});
  const { status, json } = result;
  if (status === 200) {
    return json.sendList;
  } else throw new Error(status.toString());
}

export const getReceiveFriend = async () => {
  const result = await request.get({ url: '/friend/fullReceiveFriend'});
  const { status, json } = result;
  if (status === 200) {
    return json.receiveList;
  } else throw new Error(status.toString());
}

export const deleteReceiveFriend = async (targetId: string) => {
  const result = await request.delete({ url: '/friend/receiveFriend', body: { targetId } });
  const { status, json } = result;
  if (status === 201) {
    return json;
  } else throw new Error(status.toString());
}
export const patchReceiveFriend = async (targetId: string) => {
  const result = await request.patch({ url: '/friend', body: { targetId } });
  const { status, json } = result;
  if (status === 201) {
    return json;
  } else throw new Error(status.toString());
}