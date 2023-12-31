import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const Error403 = asyncComponent(
  () => import("../../modules/errorPages/Error403")
);
export default AppPage(() => <Error403 />);
