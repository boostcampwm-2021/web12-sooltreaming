import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

function basicLoader(app: any): any {
  app.use(
    cors({
      origin: [`http://${process.env.FRONT_HOST}:${process.env.FRONT_PORT}`],
      credentials: true,
    }),
  );
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  return app;
}

export default basicLoader;
