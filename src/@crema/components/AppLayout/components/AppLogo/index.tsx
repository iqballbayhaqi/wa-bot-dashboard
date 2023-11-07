import React from "react";
import { useSidebarContext } from "@crema/context/AppContextProvider/SidebarContextProvider";
import { StyledAppLogo } from "./index.styled";

type AppLogoProps = {
  hasSidebarColor?: boolean;
};
const AppLogo: React.FC<AppLogoProps> = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === "dark" ? (
        <img src="/assets/images/logo-best-agro.jpg" alt="pt-best-agro-logo" />
      ) : (
        <img src="/assets/images/logo-best-agro.jpg" alt="pt-best-agro-logo" />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;
