import { CustomError, errorWrapper } from '@utils/error';
import { getUserInfoService, updateNickname, updateUserImage } from '@service/user';
import { ERROR, SUCCESS } from '@src/constant';

export const getUserInformation = errorWrapper(async (req, res, next): Promise<void> => {
  const { id: _id } = req.query;
  const { information, nicknameLog } = await getUserInfoService(_id);

  res.status(200).json({
    information,
    nicknameLog,
  });
});

export const postUserImage = errorWrapper(async (req, res, next): Promise<void> => {
  const _id = req.user._id;
  let image = req.file;
  const imgUrl = await updateUserImage(_id, image);

  res.status(200).json({
    imgUrl,
    message: SUCCESS.message,
  });
});

export const patchUserNickname = errorWrapper(async (req, res, next): Promise<void> => {
  const _id = req.user._id;
  const { nickname } = req.body;
  if (!nickname) throw new CustomError(400, ERROR.INVALID_DATA);

  await updateNickname(_id, nickname);

  res.status(200).json({
    message: SUCCESS.message,
  });
});
