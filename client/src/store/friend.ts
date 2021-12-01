import { createAction } from '@hooks/redux';
import type { FailureType, FriendStateType, FriendInfoType } from '@ts-types/store';

const initialState: FriendStateType = {
  friendList: [],
  sendFriendList: [],
  receiveFriendList: [],
};

export const [FRIEND_LIST_REQUEST, friendListRequest] =
  createAction<FriendInfoType[]>('FRIEND_LIST_REQUEST');
export const [FRIEND_LIST_SUCCESS, friendListSuccess] =
  createAction<FriendInfoType[]>('FRIEND_LIST_SUCCESS');
export const [FRIEND_LIST_FAILURE, friendListFailure] =
  createAction<FailureType>('FRIEND_LIST_FAILURE');
export const [SEND_FRIEND_LIST_REQUEST, sendFriendListRequest] = createAction<FriendInfoType[]>(
  'SEND_FRIEND_LIST_REQUEST',
);
export const [SEND_FRIEND_LIST_SUCCESS, sendFriendListSuccess] = createAction<FriendInfoType[]>(
  'SEND_FRIEND_LIST_SUCCESS',
);
export const [SEND_FRIEND_LIST_FAILURE, sendFriendListFailure] = createAction<FailureType>(
  'SEND_FRIEND_LIST_FAILURE',
);
export const [RECEIVE_FRIEND_LIST_REQUEST, receiveFriendListRequest] = createAction<
  FriendInfoType[]
>('RECEIVE_FRIEND_LIST_REQUEST');
export const [RECEIVE_FRIEND_LIST_SUCCESS, receiveFriendListSuccess] = createAction<
  FriendInfoType[]
>('RECEIVE_FRIEND_LIST_SUCCESS');
export const [RECEIVE_FRIEND_LIST_FAILURE, receiveFriendListFailure] = createAction<FailureType>(
  'RECEIVE_FRIEND_LIST_FAILURE',
);

export const [REJECT_FRIEND_REQUEST, rejectFriendRequest] =
  createAction<string>('REJECT_FRIEND_REQUEST');
export const [ACCEPT_FRIEND_REQUEST, acceptFriendRequest] =
  createAction<FriendInfoType>('ACCEPT_FRIEND_REQUEST');
export const [CANCEL_FRIEND_REQUEST, cancelFriendRequest] =
  createAction<FriendInfoType>('CANCEL_FRIEND_REQUEST');

export const [SEND_FRIEND_REQUEST, sendFriendRequest] =
  createAction<FriendInfoType>('SEND_FRIEND_REQUEST');
export const [RECEIVE_FRIEND_REQUEST, receiveFriendRequest] =
  createAction<FriendInfoType>('RECEIVE_FRIEND_REQUEST');

export const [DELETE_FRIEND, deleteFriend] = createAction<string>('DELETE_FRIEND');

type friendAction =
  | ReturnType<typeof friendListRequest>
  | ReturnType<typeof friendListSuccess>
  | ReturnType<typeof friendListFailure>
  | ReturnType<typeof sendFriendListRequest>
  | ReturnType<typeof sendFriendListSuccess>
  | ReturnType<typeof sendFriendListFailure>
  | ReturnType<typeof receiveFriendListRequest>
  | ReturnType<typeof receiveFriendListSuccess>
  | ReturnType<typeof receiveFriendListFailure>
  | ReturnType<typeof rejectFriendRequest>
  | ReturnType<typeof acceptFriendRequest>
  | ReturnType<typeof cancelFriendRequest>
  | ReturnType<typeof deleteFriend>
  | ReturnType<typeof sendFriendRequest>
  | ReturnType<typeof receiveFriendRequest>;

function friendReducer(
  state: FriendStateType = initialState,
  action: friendAction,
): FriendStateType {
  switch (action.type) {
    case FRIEND_LIST_SUCCESS:
      const friendList = action.payload as FriendInfoType[];
      return {
        ...state,
        friendList,
      };
    case SEND_FRIEND_LIST_SUCCESS: {
      const sendFriendList = action.payload as FriendInfoType[];
      return {
        ...state,
        sendFriendList,
      };
    }
    case RECEIVE_FRIEND_LIST_SUCCESS: {
      const receiveFriendList = action.payload as FriendInfoType[];
      return {
        ...state,
        receiveFriendList,
      };
    }

    case REJECT_FRIEND_REQUEST: {
      const _id = action.payload as string;
      const newReceiveList = [...state.receiveFriendList].filter(({ _id: id }) => id !== _id);
      return {
        ...state,
        receiveFriendList: newReceiveList,
      };
    }

    case ACCEPT_FRIEND_REQUEST: {
      const receiveFriend = action.payload as FriendInfoType;
      const newReceiveList = state.receiveFriendList.filter(({ _id }) => _id !== receiveFriend._id);
      const newFriendList = [...state.friendList, receiveFriend];
      return {
        ...state,
        receiveFriendList: newReceiveList,
        friendList: newFriendList,
      };
    }

    case CANCEL_FRIEND_REQUEST: {
      const _id = action.payload as string;
      const newSendList = state.sendFriendList.filter(({ _id: id }) => _id !== id);
      return {
        ...state,
        sendFriendList: newSendList,
      };
    }

    case DELETE_FRIEND: {
      const _id = action.payload as string;
      const newFriendList = [...state.friendList].filter(({ _id: id }) => id !== _id);
      return {
        ...state,
        friendList: newFriendList,
      };
    }

    case SEND_FRIEND_REQUEST: {
      const newFriend = action.payload as FriendInfoType;
      return {
        ...state,
        sendFriendList: [...state.sendFriendList, newFriend],
      };
    }
    case RECEIVE_FRIEND_REQUEST: {
      const newFriend = action.payload as FriendInfoType;
      return {
        ...state,
        receiveFriendList: [...state.receiveFriendList, newFriend],
      };
    }
    default:
      return state;
  }
}

export default friendReducer;
