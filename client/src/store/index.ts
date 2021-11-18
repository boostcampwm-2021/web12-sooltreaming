import { combineReducers } from 'redux';
import user from '@store/user';
import notice from '@store/notice';
import device from '@store/device';
import room from '@store/room';
import friend from '@store/friend';

// rootReducer Type
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user,
  notice,
  device,
  room,
  friend,
});

export default rootReducer;
