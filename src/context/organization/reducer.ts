
// reducer.ts
import { State, Action } from './types';
import { SET_ORGANIZATIONS, SET_MESSAGE, SET_SELECTED_ORG } from './actions';

export const initialState: State = {
  organizations: [],
  message: '',
  selectedOrg: '', // Initialize this
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
    case SET_SELECTED_ORG: // Handle the new action
      return {
        ...state,
        selectedOrg: action.payload,
      };
    default:
      return state;
  }
};
