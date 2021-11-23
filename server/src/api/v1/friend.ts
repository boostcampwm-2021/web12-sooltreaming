import express from 'express';
import User from '@models/User';
import { transaction } from '@src/utils/transaction';
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await transaction(async () => {
    await User.updateOne({ _id }, { $addToSet: { sendFriend: targetId } });
    await User.updateOne({ _id: targetId }, { $addToSet: { receiveFriend: _id } });
  });
  res.status(201).json({ message: 'Request Friend Success' });
});

router.get('/list', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ friends: result.friend });
});

router.get('/sendList', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ sendFriends: result.sendFriend });
});

router.get('/receiveList', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ receiveFriends: result.receiveFriend });
});

router.get('/fullSendFriend', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { sendFriend } = await User.findOne({_id}).select('sendFriend -_id').populate('sendFriend', 'nickname imgUrl');
  res.status(200).json({ sendList: sendFriend });
});

router.get('/fullReceiveFriend', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const { receiveFriend } = await User.findOne({_id}).select('receiveFriend -_id').populate('receiveFriend', 'nickname imgUrl');
  res.status(200).json({ receiveList: receiveFriend });
});

router.delete('/receiveFriend', async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await transaction(async () => {
    await User.updateOne({_id}, { $pull: { receiveFriend: { $in: [targetId] } } });
    await User.updateOne({_id: targetId}, { $pull: { sendFriend: { $in: [_id] } } });
  });
  res.status(200).json({ message: 'Request Reject Success' });
});
router.patch('/', async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await transaction(async () => {
    await User.updateOne({_id}, { $pull: { receiveFriend: { $in: [targetId] } }, $addToSet: { friend: targetId } });
    await User.updateOne({_id: targetId}, { $pull: { sendFriend: { $in: [_id] } }, $addToSet: { friend: _id } });
  });
  res.status(200).json({ message: 'Request Accept Success' });
});

export default router;
