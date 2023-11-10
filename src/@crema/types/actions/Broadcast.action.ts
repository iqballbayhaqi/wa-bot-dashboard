import {
  BroadcastDataType,
  BroadcastResponse,
  ContactResponse,
  SendBroadcastSuccess,
} from "../models/broadcast";
import { ErrorResponseType } from "../models/master";

export const GET_BROADCAST_DATA_LOADING = "GET_BROADCAST_DATA_LOADING";
export const GET_BROADCAST_DATA_SUCCESS = "GET_BROADCAST_DATA_SUCCESS";
export const GET_BROADCAST_DATA_FAILED = "GET_BROADCAST_DATA_FAILED";

export const SEND_BROADCAST_DATA_LOADING = "SEND_BROADCAST_DATA_LOADING";
export const SEND_BROADCAST_DATA_SUCCESS = "SEND_BROADCAST_DATA_SUCCESS";
export const SEND_BROADCAST_DATA_FAILED = "SEND_BROADCAST_DATA_FAILED";

export const GET_CONTACT_DATA_LOADING = "GET_CONTACT_DATA_LOADING";
export const GET_CONTACT_DATA_SUCCESS = "GET_CONTACT_DATA_SUCCESS";
export const GET_CONTACT_DATA_FAILED = "GET_CONTACT_DATA_FAILED";

export type GetBroadcastLoadingAction = {
  type: typeof GET_BROADCAST_DATA_LOADING;
};
export type GetBroadcastSuccessAction = {
  type: typeof GET_BROADCAST_DATA_SUCCESS;
  payload: BroadcastDataType[];
};
export type GetBroadcastFailedAction = {
  type: typeof GET_BROADCAST_DATA_FAILED;
  payload: ErrorResponseType;
};

export type SendBroadcastLoadingAction = {
  type: typeof SEND_BROADCAST_DATA_LOADING;
};
export type SendBroadcastSuccessAction = {
  type: typeof SEND_BROADCAST_DATA_SUCCESS;
  payload: SendBroadcastSuccess;
};
export type SendBroadcastFailedAction = {
  type: typeof SEND_BROADCAST_DATA_FAILED;
  payload: ErrorResponseType;
};

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
  | GetContactFailedAction
  | GetBroadcastLoadingAction
  | GetBroadcastSuccessAction
  | GetBroadcastFailedAction
  | SendBroadcastLoadingAction
  | SendBroadcastSuccessAction
  | SendBroadcastFailedAction;
