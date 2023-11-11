import React from "react";

import { UserOutlined } from "@ant-design/icons";
import {
  TicketDetail,
  TicketDetailResponseType,
} from "@crema/types/models/tickets";
import {
  StyledChatUserAvatar,
  StyledChatUserAvatarView,
  StyledChatUserInfo,
  StyledChatUserInfoContext,
  StyledChatUserName,
} from "./userInfo.styled";

type UserInfoProps = {
  user: TicketDetail;
};

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <StyledChatUserInfo>
      <StyledChatUserAvatarView>
        <StyledChatUserAvatar icon={<UserOutlined />} />
      </StyledChatUserAvatarView>
      <StyledChatUserInfoContext>
        <StyledChatUserName className="text-truncate">
          {user?.whatsappName} - {user?.phoneNumber}
        </StyledChatUserName>
      </StyledChatUserInfoContext>
    </StyledChatUserInfo>
  );
};

export default UserInfo;
