import { startSession } from 'mongoose';

export const transaction = async (fn: Function): Promise<void> => {
  const session = await startSession();
  await session.withTransaction(async () => {
    await fn(session);
  });
  session.endSession();
};
