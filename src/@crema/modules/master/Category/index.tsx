import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import AppCard from "@crema/components/AppCard";
import { useIntl } from "react-intl";
import { CategoryDataType } from "@crema/types/models/master";
import { Button } from "antd";
import IntlMessages from "@crema/helpers/IntlMessages";
import { StyledPlusOutlined, StyledSkeleton } from "../index.styled";
import AddEditModal from "../AddEditModal";

type MasterCategoryProps = {
  masterCategoryData: CategoryDataType[];
  isLoadingMasterCategory: boolean;
  isLoadingSaveData: boolean;
  isSucccessModifyMasterData: boolean;
};

type ModalData = {
  isOpen: boolean;
  calledFrom: "department" | "category";
  url: string;
  type: "post" | "put";
  data?: { id: number; name: string; code?: string; departmentCode?: string };
};

const MasterCategory: React.FC<MasterCategoryProps> = ({
  masterCategoryData,
  isLoadingMasterCategory,
  isLoadingSaveData,
  isSucccessModifyMasterData,
}) => {
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    calledFrom: undefined,
    url: undefined,
    type: undefined,
    data: undefined,
  });

  const { messages } = useIntl();

  const handleCancel = () => {
    setModalData({
      isOpen: false,
      calledFrom: undefined,
      url: undefined,
      type: undefined,
      data: undefined,
    });
  };

  useEffect(() => {
    if (isSucccessModifyMasterData) {
      setModalData({
        isOpen: false,
        calledFrom: undefined,
        url: undefined,
        type: undefined,
        data: undefined,
      });
    }
  }, [isSucccessModifyMasterData]);

  return (
    <>
      {isLoadingMasterCategory ? (
        <AppCard>
          <StyledSkeleton active />
        </AppCard>
      ) : (
        <AppCard
          className="no-card-space-ltr-rtl"
          title={messages["master.categoryTitleSection"] as string}
          extra={
            <Button
              ghost
              type="primary"
              icon={<StyledPlusOutlined style={{ marginRight: 8 }} />}
              onClick={() =>
                setModalData({
                  ...modalData,
                  calledFrom: "category",
                  url: "/category",
                  type: "post",
                  isOpen: true,
                })
              }
            >
              <IntlMessages id="master.addCategory" />
            </Button>
          }
        >
          <CategoryTable
            categoryData={masterCategoryData}
            onHandleAction={(action, data) => {
              switch (action) {
                case messages["common.actionUpdate"]:
                  setModalData({
                    isOpen: true,
                    calledFrom: "category",
                    url: `/category`,
                    type: "put",
                    data: {
                      id: data.id,
                      departmentCode: data.departmentCode,
                      name: data.categoryName,
                    },
                  });
                  break;
                case messages["common.actionDelete"]:
                  console.log("delete");
                  break;
              }
            }}
          />
        </AppCard>
      )}

      {modalData.isOpen ? (
        <AddEditModal
          calledFrom={modalData.calledFrom}
          url={modalData.url}
          type={modalData.type}
          data={modalData.data}
          isLoading={isLoadingSaveData}
          isModalVisible={modalData.isOpen}
          handleCancel={handleCancel}
          headerModalLabel={messages["master.addCategoryTitleModal"] as string}
          formProps={{
            label1: messages["master.departmentCodeLabelFormModal"] as string,
            label2: messages["master.categoryNameLabelFormModal"] as string,
            placeholder1: messages[
              "master.addDepartmentPlaceholderCodeModal"
            ] as string,
            placeholder2: messages[
              "master.addCategoryPlaceholderNameModal"
            ] as string,
          }}
        />
      ) : null}
    </>
  );
};

export default MasterCategory;
