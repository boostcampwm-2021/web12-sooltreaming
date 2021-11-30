import { userCount } from '@utils/userCount';
import User from '@models/User';

export const allRank = {
  chatCount: [],
  hookCount: [],
  pollCount: [],
  closeupCount: [],
  dieCount: [],
  speakCount: [],
  starterCount: [],
  totalSeconds: [],
};

export const updateRank = async () => {
  try {
    const newRank = await Promise.all(
      userCount.map((count) =>
        User.find()
          .select(`imgUrl nickname ${count}`)
          .sort({ [count]: -1 }),
      ),
    );
    Object.keys(allRank).forEach((key, index) => (allRank[key] = newRank[index]));
  } catch (error) {
    console.error(error);
  }
};
