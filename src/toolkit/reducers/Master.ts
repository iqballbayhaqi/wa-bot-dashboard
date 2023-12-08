import {
  BranchResponse,
  CategoryDataType,
  DepartementDataType,
  ErrorResponseType,
} from "@crema/types/models/master";
import { createReducer } from "@reduxjs/toolkit";
import {
  MasterCategoryListLoadingAction,
  MasterCategoryListSuccessAction,
  MasterCategoryListFailedAction,
  MasterDepartementListLoadingAction,
  MasterDepartementListSuccessAction,
  MasterDepartementListFailedAction,
  SaveMasterDepartementLoadingAction,
  SaveMasterDepartementSuccessAction,
  SaveMasterDepartementFailedAction,
  SaveMasterCategoryLoadingAction,
  SaveMasterCategorySuccessAction,
  SaveMasterCategoryFailedAction,
  SaveMasterDataLoadingAction,
  SaveMasterDataSuccessAction,
  SaveMasterDataFailedAction,
  DeleteMasterDepartmentDataLoadingAction,
  DeleteMasterDepartmentDataSuccessAction,
  DeleteMasterDepartmentDataFailedAction,
  DeleteMasterCategoryDataLoadingAction,
  DeleteMasterCategoryDataSuccessAction,
  DeleteMasterCategoryDataFailedAction,
  MasterBranchLoadingAction,
  MasterBranchSuccessAction,
  MasterBranchFailedAction,
} from "./ActionTypes/Master";

const initialState: {
  isLoadingMasterCategory: boolean;
  isLoadingMasterDepartement: boolean;
  isLoadingMasterBranch: boolean;
  isLoadingSaveMasterDepartement: boolean;
  isLoadingSaveMasterCategory: boolean;
  isLoadingModifyMasterData: boolean;
  isSucccessModifyMasterData: boolean;
  isSuccessModifyDepartmentData: boolean;
  isSuccessModifyCategoryData: boolean;
  masterDepartementList: DepartementDataType[];
  masterCategoryList: CategoryDataType[];
  errorDepartement: ErrorResponseType;
  errorCategory: ErrorResponseType;
  errorBranch: ErrorResponseType;
  isLoadingDeleteMasterCategory: boolean;
  isLoadingDeleteMasterDepartment: boolean;
  isSuccessDeleteMasterCategory: boolean;
  isSuccessDeleteMasterDepartment: boolean;
  branchList: BranchResponse[];
} = {
  isLoadingMasterCategory: true,
  isLoadingMasterDepartement: true,
  isLoadingMasterBranch: true,
  isLoadingSaveMasterDepartement: false,
  isLoadingSaveMasterCategory: false,
  isLoadingModifyMasterData: false,
  isSucccessModifyMasterData: false,
  isSuccessModifyCategoryData: false,
  isSuccessModifyDepartmentData: false,
  isLoadingDeleteMasterCategory: false,
  isLoadingDeleteMasterDepartment: false,
  isSuccessDeleteMasterCategory: false,
  isSuccessDeleteMasterDepartment: false,
  masterCategoryList: [],
  masterDepartementList: [],
  errorDepartement: null,
  errorCategory: null,
  branchList: [],
};

const masterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(MasterDepartementListLoadingAction, (state) => {
      state.isLoadingMasterDepartement = true;
    })
    .addCase(MasterDepartementListSuccessAction, (state, action) => {
      state.isLoadingMasterDepartement = false;
      state.isSucccessModifyMasterData = false;
      state.isSuccessDeleteMasterDepartment = false;
      state.masterDepartementList = action.payload;
    })
    .addCase(MasterDepartementListFailedAction, (state, action) => {
      state.isLoadingMasterDepartement = false;
      state.errorDepartement = action.payload;
    })
    .addCase(MasterCategoryListLoadingAction, (state) => {
      state.isLoadingMasterCategory = true;
    })
    .addCase(MasterCategoryListSuccessAction, (state, action) => {
      state.isLoadingMasterCategory = false;
      state.isSuccessModifyCategoryData = false;
      state.isSuccessDeleteMasterCategory = false;
      state.masterCategoryList = action.payload;
    })
    .addCase(MasterCategoryListFailedAction, (state, action) => {
      state.isLoadingMasterCategory = false;
      state.errorCategory = action.payload;
    })
    .addCase(SaveMasterCategoryLoadingAction, (state) => {
      state.isLoadingSaveMasterCategory = true;
      state.isSuccessModifyCategoryData = false;
    })
    .addCase(SaveMasterCategorySuccessAction, (state) => {
      state.isLoadingSaveMasterCategory = false;
      state.isSuccessModifyCategoryData = true;
    })
    .addCase(SaveMasterCategoryFailedAction, (state) => {
      state.isLoadingSaveMasterCategory = false;
      state.isSuccessModifyCategoryData = false;
    })
    .addCase(SaveMasterDepartementLoadingAction, (state) => {
      state.isLoadingSaveMasterDepartement = true;
      state.isSuccessModifyDepartmentData = false;
    })
    .addCase(SaveMasterDepartementSuccessAction, (state) => {
      state.isLoadingSaveMasterDepartement = false;
      state.isSuccessModifyDepartmentData = true;
    })
    .addCase(SaveMasterDepartementFailedAction, (state) => {
      state.isLoadingSaveMasterDepartement = false;
      state.isSuccessModifyDepartmentData = false;
    })
    .addCase(SaveMasterDataLoadingAction, (state) => {
      state.isLoadingModifyMasterData = true;
      state.isSucccessModifyMasterData = false;
    })
    .addCase(SaveMasterDataSuccessAction, (state) => {
      state.isSucccessModifyMasterData = false;
      state.isLoadingModifyMasterData = false;
    })
    .addCase(SaveMasterDataFailedAction, (state) => {
      state.isSucccessModifyMasterData = false;
      state.isLoadingModifyMasterData = false;
    })
    .addCase(DeleteMasterDepartmentDataLoadingAction, (state) => {
      state.isLoadingDeleteMasterDepartment = true;
      state.isSuccessDeleteMasterDepartment = false;
    })
    .addCase(DeleteMasterDepartmentDataSuccessAction, (state) => {
      state.isSuccessDeleteMasterDepartment = true;
      state.isLoadingDeleteMasterDepartment = false;
    })
    .addCase(DeleteMasterDepartmentDataFailedAction, (state) => {
      state.isSuccessDeleteMasterDepartment = false;
      state.isLoadingDeleteMasterDepartment = false;
    })
    .addCase(DeleteMasterCategoryDataLoadingAction, (state) => {
      state.isLoadingDeleteMasterCategory = true;
      state.isSuccessDeleteMasterCategory = false;
    })
    .addCase(DeleteMasterCategoryDataSuccessAction, (state) => {
      state.isSuccessDeleteMasterCategory = true;
      state.isLoadingDeleteMasterCategory = false;
    })
    .addCase(DeleteMasterCategoryDataFailedAction, (state) => {
      state.isSuccessDeleteMasterCategory = false;
      state.isLoadingDeleteMasterCategory = false;
    })
    .addCase(MasterBranchLoadingAction, (state) => {
      state.isLoadingMasterBranch = true;
    })
    .addCase(MasterBranchSuccessAction, (state, action) => {
      state.isLoadingMasterBranch = false;
      state.branchList = action.payload;
    })
    .addCase(MasterBranchFailedAction, (state, action) => {
      state.isLoadingMasterBranch = false;
      state.errorBranch = action.payload;
    });
});

export default masterReducer;
