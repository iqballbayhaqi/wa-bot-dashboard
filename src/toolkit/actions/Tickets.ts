import jwtAxios from "@crema/services/axios/ApiConfig";
import { AppActions } from "@crema/types/actions";
import {
  GET_TICKET_LIST_FAILED,
  GET_TICKET_LIST_LOADING,
  GET_TICKET_LIST_SUCCESS,
  SAVE_TICKET_FAILED,
  SAVE_TICKET_LOADING,
  SAVE_TICKET_SUCCESS,
} from "@crema/types/actions/Ticket.actions";
import {
  TicketDataType,
  TicketPayload,
  TicketResponseType,
  TicketSaveResponse,
} from "@crema/types/models/tickets";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

export const getTicketList = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_TICKET_LIST_LOADING,
    });

    jwtAxios
      .get("/tickets", { headers: { "Cache-Control": "no-cache" } })
      .then((data: AxiosResponse<TicketResponseType[]>) => {
        const mappedData: TicketDataType[] = data.data.map((ticket) => ({
          id: ticket.id,
          ticketNumber: ticket.ticketNumber,
          status: ticket.status,
          phoneNumber: ticket.phoneNumber,
          startTime: ticket.startTime,
          endTime: ticket.endTime,
          issue: ticket.issue,
          department: ticket.department,
          category: ticket.category,
        }));

        dispatch({
          type: GET_TICKET_LIST_SUCCESS,
          payload: mappedData,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_TICKET_LIST_FAILED,
          payload: error,
        });
      });
  };
};

export const moveTicket = (payload: TicketPayload) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: SAVE_TICKET_LOADING,
    });

    jwtAxios
      .post("/moveTicket", payload)
      .then((data: AxiosResponse<TicketSaveResponse>) => {
        dispatch({
          type: SAVE_TICKET_SUCCESS,
          payload: data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: SAVE_TICKET_FAILED,
          payload: error,
        });
      });
  };
};
