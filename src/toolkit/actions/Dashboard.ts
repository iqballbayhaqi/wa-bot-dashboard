import jwtAxios from "@crema/services/axios";
import { AppActions } from "@crema/types/actions";
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
  ChartData,
  DashboardData,
  DashboardResponse,
  StatusData,
} from "@crema/types/models/dashboards";
import { DepartementResponseType } from "@crema/types/models/master";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { fetchError, fetchStart, fetchSuccess } from "./Common";

export const onGetAcademyData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/academy")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ACADEMY_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetHCData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/health_care")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_HEALTH_CARE_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetECommerceData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/ecommerce")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ECOMMERCE_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetAnalyticsData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/analytics")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_ANALYTICS_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetCrmData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/crm")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CRM_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetCryptoData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/crypto")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_CRYPTO_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetMetricsData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/metrics")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_METRICS_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};
export const onGetWidgetsData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/dashboard/widgets")
      .then((data: any) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_WIDGETS_DATA, payload: data.data });
        } else {
          dispatch(fetchError("Something went wrong, Please try again!"));
        }
      })
      .catch((error: any) => {
        dispatch(fetchError(error.message));
      });
  };
};

const getDepartmentNameById = (
  id: number,
  data: DepartementResponseType[]
): string | undefined => {
  const department = data.find((department) => department.id === id);
  return department ? department.name : undefined;
};

export const onGetDashboardData = () => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_DASHBOARD_DATA_LOADING,
    });
    jwtAxios
      .get("/department")
      .then((departmentData: AxiosResponse<DepartementResponseType[]>) => {
        jwtAxios
          .get("/dashboard")
          .then((data: AxiosResponse<DashboardResponse[]>) => {
            const mappedChartData: ChartData[] = data.data.map((dashboard) => {
              return {
                name: getDepartmentNameById(
                  dashboard.departmentId,
                  departmentData.data.data
                ),
                open: dashboard.status.open,
                pending: dashboard.status.pending,
                closed: dashboard.status.closed,
              };
            });

            const countAllStatus: StatusData = mappedChartData.reduce(
              (acc, item) => {
                acc.open += item.open;
                acc.closed += item.closed;
                acc.pending += item.pending;
                return acc;
              },
              { open: 0, pending: 0, closed: 0 }
            );

            console.log(countAllStatus);

            const dashboarData: DashboardData = {
              allStatus: countAllStatus,
              chartData: mappedChartData,
            };

            dispatch({
              type: GET_DASHBOARD_DATA_SUCCESS,
              payload: dashboarData,
            });
          })
          .catch((error: any) => {
            dispatch({
              type: GET_DASHBOARD_DATA_FAILED,
              payload: error,
            });
          });
      })
      .catch((error: any) => {
        console.log("error dashboard", error);
        dispatch({
          type: GET_DASHBOARD_DATA_FAILED,
          payload: error,
        });
      });
  };
};
