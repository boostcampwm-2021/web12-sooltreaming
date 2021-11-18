import { createAction } from '@hooks/redux';
export type FailureType = { message: string };

type friendStateType = {
  friendList: string[];
  sendFriendList: string[];
  receiveFriendList: string[];
};

const initialState: friendStateType = {
  friendList: [],
  sendFriendList: [],
  receiveFriendList: [],
};

export const [FRIEND_LIST_REQUEST, friendListRequest] =
  createAction<string[]>('FRIEND_LIST_REQUEST');
export const [FRIEND_LIST_SUCCESS, friendListSuccess] =
  createAction<string[]>('FRIEND_LIST_SUCCESS');
export const [FRIEND_LIST_FAILURE, friendListFailuer] =
  createAction<FailureType>('FRIEND_LIST_FAILURE');
export const [SEND_FRIEND_LIST_REQUEST, sendFriendListRequest] = createAction<string[]>(
  'SEND_FRIEND_LIST_REQUEST',
);
export const [SEND_FRIEND_LIST_SUCCESS, sendFriendListSuccess] = createAction<string[]>(
  'SEND_FRIEND_LIST_SUCCESS',
);
export const [SEND_FRIEND_LIST_FAILURE, sendFriendListFailuer] = createAction<FailureType>(
  'SEND_FRIEND_LIST_FAILURE',
);
export const [RECEIVE_FRIEND_LIST_REQUEST, receiveFriendListRequest] = createAction<string[]>(
  'RECEIVE_FRIEND_LIST_REQUEST',
);
export const [RECEIVE_FRIEND_LIST_SUCCESS, receiveFriendListSuccess] = createAction<string[]>(
  'RECEIVE_FRIEND_LIST_SUCCESS',
);
export const [RECEIVE_FRIEND_LIST_FAILURE, receiveFriendListFailuer] = createAction<FailureType>(
  'RECEIVE_FRIEND_LIST_FAILURE',
);
export const [REQUEST_FRIEND, requestFriend] = createAction('REQUEST_FRIEND');
export const [REQUEST_FRIEND_SUCCESS, requestFriendSuccess] =
  createAction('REQUEST_FRIEND_SUCCESS');
export const [REQUEST_FRIEND_FAILURE, requestFriendFailuer] =
  createAction('REQUEST_FRIEND_FAILURE');
type friendAction =
  | ReturnType<typeof friendListRequest>
  | ReturnType<typeof friendListSuccess>
  | ReturnType<typeof friendListFailuer>
  | ReturnType<typeof sendFriendListRequest>
  | ReturnType<typeof sendFriendListSuccess>
  | ReturnType<typeof sendFriendListFailuer>
  | ReturnType<typeof receiveFriendListRequest>
  | ReturnType<typeof receiveFriendListSuccess>
  | ReturnType<typeof receiveFriendListFailuer>;

function friendReducer(
  state: friendStateType = initialState,
  action: friendAction,
): friendStateType {
  switch (action.type) {
    case FRIEND_LIST_SUCCESS:
      const friendList = action.payload as string[];
      return {
        ...state,
        friendList,
      };
    case SEND_FRIEND_LIST_SUCCESS: {
      const sendFriendList = action.payload as string[];
      return {
        ...state,
        sendFriendList,
      };
    }
    case RECEIVE_FRIEND_LIST_SUCCESS: {
      const receiveFriendList = action.payload as string[];
      return {
        ...state,
        receiveFriendList,
      };
    }
    default:
      return state;
  }
}

export default friendReducer;
