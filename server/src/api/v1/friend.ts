import express from 'express';
import User from '@models/User';
const router = express.Router();

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

export default router;
