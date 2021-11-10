import { deepCopy } from '@src/utils';

export type Action = { type: 'UPDATE_USER', payload: any } | { type: 'SET_USERS', payload: any }

export type TState = {
    users: Object,
}

export const initialState = {
  users: {},
};

export const reducer = (state: TState, action: Action): TState => {
  switch (action.type) {
    case 'UPDATE_USER': {
      const {
        userDocumentId, userData,
      } = action.payload;
      const newUsers = deepCopy(state.users);
      newUsers[userDocumentId] = userData;

      return { ...state, users: newUsers };
    }

    case 'SET_USERS': {
      const {
        userDocumentId, userData,
      } = action.payload;
      const newUsers = deepCopy(state.users);
      newUsers[userDocumentId] = userData;

      return { ...state, users: newUsers };
    }

    default:
      throw new Error('Unhandled action');
  }
};
