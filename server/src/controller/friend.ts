import { errorWrapper, CustomError } from '@utils/error';
import User from '@models/User';

export const postFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));

  const { receiveFriend: myReceiveFriend } = await User.findOne({ _id }).select(
    'receiveFriend -_id',
  );
  if (myReceiveFriend.includes(targetId))
    throw new CustomError(400, '♡ 상대방이 이미 칭구 걸었지용가리 ^0^ ♡');

  await User.updateOne({ _id }, { $addToSet: { sendFriend: targetId } });
  await User.updateOne({ _id: targetId }, { $addToSet: { receiveFriend: _id } });
  res.status(201).json({ message: 'Request Friend Success' });
});

export const getSendFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { sendFriend } = await User.findOne({ _id })
    .select('sendFriend -_id')
    .populate('sendFriend', 'nickname imgUrl');
  res.status(200).json({ sendList: sendFriend });
});

export const getReceiveFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { receiveFriend } = await User.findOne({ _id })
    .select('receiveFriend -_id')
    .populate('receiveFriend', 'nickname imgUrl');
  res.status(200).json({ receiveList: receiveFriend });
});

export const getFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { friend } = await User.findOne({ _id })
    .select('friend -_id')
    .populate('friend', 'nickname imgUrl');

  res.status(200).json({ friendList: friend });
});

export const patchSendFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $pull: { sendFriend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { receiveFriend: { $in: [_id] } } });
  res.status(200).json({ message: 'Request Cancel Success' });
});

export const patchReceiveFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $pull: { receiveFriend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { sendFriend: { $in: [_id] } } });
  res.status(200).json({ message: 'Request Reject Success' });
});

export const patchUnfriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $pull: { friend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { friend: { $in: [_id] } } });
  res.status(200).json({ message: 'Delete Friend Success' });
});

export const patchFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));

  const { receiveFriend: myReceiveFriend } = await User.findOne({ _id }).select(
    'receiveFriend -_id',
  );
  if (!myReceiveFriend.includes(targetId))
    throw new CustomError(400, ' 엥 님 손 절 당했을 지 도, ,., . ?');

  await User.updateOne(
    { _id },
    { $pull: { receiveFriend: { $in: [targetId] } }, $addToSet: { friend: targetId } },
  );
  await User.updateOne(
    { _id: targetId },
    { $pull: { sendFriend: { $in: [_id] } }, $addToSet: { friend: _id } },
  );
  res.status(200).json({ message: 'Request Accept Success' });
});
