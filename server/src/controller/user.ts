import { CustomError, errorWrapper } from '@utils/error';
import {
  getUserInfoService,
  updateNickname,
  updateTotalSeconds,
  updateUserImage,
} from '@service/user';

export const getUserInformation = errorWrapper(async (req, res, next) => {
  const { id } = req.query;
  if (!id) throw new CustomError(400, 'id Error');

  const { information, nicknameLog } = await getUserInfoService(id);

  res.status(200).json({
    information,
    nicknameLog,
  });
});

export const postUserImage = errorWrapper(async (req, res, next) => {
  const id = req.user._id;
  if (!id) throw new CustomError(401, 'id Error');
  let image = req.file;

  const imgUrl = await updateUserImage(id, image);

  res.status(200).json({
    imgUrl,
    message: 'User Information Update Success',
  });
});

export const patchUserNickname = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  if (!_id) throw new CustomError(401, 'id Error');

  const { nickname } = req.body;
  if (!nickname) throw new CustomError(400, 'Invalid Data');

  await updateNickname(_id, nickname);

  res.status(200).json({
    message: 'User Information Update Success',
  });
});

export const patchTotalSeconds = errorWrapper(async (req, res, next) => {
  const _id = req.user._id;
  const { startTime } = req.session;
  const { exitTime } = req.body;

  if (!_id || !startTime || !exitTime) throw new CustomError(400, 'invalid data');
  await updateTotalSeconds(_id, startTime, exitTime);

  req.session.startTime = new Date().getTime();

  res.status(200).json({ message: 'success!' });
});
