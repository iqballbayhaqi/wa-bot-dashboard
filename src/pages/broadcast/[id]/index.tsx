import AppAsyncComponent from "@crema/components/AppAsyncComponent";
import AppPage from "@crema/core/AppLayout/AppPage";
import React from "react";

const Broadcast = AppAsyncComponent(
  () => import("../../../modules/broadcast/Detail")
);
export default AppPage(() => <Broadcast />);
