import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import { AddNewMessage, Header, MessagesList } from "@crema/modules/apps/Chat";
import { ConnectionObjType, MessageType } from "@crema/types/models/apps/Chat";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import {
  getConnectionMessages,
  onSendMessage,
} from "../../../../../toolkit/actions";
import { useAppDispatch, useAppSelector } from "../../../../../toolkit/hooks";
import {
  StyledMessageScreen,
  StyledMsgAppsFooter,
  StyledMsgScreenScrollbar,
  StyledNoMsg,
  StyledScrollChatNoMain,
} from "../index.styled";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";
// import socket from "@crema/services/socket";

type MessagesScreenProps = {
  selectedUser: ConnectionObjType;
};

type RefProps = {
  getScrollElement: () => {
    scrollTop: number;
    scrollHeight: number;
  };
};

const MessagesScreen: React.FC<MessagesScreenProps> = ({ selectedUser }) => {
  const dispatch = useAppDispatch();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [message, setMessage] = useState("");

  const { user } = useAuthUser();

  const _scrollBarRef = useRef<RefProps | null>(null);
  const userMessages = useAppSelector(({ chatApp }) => chatApp.userMessages);

  useEffect(() => {
    dispatch(getConnectionMessages(selectedUser.channelId));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (
      userMessages &&
      userMessages.messageData &&
      userMessages.messageData.length > 0
    ) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const onSend = (message: string) => {
    // const data = {
    //   message,
    //   message_type: MessageType.TEXT,
    //   sender: user.id,
    //   time: dayjs().format("ddd, MMM DD, YYYY h:mm A"),
    // };

    // infoViewActionsContext.showMessage("Message Added Successfully!");
    // dispatch(onSendMessage(selectedUser.channelId, data));
    // setMessage("");
    console.log("masuk");

    // socket.connect();

    // socket.emit("send", "test");
  };

  return (
    <StyledMessageScreen>
      <AppsHeader>
        <Header selectedUser={selectedUser as ConnectionObjType} />
      </AppsHeader>

      {userMessages && user ? (
        <StyledMsgScreenScrollbar ref={_scrollBarRef as any}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedUser={selectedUser as ConnectionObjType}
          />
        </StyledMsgScreenScrollbar>
      ) : (
        <StyledScrollChatNoMain>
          <StyledNoMsg>
            <IntlMessages id="chatApp.sayHi" /> {selectedUser?.name}
          </StyledNoMsg>
        </StyledScrollChatNoMain>
      )}

      <StyledMsgAppsFooter>
        <AddNewMessage currentMessage={message} onSendMessage={onSend} />
      </StyledMsgAppsFooter>
    </StyledMessageScreen>
  );
};

export default MessagesScreen;
