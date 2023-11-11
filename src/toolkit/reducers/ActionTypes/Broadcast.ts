import {
  GET_BROADCAST_DATA_FAILED,
  GET_BROADCAST_DATA_LOADING,
  GET_BROADCAST_DATA_SUCCESS,
  GET_BROADCAST_DETAIL_FAILED,
  GET_BROADCAST_DETAIL_LOADING,
  GET_BROADCAST_DETAIL_SUCCESS,
  GET_CONTACT_DATA_FAILED,
  GET_CONTACT_DATA_LOADING,
  GET_CONTACT_DATA_SUCCESS,
  SEND_BROADCAST_DATA_FAILED,
  SEND_BROADCAST_DATA_LOADING,
  SEND_BROADCAST_DATA_SUCCESS,
} from "@crema/types/actions/Broadcast.action";
import {
  BroadcastData,
  BroadcastDataType,
  ContactResponse,
  SendBroadcastSuccess,
} from "@crema/types/models/broadcast";
import { ErrorResponseType } from "@crema/types/models/master";
import { createAction } from "@reduxjs/toolkit";

export const GetContactLoadingAction = createAction(GET_CONTACT_DATA_LOADING);
export const GetContactSuccessAction = createAction<ContactResponse[]>(
  GET_CONTACT_DATA_SUCCESS
);
export const GetContactFailedAction = createAction<ErrorResponseType>(
  GET_CONTACT_DATA_FAILED
);

export const SendBroadcastLoadingAction = createAction(
  SEND_BROADCAST_DATA_LOADING
);
export const SendBroadcastSuccessAction = createAction<SendBroadcastSuccess>(
  SEND_BROADCAST_DATA_SUCCESS
);
export const SendBroadcastFailedAction = createAction<ErrorResponseType>(
  SEND_BROADCAST_DATA_FAILED
);

export const GetBroadcastLoadingAction = createAction(
  GET_BROADCAST_DATA_LOADING
);
export const GetBroadcastSuccessAction = createAction<BroadcastDataType[]>(
  GET_BROADCAST_DATA_SUCCESS
);
export const GetBroadcastFailedAction = createAction<ErrorResponseType>(
  GET_BROADCAST_DATA_FAILED
);

export const GetBroadcastDetailLoadingAction = createAction(
  GET_BROADCAST_DETAIL_LOADING
);
export const GetBroadcastDetailSuccessAction = createAction<BroadcastData>(
  GET_BROADCAST_DETAIL_SUCCESS
);
export const GetBroadcastDetailFailedAction = createAction<ErrorResponseType>(
  GET_BROADCAST_DETAIL_FAILED
);
