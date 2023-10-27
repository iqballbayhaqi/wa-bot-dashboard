import React from "react";
import { useLayoutContext } from "@crema/context/AppContextProvider/LayoutContextProvider";
import {
  StyledFooterBtnView,
  StyledMainFooter,
  StyledFooterBtn,
} from "./AppFooter.styled";
import { RiCopyrightLine } from "react-icons/ri";

const AppFooter = () => {
  const { footer } = useLayoutContext();

  if (footer) {
    return (
      <StyledMainFooter>
        <p>
          <span>
            <RiCopyrightLine />
          </span>
          2023 - PT. Best Agro International
        </p>
        {/* <StyledFooterBtnView>
          <StyledFooterBtn type="link" color="primary">
            Buy Now
          </StyledFooterBtn>
        </StyledFooterBtnView> */}
      </StyledMainFooter>
    );
  }
  return null;
};

export default AppFooter;
