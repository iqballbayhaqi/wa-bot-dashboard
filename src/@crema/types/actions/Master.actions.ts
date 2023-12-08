import {
  BranchResponse,
  CategoryDataType,
  DepartementDataType,
  ErrorResponseType,
  MasterResponsePostType,
  MasterResponseUpdateType,
} from "../models/master";

export const GET_MASTER_DEPARTEMENT_LIST_LOADING =
  "GET_MASTER_DEPARTEMENT_LIST_LOADING";
export const GET_MASTER_DEPARTEMENT_LIST_SUCCESS =
  "GET_MASTER_DEPARTEMENT_LIST_SUCCESS";
export const GET_MASTER_DEPARTEMENT_LIST_FAILED =
  "GET_MASTER_DEPARTEMENT_LIST_FAILED";

export const SAVE_MASTER_DEPARTEMENT_LOADING =
  "SAVE_ADD_MASTER_DEPARTEMENT_LOADING";
export const SAVE_MASTER_DEPARTEMENT_SUCCESS =
  "SAVE_ADD_MASTER_DEPARTEMENT_SUCCESS";
export const SAVE_MASTER_DEPARTEMENT_FAILED =
  "SAVE_ADD_MASTER_DEPARTEMENT_FAILED";

export const GET_MASTER_CATEGORY_LIST_LOADING =
  "GET_MASTER_CATEGORY_LIST_LOADING";
export const GET_MASTER_CATEGORY_LIST_SUCCESS =
  "GET_MASTER_CATEGORY_LIST_SUCCESS";
export const GET_MASTER_CATEGORY_LIST_FAILED =
  "GET_MASTER_CATEGORY_LIST_FAILED";

export const SAVE_MASTER_CATEGORY_LOADING = "SAVE_MASTER_CATEGORY_LOADING";
export const SAVE_MASTER_CATEGORY_SUCCESS = "SAVE_MASTER_CATEGORY_SUCCESS";
export const SAVE_MASTER_CATEGORY_FAILED = "SAVE_MASTER_CATEGORY_FAILED";

export const SAVE_MASTER_DATA_LOADING = "SAVE_MASTER_DATA_LOADING";
export const SAVE_MASTER_DATA_SUCCESS = "SAVE_MASTER_DATA_SUCCESS";
export const SAVE_MASTER_DATA_FAILED = "SAVE_MASTER_DATA_FAILED";

export const DELETE_KATEGORI_MASTER_DATA_LOADING =
  "DELETE_KATEGORI_MASTER_DATA_LOADING";
export const DELETE_KATEGORI_MASTER_DATA_SUCCESS =
  "DELETE_KATEGORI_MASTER_DATA_SUCCESS";
export const DELETE_KATEGORI_MASTER_DATA_FAILED =
  "DELETE_KATEGORI_MASTER_DATA_FAILED";

export const DELETE_DEPARTEMEN_MASTER_DATA_LOADING =
  "DELETE_DEPARTEMEN_MASTER_DATA_LOADING";
export const DELETE_DEPARTEMEN_MASTER_DATA_SUCCESS =
  "DELETE_DEPARTEMEN_MASTER_DATA_SUCCESS";
export const DELETE_DEPARTEMEN_MASTER_DATA_FAILED =
  "DELETE_DEPARTEMEN_MASTER_DATA_FAILED";

export const GET_MASTER_BRANCH_LOADING = "GET_MASTER_BRANCH_LOADING";
export const GET_MASTER_BRANCH_SUCCESS = "GET_MASTER_BRANCH_SUCCESS";
export const GET_MASTER_BRANCH_FAILED = "GET_MASTER_BRANCH_FAILED";

export type GetMasterDepartementListLoadingAction = {
  type: typeof GET_MASTER_DEPARTEMENT_LIST_LOADING;
};
export type GetMasterDepartementListSuccessAction = {
  type: typeof GET_MASTER_DEPARTEMENT_LIST_SUCCESS;
  payload: DepartementDataType[];
};
export type GetMasterDepartementListFailedAction = {
  type: typeof GET_MASTER_DEPARTEMENT_LIST_FAILED;
  payload: ErrorResponseType;
};

export type GetMasterCategoryListLoadingAction = {
  type: typeof GET_MASTER_CATEGORY_LIST_LOADING;
};
export type GetMasterCategoryListSuccessAction = {
  type: typeof GET_MASTER_CATEGORY_LIST_SUCCESS;
  payload: CategoryDataType[];
};
export type GetMasterCategoryListFailedAction = {
  type: typeof GET_MASTER_CATEGORY_LIST_FAILED;
  payload: ErrorResponseType;
};

export type GetMasterBranchLoadingAction = {
  type: typeof GET_MASTER_BRANCH_LOADING;
};
export type GetMasterBranchSuccessAction = {
  type: typeof GET_MASTER_BRANCH_SUCCESS;
  payload: BranchResponse[];
};
export type GetMasterBranchFailedAction = {
  type: typeof GET_MASTER_BRANCH_FAILED;
  payload: ErrorResponseType;
};

export type SaveMasterDepartementLoadingAction = {
  type: typeof SAVE_MASTER_DEPARTEMENT_LOADING;
};
export type SaveMasterDepartementSuccessAction = {
  type: typeof SAVE_MASTER_DEPARTEMENT_SUCCESS;
  payload: MasterResponsePostType | MasterResponseUpdateType;
};
export type SaveMasterDepartementFailedAction = {
  type: typeof SAVE_MASTER_DEPARTEMENT_FAILED;
  payload: ErrorResponseType;
};

export type SaveMasterCategoryLoadingAction = {
  type: typeof SAVE_MASTER_CATEGORY_LOADING;
};
export type SaveMasterCategorySuccessAction = {
  type: typeof SAVE_MASTER_CATEGORY_SUCCESS;
  payload: MasterResponsePostType | MasterResponseUpdateType;
};
export type SaveMasterCategoryFailedAction = {
  type: typeof SAVE_MASTER_CATEGORY_FAILED;
  payload: ErrorResponseType;
};

export type SaveMasterDataLoadingAction = {
  type: typeof SAVE_MASTER_DATA_LOADING;
};
export type SaveMasterDataSuccessAction = {
  type: typeof SAVE_MASTER_DATA_SUCCESS;
  payload: MasterResponsePostType | MasterResponseUpdateType;
};
export type SaveMasterDataFailedAction = {
  type: typeof SAVE_MASTER_DATA_FAILED;
  payload: ErrorResponseType;
};

export type DeleteMasterCategoryDataLoadingAction = {
  type: typeof DELETE_KATEGORI_MASTER_DATA_LOADING;
};
export type DeleteMasterCategoryDataSuccessAction = {
  type: typeof DELETE_KATEGORI_MASTER_DATA_SUCCESS;
  payload: MasterResponsePostType | MasterResponseUpdateType;
};
export type DeleteMasterCategoryDataFailedAction = {
  type: typeof DELETE_KATEGORI_MASTER_DATA_FAILED;
  payload: ErrorResponseType;
};

export type DeleteDepartementMasterDataLoadingAction = {
  type: typeof DELETE_DEPARTEMEN_MASTER_DATA_LOADING;
};
export type DeleteDepartementMasterDataSuccessAction = {
  type: typeof DELETE_DEPARTEMEN_MASTER_DATA_SUCCESS;
  payload: MasterResponsePostType | MasterResponseUpdateType;
};
export type DeleteDepartementMasterDataFailedAction = {
  type: typeof DELETE_DEPARTEMEN_MASTER_DATA_FAILED;
  payload: ErrorResponseType;
};

export type MasterActionTypes =
  | GetMasterDepartementListLoadingAction
  | GetMasterDepartementListSuccessAction
  | GetMasterDepartementListFailedAction
  | GetMasterCategoryListLoadingAction
  | GetMasterCategoryListSuccessAction
  | GetMasterCategoryListFailedAction
  | GetMasterBranchLoadingAction
  | GetMasterBranchSuccessAction
  | GetMasterBranchFailedAction
  | SaveMasterDepartementLoadingAction
  | SaveMasterDepartementSuccessAction
  | SaveMasterDepartementFailedAction
  | SaveMasterCategoryLoadingAction
  | SaveMasterCategorySuccessAction
  | SaveMasterCategoryFailedAction
  | SaveMasterDataLoadingAction
  | SaveMasterDataSuccessAction
  | SaveMasterDataFailedAction
  | DeleteMasterCategoryDataLoadingAction
  | DeleteMasterCategoryDataSuccessAction
  | DeleteMasterCategoryDataFailedAction
  | DeleteDepartementMasterDataFailedAction
  | DeleteDepartementMasterDataSuccessAction
  | DeleteDepartementMasterDataLoadingAction;
