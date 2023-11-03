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
  StyledMsgChatView,
  StyledMsgTime,
} from "./MessageItem.style";

type ReceiverMessageItemProps = {
  item: ChatListType;
  isLast: boolean;
  isPreviousSender: boolean;
};

const ReceiverMessageItem: React.FC<ReceiverMessageItemProps> = ({
  item,
  isLast,
  isPreviousSender,
}) => {
  return (
    <StyledChatMsgListItem
      className={clsx(
        "left",
        isLast ? "last-chat-message" : "",
        isPreviousSender ? "hide-user-info" : "first-chat-message"
      )}
    >
      <StyledMsgChatView className="message-chat-view">
        <StyledMsgChatAvatar
          className="message-chat-avatar"
          icon={<UserOutlined />}
        />

        <StyledMsgChatItem className="message-chat-item">
          <StyledMsgTime className="message-time">
            {moment(item.time).format("ddd, MMM DD, YYYY h:mm A")}
          </StyledMsgTime>
          <StyledMsgChat>
            <StyledMessageTypePara>{item.text}</StyledMessageTypePara>
          </StyledMsgChat>
        </StyledMsgChatItem>
      </StyledMsgChatView>
    </StyledChatMsgListItem>
  );
};

export default ReceiverMessageItem;
