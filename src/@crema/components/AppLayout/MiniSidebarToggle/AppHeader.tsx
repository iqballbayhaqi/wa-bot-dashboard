import { Dropdown } from "antd";
import React from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import AppLanguageSwitcher from "../../AppLanguageSwitcher";
import { StyledDropdownWrapper } from "../index.styled";
import {
  StyledHeaderMiniSecDesktop,
  StyledHeaderMiniSecMobile,
  StyledHeaderMiniSidebar,
} from "./index.styled";

const items = [{ key: 1, label: <AppLanguageSwitcher /> }];

type AppHeaderProps = {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
};

const AppHeader = ({ isCollapsed, onToggleSidebar }: AppHeaderProps) => {
  return (
    <StyledHeaderMiniSidebar className="app-header-mini-sidebar">
      {React.createElement(
        isCollapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
        {
          className: "trigger",
          onClick: onToggleSidebar,
        }
      )}

      <StyledHeaderMiniSecDesktop>
        <AppLanguageSwitcher />
      </StyledHeaderMiniSecDesktop>
      <StyledHeaderMiniSecMobile>
        <StyledDropdownWrapper>
          <Dropdown
            menu={{ items }}
            overlayClassName="dropdown-wrapper"
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={["click"]}
          >
            <a
              className="ant-dropdown-link-mobile"
              onClick={(e) => e.preventDefault()}
            >
              <FiMoreVertical />
            </a>
          </Dropdown>
        </StyledDropdownWrapper>
      </StyledHeaderMiniSecMobile>
    </StyledHeaderMiniSidebar>
  );
};

export default AppHeader;
