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

router.delete('/', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  await User.updateOne({ _id }, { sendFriend: [] });
  await User.updateOne({ _id }, { receiveFriend: [] });
  res.status(200).json({ message: 'Request Friend Success' });
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

export default router;
