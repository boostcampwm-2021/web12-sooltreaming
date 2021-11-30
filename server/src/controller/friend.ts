import { errorWrapper, CustomError } from '@utils/error';
import {
  friendRequestService,
  getFriendService,
  getReceiveFriendService,
  getSendFriendService,
  cancelRequestService,
  rejectRequestService,
  unFriendService,
  acceptFriendRequestService,
} from '@service/friend';

export const postFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await friendRequestService(_id, targetId);
  res.status(201).json({ message: 'Request Friend Success' });
});

export const getSendFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const sendList = await getSendFriendService(_id);
  res.status(200).json({ sendList });
});

export const getReceiveFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const receiveList = await getReceiveFriendService(_id);
  res.status(200).json({ receiveList });
});

export const getFriend = errorWrapper(async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const friendList = await getFriendService(_id);
  res.status(200).json({ friendList });
});

export const patchSendFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await cancelRequestService(_id, targetId);
  res.status(200).json({ message: 'Request Cancel Success' });
});

export const patchReceiveFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await rejectRequestService(_id, targetId);
  res.status(200).json({ message: 'Request Reject Success' });
});

export const patchUnfriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await unFriendService(_id, targetId);
  res.status(200).json({ message: 'Delete Friend Success' });
});

export const patchFriend = errorWrapper(async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await acceptFriendRequestService(_id, targetId);
  res.status(200).json({ message: 'Request Accept Success' });
});
