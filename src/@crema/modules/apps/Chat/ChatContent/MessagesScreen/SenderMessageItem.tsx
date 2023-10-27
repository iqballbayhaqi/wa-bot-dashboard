import { AuthUserType } from "@crema/types/models/AuthUser";
import { MessageDataObjType } from "@crema/types/models/apps/Chat";
import clsx from "clsx";
import React from "react";
import {
  StyledChatMsgListItem,
  StyledMessageTypePara,
  StyledMsgChat,
  StyledMsgChatAvatar,
  StyledMsgChatItem,
  StyledMsgChatSender,
  StyledMsgChatView,
  StyledMsgTime,
} from "./MessageItem.style";

type SenderMessageItemProps = {
  item: MessageDataObjType;
  authUser: AuthUserType;
  isPreviousSender: boolean;
  isLast: boolean;
};

const SenderMessageItem: React.FC<SenderMessageItemProps> = ({
  authUser,
  item,
  isPreviousSender = false,
  isLast,
}) => {
  const getUserAvatar = () => {
    const name = authUser.displayName;
    if (name) {
      return name.charAt(0).toUpperCase();
    }
    if (authUser.email) {
      return authUser.email.charAt(0).toUpperCase();
    }
  };

  return (
    <StyledChatMsgListItem
      className={clsx(
        "right",
        isPreviousSender ? "hide-user-info" : "first-chat-message",
        isLast ? "last-chat-message" : ""
      )}
    >
      <StyledMsgChatView className="message-chat-view">
        <StyledMsgChatItem className="message-chat-item">
          <StyledMsgTime className="message-time">{item.time}</StyledMsgTime>
          <StyledMsgChat className="message-chat">
            <StyledMessageTypePara>{item.message}</StyledMessageTypePara>
          </StyledMsgChat>
        </StyledMsgChatItem>
        <StyledMsgChatSender className="message-chat-sender">
          <StyledMsgChatAvatar className="message-chat-avatar">
            {getUserAvatar()}
          </StyledMsgChatAvatar>
        </StyledMsgChatSender>
      </StyledMsgChatView>
    </StyledChatMsgListItem>
  );
};

export default SenderMessageItem;
