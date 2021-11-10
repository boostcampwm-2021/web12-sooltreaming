import passport from 'passport';
import gitHubStrategy from '@controller/passport/github';
import User from '@models/User';
import type { ObjectId } from 'mongoose';

const passportLoader = (app) => {
  // serializeUser : Session에 유저 정보를 저장
  passport.serializeUser((user: { _id: ObjectId }, done) => {
    done(null, user._id);
  });
  // deserializeUser : 페이지 접근 때마다 Session에서 Request 객체에 넘겨줄 값 설정
  passport.deserializeUser(async (id, done) => {
    const user = User.findById(id);
    done(null, user);
  });

  // 전략 설정
  passport.use(gitHubStrategy);

  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportLoader;
