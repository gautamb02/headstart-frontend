
import Config from '../../config';

export const fetchRoles = async (dispatch: any) => {
  dispatch({ type: 'FETCH_ROLES_REQUEST' });

  const token = localStorage.getItem('token') || ''; // Default to an empty string if token is null
  const orgId = localStorage.getItem('selectedOrganization') || ''; // Default to an empty string if token is null

  const options: RequestInit = {
    method: 'GET',
    headers: {
      Accept: '*/*',
      authorization: token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(`${Config.API_URL}/api/organization/${orgId}/roles`, options);
    const data = await response.json();

    if (data.success) {
      dispatch({ type: 'FETCH_ROLES_SUCCESS', payload: data.roles });
    } else {
      dispatch({ type: 'FETCH_ROLES_FAILURE', payload: 'Failed to fetch roles' });
    }
  } catch (error) {
    dispatch({ type: 'FETCH_ROLES_FAILURE', payload: 'An error occurred while fetching roles' });
  }
};
