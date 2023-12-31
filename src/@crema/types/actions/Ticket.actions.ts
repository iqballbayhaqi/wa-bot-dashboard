import { ErrorResponseType } from "../models/master";
import {
  TicketCountResponse,
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

export const GET_NEW_DETAIL_TICKET_LOADING = "GET_NEW_DETAIL_TICKET_LOADING";
export const GET_NEW_DETAIL_TICKET_SUCCESS = "GET_NEW_DETAIL_TICKET_SUCCESS";
export const GET_NEW_DETAIL_TICKET_FAILED = "GET_NEW_DETAIL_TICKET_FAILED";

export const GET_TICKET_COUNT_LOADING = "GET_TICKET_COUNT_LOADING";
export const GET_TICKET_COUNT_SUCCESS = "GET_TICKET_COUNT_SUCCESS";
export const GET_TICKET_COUNT_FAILED = "GET_TICKET_COUNT_FAILED";

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

export type GetNewDetailTicketLoadingAction = {
  type: typeof GET_NEW_DETAIL_TICKET_LOADING;
};
export type GetNewDetailTicketSuccessAction = {
  type: typeof GET_NEW_DETAIL_TICKET_SUCCESS;
  payload: TicketDetail;
};
export type GetNewDetailTicketFailedAction = {
  type: typeof GET_NEW_DETAIL_TICKET_FAILED;
  payload: ErrorResponseType;
};

export type GetTicketCountLoadingAction = {
  type: typeof GET_TICKET_COUNT_LOADING;
};
export type GetTicketCountSuccessAction = {
  type: typeof GET_TICKET_COUNT_SUCCESS;
  payload: number;
};
export type GetTicketCountFailedAction = {
  type: typeof GET_TICKET_COUNT_FAILED;
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
  | SaveTicketFailedAction
  | GetNewDetailTicketFailedAction
  | GetNewDetailTicketSuccessAction
  | GetNewDetailTicketLoadingAction
  | GetTicketCountLoadingAction
  | GetTicketCountSuccessAction
  | GetTicketCountFailedAction;
