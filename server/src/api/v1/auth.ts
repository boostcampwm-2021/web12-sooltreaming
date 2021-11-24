import express from 'express';
import passport, { session } from 'passport';
import { AUTH_REDIRECT_URL } from '@src/constant';
import { CustomError, errorWrapper } from '@utils/error';

const router = express.Router();

const redirectRouter = (req, res) => res.redirect(AUTH_REDIRECT_URL);
router.get('/github', passport.authenticate('github'), redirectRouter);
router.get('/naver', passport.authenticate('naver'), redirectRouter);

router.get(
  '/login',
  errorWrapper((req, res, next) => {
    const isAuth = req.isAuthenticated();
    if (!isAuth) throw new CustomError(401, 'fail to login');

    const user = req.user;

    if (!req.session.startTime) req.session.startTime = new Date().getTime();
    res.status(202).json(user);
  }),
);

export default router;
