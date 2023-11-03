import AppList from "@crema/components/AppList";
import ListEmptyResult from "@crema/components/AppList/ListEmptyResult";
import { ChatListType } from "@crema/types/models/tickets";
import React from "react";
import { StyledChatMsgList } from "./MessageItem.style";
import ReceiverMessageItem from "./ReceiverMessageItem";
import SenderMessageItem from "./SenderMessageItem";

type MessagesListProps = {
  chatList: ChatListType[];
};

const MessagesList: React.FC<MessagesListProps> = ({ chatList }) => {
  return (
    <StyledChatMsgList>
      <AppList
        data={chatList}
        ListEmptyComponent={<ListEmptyResult title="test" />}
        renderItem={(item, index) => {
          if (item.fromMe) {
            return (
              <SenderMessageItem
                item={item}
                key={item.id}
                isLast={index === chatList.length - 1}
                isPreviousSender={
                  index > 0 && item.fromMe === chatList[index - 1].fromMe
                }
              />
            );
          } else if (item.chatType === "user") {
            return (
              <ReceiverMessageItem
                item={item}
                key={item.id}
                isLast={index === chatList.length - 1}
                isPreviousSender={
                  index > 0 && item.from === chatList[index - 1].from
                }
              />
            );
          }
        }}
      />
    </StyledChatMsgList>
  );
};

export default MessagesList;
