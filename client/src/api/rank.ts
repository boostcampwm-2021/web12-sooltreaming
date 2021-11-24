import request from '@utils/request';

export const getRank = async (type) => {
  const { status, json } = await request.get({ url: `/rank/${type}` });
  if (status === 200) {
    return json;
  } else throw new Error(json.error.toString());
};
