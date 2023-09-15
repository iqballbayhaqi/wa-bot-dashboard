import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import AppsContainer from "@crema/components/AppsContainer";
import AppPageMeta from "@crema/components/AppPageMeta";
import { ChatSideBar } from "@crema/modules/apps/Chat";
import ChatContent from "./ChatContent";
import { getConnectionList, onSelectUser } from "../../../toolkit/actions";
import { useAppSelector, useAppDispatch } from "../../../toolkit/hooks";
import { ConnectionObjType } from "@crema/types/models/apps/Chat";
import socket from "@crema/services/socket";

const Chat = () => {
  const selectedUser = useAppSelector(({ chatApp }) => chatApp.selectedUser);

  const dispatch = useAppDispatch();
  const connectionList = useAppSelector(
    ({ chatApp }) => chatApp.connectionList
  );

  const { loading } = useAppSelector(({ common }) => common);

  useEffect(() => {
    // TODO emit a socket connection here
    // socket.on("message", (message) => {
    //   console.log("message from socket", message);
    // });
    // return () => {
    //   socket.off("message");
    // };
  }, []);

  useEffect(() => {
    dispatch(getConnectionList());
  }, [dispatch]);

  const setSelectedUser = (item: ConnectionObjType) => {
    dispatch(onSelectUser(item));
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages["chatApp.chat"] as string}
      sidebarContent={
        <ChatSideBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          connectionList={connectionList}
          loading={loading}
        />
      }
    >
      <AppPageMeta title="Chat App" />
      <ChatContent selectedUser={selectedUser} />
    </AppsContainer>
  );
};

export default Chat;
