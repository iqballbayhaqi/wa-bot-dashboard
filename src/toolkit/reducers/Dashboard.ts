import { DashboardData } from "@crema/types/models/dashboards";
import { createReducer } from "@reduxjs/toolkit";
import {
  GetDashboardFailedAction,
  GetDashboardLoadingAction,
  GetDashboardSuccessAction,
} from "./ActionTypes/Dashboard";

const initialState: {
  dashboardData: DashboardData | null;
  isLoadingDashboard: boolean;
} = {
  dashboardData: null,
  isLoadingDashboard: true,
};

const dashboardReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(GetDashboardLoadingAction, (state) => {
      state.isLoadingDashboard = true;
    })
    .addCase(GetDashboardSuccessAction, (state, action) => {
      state.isLoadingDashboard = false;
      state.dashboardData = action.payload;
    })
    .addCase(GetDashboardFailedAction, (state) => {
      state.isLoadingDashboard = false;
    });
});

export default dashboardReducer;
