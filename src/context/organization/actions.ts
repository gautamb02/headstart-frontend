import Config from "../../config";
import { Action, Organization } from "./types";

export const SET_ORGANIZATIONS = "SET_ORGANIZATIONS";
export const SET_MESSAGE = "SET_MESSAGE";

export const setOrganizations = (organizations: Organization[]): Action => ({
  type: SET_ORGANIZATIONS,
  payload: organizations,
});

export const setMessage = (message: string): Action => ({
  type: SET_MESSAGE,
  payload: message,
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