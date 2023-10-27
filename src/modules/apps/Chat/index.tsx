import React from "react";
import { Col } from "antd";
import AppRowContainer from "@crema/components/AppRowContainer";

import Tickets from "@crema/modules/tickets";

const ListTicket = () => {
  return (
    <AppRowContainer delay={150}>
      <Col span={24}>
        <Tickets />
      </Col>
    </AppRowContainer>
  );
};

export default ListTicket;
