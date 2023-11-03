import {
  GET_ACADEMY_DATA,
  GET_ANALYTICS_DATA,
  GET_CRM_DATA,
  GET_CRYPTO_DATA,
  GET_DASHBOARD_DATA_FAILED,
  GET_DASHBOARD_DATA_LOADING,
  GET_DASHBOARD_DATA_SUCCESS,
  GET_ECOMMERCE_DATA,
  GET_HEALTH_CARE_DATA,
  GET_METRICS_DATA,
  GET_WIDGETS_DATA,
} from "@crema/types/actions/Dashboard.action";
import {
  DashboardData,
  DashboardResponse,
} from "@crema/types/models/dashboards";

import { AcademyType } from "@crema/types/models/dashboards/AcademyType";
import { AnalyticsType } from "@crema/types/models/dashboards/Analytics";
import { CRMType } from "@crema/types/models/dashboards/CRM";
import { CryptoType } from "@crema/types/models/dashboards/Crypto";
import { EcommerceType } from "@crema/types/models/dashboards/Ecommerce";
import { HealthCareType } from "@crema/types/models/dashboards/HealthCare";
import { MetricsType } from "@crema/types/models/dashboards/Metrics";
import { WidgetsType } from "@crema/types/models/dashboards/Widgets";
import { ErrorResponseType } from "@crema/types/models/master";
import { createAction } from "@reduxjs/toolkit";

export const GetAnalyticsAction =
  createAction<AnalyticsType>(GET_ANALYTICS_DATA);

export const GetAcademyAction = createAction<AcademyType>(GET_ACADEMY_DATA);

export const GetEcomAction = createAction<EcommerceType>(GET_ECOMMERCE_DATA);

export const GetCrmAction = createAction<CRMType>(GET_CRM_DATA);

export const GetCryptoAction = createAction<CryptoType>(GET_CRYPTO_DATA);

export const GetHealthcareAction =
  createAction<HealthCareType>(GET_HEALTH_CARE_DATA);

export const GetMetricsAction = createAction<MetricsType>(GET_METRICS_DATA);

export const GetWidgetsAction = createAction<WidgetsType>(GET_WIDGETS_DATA);

export const GetDashboardLoadingAction = createAction(
  GET_DASHBOARD_DATA_LOADING
);
export const GetDashboardSuccessAction = createAction<DashboardData>(
  GET_DASHBOARD_DATA_SUCCESS
);
export const GetDashboardFailedAction = createAction<ErrorResponseType>(
  GET_DASHBOARD_DATA_FAILED
);
