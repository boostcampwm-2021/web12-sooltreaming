import User from '@models/User';
import { CustomError, errorHandler } from '@utils/error';

export const getRank = (req, res, next) => {
  const rankType = req.params.type;
  res.status(200).json({ message: 'Get Rank Success' });
};
