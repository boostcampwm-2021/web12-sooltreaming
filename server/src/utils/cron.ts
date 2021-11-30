import cron from 'node-cron';
import { updateRank } from '@utils/updateRank';

export const updateRankCron = cron.schedule(
  '*/5 * * * *',
  () => {
    updateRank();
  },
  {
    scheduled: false,
  },
);
