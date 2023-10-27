import { ErrorResponseType } from "@crema/types/models/master";
import { createReducer } from "@reduxjs/toolkit";

import { TicketDataType } from "@crema/types/models/tickets";
import {
  TicketListLoadingAction,
  TicketListSuccessAction,
  TicketListFailedAction,
  SaveTicketSuccessAction,
  SaveTicketLoadingAction,
  SaveTicketFailedAction,
} from "./ActionTypes/Ticket";

const initialState: {
  isLoadingTicket: boolean;
  isLoadingSaveTicket: boolean;
  isSuccessSaveTicket: boolean;
  tickets: TicketDataType[];
  errorTicket: ErrorResponseType;
} = {
  isLoadingTicket: true,
  isLoadingSaveTicket: false,
  isSuccessSaveTicket: false,
  tickets: null,
  errorTicket: null,
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
    });
});

export default ticketReducer;
