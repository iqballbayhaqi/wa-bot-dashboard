import AppPageMeta from "@crema/components/AppPageMeta";
import AppsContainer from "@crema/components/AppsContainer";
import { ChatSideBar } from "@crema/modules/apps/Chat";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import {
  getFaq,
  getMasterCategoryList,
  getMasterDepartementList,
  getTicketDetail,
} from "toolkit/actions";
import { useAppDispatch } from "../../../../toolkit/hooks";
import ChatContent from "../ChatContent";
// import socket from "@crema/services/socket";

const DetailChat = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMasterCategoryList());
    dispatch(getMasterDepartementList());
    dispatch(getTicketDetail(router.query.id));
    dispatch(getFaq());
  }, [dispatch]);

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={(messages["ticket.detailChat"] as string) + ` (${"#JWKTSK"})`}
      sidebarContent={<ChatSideBar />}
    >
      <AppPageMeta title="Detail Percakapan" />

      <ChatContent />
    </AppsContainer>
  );
};

export default DetailChat;
