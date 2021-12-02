import express from 'express';
import passport from 'passport';
import { AUTH_REDIRECT_URL } from '@src/constant';
import { CustomError } from '@utils/error';

const router = express.Router();

const redirectRouter = (req, res) => res.redirect(AUTH_REDIRECT_URL);
router.get('/github', passport.authenticate('github'), redirectRouter);
router.get('/naver', passport.authenticate('naver'), redirectRouter);

router.get('/login', (req, res, next): any => {
  try {
    const isAuth = req.isAuthenticated();
    if (!isAuth) throw new CustomError(401, 'fail to login');

    const user = req.user;

    return res.status(202).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy(function () {
    res.status(302).send();
  });
});

export default router;
