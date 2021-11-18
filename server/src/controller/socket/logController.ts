import User from '@models/User';

const LOG_EVENT = {
  CLOSEUP: 'closeupCount',
  PASSING_MESSAGE: 'chatCount',
  QUESTION: 'hookCount',
};

export const createLog = async (id, eventType) => {
  await User.update({ _id: id }, { $inc: { [LOG_EVENT[eventType]]: 1 } });
};
