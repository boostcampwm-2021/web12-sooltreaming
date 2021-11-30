import User from '@models/User';
import cron from 'node-cron';
import { userCount } from '@utils/userCount';
import { updateRank, allRank } from '@utils/updateRank';
import { errorWrapper } from '@utils/error';

cron.schedule('*/5 * * * *', () => {
  updateRank();
});

export const getRank = errorWrapper(async (req, res, next) => {
  const rankType = req.params.type;
  const result = allRank[rankType];
  res.status(200).json(result);
});
