import AppAnimateGroup from "@crema/components/AppAnimateGroup";
import AppInfoView from "@crema/components/AppInfoView";
import AppLogo from "@crema/components/AppLayout/components/AppLogo";
import PropTypes from "prop-types";
import React from "react";
import {
  StyledAuth,
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
  StyledMainAuthScrollbar,
} from "./AuthWrapper.styled";

type Props = {
  children: React.ReactNode;
};
const AuthWrapper = ({ children }: Props) => {
  return (
    <StyledAuth>
      <StyledMainAuthScrollbar>
        <AppAnimateGroup
          type="scale"
          style={{ flex: 1 }}
          delay={0}
          interval={10}
          duration={200}
        >
          <StyledAuthWrap key={"wrap"}>
            <StyledAuthCard>
              <StyledAuthMainContent>
                <StyledAuthCardHeader>
                  <AppLogo />
                </StyledAuthCardHeader>
                {children}
              </StyledAuthMainContent>
              <StyledAuthWellAction>
                <StyledAuthWelContent>
                  <h2>PT Best Agro International</h2>
                </StyledAuthWelContent>
              </StyledAuthWellAction>
            </StyledAuthCard>
          </StyledAuthWrap>
          <AppInfoView />
        </AppAnimateGroup>
      </StyledMainAuthScrollbar>
    </StyledAuth>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
