import express from 'express';
import createError from 'http-errors';
import passport from 'passport';
import { AUTH_REDIRECT_URL } from '@src/constant';

const router = express.Router();

const redirectRouter = (req, res) => res.redirect(AUTH_REDIRECT_URL);
router.get('/github', passport.authenticate('github'), redirectRouter);
router.get('/naver', passport.authenticate('naver'), redirectRouter);

router.get('/login', (req, res, next) => {
  try {
    const isAuth = req.isAuthenticated();
    if (!isAuth) return next(createError(401));

    const user = req.user;
    return res.status(202).json(user);
  } catch (e) {
    next(createError(400));
  }
});

export default router;
