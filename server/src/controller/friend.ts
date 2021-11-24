import { CustomError, errorWrapper } from '@utils/error';
import User from '@models/User';
import { startSession } from 'mongoose';
import { transaction } from '@utils/transaction';

export const postFriendRequest = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $addToSet: { sendFriend: targetId } });
  await User.updateOne({ _id: targetId }, { $addToSet: { receiveFriend: _id } });
  res.status(201).json({ message: 'Request Friend Success' });
});

export const getFriendList = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ friends: result.friend });
});

export const getSendFriendList = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ sendFriends: result.sendFriend });
});

export const getReceiveFriendList = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ receiveFriends: result.receiveFriend });
});

export const getFullSendFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { sendFriend } = await User.findOne({ _id })
    .select('sendFriend -_id')
    .populate('sendFriend', 'nickname imgUrl');
  res.status(200).json({ sendList: sendFriend });
});

export const getFullReceiveFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { receiveFriend } = await User.findOne({ _id })
    .select('receiveFriend -_id')
    .populate('receiveFriend', 'nickname imgUrl');
  res.status(200).json({ receiveList: receiveFriend });
});

export const getFullFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { friend } = await User.findOne({ _id })
    .select('friend -_id')
    .populate('friend', 'nickname imgUrl');
  res.status(200).json({ friendList: friend });
});

export const deleteSendFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $pull: { sendFriend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { receiveFriend: { $in: [_id] } } });
  res.status(200).json({ message: 'Request Cancel Success' });
});

export const deleteReceiveFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $pull: { receiveFriend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { sendFriend: { $in: [_id] } } });
  res.status(200).json({ message: 'Request Reject Success' });
});

export const deleteFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { $pull: { friend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { friend: { $in: [_id] } } });
  res.status(200).json({ message: 'Delete Friend Success' });
});

export const patchFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
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
