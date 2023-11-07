import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import { AddNewMessage, Header, MessagesList } from "@crema/modules/apps/Chat";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../toolkit/hooks";
import {
  StyledMessageScreen,
  StyledMsgAppsFooter,
  StyledMsgScreenScrollbar,
  StyledNoMsg,
  StyledScrollChatNoMain,
} from "../index.styled";
import socket from "@crema/services/socket";
import { RECEIVE_CHAT, SEND_CHAT } from "@crema/types/actions/Ticket.actions";
import moment from "moment";

type RefProps = {
  getScrollElement: () => {
    scrollTop: number;
    scrollHeight: number;
  };
};

const MessagesScreen: React.FC = () => {
  // const [message, setMessage] = useState("");

  const _scrollBarRef = useRef<RefProps | null>(null);
  const dispatch = useAppDispatch();
  const { detailTicket, chatList, message } = useAppSelector(
    ({ ticket }) => ticket
  );

  const onSend = (message: string) => {
    // setMessage("");
    dispatch({
      type: "COPY_MESSAGE",
      payload: "",
    });

    socket.emit("send", {
      to: detailTicket.phoneNumber,
      msg: message,
    });
  };

  useEffect(() => {
    if (chatList.length > 0) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [chatList, _scrollBarRef]);

  useEffect(() => {
    function onConnect() {
      console.log("onConnec");
    }

    function onDisconnect() {
      console.log("onDisConnec");
    }

    function onCallback(data) {
      console.log("data received", data);

      if (
        detailTicket &&
        data.from === detailTicket.phoneNumber &&
        detailTicket?.status !== "CLOSED"
      ) {
        dispatch({
          type: RECEIVE_CHAT,
          payload: data,
        });
      }

      if (
        detailTicket &&
        data.to === detailTicket.phoneNumber &&
        data.text &&
        detailTicket?.status !== "CLOSED"
      ) {
        dispatch({
          type: RECEIVE_CHAT,
          payload: data,
        });
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("callback", onCallback);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("callback");
    };
  }, [detailTicket]);

  return (
    <StyledMessageScreen>
      <AppsHeader>
        <Header selectedUser={detailTicket} />
      </AppsHeader>

      {chatList.length > 0 ? (
        <StyledMsgScreenScrollbar ref={_scrollBarRef as any}>
          <MessagesList chatList={chatList} />
        </StyledMsgScreenScrollbar>
      ) : (
        <StyledScrollChatNoMain>
          <StyledNoMsg>Belum ada pesan</StyledNoMsg>
        </StyledScrollChatNoMain>
      )}

      <StyledMsgAppsFooter>
        <AddNewMessage currentMessage={message} onSendMessage={onSend} />
      </StyledMsgAppsFooter>
    </StyledMessageScreen>
  );
};

export default MessagesScreen;
