import express from 'express';
import {
  postFriend,
  getSendFriend,
  getReceiveFriend,
  getFriend,
  patchSendFriend,
  patchReceiveFriend,
  patchUnfriend,
  patchFriend,
} from '@controller/friend';

const router = express.Router();

router.post('/', postFriend);
router.get('/send', getSendFriend);
router.get('/receive', getReceiveFriend);
router.get('/', getFriend);
router.patch('/send', patchSendFriend);
router.patch('/receive', patchReceiveFriend);
router.patch('/remove', patchUnfriend);
router.patch('/accept', patchFriend);

export default router;
