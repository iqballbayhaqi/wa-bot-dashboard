import React from "react";
import OpportunitiesWonGraph from "./OpportunitiesWonGraph";
import { useIntl } from "react-intl";
import { StyledAppCard } from "./index.styled";
import { ChartData } from "@crema/types/models/dashboards";

type Props = {
  data: ChartData[];
};

const OpportunitiesWon = ({ data }: Props) => {
  const { messages } = useIntl();

  return (
    <StyledAppCard title={"Grafik Masalah Best Agro International"}>
      <OpportunitiesWonGraph data={data} />
    </StyledAppCard>
  );
};

export default OpportunitiesWon;
