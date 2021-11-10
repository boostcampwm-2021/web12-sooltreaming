import express from 'express';
import passport from 'passport';
import { AUTH_REDIRECT_URL } from '@src/constant';

const router = express.Router();

const redirectRouter = (req, res) => {
  res.redirect(AUTH_REDIRECT_URL);
};
router.get('/github', passport.authenticate('github'), redirectRouter);
router.get('/naver', passport.authenticate('naver'), redirectRouter);

export default router;
