import jwtAxios from "@crema/services/axios/ApiConfig";
import { Dispatch } from "redux";
import { AppActions } from "@crema/types/actions";
import {
  GET_MASTER_DEPARTEMENT_LIST_SUCCESS,
  GET_MASTER_CATEGORY_LIST_SUCCESS,
  SAVE_MASTER_CATEGORY_SUCCESS,
  SAVE_MASTER_DEPARTEMENT_SUCCESS,
  GET_MASTER_DEPARTEMENT_LIST_LOADING,
  GET_MASTER_DEPARTEMENT_LIST_FAILED,
  GET_MASTER_CATEGORY_LIST_LOADING,
  GET_MASTER_CATEGORY_LIST_FAILED,
  SAVE_MASTER_DEPARTEMENT_LOADING,
  SAVE_MASTER_CATEGORY_LOADING,
  SAVE_MASTER_CATEGORY_FAILED,
  SAVE_MASTER_DEPARTEMENT_FAILED,
} from "@crema/types/actions/Master.actions";
import { AxiosResponse } from "axios";
import {
  CategoryDataType,
  CategoryPayload,
  CategoryResponseType,
  MasterResponsePostType,
  DepartementDataType,
  DepartementPayload,
  DepartementResponseType,
  MasterResponseUpdateType,
  ErrorResponseType,
} from "@crema/types/models/master";

export const getMasterDepartementList = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_MASTER_DEPARTEMENT_LIST_LOADING,
    });
    jwtAxios
      .get("/department")
      .then((data: AxiosResponse<DepartementResponseType[]>) => {
        const mappedData: DepartementDataType[] = data.data.map(
          (departement, index) => ({
            no: index + 1,
            id: departement.id,
            departmentCode: departement.code,
            departmentName: departement.name,
          })
        );

        dispatch({
          type: GET_MASTER_DEPARTEMENT_LIST_SUCCESS,
          payload: mappedData,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_MASTER_DEPARTEMENT_LIST_FAILED,
          payload: error,
        });
      });
  };
};

export const getMasterCategoryList = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_MASTER_CATEGORY_LIST_LOADING,
    });
    jwtAxios
      .get("/category")
      .then((data: AxiosResponse<CategoryResponseType[]>) => {
        const mappedData: CategoryDataType[] = data.data.map(
          (category, index) => ({
            id: category.id,
            no: index + 1,
            departmentCode: category.departmentCode,
            categoryName: category.name,
          })
        );
        dispatch({
          type: GET_MASTER_CATEGORY_LIST_SUCCESS,
          payload: mappedData,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: GET_MASTER_CATEGORY_LIST_FAILED,
          payload: error,
        });
      });
  };
};

export const saveMasterData = ({
  url,
  payload,
  method,
  calledFrom,
}: {
  url: string;
  payload: CategoryPayload | DepartementPayload;
  method: "post" | "put";
  calledFrom: "department" | "category";
}) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type:
        calledFrom === "department"
          ? SAVE_MASTER_DEPARTEMENT_LOADING
          : SAVE_MASTER_CATEGORY_LOADING,
    });

    switch (method) {
      case "post":
        jwtAxios({
          method,
          url,
          data: payload,
        })
          .then(
            (
              data: AxiosResponse<
                MasterResponsePostType | MasterResponseUpdateType
              >
            ) => {
              dispatch({
                type:
                  calledFrom === "department"
                    ? SAVE_MASTER_DEPARTEMENT_SUCCESS
                    : SAVE_MASTER_CATEGORY_SUCCESS,
                payload: data.data,
              });
            }
          )
          .catch((error: ErrorResponseType) => {
            dispatch({
              type:
                calledFrom === "department"
                  ? SAVE_MASTER_DEPARTEMENT_FAILED
                  : SAVE_MASTER_CATEGORY_FAILED,
              payload: error,
            });
          });
        break;
      case "put":
        jwtAxios
          .put(url, payload)
          .then(
            (
              data: AxiosResponse<
                MasterResponsePostType | MasterResponseUpdateType
              >
            ) => {
              dispatch({
                type:
                  calledFrom === "department"
                    ? SAVE_MASTER_DEPARTEMENT_SUCCESS
                    : SAVE_MASTER_CATEGORY_SUCCESS,
                payload: data.data,
              });
            }
          )
          .catch((error: ErrorResponseType) => {
            dispatch({
              type:
                calledFrom === "department"
                  ? SAVE_MASTER_DEPARTEMENT_FAILED
                  : SAVE_MASTER_CATEGORY_FAILED,
              payload: error,
            });
          });
        break;
    }
  };
};
