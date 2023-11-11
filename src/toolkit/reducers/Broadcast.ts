import {
  BroadcastData,
  BroadcastDataType,
  ContactResponse,
} from "@crema/types/models/broadcast";
import { createReducer } from "@reduxjs/toolkit";
import {
  GetBroadcastDetailFailedAction,
  GetBroadcastDetailLoadingAction,
  GetBroadcastDetailSuccessAction,
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
  isLoadingDetailBroadcast: boolean;
  detailBroadcast: BroadcastData;
} = {
  contacts: [],
  isLoadingContact: true,
  isLoadingBroadcastList: true,
  broadcastList: [],
  isLoadingSendBroadcast: false,
  isSuccessSendBroadcast: false,
  detailBroadcast: null,
  isLoadingDetailBroadcast: true,
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
      state.isSuccessSendBroadcast = false;
    })
    .addCase(GetBroadcastSuccessAction, (state, action) => {
      state.isLoadingBroadcastList = false;
      state.broadcastList = action.payload;
      state.isSuccessSendBroadcast = false;
    })
    .addCase(GetBroadcastFailedAction, (state) => {
      state.isLoadingBroadcastList = false;
      state.isSuccessSendBroadcast = false;
    })
    .addCase(GetBroadcastDetailLoadingAction, (state) => {
      state.isLoadingDetailBroadcast = true;
    })
    .addCase(GetBroadcastDetailSuccessAction, (state, action) => {
      state.isLoadingDetailBroadcast = false;
      state.detailBroadcast = action.payload;
    })
    .addCase(GetBroadcastDetailFailedAction, (state) => {
      state.isLoadingDetailBroadcast = false;
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
