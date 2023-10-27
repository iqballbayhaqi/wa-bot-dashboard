import AppLoader from "@crema/components/AppLoader";
import AppRowContainer from "@crema/components/AppRowContainer";
import { OpportunitiesWon } from "@crema/modules/dashboards/CRM";
import { StatsDirCard } from "@crema/modules/dashboards/CommonComponents";
import { Col } from "antd";
import { useEffect } from "react";
import { onGetCrmData } from "../../toolkit/actions";
import { useAppDispatch, useAppSelector } from "../../toolkit/hooks";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetCrmData());
  }, [dispatch]);

  const { crmData } = useAppSelector(({ dashboard }) => dashboard);

  return (
    <>
      {crmData ? (
        // <AppAnimate animation="transition.slideUpIn" delay={200}>
        <AppRowContainer delay={150}>
          {crmData.stateData.map((data) => (
            <Col key={data.id} xs={24} sm={12} lg={8}>
              <StatsDirCard data={data} />
            </Col>
          ))}

          <Col xs={24} lg={24} key={"c"}>
            <OpportunitiesWon data={crmData.opportunitiesWonGraphData} />
          </Col>
        </AppRowContainer>
      ) : (
        // {/* </AppAnimate> */}
        <AppLoader />
      )}
    </>
  );
};

export default Dashboard;
