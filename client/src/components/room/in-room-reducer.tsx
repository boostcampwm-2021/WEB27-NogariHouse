/* eslint-disable max-len */
import { deepCopy } from '@src/utils';

export type Action = { type: 'JOIN_USER', payload: any } | { type: 'SET_USERS', payload: any } | { type: 'LEAVE_USER', payload: any };

export type TState = {
    participants: Array<any>,
}

export const initialState = {
  participants: [],
};

export const reducer = (state: TState, action: Action): TState => {
  switch (action.type) {
    case 'JOIN_USER': {
      const { userDocumentId, userData } = action.payload;
      const newParticipants = deepCopy(state.participants);
      newParticipants.push({ userDocumentId, userData });

      return { ...state, participants: newParticipants };
    }

    case 'LEAVE_USER': {
      const { userDocumentId } = action.payload;
      const newParticipants = state.participants.filter((user) => user.userDocumentId !== userDocumentId);

      return { ...state, participants: newParticipants };
    }

    case 'SET_USERS': {
      const { participants } = action.payload;
      const newParticipants = deepCopy(participants);

      return { ...state, participants: newParticipants };
    }

    default:
      throw new Error('Unhandled action');
  }
};
