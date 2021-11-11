import { createAction } from '@hooks/redux';

type NoticeStateType = {
  errorMessage: string;
};
const initialState: NoticeStateType = {
  errorMessage: '',
};

// 확장성을 생각해 별도의 Type 지정
type ErrorMessageType = {
  errorMessage: string;
};
export const [SET_NOTICE_MESSAGE, setNoticeMessage] =
  createAction<ErrorMessageType>('SET_NOTICE_MESSAGE');

type noticeAction = ReturnType<typeof setNoticeMessage>;

function noticeReducer(
  state: NoticeStateType = initialState,
  action: noticeAction,
): NoticeStateType {
  switch (action.type) {
    case SET_NOTICE_MESSAGE: {
      const { errorMessage } = action.payload as ErrorMessageType;
      return {
        ...state,
        errorMessage,
      };
    }
    default:
      return state;
  }
}

export default noticeReducer;
