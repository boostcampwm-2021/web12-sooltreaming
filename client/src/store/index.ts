import { combineReducers } from 'redux';
import user from 'store/user';
import notice from 'store/notice';

// rootReducer Type
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  user,
  notice,
});

export default rootReducer;
