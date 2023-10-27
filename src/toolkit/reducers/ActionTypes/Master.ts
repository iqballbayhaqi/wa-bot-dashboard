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
  SAVE_MASTER_DEPARTEMENT_FAILED,
  SAVE_MASTER_CATEGORY_LOADING,
  SAVE_MASTER_CATEGORY_FAILED,
  SAVE_MASTER_DATA_LOADING,
  SAVE_MASTER_DATA_SUCCESS,
  SAVE_MASTER_DATA_FAILED,
} from "@crema/types/actions/Master.actions";
import { createAction } from "@reduxjs/toolkit";
import {
  CategoryDataType,
  DepartementDataType,
  ErrorResponseType,
  MasterResponsePostType,
  MasterResponseUpdateType,
} from "@crema/types/models/master";

export const MasterDepartementListLoadingAction = createAction(
  GET_MASTER_DEPARTEMENT_LIST_LOADING
);
export const MasterDepartementListSuccessAction = createAction<
  DepartementDataType[]
>(GET_MASTER_DEPARTEMENT_LIST_SUCCESS);
export const MasterDepartementListFailedAction =
  createAction<ErrorResponseType>(GET_MASTER_DEPARTEMENT_LIST_FAILED);

export const MasterCategoryListLoadingAction = createAction(
  GET_MASTER_CATEGORY_LIST_LOADING
);
export const MasterCategoryListSuccessAction = createAction<CategoryDataType[]>(
  GET_MASTER_CATEGORY_LIST_SUCCESS
);
export const MasterCategoryListFailedAction = createAction<ErrorResponseType>(
  GET_MASTER_CATEGORY_LIST_FAILED
);

export const SaveMasterDepartementLoadingAction = createAction(
  SAVE_MASTER_DEPARTEMENT_LOADING
);
export const SaveMasterDepartementSuccessAction = createAction<
  MasterResponsePostType | MasterResponseUpdateType
>(SAVE_MASTER_DEPARTEMENT_SUCCESS);
export const SaveMasterDepartementFailedAction =
  createAction<ErrorResponseType>(SAVE_MASTER_DEPARTEMENT_FAILED);

export const SaveMasterCategoryLoadingAction = createAction(
  SAVE_MASTER_CATEGORY_LOADING
);
export const SaveMasterCategorySuccessAction = createAction<
  MasterResponsePostType | MasterResponseUpdateType
>(SAVE_MASTER_CATEGORY_SUCCESS);
export const SaveMasterCategoryFailedAction = createAction<ErrorResponseType>(
  SAVE_MASTER_CATEGORY_FAILED
);

export const SaveMasterDataLoadingAction = createAction(
  SAVE_MASTER_DATA_LOADING
);
export const SaveMasterDataSuccessAction = createAction<
  MasterResponsePostType | MasterResponseUpdateType
>(SAVE_MASTER_DATA_SUCCESS);
export const SaveMasterDataFailedAction = createAction<ErrorResponseType>(
  SAVE_MASTER_DATA_FAILED
);
