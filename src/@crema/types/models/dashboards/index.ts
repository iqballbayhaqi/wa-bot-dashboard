export type StatusData = {
  open: number;
  closed: number;
  pending: number;
};

export type DashboardResponse = {
  departmentId: number;
  status: StatusData;
};

export type DasboardDataType = {
    
}

export type ChartData = {
  name: string;
  open: number;
  closed: number;
  pending: number;
};

export type DashboardData = {
  allStatus: StatusData;
  chartData: ChartData[];
};
