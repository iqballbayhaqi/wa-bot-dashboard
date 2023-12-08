import { ChartData } from "@crema/types/models/dashboards";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: ChartData[];
};

const OpportunitiesWonGraph = ({ data }: Props) => {
  return (
    <ResponsiveContainer maxHeight={260} minHeight={160}>
      <BarChart barGap={16} barSize={8} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          labelStyle={{ color: "black" }}
          contentStyle={{
            borderRadius: 12,
            borderColor: "#31354188",
            background: "#FFFFFFCA",
          }}
          cursor={{ fill: "transparent" }}
        />
        <Legend />
        <Bar dataKey="open" fill="#61c12a" barSize={20} />
        <Bar dataKey="pending" fill="#f59821" barSize={20} />
        <Bar dataKey="closed" fill="#fb4f67e6" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OpportunitiesWonGraph;
