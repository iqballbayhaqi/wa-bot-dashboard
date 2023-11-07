import jwtAxios from "@crema/services/axios";
import { AppActions } from "@crema/types/actions";
import {
  GET_DASHBOARD_DATA_FAILED,
  GET_DASHBOARD_DATA_LOADING,
  GET_DASHBOARD_DATA_SUCCESS,
} from "@crema/types/actions/Dashboard.action";
import {
  ChartData,
  DashboardData,
  DashboardResponse,
  StatusData,
} from "@crema/types/models/dashboards";
import {
  DepartementData,
  DepartementResponseType,
} from "@crema/types/models/master";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

const getDepartmentNameById = (
  id: number,
  data: DepartementData[]
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
      .then((departmentData: AxiosResponse<DepartementResponseType>) => {
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
        dispatch({
          type: GET_DASHBOARD_DATA_FAILED,
          payload: error,
        });
      });
  };
};
