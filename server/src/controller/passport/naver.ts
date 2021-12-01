import NaverStrategy from 'passport-naver';
import User from '@models/User';
import { NAVER_ID, NAVER_SECRET, OAUTH_CALLBACK_URL } from '@src/constant';
import type { NaverProfileType } from '@src/types';

const naverStrategy = new NaverStrategy.Strategy(
  {
    clientID: NAVER_ID,
    clientSecret: NAVER_SECRET,
    callbackURL: OAUTH_CALLBACK_URL,
  },
  async (_accessToken, _refreshToken, profile, cb): Promise<Function | void> => {
    try {
      const { email: naverId, nickname, profile_image: imgUrl } = profile._json as NaverProfileType;

      const existUser = await User.findOne({ naverId });
      if (existUser) return cb(null, existUser);

      const newUser = await new User({ naverId, nickname, imgUrl }).save();
      return cb(null, newUser);
    } catch (err) {
      return cb(err);
    }
  },
);

export default naverStrategy;
