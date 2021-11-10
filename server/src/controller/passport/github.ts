import GitHubStrategy from 'passport-github';
import User from '@models/User';

const clientID = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL;

type profileType = {
  login: string;
  avatar_url: string;
};

const gitHubStrategy = new GitHubStrategy.Strategy(
  {
    clientID,
    clientSecret,
    callbackURL,
  },
  async (_accessToken, _refreshToken, profile, cb) => {
    try {
      const { login: githubId, avatar_url: imgUrl } = profile._json as profileType;

      const existUser = await User.findOne({ githubId });
      if (existUser) return cb(null, existUser);

      const newUser = await new User({
        githubId,
        nickname: githubId,
        imgUrl,
      }).save();
      return cb(null, newUser);
    } catch (err) {
      return cb(err);
    }
  },
);

export default gitHubStrategy;
