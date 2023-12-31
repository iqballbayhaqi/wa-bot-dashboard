import {
  GET_DETAIL_TICKET_FAILED,
  GET_DETAIL_TICKET_LOADING,
  GET_DETAIL_TICKET_SUCCESS,
  GET_NEW_DETAIL_TICKET_FAILED,
  GET_NEW_DETAIL_TICKET_LOADING,
  GET_NEW_DETAIL_TICKET_SUCCESS,
  GET_TICKET_COUNT_FAILED,
  GET_TICKET_COUNT_LOADING,
  GET_TICKET_COUNT_SUCCESS,
  GET_TICKET_LIST_FAILED,
  GET_TICKET_LIST_LOADING,
  GET_TICKET_LIST_SUCCESS,
  RECEIVE_CHAT,
  SAVE_TICKET_FAILED,
  SAVE_TICKET_LOADING,
  SAVE_TICKET_SUCCESS,
  SEND_CHAT,
} from "@crema/types/actions/Ticket.actions";
import { ErrorResponseType } from "@crema/types/models/master";
import {
  ChatListType,
  TicketCountResponse,
  TicketDataType,
  TicketDetail,
  TicketDetailResponseType,
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

export const TicketDetailLoadingAction = createAction(
  GET_DETAIL_TICKET_LOADING
);
export const TicketDetailSuccessAction = createAction<TicketDetail>(
  GET_DETAIL_TICKET_SUCCESS
);
export const TicketDetailFailedAction = createAction<ErrorResponseType>(
  GET_DETAIL_TICKET_FAILED
);

export const TicketNewDetailLoadingAction = createAction(
  GET_NEW_DETAIL_TICKET_LOADING
);
export const TicketNewDetailSuccessAction = createAction<TicketDetail>(
  GET_NEW_DETAIL_TICKET_SUCCESS
);
export const TicketNewDetailFailedAction = createAction<ErrorResponseType>(
  GET_NEW_DETAIL_TICKET_FAILED
);

export const TicketCountLoadingAction = createAction(GET_TICKET_COUNT_LOADING);
export const TicketCountSuccessAction = createAction<number>(
  GET_TICKET_COUNT_SUCCESS
);
export const TicketCountFailedAction = createAction<ErrorResponseType>(
  GET_TICKET_COUNT_FAILED
);

export const SaveTicketLoadingAction = createAction(SAVE_TICKET_LOADING);
export const SaveTicketSuccessAction =
  createAction<TicketResponseType>(SAVE_TICKET_SUCCESS);
export const SaveTicketFailedAction =
  createAction<ErrorResponseType>(SAVE_TICKET_FAILED);

export const SendChatAction = createAction<ChatListType>(SEND_CHAT);
export const ReceiveChatAction = createAction<ChatListType>(RECEIVE_CHAT);
