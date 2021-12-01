import GitHubStrategy from 'passport-github';
import User from '@models/User';
import { GITHUB_ID, GITHUB_SECRET, OAUTH_CALLBACK_URL } from '@src/constant';
import type { GithubProfileType } from '@src/types';

const gitHubStrategy = new GitHubStrategy.Strategy(
  {
    clientID: GITHUB_ID,
    clientSecret: GITHUB_SECRET,
    callbackURL: OAUTH_CALLBACK_URL,
  },
  async (_accessToken, _refreshToken, profile, cb): Promise<Function | void> => {
    try {
      const { login: githubId, avatar_url: imgUrl } = profile._json as GithubProfileType;
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
