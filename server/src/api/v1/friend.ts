import express from 'express';
import {
  postFriendRequest,
  getFriendList,
  getSendFriendList,
  getReceiveFriendList,
  getFullSendFriend,
  getFullReceiveFriend,
  getFullFriend,
  deleteSendFriend,
  deleteReceiveFriend,
  deleteFriend,
  patchFriend,
} from '@controller/friend';

const router = express.Router();

router.post('/', postFriendRequest);
router.get('/list', getFriendList);
router.get('/sendList', getSendFriendList);
router.get('/receiveList', getReceiveFriendList);
router.get('/fullSendFriend', getFullSendFriend);
router.get('/fullReceiveFriend', getFullReceiveFriend);
router.get('/fullFriend', getFullFriend);
router.delete('/sendFriend', deleteSendFriend);
router.delete('/receiveFriend', deleteReceiveFriend);
router.delete('/', deleteFriend);
router.patch('/', patchFriend);

export default router;
