import express from 'express';
import passport from 'passport';
import { AUTH_REDIRECT_URL } from '@src/constant';
import { CustomError } from '@utils/error';
declare module 'express-session' {
  export interface SessionData {
    startTime: number;
  }
}
const router = express.Router();

const redirectRouter = (req, res) => res.redirect(AUTH_REDIRECT_URL);
router.get('/github', passport.authenticate('github'), redirectRouter);
router.get('/naver', passport.authenticate('naver'), redirectRouter);

router.get('/login', (req, res, next): any => {
  try {
    const isAuth = req.isAuthenticated();
    if (!isAuth) throw new CustomError(401, 'fail to login');

    const user = req.user;

    if (!req.session.startTime) req.session.startTime = new Date().getTime();
    return res.status(202).json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
