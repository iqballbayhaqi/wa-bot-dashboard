import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const DepartemenCategory = asyncComponent(
  () => import("../../../modules/master/departement-category")
);
export default AppPage(() => <DepartemenCategory />);
