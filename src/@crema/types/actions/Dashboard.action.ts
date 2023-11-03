import { MetricsType } from "../models/dashboards/Metrics";
import { AnalyticsType } from "../models/dashboards/Analytics";
import { CRMType } from "../models/dashboards/CRM";
import { CryptoType } from "../models/dashboards/Crypto";
import { WidgetsType } from "../models/dashboards/Widgets";
import { AcademyType } from "../models/dashboards/AcademyType";
import { HealthCareType } from "../models/dashboards/HealthCare";
import { EcommerceType } from "../models/dashboards/Ecommerce";
import { ErrorResponseType } from "../models/master";
import { DashboardData, DashboardResponse } from "../models/dashboards";

export const GET_ACADEMY_DATA = "GET_ACADEMY_DATA";
export const GET_ECOMMERCE_DATA = "GET_ECOMMERCE_DATA";
export const GET_HEALTH_CARE_DATA = "GET_HEALTH_CARE_DATA";
export const GET_ANALYTICS_DATA = "GET_ANALYTICS_DATA";
export const GET_CRM_DATA = "GET_CRM_DATA";
export const GET_CRYPTO_DATA = "GET_CRYPTO_DATA";
export const GET_METRICS_DATA = "GET_METRICS_DATA";
export const GET_WIDGETS_DATA = "GET_WIDGETS_DATA";
export const GET_DASHBOARD_DATA_LOADING = "GET_DASHBOARD_DATA_LOADING";
export const GET_DASHBOARD_DATA_SUCCESS = "GET_DASHBOARD_DATA_SUCCESS";
export const GET_DASHBOARD_DATA_FAILED = "GET_DASHBOARD_DATA_FAILED";

export type GetDashboardLoadingAction = {
  type: typeof GET_DASHBOARD_DATA_LOADING;
};
export type GetTDashboardSuccessAction = {
  type: typeof GET_DASHBOARD_DATA_SUCCESS;
  payload: DashboardData;
};
export type GetTDashboardFailedAction = {
  type: typeof GET_DASHBOARD_DATA_FAILED;
  payload: ErrorResponseType;
};

export type GetAnalyticsAction = {
  type: typeof GET_ANALYTICS_DATA;
  payload: AnalyticsType;
};

export type GetECommerceAction = {
  type: typeof GET_ECOMMERCE_DATA;
  payload: EcommerceType;
};

export type GetHeathCareAction = {
  type: typeof GET_HEALTH_CARE_DATA;
  payload: HealthCareType;
};

export type GetAcademyAction = {
  type: typeof GET_ACADEMY_DATA;
  payload: AcademyType;
};

export type GetCRMAction = {
  type: typeof GET_CRM_DATA;
  payload: CRMType;
};

export type GetCryptosAction = {
  type: typeof GET_CRYPTO_DATA;
  payload: CryptoType;
};

export type GetMetricsAction = {
  type: typeof GET_METRICS_DATA;
  payload: MetricsType;
};

export type GetWidgetsAction = {
  type: typeof GET_WIDGETS_DATA;
  payload: WidgetsType;
};

export type DashboardActionTypes =
  | GetECommerceAction
  | GetHeathCareAction
  | GetAcademyAction
  | GetAnalyticsAction
  | GetCRMAction
  | GetCryptosAction
  | GetMetricsAction
  | GetWidgetsAction
  | GetDashboardLoadingAction
  | GetTDashboardSuccessAction
  | GetTDashboardFailedAction;
