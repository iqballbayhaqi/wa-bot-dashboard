import { ConnectionObjType } from "@crema/types/models/apps/Chat";
import React from "react";
import ChatList from "./ChatList";

type UserTabsProps = {
  chatListData: ConnectionObjType[];
  setSelectedUser: any;
  selectedUser: ConnectionObjType | null;
  loading: boolean | undefined;
};

const UserTabs: React.FC<UserTabsProps> = ({
  chatListData = [],
  loading,
  selectedUser,
  setSelectedUser,
}) => {
  return (
    <ChatList
      chatListData={chatListData}
      loading={loading}
      setSelectedUser={setSelectedUser}
      selectedUser={selectedUser}
    />
  );
};

export default UserTabs;
