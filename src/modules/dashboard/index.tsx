import AppCard from "@crema/components/AppCard";
import AppRowContainer from "@crema/components/AppRowContainer";
import { OpportunitiesWon } from "@crema/modules/dashboards/CRM";
import { StatsDirCard } from "@crema/modules/dashboards/CommonComponents";
import { StyledSkeleton } from "@crema/modules/master/index.styled";
import { Col, Select } from "antd";
import { useEffect, useState } from "react";
import { onGetDashboardData } from "../../toolkit/actions";
import { useAppDispatch, useAppSelector } from "../../toolkit/hooks";
import {
  getDailyRange,
  getMonthlyRange,
  getYearlyRange,
} from "@crema/helpers/DateHelper";

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
  const [filterBy, setSelectedFilterBy] = useState("Yearly");

  useEffect(() => {
    const getYearRange = getYearlyRange();
    const getMonthRange = getMonthlyRange();
    const getDayRange = getDailyRange();

    switch (filterBy) {
      case "Yearly":
        dispatch(
          onGetDashboardData({
            params: {
              startDate: getYearRange[0].toString(),
              endDate: getYearRange[1].toString(),
            },
          })
        );
        break;

      case "Monthly":
        dispatch(
          onGetDashboardData({
            params: {
              startDate: getMonthRange[0].toString(),
              endDate: getMonthRange[1].toString(),
            },
          })
        );
        break;

      case "Daily":
        dispatch(
          onGetDashboardData({
            params: {
              startDate: getDayRange[0].toString(),
              endDate: getDayRange[1].toString(),
            },
          })
        );
        break;
      default:
        break;
    }
  }, [dispatch, filterBy]);

  const { dashboardData, isLoadingDashboard } = useAppSelector(
    ({ dashboard }) => dashboard
  );

  return (
    <>
      <AppRowContainer delay={150}>
        <Col lg={24}>
          <Select
            defaultValue={filterBy}
            options={[
              {
                label: "Yearly",
                value: "Yearly",
              },
              {
                label: "Monthly",
                value: "Monthly",
              },
              {
                label: "Daily",
                value: "Daily",
              },
            ]}
            onChange={(value) => {
              setSelectedFilterBy(value);
            }}
          />
        </Col>
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
        ) : dashboardData?.allStatus ? (
          Object.keys(dashboardData?.allStatus).map((key) => (
            <Col key={key} xs={24} sm={12} lg={8}>
              <StatsDirCard
                data={{
                  color: getColorStatus(key),
                  name: key,
                  value: dashboardData?.allStatus[key],
                }}
              />
            </Col>
          ))
        ) : (
          [
            { status: "open", name: "open", value: 0 },
            { status: "closed", name: "closed", value: 0 },
            { status: "pending", name: "pending", value: 0 },
          ].map((value) => (
            <Col key={value.status} xs={24} sm={12} lg={8}>
              <StatsDirCard
                data={{
                  color: getColorStatus(value.status),
                  name: value.status,
                  value: value.value,
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
            <OpportunitiesWon data={dashboardData?.chartData} />
          )}
        </Col>
      </AppRowContainer>
    </>
  );
};

export default Dashboard;
