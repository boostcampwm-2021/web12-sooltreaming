import { startSession } from 'mongoose';

export const transaction = async (fn) => {
  const session = await startSession();
  session.startTransaction();

  const result = await fn();

  await session.commitTransaction();
  session.endSession();

  return result;
};
