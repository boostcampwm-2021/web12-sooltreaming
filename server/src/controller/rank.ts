import { allRank } from '@service/rank';
import { CustomError, errorWrapper } from '@utils/error';
import { ERROR } from '@src/constant';

export const getRank = errorWrapper(async (req, res, next): Promise<void> => {
  const rankType = req.params.type;
  if (!rankType) throw new CustomError(400, ERROR.INVALID_TYPE);
  const result = allRank[rankType];
  res.status(200).json(result);
});
