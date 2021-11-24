import User from '@models/User';
import cron from 'node-cron';
import { userCount } from '@utils/userCount';
import { errorWrapper } from '@utils/error';

const allRank = {
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

export const getRank = errorWrapper(async (req, res, next) => {
  const rankType = req.params.type;
  const result = allRank[rankType];
  res.status(200).json(result);
});

export const updateAllUserRank = async () => {
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
