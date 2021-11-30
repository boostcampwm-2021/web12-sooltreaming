import User from '@models/User';
import { LOG_EVENT } from '@src/constant';

export const createLog = async (id: string, eventType: string): Promise<void> => {
  const user = await User.updateOne({ _id: id }, { $inc: { [LOG_EVENT[eventType]]: 1 } });
};
