import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

function basicLoader(app: any): any {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  return app;
}

export default basicLoader;
