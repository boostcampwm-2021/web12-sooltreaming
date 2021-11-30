import cron from 'node-cron';
import User from '@models/User';
import { userCount } from '@utils/userCount';

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

cron.schedule('*/5 * * * *', () => {
  updateAllUserRank();
});

const updateAllUserRank = async () => {
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

updateAllUserRank();
