// types.ts

export interface Role {
  id: string;
  role: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

export interface RolesApiResponse {
  success: number;
  message: string;
  roles: Role[];
}

export interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

export type RolesAction =
  | { type: 'FETCH_ROLES_REQUEST' }
  | { type: 'FETCH_ROLES_SUCCESS'; payload: Role[] }
  | { type: 'FETCH_ROLES_FAILURE'; payload: string };
