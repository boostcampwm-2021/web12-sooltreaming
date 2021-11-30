import { CustomError } from '@utils/error';
import User from '@models/User';

export const friendRequestService = async (_id, targetId) => {
  const { receiveFriend } = await User.findOne({ _id }).select('receiveFriend -_id');
  if (receiveFriend.includes(targetId))
    throw new CustomError(400, '♡ 상대방이 이미 칭구 걸었지용가리 ^0^ ♡');
  await User.updateOne({ _id }, { $addToSet: { sendFriend: targetId } });
  await User.updateOne({ _id: targetId }, { $addToSet: { receiveFriend: _id } });
};

export const getSendFriendService = async (_id) => {
  const { sendFriend } = await User.findOne({ _id })
    .select('sendFriend -_id')
    .populate('sendFriend', 'nickname imgUrl');
  return sendFriend;
};

export const getReceiveFriendService = async (_id) => {
  const { receiveFriend } = await User.findOne({ _id })
    .select('receiveFriend -_id')
    .populate('receiveFriend', 'nickname imgUrl');
  return receiveFriend;
};

export const getFriendService = async (_id) => {
  const { friend } = await User.findOne({ _id })
    .select('friend -_id')
    .populate('friend', 'nickname imgUrl');
  return friend;
};

export const cancelRequestService = async (_id, targetId) => {
  await User.updateOne({ _id }, { $pull: { sendFriend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { receiveFriend: { $in: [_id] } } });
};

export const rejectRequestService = async (_id, targetId) => {
  await User.updateOne({ _id }, { $pull: { receiveFriend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { sendFriend: { $in: [_id] } } });
};

export const unFriendService = async (_id, targetId) => {
  await User.updateOne({ _id }, { $pull: { friend: { $in: [targetId] } } });
  await User.updateOne({ _id: targetId }, { $pull: { friend: { $in: [_id] } } });
};

export const acceptFriendRequestService = async (_id, targetId) => {
  const { receiveFriend } = await User.findOne({ _id }).select('receiveFriend -_id');
  if (!receiveFriend.includes(targetId))
    throw new CustomError(400, ' 엥 님 손 절 당했을 지 도, ,., . ?');
  await User.updateOne(
    { _id },
    { $pull: { receiveFriend: { $in: [targetId] } }, $addToSet: { friend: targetId } },
  );
  await User.updateOne(
    { _id: targetId },
    { $pull: { sendFriend: { $in: [_id] } }, $addToSet: { friend: _id } },
  );
};
