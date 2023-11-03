import AppCard from "@crema/components/AppCard";
import AppRowContainer from "@crema/components/AppRowContainer";
import { OpportunitiesWon } from "@crema/modules/dashboards/CRM";
import { StatsDirCard } from "@crema/modules/dashboards/CommonComponents";
import { StyledSkeleton } from "@crema/modules/master/index.styled";
import { Col } from "antd";
import { useEffect } from "react";
import { onGetDashboardData } from "../../toolkit/actions";
import { useAppDispatch, useAppSelector } from "../../toolkit/hooks";

const getColorStatus = (value: string): string => {
  switch (value) {
    case "open":
      return "#61c12a";
    case "closed":
      return "#f44d54";
    case "pending":
      return "#f59821";

    default:
      return "#000";
  }
};

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetDashboardData());
  }, [dispatch]);

  const { dashboardData, isLoadingDashboard } = useAppSelector(
    ({ dashboard }) => dashboard
  );

  return (
    <>
      <AppRowContainer delay={150}>
        {isLoadingDashboard ? (
          <>
            <Col key={"a"} xs={24} sm={12} lg={8}>
              <AppCard>
                <StyledSkeleton active />
              </AppCard>
            </Col>
            <Col key={"b"} xs={24} sm={12} lg={8}>
              <AppCard>
                <StyledSkeleton active />
              </AppCard>
            </Col>
            <Col key={"c"} xs={24} sm={12} lg={8}>
              <AppCard>
                <StyledSkeleton active />
              </AppCard>
            </Col>
          </>
        ) : (
          Object.keys(dashboardData.allStatus).map((key) => (
            <Col key={key} xs={24} sm={12} lg={8}>
              <StatsDirCard
                data={{
                  color: getColorStatus(key),
                  name: key,
                  value: dashboardData.allStatus[key],
                }}
              />
            </Col>
          ))
        )}

        <Col xs={24} lg={24}>
          {isLoadingDashboard ? (
            <AppCard>
              <StyledSkeleton active />
            </AppCard>
          ) : (
            <OpportunitiesWon data={dashboardData.chartData} />
          )}
        </Col>
      </AppRowContainer>
    </>
  );
};

export default Dashboard;
