import {
  ConnectionObjType,
  MessageDataObjType,
} from "@crema/types/models/apps/Chat";
import clsx from "clsx";
import React from "react";
import {
  StyledChatMsgListItem,
  StyledMessageTypePara,
  StyledMsgChat,
  StyledMsgChatAvatar,
  StyledMsgChatItem,
  StyledMsgChatView,
  StyledMsgTime,
} from "./MessageItem.style";

type ReceiverMessageItemProps = {
  selectedUser: ConnectionObjType;
  item: MessageDataObjType;
  isPreviousSender: boolean;
  isLast: boolean;
};

const ReceiverMessageItem: React.FC<ReceiverMessageItemProps> = ({
  selectedUser,
  isPreviousSender = false,
  isLast,
  item,
}) => {
  return (
    <StyledChatMsgListItem
      className={clsx(
        "left",
        isPreviousSender ? "hide-user-info" : "first-chat-message",
        isLast ? "last-chat-message" : ""
      )}
    >
      <StyledMsgChatView className="message-chat-view">
        <StyledMsgChatAvatar className="message-chat-avatar">
          {selectedUser.name.charAt(0).toUpperCase()}
        </StyledMsgChatAvatar>

        <StyledMsgChatItem className="message-chat-item">
          <StyledMsgTime className="message-time">{item.time}</StyledMsgTime>
          <StyledMsgChat>
            <StyledMessageTypePara>{item.message}</StyledMessageTypePara>;
          </StyledMsgChat>
        </StyledMsgChatItem>
      </StyledMsgChatView>
    </StyledChatMsgListItem>
  );
};

export default ReceiverMessageItem;
