import { ContactResponse } from "@crema/types/models/broadcast";
import { createReducer } from "@reduxjs/toolkit";
import {
  GetContactFailedAction,
  GetContactLoadingAction,
  GetContactSuccessAction,
} from "./ActionTypes/Broadcast";

const initialState: {
  contacts: ContactResponse[] | null;
  isLoadingContact: boolean;
} = {
  contacts: null,
  isLoadingContact: true,
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
    });
});

export default broadcastReducer;
