/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-case-declarations */
/* eslint-disable no-redeclare */

import { deepCopy, makeDateToHourMinute } from '@utils/index';

interface IChatBasicInfo {
  date: string,
  userDocumentId: string,
  message: string,
  linkTo?: string,
}

export const initialState = {
  chattingLog: [],
};

export function chatReducer(state: any, action: any): any {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_CHATTING_LOG': {
      const { chatLog } = payload;
      const newChattingLog = deepCopy(state.chattingLog);
      newChattingLog.unshift(chatLog);

      return { ...state, chattingLog: newChattingLog };
    }

    case 'UPDATE': {
      const { responseChattingLog, user, participantsInfo } = payload;

      const newChattingLog = responseChattingLog.map((chat: IChatBasicInfo) => {
        if (chat.userDocumentId === user.userDocumentId) {
          return ({
            key: `${new Date(chat.date).getTime()}_${chat.userDocumentId}`,
            message: chat.message,
            userDocumentId: chat.userDocumentId,
            profileUrl: user.profileUrl,
            userName: user.userName,
            date: makeDateToHourMinute(new Date(chat.date)),
            linkTo: chat.linkTo,
          });
        }

        const userData = participantsInfo.filter((userInfo: IChatBasicInfo) => userInfo.userDocumentId === chat.userDocumentId);
        return ({
          key: `${new Date(chat.date).getTime()}_${chat.userDocumentId}`,
          message: chat.message,
          userDocumentId: chat.userDocumentId,
          profileUrl: userData[0].profileUrl,
          userName: userData[0].userName,
          date: makeDateToHourMinute(new Date(chat.date)),
          linkTo: chat.linkTo,
        });
      });

      return { ...state, chattingLog: state.chattingLog.concat(newChattingLog) };
    }

    default:
      return state;
  }
}
