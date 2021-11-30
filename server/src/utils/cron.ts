import cron from 'node-cron';
import { updateRank } from '@service/rank';

export const updateRankCron = cron.schedule(
  '*/5 * * * *',
  () => {
    updateRank();
  },
  {
    scheduled: false,
  },
);
