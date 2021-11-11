import { deepCopy } from '@src/utils';

export type Action = { type: 'UPDATE_USER', payload: any } | { type: 'SET_USERS', payload: any }

export type TState = {
    participants: Array<any>,
}

export const initialState = {
  participants: [],
};

export const reducer = (state: TState, action: Action): TState => {
  switch (action.type) {
    case 'UPDATE_USER': {
      const { userDocumentId, userData } = action.payload;
      const newParticipants = deepCopy(state.participants);
      newParticipants.push({ userDocumentId, userData });

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
