import { ErrorResponseType } from "../models/master";
import {
  TicketDataType,
  TicketDetail,
  TicketDetailResponseType,
  TicketResponseType,
  TicketSaveResponse,
} from "../models/tickets";

export const GET_TICKET_LIST_LOADING = "GET_TICKET_LIST_LOADING";
export const GET_TICKET_LIST_SUCCESS = "GET_TICKET_LIST_SUCCESS";
export const GET_TICKET_LIST_FAILED = "GET_TICKET_LIST_FAILED";

export const GET_DETAIL_TICKET_LOADING = "GET_DETAIL_TICKET_LOADING";
export const GET_DETAIL_TICKET_SUCCESS = "GET_DETAIL_TICKET_SUCCESS";
export const GET_DETAIL_TICKET_FAILED = "GET_DETAIL_TICKET_FAILED";

export const SAVE_TICKET_LOADING = "SAVE_TICKET_LOADING";
export const SAVE_TICKET_SUCCESS = "SAVE_TICKET_SUCCESS";
export const SAVE_TICKET_FAILED = "SAVE_TICKET_FAILED";

export const SEND_CHAT = "SEND_CHAT";
export const RECEIVE_CHAT = "RECEIVE_CHAT";

export type GetTicketListLoadingAction = {
  type: typeof GET_TICKET_LIST_LOADING;
};
export type GetTicketListSuccessAction = {
  type: typeof GET_TICKET_LIST_SUCCESS;
  payload: TicketDataType[];
};
export type GetTicketListFailedAction = {
  type: typeof GET_TICKET_LIST_FAILED;
  payload: ErrorResponseType;
};

export type GetDetailTicketLoadingAction = {
  type: typeof GET_DETAIL_TICKET_LOADING;
};
export type GetDetailTicketSuccessAction = {
  type: typeof GET_DETAIL_TICKET_SUCCESS;
  payload: TicketDetail;
};
export type GetDetailTicketFailedAction = {
  type: typeof GET_DETAIL_TICKET_FAILED;
  payload: ErrorResponseType;
};

export type SaveTicketLoadingAction = {
  type: typeof SAVE_TICKET_LOADING;
};
export type SaveTicketSuccessAction = {
  type: typeof SAVE_TICKET_SUCCESS;
  payload: TicketSaveResponse;
};
export type SaveTicketFailedAction = {
  type: typeof SAVE_TICKET_FAILED;
  payload: ErrorResponseType;
};

export type TicketActionTypes =
  | GetTicketListLoadingAction
  | GetTicketListSuccessAction
  | GetTicketListFailedAction
  | GetDetailTicketLoadingAction
  | GetDetailTicketSuccessAction
  | GetDetailTicketFailedAction
  | SaveTicketLoadingAction
  | SaveTicketSuccessAction
  | SaveTicketFailedAction;
