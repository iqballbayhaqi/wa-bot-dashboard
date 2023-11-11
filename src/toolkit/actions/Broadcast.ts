import jwtAxios from "@crema/services/axios";
import { AppActions } from "@crema/types/actions";
import {
  GET_BROADCAST_DATA_FAILED,
  GET_BROADCAST_DATA_LOADING,
  GET_BROADCAST_DATA_SUCCESS,
  GET_BROADCAST_DETAIL_FAILED,
  GET_BROADCAST_DETAIL_LOADING,
  GET_BROADCAST_DETAIL_SUCCESS,
  GET_CONTACT_DATA_FAILED,
  GET_CONTACT_DATA_LOADING,
  GET_CONTACT_DATA_SUCCESS,
  SEND_BROADCAST_DATA_FAILED,
  SEND_BROADCAST_DATA_LOADING,
  SEND_BROADCAST_DATA_SUCCESS,
} from "@crema/types/actions/Broadcast.action";
import {
  BroadcastDetailResponse,
  BroadcastResponse,
  ContactResponse,
  SendBroadcastSuccess,
} from "@crema/types/models/broadcast";
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

export const onGetBroadcast = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_BROADCAST_DATA_LOADING,
    });
    jwtAxios
      .get("/broadcast")
      .then((data: AxiosResponse<BroadcastResponse>) => {
        console.log("data nih", data);
        dispatch({
          type: GET_BROADCAST_DATA_SUCCESS,
          payload: data.data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_BROADCAST_DATA_FAILED,
          payload: error,
        });
      });
  };
};

export const onGetDetailBroadcast = (id: string | string[]) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_BROADCAST_DETAIL_LOADING,
    });
    jwtAxios
      .get(`/broadcast/${id}`)
      .then((data: AxiosResponse<BroadcastDetailResponse>) => {
        dispatch({
          type: GET_BROADCAST_DETAIL_SUCCESS,
          payload: data.data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_BROADCAST_DETAIL_FAILED,
          payload: error,
        });
      });
  };
};

export const onSendBroadcast = (data) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: SEND_BROADCAST_DATA_LOADING,
    });
    jwtAxios
      .post("/broadcast", data)
      .then((data: AxiosResponse<SendBroadcastSuccess>) => {
        dispatch({
          type: SEND_BROADCAST_DATA_SUCCESS,
          payload: data.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: SEND_BROADCAST_DATA_FAILED,
          payload: error,
        });
      });
  };
};
