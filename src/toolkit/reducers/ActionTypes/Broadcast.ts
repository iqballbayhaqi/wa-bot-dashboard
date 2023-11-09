import {
  GET_CONTACT_DATA_FAILED,
  GET_CONTACT_DATA_LOADING,
  GET_CONTACT_DATA_SUCCESS,
} from "@crema/types/actions/Broadcast.action";
import { ContactResponse } from "@crema/types/models/broadcast";
import { ErrorResponseType } from "@crema/types/models/master";
import { createAction } from "@reduxjs/toolkit";

export const GetContactLoadingAction = createAction(GET_CONTACT_DATA_LOADING);
export const GetContactSuccessAction = createAction<ContactResponse[]>(
  GET_CONTACT_DATA_SUCCESS
);
export const GetContactFailedAction = createAction<ErrorResponseType>(
  GET_CONTACT_DATA_FAILED
);
