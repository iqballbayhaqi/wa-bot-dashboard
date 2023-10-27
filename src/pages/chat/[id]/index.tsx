import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const DetailChat = asyncComponent(
  () => import("../../../modules/apps/Chat/DetailChat"),
  {
    ssr: false,
  }
);
export default AppPage(() => <DetailChat />);
