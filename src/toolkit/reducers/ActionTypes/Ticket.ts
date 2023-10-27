import {
  GET_TICKET_LIST_FAILED,
  GET_TICKET_LIST_LOADING,
  GET_TICKET_LIST_SUCCESS,
  SAVE_TICKET_FAILED,
  SAVE_TICKET_LOADING,
  SAVE_TICKET_SUCCESS,
} from "@crema/types/actions/Ticket.actions";
import { ErrorResponseType } from "@crema/types/models/master";
import {
  TicketDataType,
  TicketResponseType,
} from "@crema/types/models/tickets";
import { createAction } from "@reduxjs/toolkit";

export const TicketListLoadingAction = createAction(GET_TICKET_LIST_LOADING);
export const TicketListSuccessAction = createAction<TicketDataType[]>(
  GET_TICKET_LIST_SUCCESS
);
export const TicketListFailedAction = createAction<ErrorResponseType>(
  GET_TICKET_LIST_FAILED
);

export const SaveTicketLoadingAction = createAction(SAVE_TICKET_LOADING);
export const SaveTicketSuccessAction =
  createAction<TicketResponseType>(SAVE_TICKET_SUCCESS);
export const SaveTicketFailedAction =
  createAction<ErrorResponseType>(SAVE_TICKET_FAILED);
