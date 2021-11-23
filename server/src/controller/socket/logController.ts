import User from '@models/User';

const LOG_EVENT = {
  CLOSEUP: 'closeupCount',
  CHAT_RECEIVE: 'chatCount',
  QUESTION: 'hookCount',
};

export const createLog = async (id, eventType) => {
  await User.updateOne({ _id: id }, { $inc: { [LOG_EVENT[eventType]]: 1 } });
};
