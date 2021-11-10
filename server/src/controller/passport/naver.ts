import NaverStrategy from 'passport-naver';
import User from '@models/User';
import { NAVER_ID, NAVER_SECRET, OAUTH_CALLBACK_URL } from '@src/constant';

interface profileType {
  email: string;
  nickname: string;
  profile_image: string;
  age: number | undefined;
  birthday: any;
}

const naverStrategy = new NaverStrategy.Strategy(
  {
    clientID: NAVER_ID,
    clientSecret: NAVER_SECRET,
    callbackURL: OAUTH_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const { email: naverId, nickname, profile_image: imgUrl } = profile._json as profileType;

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
