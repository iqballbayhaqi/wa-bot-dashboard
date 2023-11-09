import jwtAxios from "@crema/services/axios";
import { AppActions } from "@crema/types/actions";
import {
  GET_CONTACT_DATA_FAILED,
  GET_CONTACT_DATA_LOADING,
  GET_CONTACT_DATA_SUCCESS,
} from "@crema/types/actions/Broadcast.action";
import { ContactResponse } from "@crema/types/models/broadcast";
import { AxiosResponse } from "axios";
import { Dispatch } from "react";

export const onGetContacts = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_CONTACT_DATA_LOADING,
    });
    jwtAxios
      .get("/contact")
      .then((data: AxiosResponse<ContactResponse[]>) => {
        dispatch({
          type: GET_CONTACT_DATA_SUCCESS,
          payload: data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_CONTACT_DATA_FAILED,
          payload: error,
        });
      });
  };
};
