import { allRank } from '@utils/updateRank';
import { errorWrapper } from '@utils/error';

export const getRank = errorWrapper(async (req, res, next) => {
  const rankType = req.params.type;
  const result = allRank[rankType];
  res.status(200).json(result);
});
