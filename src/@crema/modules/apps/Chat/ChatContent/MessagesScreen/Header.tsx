import { ConnectionObjType } from "@crema/types/models/apps/Chat";
import React from "react";
import UserInfo from "../../ChatSideBar/UserInfo";
import { StyledChatHeader } from "../index.styled";

type HeaderProps = {
  selectedUser: ConnectionObjType;
};

const Header: React.FC<HeaderProps> = ({ selectedUser }) => {
  return (
    <StyledChatHeader>
      <UserInfo user={selectedUser} showStatus={false} />
    </StyledChatHeader>
  );
};

export default Header;
