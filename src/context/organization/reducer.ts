import { State, Action } from './types';
import { SET_ORGANIZATIONS, SET_MESSAGE } from './actions';

export const initialState: State = {
  organizations: [],
  message: '',
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_ORGANIZATIONS:
      return {
        ...state,
        organizations: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
