export const getReceiveFriend = async () => {
  const result = await request.get({ url: '/friend/fullReceiveFriend'});
  const { status, json } = result;
  if (status === 200) {
    return json.receiveList;
  } else throw new Error(status.toString());
}

