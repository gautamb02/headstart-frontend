import Config from "../../config";
import {  Organization } from "./types";
// actions.ts
export const SET_ORGANIZATIONS = 'SET_ORGANIZATIONS';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_SELECTED_ORG = 'SET_SELECTED_ORG'; // Add this line

export const setOrganizations = (organizations: Organization[]) => ({
  type: SET_ORGANIZATIONS,
  payload: organizations,
});

export const setMessage = (message: string) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const setSelectedOrg = (orgId: string) => ({
  type: SET_SELECTED_ORG,
  payload: orgId,
});




export const fetchOrganizations = async (dispatch: any) => {
    const token = localStorage.getItem("token") || ''; // Default to an empty string if token is null
  
    const options: RequestInit = {
      method: "GET",
      headers: {
        Accept: "*/*",
        authorization: token,
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch(`${Config.API_URL}/api/organization/all`, options);
      const data = await response.json();
  
      if (data.success) {
        dispatch(setOrganizations(data.organizations));
        dispatch(setMessage(data.message));
      } else {
        dispatch(setOrganizations([]));
        dispatch(setMessage(data.message));
      }
    } catch (error) {
      dispatch(setMessage("An error occurred while fetching organizations"));
    }
  };