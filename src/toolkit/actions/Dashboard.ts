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
  DashboardResponseData,
  StatusData,
} from "@crema/types/models/dashboards";
import { AxiosResponse } from "axios";
import { Dispatch } from "redux";

export const onGetDashboardData = ({ params }) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: GET_DASHBOARD_DATA_LOADING,
    });
    jwtAxios
      .get("/dashboard", { params })
      .then((data: AxiosResponse<DashboardResponseData[]>) => {
        const mappedChartData: ChartData[] = data.data.map((dashboard) => {
          return {
            name: dashboard.departmentName,
            open: dashboard.openTickets,
            pending: dashboard.pendingTickets,
            closed: dashboard.closedTickets,
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
  };
};
