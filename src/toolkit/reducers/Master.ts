import {
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
} from "./ActionTypes/Master";

const initialState: {
  isLoadingMasterCategory: boolean;
  isLoadingMasterDepartement: boolean;
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
} = {
  isLoadingMasterCategory: true,
  isLoadingMasterDepartement: true,
  isLoadingSaveMasterDepartement: false,
  isLoadingSaveMasterCategory: false,
  isLoadingModifyMasterData: false,
  isSucccessModifyMasterData: false,
  isSuccessModifyCategoryData: false,
  isSuccessModifyDepartmentData: false,
  masterCategoryList: null,
  masterDepartementList: null,
  errorDepartement: null,
  errorCategory: null,
};

const masterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(MasterDepartementListLoadingAction, (state) => {
      state.isLoadingMasterDepartement = true;
    })
    .addCase(MasterDepartementListSuccessAction, (state, action) => {
      state.isLoadingMasterDepartement = false;
      state.isSucccessModifyMasterData = false;
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
    });
});

export default masterReducer;
