import { ErrorResponseType } from "@crema/types/models/master";
import { createReducer } from "@reduxjs/toolkit";

import {
  ChatListType,
  TicketDataType,
  TicketDetail,
  TicketDetailResponseType,
} from "@crema/types/models/tickets";
import {
  TicketListLoadingAction,
  TicketListSuccessAction,
  TicketListFailedAction,
  SaveTicketSuccessAction,
  SaveTicketLoadingAction,
  SaveTicketFailedAction,
  TicketDetailSuccessAction,
  TicketDetailFailedAction,
  TicketDetailLoadingAction,
  SendChatAction,
  ReceiveChatAction,
  TicketNewDetailLoadingAction,
  TicketNewDetailSuccessAction,
  TicketNewDetailFailedAction,
} from "./ActionTypes/Ticket";

const initialState: {
  isLoadingTicket: boolean;
  isLoadingSaveTicket: boolean;
  isLoadingDetailTicket: boolean;
  isSuccessSaveTicket: boolean;
  isLoadingNewDetailTicket: boolean;
  tickets: TicketDataType[];
  ticketsTemp: TicketDataType[];
  detailTicket: TicketDetail;
  errorTicket: ErrorResponseType;
  chatList: ChatListType[];
  questionList: [];
  isLoadingQuestion: boolean;
  message: string;
  dateFilter: {
    label: string;
    value: string;
  }[];
  departmentFilter: {
    label: string;
    value: number;
  }[];
  categoriesFilter: {
    label: string;
    value: number;
  }[];
} = {
  isLoadingTicket: true,
  isLoadingSaveTicket: false,
  isLoadingDetailTicket: true,
  isSuccessSaveTicket: false,
  tickets: null,
  ticketsTemp: null,
  detailTicket: null,
  errorTicket: null,
  chatList: [],
  questionList: [],
  isLoadingQuestion: false,
  message: "",
  dateFilter: [],
  departmentFilter: [],
  categoriesFilter: [],
  isLoadingNewDetailTicket: false,
};

const ticketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(TicketListLoadingAction, (state) => {
      state.isLoadingTicket = true;
    })
    .addCase(TicketListSuccessAction, (state, action) => {
      state.isLoadingTicket = false;
      state.isSuccessSaveTicket = false;
      state.tickets = action.payload;
      state.ticketsTemp = action.payload;

      state.dateFilter = Array.from(
        new Set(
          action.payload
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
            .map((date) => date.startTime)
        )
      ).map((uniqueDate) => ({
        label: uniqueDate,
        value: uniqueDate,
      }));

      const uniqueDepartments = [];
      const uniqueIds = {};

      action.payload.forEach((data) => {
        if (!uniqueIds[data.department.id]) {
          uniqueIds[data.department.id] = true;
          uniqueDepartments.push(data);
        }
      });

      state.departmentFilter = uniqueDepartments.map((data) => ({
        label: data.department.name,
        value: data.department.id,
      }));

      const uniqueCategories = [];
      const uniqueCatIds = {};

      action.payload.forEach((data) => {
        if (!uniqueCatIds[data.category.id]) {
          uniqueCatIds[data.category.id] = true;
          uniqueCategories.push(data);
        }
      });

      state.categoriesFilter = uniqueCategories.map((data) => ({
        label: data.category.name,
        value: data.category.id,
      }));
    })
    .addCase(TicketListFailedAction, (state, action) => {
      state.isLoadingTicket = false;
      state.errorTicket = action.payload;
    })
    .addCase(TicketDetailLoadingAction, (state) => {
      state.isLoadingDetailTicket = true;
    })
    .addCase(TicketDetailSuccessAction, (state, action) => {
      const { chatHistory } = action.payload;

      state.isLoadingDetailTicket = false;
      state.isSuccessSaveTicket = false;
      state.detailTicket = action.payload;
      state.chatList = JSON.parse(chatHistory);
    })
    .addCase(TicketDetailFailedAction, (state, action) => {
      state.isLoadingDetailTicket = false;
      state.errorTicket = action.payload;
    })
    .addCase(TicketNewDetailLoadingAction, (state) => {
      state.isLoadingNewDetailTicket = true;
    })
    .addCase(TicketNewDetailSuccessAction, (state, action) => {
      state.isLoadingNewDetailTicket = false;
      state.isSuccessSaveTicket = false;
      state.detailTicket = action.payload;
    })
    .addCase(TicketNewDetailFailedAction, (state, action) => {
      state.isLoadingNewDetailTicket = false;
      state.errorTicket = action.payload;
    })
    .addCase(SaveTicketLoadingAction, (state) => {
      state.isLoadingSaveTicket = true;
      state.isSuccessSaveTicket = false;
    })
    .addCase(SaveTicketSuccessAction, (state) => {
      state.isLoadingSaveTicket = false;
      state.isSuccessSaveTicket = true;
    })
    .addCase(SaveTicketFailedAction, (state, action) => {
      state.isLoadingSaveTicket = false;
      state.isSuccessSaveTicket = false;

      state.errorTicket = action.payload;
    })
    .addCase(SendChatAction, (state, action) => {
      state.chatList = [...state.chatList, action.payload];
    })
    .addCase(ReceiveChatAction, (state, action) => {
      const sortChat = [...state.chatList, action.payload].sort(
        (a, b) => (a.time as number) - (b.time as number)
      );
      state.chatList = sortChat;
    })
    .addCase("GET_QUESTION_LOADING", (state) => {
      state.isLoadingQuestion = true;
    })
    .addCase("GET_QUESTION_SUCCESS", (state, action: any) => {
      state.isLoadingQuestion = false;
      state.questionList = action.payload;
    })
    .addCase("GET_QUESTION_FAILED", (state, action) => {
      state.isLoadingQuestion = false;
    })
    .addCase("COPY_MESSAGE", (state, action: any) => {
      state.message = action.payload;
    })
    .addCase("RESET_SUCCESS_SAVE", (state, action: any) => {
      state.isSuccessSaveTicket = false;
    })
    .addCase("SET_TICKETS", (state, action: any) => {
      state.ticketsTemp = action.payload;
    });
});

export default ticketReducer;
