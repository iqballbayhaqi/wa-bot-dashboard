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
  const [message, setMessage] = useState("");

  const _scrollBarRef = useRef<RefProps | null>(null);
  const dispatch = useAppDispatch();
  const { detailTicket, chatList } = useAppSelector(({ ticket }) => ticket);

  const onSend = (message: string) => {
    setMessage("");

    dispatch({
      type: SEND_CHAT,
      payload: {
        id: moment().valueOf(),
        time: moment().format("ddd, MMM DD, YYYY h:mm A"),
        fromMe: true,
        text: message,
      },
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
    console.log("masookk");
    function onConnect() {
      console.log("onConnec");
    }

    function onDisconnect() {
      console.log("onDisConnec");
    }

    function onFooEvent(value) {
      console.log("emit", value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("callback", (data) => {
      if (detailTicket && data.from === detailTicket.phoneNumber) {
        dispatch({
          type: RECEIVE_CHAT,
          payload: data,
        });
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("callback", onFooEvent);
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
