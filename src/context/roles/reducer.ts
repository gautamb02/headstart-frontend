
import { RolesState, RolesAction } from './types';

export const initialState: RolesState = {
  roles: [],
  loading: true,
  error: null,
};

export const rolesReducer = (state: RolesState, action: RolesAction): RolesState => {
  switch (action.type) {
    case 'FETCH_ROLES_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_ROLES_SUCCESS':
      return { ...state, loading: false, roles: action.payload };
    case 'FETCH_ROLES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
