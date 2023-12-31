import AppAsyncComponent from "@crema/components/AppAsyncComponent";
import AppPage from "@crema/core/AppLayout/AppPage";
import React from "react";

const BroadcastList = AppAsyncComponent(
  () => import("../../modules/broadcast")
);
export default AppPage(() => <BroadcastList />);
