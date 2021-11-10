import passport from 'passport';
import gitHubStrategy from '@controller/passport/github';

const passportLoader = (app) => {
  // Session 설정
  const passToRequest = (user, done) => {
    done(null, user);
  };
  // serializeUser : Session에 유저 정보를 저장
  passport.serializeUser(passToRequest);
  // deserializeUser : 페이지 접근 때마다 Session에서 Request 객체에 넘겨줄 값 설정
  passport.deserializeUser(passToRequest);

  // 전략 설정
  passport.use(gitHubStrategy);

  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportLoader;
