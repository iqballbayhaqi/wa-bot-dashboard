import AppRowContainer from "@crema/components/AppRowContainer";
import BroadcastList from "@crema/modules/broadcast";
import { Col } from "antd";

const Broadcast = () => {
  return (
    <AppRowContainer delay={150}>
      <Col span={24}>
        <BroadcastList />
      </Col>
    </AppRowContainer>
  );
};

export default Broadcast;
