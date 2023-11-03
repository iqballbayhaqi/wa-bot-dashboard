import { DashboardResponse } from "@crema/types/models/dashboards";

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

export default generateData;
