import AppList from "@crema/components/AppList";
import ListEmptyResult from "@crema/components/AppList/ListEmptyResult";
import { AuthUserType } from "@crema/types/models/AuthUser";
import {
  ConnectionObjType,
  MessageObjType
} from "@crema/types/models/apps/Chat";
import React from "react";
import { StyledChatMsgList } from "./MessageItem.style";
import ReceiverMessageItem from "./ReceiverMessageItem";
import SenderMessageItem from "./SenderMessageItem";

type MessagesListProps = {
  userMessages: MessageObjType;
  authUser: AuthUserType;
  selectedUser: ConnectionObjType;
  loading?: boolean;
};

const MessagesList: React.FC<MessagesListProps> = ({
  userMessages,
  authUser,
  selectedUser,
}) => {
  return (
    <StyledChatMsgList>
      <AppList
        data={userMessages.messageData}
        ListEmptyComponent={<ListEmptyResult title="test" />}
        renderItem={(item, index) => {
          if (item.sender === authUser.id) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                isPreviousSender={
                  index > 0 &&
                  item.sender === userMessages.messageData[index - 1].sender
                }
                isLast={
                  (index + 1 < userMessages.messageData.length &&
                    item.sender !==
                      userMessages.messageData[index + 1].sender) ||
                  index + 1 === userMessages.messageData.length
                }
                key={item.id}
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                isPreviousSender={
                  index > 0 &&
                  item.sender === userMessages.messageData[index - 1].sender
                }
                isLast={
                  (index + 1 < userMessages.messageData.length &&
                    item.sender !==
                      userMessages.messageData[index + 1].sender) ||
                  index + 1 === userMessages.messageData.length
                }
                selectedUser={selectedUser}
                item={item}
                key={item.id}
              />
            );
          }
        }}
      />
    </StyledChatMsgList>
  );
};

export default MessagesList;
