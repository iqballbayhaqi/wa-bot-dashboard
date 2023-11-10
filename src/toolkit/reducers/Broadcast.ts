import {
  BroadcastDataType,
  BroadcastResponse,
  ContactResponse,
} from "@crema/types/models/broadcast";
import { createReducer } from "@reduxjs/toolkit";
import {
  GetBroadcastFailedAction,
  GetBroadcastLoadingAction,
  GetBroadcastSuccessAction,
  GetContactFailedAction,
  GetContactLoadingAction,
  GetContactSuccessAction,
  SendBroadcastFailedAction,
  SendBroadcastLoadingAction,
  SendBroadcastSuccessAction,
} from "./ActionTypes/Broadcast";

const initialState: {
  contacts: ContactResponse[] | null;
  isLoadingContact: boolean;
  isLoadingBroadcastList: boolean;
  broadcastList: BroadcastDataType[];
  isLoadingSendBroadcast: boolean;
  isSuccessSendBroadcast: boolean;
} = {
  contacts: [],
  isLoadingContact: true,
  isLoadingBroadcastList: true,
  broadcastList: [],
  isLoadingSendBroadcast: false,
  isSuccessSendBroadcast: false,
};

const broadcastReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(GetContactLoadingAction, (state) => {
      state.isLoadingContact = true;
    })
    .addCase(GetContactSuccessAction, (state, action) => {
      state.isLoadingContact = false;
      state.contacts = action.payload;
    })
    .addCase(GetContactFailedAction, (state) => {
      state.isLoadingContact = false;
    })
    .addCase(GetBroadcastLoadingAction, (state) => {
      state.isLoadingBroadcastList = true;
    })
    .addCase(GetBroadcastSuccessAction, (state, action) => {
      state.isLoadingBroadcastList = false;
      state.broadcastList = action.payload;
    })
    .addCase(GetBroadcastFailedAction, (state) => {
      state.isLoadingBroadcastList = false;
    })
    .addCase(SendBroadcastLoadingAction, (state) => {
      state.isLoadingSendBroadcast = true;
      state.isSuccessSendBroadcast = false;
    })
    .addCase(SendBroadcastSuccessAction, (state) => {
      state.isLoadingSendBroadcast = false;
      state.isSuccessSendBroadcast = true;
    })
    .addCase(SendBroadcastFailedAction, (state) => {
      state.isLoadingSendBroadcast = false;
      state.isSuccessSendBroadcast = false;
    });
});

export default broadcastReducer;
