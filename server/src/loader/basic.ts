import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import { FRONT_BASE_URL, SESSION_SECRET } from '@src/constant';

const basicLoader = (app): any => {
  app.use(
    cors({
      origin: [FRONT_BASE_URL],
      credentials: true,
    }),
  );
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
    }),
  );
  app.use(cookieParser());

  return app;
};

export default basicLoader;
