import passport from 'passport';
import gitHubStrategy from '@controller/passport/github';
import naverStrategy from '@controller/passport/naver';
import User from '@models/User';
import type { ObjectId } from 'mongoose';

const passportLoader = (app): void => {
  app.use(passport.initialize());
  app.use(passport.session());

  // serializeUser : Session에 유저 정보를 저장
  passport.serializeUser((user: { _id: ObjectId }, done): void => {
    done(null, user._id);
  });
  // deserializeUser : 페이지 접근 때마다 Session에서 Request 객체에 넘겨줄 값 설정
  passport.deserializeUser(async (_id, done): Promise<void> => {
    const user = await User.findById(_id).select('_id nickname imgUrl');
    done(null, user);
  });

  // 전략 설정
  passport.use(gitHubStrategy);
  passport.use(naverStrategy);
};

export default passportLoader;
