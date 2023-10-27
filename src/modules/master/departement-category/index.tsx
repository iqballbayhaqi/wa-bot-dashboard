import React, { useEffect } from "react";
import { Col } from "antd";
import AppLoader from "@crema/components/AppLoader";
import AppAnimate from "@crema/components/AppAnimate";
import AppRowContainer from "@crema/components/AppRowContainer";

import { useAppSelector, useAppDispatch } from "../../../toolkit/hooks";
import {
  getMasterDepartementList,
  getMasterCategoryList,
} from "../../../toolkit/actions";
import MasterDepartment from "@crema/modules/master/Departement";
import MasterCategory from "@crema/modules/master/Category";

const DepartementCategory = () => {
  const dispatch = useAppDispatch();

  const {
    masterCategoryList,
    masterDepartementList,
    isLoadingMasterCategory,
    isLoadingMasterDepartement,
    isLoadingSaveMasterCategory,
    isLoadingSaveMasterDepartement,
    isSuccessModifyDepartmentData,
    isSuccessModifyCategoryData,
  } = useAppSelector(({ master }) => master);

  useEffect(() => {
    dispatch(getMasterCategoryList());
    dispatch(getMasterDepartementList());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessModifyCategoryData) {
      dispatch(getMasterCategoryList());
    }
    if (isSuccessModifyDepartmentData) {
      dispatch(getMasterDepartementList());
    }
  }, [isSuccessModifyDepartmentData, isSuccessModifyCategoryData, dispatch]);

  return (
    <>
      {masterCategoryList && masterDepartementList ? (
        <AppRowContainer delay={150}>
          <Col lg={12} xl={12}>
            <MasterDepartment
              isLoadingMasterDepartement={isLoadingMasterDepartement}
              masterDepartementData={masterDepartementList}
              isLoadingSaveData={isLoadingSaveMasterDepartement}
              isSucccessModifyMasterData={isSuccessModifyDepartmentData}
            />
          </Col>

          <Col lg={12} xl={12}>
            <MasterCategory
              isLoadingMasterCategory={isLoadingMasterCategory}
              masterCategoryData={masterCategoryList}
              isLoadingSaveData={isLoadingSaveMasterCategory}
              isSucccessModifyMasterData={isSuccessModifyCategoryData}
            />
          </Col>
        </AppRowContainer>
      ) : (
        <AppLoader />
      )}
    </>
  );
};

export default DepartementCategory;
