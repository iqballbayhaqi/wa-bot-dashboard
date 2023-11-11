import AppRowContainer from "@crema/components/AppRowContainer";
import DetailBroadcast from "@crema/modules/broadcast/DetailBroadcast";
import { Col } from "antd";

const Broadcast = () => {
  return (
    <AppRowContainer delay={150}>
      <Col span={24}>
        <DetailBroadcast />
      </Col>
    </AppRowContainer>
  );
};

export default Broadcast;
