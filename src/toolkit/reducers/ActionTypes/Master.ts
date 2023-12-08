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
  DELETE_DEPARTEMEN_MASTER_DATA_LOADING,
  DELETE_DEPARTEMEN_MASTER_DATA_SUCCESS,
  DELETE_DEPARTEMEN_MASTER_DATA_FAILED,
  DELETE_KATEGORI_MASTER_DATA_LOADING,
  DELETE_KATEGORI_MASTER_DATA_SUCCESS,
  DELETE_KATEGORI_MASTER_DATA_FAILED,
  GET_MASTER_BRANCH_LOADING,
  GET_MASTER_BRANCH_SUCCESS,
  GET_MASTER_BRANCH_FAILED,
} from "@crema/types/actions/Master.actions";
import { createAction } from "@reduxjs/toolkit";
import {
  BranchResponse,
  CategoryDataType,
  DepartementDataType,
  ErrorResponseType,
  MasterResponseDeleteType,
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

export const MasterBranchLoadingAction = createAction(
  GET_MASTER_BRANCH_LOADING
);
export const MasterBranchSuccessAction = createAction<BranchResponse[]>(
  GET_MASTER_BRANCH_SUCCESS
);
export const MasterBranchFailedAction = createAction<ErrorResponseType>(
  GET_MASTER_BRANCH_FAILED
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

export const DeleteMasterDepartmentDataLoadingAction = createAction(
  DELETE_DEPARTEMEN_MASTER_DATA_LOADING
);
export const DeleteMasterDepartmentDataSuccessAction =
  createAction<MasterResponseDeleteType>(DELETE_DEPARTEMEN_MASTER_DATA_SUCCESS);
export const DeleteMasterDepartmentDataFailedAction =
  createAction<ErrorResponseType>(DELETE_DEPARTEMEN_MASTER_DATA_FAILED);

export const DeleteMasterCategoryDataLoadingAction = createAction(
  DELETE_KATEGORI_MASTER_DATA_LOADING
);
export const DeleteMasterCategoryDataSuccessAction =
  createAction<MasterResponseDeleteType>(DELETE_KATEGORI_MASTER_DATA_SUCCESS);
export const DeleteMasterCategoryDataFailedAction =
  createAction<ErrorResponseType>(DELETE_KATEGORI_MASTER_DATA_FAILED);
