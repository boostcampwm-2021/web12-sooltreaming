import { ERROR } from '@src/constant';

export class CustomError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const errorHandler = (error): Object => {
  const { status, message } = error;
  return { status: status || 500, message };
};

export const errorWrapper = (fn): any => {
  return async (req, res, next): Promise<void> => {
    try {
      if (!req.user) throw new CustomError(401, ERROR.SESSION_EXPIRE);
      await fn(req, res, next);
    } catch (error) {
      next(errorHandler(error));
    }
  };
};
