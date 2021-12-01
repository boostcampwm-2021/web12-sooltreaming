import { createAction } from '@hooks/redux';
import type { NoticeStateType, ErrorMessageType } from '@ts-types/store';

const initialState: NoticeStateType = {
  errorMessage: '',
};

export const [SET_NOTICE_MESSAGE, setNoticeMessage] =
  createAction<ErrorMessageType>('SET_NOTICE_MESSAGE');
export const [RESET_NOTICE_MESSAGE, resetNoticeMessage] = createAction<{}>('RESET_NOTICE_MESSAGE');

type NoticeAction = ReturnType<typeof setNoticeMessage>;

function noticeReducer(
  state: NoticeStateType = initialState,
  action: NoticeAction,
): NoticeStateType {
  switch (action.type) {
    case SET_NOTICE_MESSAGE: {
      const { errorMessage } = action.payload as ErrorMessageType;
      return {
        ...state,
        errorMessage,
      };
    }
    case RESET_NOTICE_MESSAGE: {
      return {
        ...state,
        errorMessage: '',
      };
    }
    default:
      return state;
  }
}

export default noticeReducer;
