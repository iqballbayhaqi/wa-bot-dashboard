import React, { ReactNode } from "react";
import { Row } from "antd";
import { StyledAppRowContainer } from "./index.styled";

type AppRowContainerProps = {
  children: ReactNode;

  [x: string]: any;
};

const AppRowContainer: React.FC<AppRowContainerProps> = ({
  children,
  style,
  ...others
}) => {
  return (
    <StyledAppRowContainer style={style}>
      <Row
        style={{ flexDirection: "row" }}
        gutter={{ xs: 16, sm: 16, md: 32 }}
        {...others}
      >
        {children}
      </Row>
    </StyledAppRowContainer>
  );
};

export default AppRowContainer;
