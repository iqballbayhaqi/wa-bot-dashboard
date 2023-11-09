import {
  DashboardResponse,
  DashboardResponseData,
} from "@crema/types/models/dashboards";

const generateData = (totalData: number): DashboardResponse[] => {
  const data: DashboardResponse[] = [];

  for (let i = 1; i <= totalData; i++) {
    data.push({
      departmentId: i,
      status: {
        pending: Math.floor(Math.random() * 20), // Randomize pending between 0 and 4
        open: Math.floor(Math.random() * 20), // Randomize open between 0 and 4
        closed: Math.floor(Math.random() * 20), // Randomize closed between 0 and 4
      },
    });
  }

  return data;
};

export const dashboardData: DashboardResponseData[] = [
  {
    departmentId: 1,
    departmentName: "Agronomi",
    openTickets: 0,
    pendingTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  },
  {
    departmentId: 2,
    departmentName: "Teknik",
    openTickets: 0,
    pendingTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  },
  {
    departmentId: 3,
    departmentName: "Test3",
    openTickets: 0,
    pendingTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  },
  {
    departmentId: 4,
    departmentName: "Tes",
    openTickets: 0,
    pendingTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  },
  {
    departmentId: 5,
    departmentName: "Tes3",
    openTickets: 0,
    pendingTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  },
  {
    departmentId: 6,
    departmentName: "tes",
    openTickets: 0,
    pendingTickets: 0,
    closedTickets: 0,
    totalTickets: 0,
  },
  {
    departmentId: null,
    departmentName: "Unassigned",
    openTickets: 0,
    pendingTickets: 1,
    closedTickets: 0,
    totalTickets: 1,
  },
];

export default generateData;
