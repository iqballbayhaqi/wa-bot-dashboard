import { UserOutlined } from "@ant-design/icons";
import { ChatListType } from "@crema/types/models/tickets";
import clsx from "clsx";
import moment from "moment";
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
  item: ChatListType;
  isLast?: boolean;
  isPreviousSender?: boolean;
};

const SenderMessageItem: React.FC<SenderMessageItemProps> = ({
  item,
  isLast,
  isPreviousSender,
}) => {
  return (
    <StyledChatMsgListItem
      className={clsx(
        "right",
        isLast ? "last-chat-message" : "",
        isPreviousSender ? "hide-user-info" : "first-chat-message"
      )}
    >
      <StyledMsgChatView className="message-chat-view">
        <StyledMsgChatItem className="message-chat-item">
          <StyledMsgTime className="message-time">
            {moment(item.time).format("ddd, MMM DD, YYYY h:mm A")}
          </StyledMsgTime>
          <StyledMsgChat className="message-chat">
            <StyledMessageTypePara>{item.text}</StyledMessageTypePara>
          </StyledMsgChat>
        </StyledMsgChatItem>
        <StyledMsgChatSender className="message-chat-sender">
          <StyledMsgChatAvatar
            className="message-chat-avatar"
            icon={<UserOutlined />}
          />
        </StyledMsgChatSender>
      </StyledMsgChatView>
    </StyledChatMsgListItem>
  );
};

export default SenderMessageItem;
