import request from '@utils/request';

export const getRank = async (type) => {
  const result = await request.get({ url: `/rank/${type}` });
  return result;
};
