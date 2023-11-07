import { ErrorResponseType } from "@crema/types/models/master";
import { createReducer } from "@reduxjs/toolkit";

import {
  ChatListType,
  TicketDataType,
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
} from "./ActionTypes/Ticket";

const initialState: {
  isLoadingTicket: boolean;
  isLoadingSaveTicket: boolean;
  isLoadingDetailTicket: boolean;
  isSuccessSaveTicket: boolean;
  tickets: TicketDataType[];
  detailTicket: TicketDetailResponseType;
  errorTicket: ErrorResponseType;
  chatList: ChatListType[];
  questionList: [];
  isLoadingQuestion: boolean;
  message: string;
} = {
  isLoadingTicket: true,
  isLoadingSaveTicket: false,
  isLoadingDetailTicket: true,
  isSuccessSaveTicket: false,
  tickets: null,
  detailTicket: null,
  errorTicket: null,
  chatList: [],
  questionList: [],
  isLoadingQuestion: false,
  message: "",
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
    .addCase("COPY_MESSAGE", (state, action) => {
      state.message = action.payload;
    });
});

export default ticketReducer;
