import AppPageMeta from "@crema/components/AppPageMeta";
import AppsContainer from "@crema/components/AppsContainer";
import { ChatSideBar } from "@crema/modules/apps/Chat";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { onSelectUser } from "../../../../toolkit/actions";
import { useAppDispatch, useAppSelector } from "../../../../toolkit/hooks";
import ChatContent from "../ChatContent";
// import socket from "@crema/services/socket";
// import { io } from "socket.io-client";

const DetailChat = () => {
  const selectedUser = useAppSelector(({ chatApp }) => chatApp.selectedUser);

  const dispatch = useAppDispatch();

  const [webSocket, setWebSocket] = useState<any>(null);

  useEffect(() => {
    // const socket = io("https://1426-114-124-130-1.ngrok.io", {
    //   transports: ["websocket"],
    // });
    // setWebSocket(socket);
    // socket.on("connection", (socket) => {
    //   console.log("connected to socket");
    // });
    // socket.on("userList", (userLists) => {
    //   console.log("userlist updated");
    //   console.log(userLists);
    //   setUserList(userLists);
    // });
    // socket.on("newMessage", (chatHistory)
  }, []);

  // useEffect(() => {
  //   function onConnect() {
  //     console.log("onConnec");
  //   }

  //   function onDisconnect() {
  //     console.log("onDisConnec");
  //   }

  //   function onFooEvent(value) {
  //     console.log("event", value);
  //   }

  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  //   socket.on("foo", onFooEvent);

  //   return () => {
  //     socket.off("connect", onConnect);
  //     socket.off("disconnect", onDisconnect);
  //     socket.off("receive", onFooEvent);
  //   };
  // }, []);

  useEffect(() => {
    dispatch(
      onSelectUser({
        id: 2,
        channelId: 2001,
        name: "Jubina Chawla",
        image: "/assets/images/avatar/A1.jpg",
        status: "offline",
        username: "jubina.1",
        lastMessage: {
          id: 6,
          message: "ok, will do it",
          type: "received",
          time: "Sat, May 09, 2020 8:30 PM",
        },
      })
    );
  }, [dispatch]);

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={(messages["ticket.detailChat"] as string) + ` (${"#JWKTSK"})`}
      sidebarContent={<ChatSideBar />}
    >
      <AppPageMeta title="Detail Percakapan" />
      <ChatContent selectedUser={selectedUser} />
    </AppsContainer>
  );
};

export default DetailChat;
