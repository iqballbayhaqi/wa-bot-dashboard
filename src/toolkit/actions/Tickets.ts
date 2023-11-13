import jwtAxios from "@crema/services/axios";
import { AppActions } from "@crema/types/actions";
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
  SAVE_TICKET_FAILED,
  SAVE_TICKET_LOADING,
  SAVE_TICKET_SUCCESS,
} from "@crema/types/actions/Ticket.actions";
import {
  CategoryResponseType,
  DepartementData,
  DepartementResponseType,
} from "@crema/types/models/master";
import {
  QuestionResponse,
  TicketCountResponse,
  TicketDataType,
  TicketDetailResponseType,
  TicketPayload,
  TicketResponseType,
  TicketSaveResponse,
} from "@crema/types/models/tickets";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

const getDepartmentNameById = (
  id: number,
  data: DepartementData[]
): string | undefined => {
  const department = data.find((department) => department.id === id);
  return department ? department.name : undefined;
};

const getCategoryNameById = (
  id: number,
  data: CategoryResponseType[]
): string | undefined => {
  const category = data.find((category) => category.id === id);
  return category ? category.name : undefined;
};

export const getTicketList = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_TICKET_LIST_LOADING,
    });

    jwtAxios
      .get("/tickets")
      .then(async (data: AxiosResponse<TicketResponseType>) => {
        const departementData: AxiosResponse<DepartementResponseType> =
          await jwtAxios.get("/department");
        const categoryData: AxiosResponse<CategoryResponseType[]> =
          await jwtAxios.get("/category");

        const mappedData: TicketDataType[] = data.data.data.map((ticket) => ({
          id: ticket.id,
          ticketNumber: ticket.ticketNumber,
          status: ticket.status,
          phoneNumber: ticket.phoneNumber,
          startTime: ticket.startTime,
          endTime: ticket.endTime,
          issue: ticket.issue,
          department: {
            id: ticket.department,
            name: getDepartmentNameById(
              ticket.department,
              departementData.data.data
            ),
          },
          category: {
            id: ticket.category,
            name: getCategoryNameById(ticket.category, categoryData.data),
          },
        }));

        dispatch({
          type: GET_TICKET_LIST_SUCCESS,
          payload: mappedData,
        });
      })
      .catch((error: any) => {
        console.log(error);
        dispatch({
          type: GET_TICKET_LIST_FAILED,
          payload: error,
        });
      });
  };
};

export const getTicketDetail = (id: string | string[]) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_DETAIL_TICKET_LOADING,
    });

    jwtAxios
      .get(`/ticket/${id}`)
      .then(async (data: AxiosResponse<TicketDetailResponseType>) => {
        dispatch({
          type: GET_DETAIL_TICKET_SUCCESS,
          payload: data.data.data,
        });
      })
      .catch((error: any) => {
        console.log("error", error);
        dispatch({
          type: GET_DETAIL_TICKET_FAILED,
          payload: error,
        });
      });
  };
};

export const getNewTicketDetail = (id: string | string[]) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_NEW_DETAIL_TICKET_LOADING,
    });

    jwtAxios
      .get(`/ticket/${id}`)
      .then(async (data: AxiosResponse<TicketDetailResponseType>) => {
        dispatch({
          type: GET_NEW_DETAIL_TICKET_SUCCESS,
          payload: data.data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_NEW_DETAIL_TICKET_FAILED,
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

export const getFaq = () => {
  return (dispatch: any) => {
    dispatch({
      type: "GET_FAQ_LOADING",
    });

    jwtAxios
      .get(`/question`)
      .then(async (data: AxiosResponse<QuestionResponse[]>) => {
        dispatch({
          type: "GET_QUESTION_SUCCESS",
          payload: data.data.map((question) => ({
            label: question.question,
            value: question.question,
          })),
        });
      })
      .catch((error: any) => {
        dispatch({
          type: "GET_QUESTION_FAILED",
          payload: error,
        });
      });
  };
};

export const getTicketCount = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_TICKET_COUNT_LOADING,
    });

    jwtAxios
      .get(`/ticketcount`)
      .then(async (data: AxiosResponse<TicketCountResponse>) => {
        dispatch({
          type: GET_TICKET_COUNT_SUCCESS,
          payload: data.data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_TICKET_COUNT_FAILED,
          payload: error,
        });
      });
  };
};
