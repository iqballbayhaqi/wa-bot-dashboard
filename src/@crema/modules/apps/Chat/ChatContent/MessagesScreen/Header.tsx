import {
  TicketDetail,
  TicketDetailResponseType,
} from "@crema/types/models/tickets";
import React from "react";
import UserInfo from "../../ChatSideBar/UserInfo";
import { StyledChatHeader } from "../index.styled";

type HeaderProps = {
  selectedUser: TicketDetail;
};

const Header: React.FC<HeaderProps> = ({ selectedUser }) => {
  return (
    <StyledChatHeader>
      <UserInfo user={selectedUser} />
    </StyledChatHeader>
  );
};

export default Header;
