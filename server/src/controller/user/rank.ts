import User from '@models/User';
import { errorHandler } from '@utils/error';
import cron from 'node-cron';

//리팩토링 전

const allRank = {
  chatCount: [],
  hookCount: [],
  pollCount: [],
  closeupCount: [],
  dieCount: [],
  speakCount: [],
  starterCount: [],
  totalSeconds: [],
};

const CHAT_COUNT = 'chatCount';
const HOOK_COUNT = 'hookCount';
const POLL_COUNT = 'pollCount';
const CLOSEUP_COUNT = 'closeupCount';
const DIE_COUNT = 'dieCount';
const SPEAK_COUNT = 'speakCount';
const STARTER_COUNT = 'starterCount';
const TOTAL_SECONDS = 'totalSeconds';

export const getRank = async (req, res, next) => {
  try {
    const rankType = req.params.type;
    const result = allRank[rankType];
    res.status(200).json(result);
  } catch (error) {
    next(errorHandler(error));
  }
};

cron.schedule('*/5 * * * *', () => {
  updateAllUserRank();
});

const updateAllUserRank = async () => {
  try {
    const newChatCount = await User.find().select(CHAT_COUNT).sort({ chatCount: -1 });
    const newHookCount = await User.find().select(HOOK_COUNT).sort({ hookCount: -1 });
    const newPollCount = await User.find().select(POLL_COUNT).sort({ pollCount: -1 });
    const newCloseupCount = await User.find().select(CLOSEUP_COUNT).sort({ closeupCount: -1 });
    const newDieCount = await User.find().select(DIE_COUNT).sort({ dieCount: -1 });
    const newSpeakCount = await User.find().select(SPEAK_COUNT).sort({ speakCount: -1 });
    const newStarterCount = await User.find().select(STARTER_COUNT).sort({ starterCount: -1 });
    const newTotalSeconds = await User.find().select(TOTAL_SECONDS).sort({ totalSeconds: -1 });

    allRank.chatCount = newChatCount;
    allRank.hookCount = newHookCount;
    allRank.pollCount = newPollCount;
    allRank.closeupCount = newCloseupCount;
    allRank.dieCount = newDieCount;
    allRank.speakCount = newSpeakCount;
    allRank.starterCount = newStarterCount;
    allRank.totalSeconds = newTotalSeconds;
  } catch (error) {
    console.error(error);
  }
};
