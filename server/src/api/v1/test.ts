import express from 'express';
import User from '@models/User';
import NicknameLog from '@models/NicknameLog';
const router = express.Router();

router.get('/', async function (req, res, next) {
  const user = new User({
    githubId: 'github_id',
    naverId: 'naver_id',
    nickname: 'nickname',
    imgUrl: 'http://dfjskdfdjf.com',
  });
  const nickname = new NicknameLog({
    userId: user._id,
    nickname: user.nickname,
  });

  try {
    const result = await user.save();
    const nickResult = await nickname.save();
    res.status(201).json({ result, nickResult });
  } catch (e) {
    console.log(e);
  }
});

router.get('/error', function (req, res, next) {
  next({ message: 'hi', status: 404 });
});

export default router;
