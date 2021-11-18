import express from 'express';
import User from '@models/User';
const router = express.Router();

router.get('/list', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ friends: result.friend });
});

router.post('/send', async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.updateOne({ _id }, { $addToSet: { sendFriend: targetId } });
  res.status(201).json({ message: 'Request Friend Success' });
});

router.get('/sendList', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ sendFriends: result.sendFriend });
});

router.post('/receive', async (req, res, next) => {
  const { targetId } = req.body;
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.updateOne({ _id: targetId }, { $addToSet: { receiveFriend: _id } });
  res.status(201).json({ message: 'Receive Friend Success' });
});

router.get('/receiveList', async (req, res, next) => {
  const { _id } = JSON.parse(JSON.stringify(req.user));
  const result = await User.findOne({ _id });
  res.status(200).json({ receiveFriends: result.receiveFriend });
});

export default router;
