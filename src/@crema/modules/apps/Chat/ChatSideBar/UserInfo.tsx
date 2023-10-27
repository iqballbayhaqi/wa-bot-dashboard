import React from "react";

import {
  StyledChatUserAvatar,
  StyledChatUserAvatarView,
  StyledChatUserInfo,
  StyledChatUserInfoContext,
  StyledChatUserName,
} from "./userInfo.styled";
import { ConnectionObjType } from "@crema/types/models/apps/Chat";

type UserInfoProps = {
  user: ConnectionObjType;
  showStatus?: boolean;
  showStatusActive?: boolean;
  showDepartment?: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({
  user,
  showDepartment = false,
}) => {
  const getUserAvatar = () => {
    const name = user.name;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (user.username) {
      return user.username.charAt(0).toUpperCase();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <StyledChatUserInfo>
      <StyledChatUserAvatarView>
        {user.photoURL || user.image ? (
          <StyledChatUserAvatar src={user.photoURL || user.image} />
        ) : (
          <StyledChatUserAvatar>{getUserAvatar()}</StyledChatUserAvatar>
        )}
      </StyledChatUserAvatarView>
      <StyledChatUserInfoContext>
        <StyledChatUserName className="text-truncate">
          {user.displayName || user.name
            ? user.displayName || user.name
            : user.email}{" "}
          {showDepartment && "(AGRONOMI)"}
        </StyledChatUserName>
      </StyledChatUserInfoContext>
    </StyledChatUserInfo>
  );
};

export default UserInfo;
