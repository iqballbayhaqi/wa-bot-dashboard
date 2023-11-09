import { ContactResponse } from "../models/broadcast";
import { ErrorResponseType } from "../models/master";

export const GET_CONTACT_DATA_LOADING = "GET_CONTACT_DATA_LOADING";
export const GET_CONTACT_DATA_SUCCESS = "GET_CONTACT_DATA_SUCCESS";
export const GET_CONTACT_DATA_FAILED = "GET_CONTACT_DATA_FAILED";

export type GetContactLoadingAction = {
  type: typeof GET_CONTACT_DATA_LOADING;
};
export type GetContactSuccessAction = {
  type: typeof GET_CONTACT_DATA_SUCCESS;
  payload: ContactResponse[];
};
export type GetContactFailedAction = {
  type: typeof GET_CONTACT_DATA_FAILED;
  payload: ErrorResponseType;
};

export type BroadcastActionTypes =
  | GetContactLoadingAction
  | GetContactSuccessAction
  | GetContactFailedAction;
