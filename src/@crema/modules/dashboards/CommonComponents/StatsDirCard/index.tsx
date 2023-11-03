import AppCard from "@crema/components/AppCard";
import { Typography } from "antd";
import {
  StyledFlexContainer,
  StyledFlexWrapper,
  StyledIconWrapper,
  StyledTitleWrapper,
} from "../index.styled";

type Props = {
  data: {
    color: string;
    value: string;
    name: string;
  };
};
const StatsDirCard = ({ data }: Props) => {
  return (
    <AppCard className="card-hover no-card-space">
      <StyledFlexWrapper>
        <StyledFlexContainer>
          <StyledIconWrapper
            style={{
              color: data.color,
              backgroundColor: data.color + "22",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                backgroundColor: data.color,
                borderRadius: 10,
              }}
            />
          </StyledIconWrapper>

          <div style={{ marginRight: 8, overflow: "hidden" }}>
            <Typography.Title level={5}>{data.value}</Typography.Title>
            <StyledTitleWrapper>{data.name}</StyledTitleWrapper>
          </div>
        </StyledFlexContainer>
      </StyledFlexWrapper>
    </AppCard>
  );
};

export default StatsDirCard;
