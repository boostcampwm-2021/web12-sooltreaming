import User from '@models/User';
import cron from 'node-cron';
import { errorHandler } from '@utils/error';
import { userCount } from '@utils/userCount';

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

export const getRank = async (req, res, next) => {
  try {
    const rankType = req.params.type;
    const result = allRank[rankType];
    res.status(200).json(result);
  } catch (error) {
    next(errorHandler(error));
  }
};

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
