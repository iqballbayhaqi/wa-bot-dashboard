import React, { useEffect, useState } from "react";
import DepartementTable from "./DepartementTable";
import AppCard from "@crema/components/AppCard";
import { useIntl } from "react-intl";
import { DepartementDataType } from "@crema/types/models/master";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Button, Modal, Spin } from "antd";
import { StyledPlusOutlined, StyledSkeleton } from "../index.styled";
import AddEditModal from "../AddEditModal";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import { deleteMasterData } from "toolkit/actions";
import { LoadingOutlined } from "@ant-design/icons";

type MasterDepartementProps = {
  masterDepartementData: DepartementDataType[];
  isLoadingMasterDepartement: boolean;
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

const MasterDepartment: React.FC<MasterDepartementProps> = ({
  masterDepartementData,
  isLoadingMasterDepartement,
  isLoadingSaveData,
  isSucccessModifyMasterData,
}) => {
  const dispatch = useAppDispatch();
  const { isLoadingDeleteMasterDepartment, isSuccessDeleteMasterDepartment } =
    useAppSelector(({ master }) => master);

  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    calledFrom: undefined,
    url: undefined,
    type: undefined,
    data: undefined,
  });
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
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

    if (isSuccessDeleteMasterDepartment) {
      setModalDelete({
        isOpen: false,
        data: undefined,
      });
    }
  }, [isSucccessModifyMasterData, isSuccessDeleteMasterDepartment]);

  return (
    <>
      {isLoadingMasterDepartement ? (
        <AppCard>
          <StyledSkeleton active />
        </AppCard>
      ) : (
        <AppCard
          className="no-card-space-ltr-rtl"
          title={messages["master.departementTitleSection"] as string}
          extra={
            <Button
              ghost
              type="primary"
              icon={<StyledPlusOutlined style={{ marginRight: 8 }} />}
              onClick={() =>
                setModalData({
                  ...modalData,
                  calledFrom: "department",
                  url: "/department",
                  type: "post",
                  isOpen: true,
                })
              }
            >
              <IntlMessages id="master.addDepartement" />
            </Button>
          }
        >
          <DepartementTable
            departementData={masterDepartementData}
            onHandleAction={(action, data) => {
              switch (action) {
                case messages["common.actionUpdate"]:
                  setModalData({
                    isOpen: true,
                    calledFrom: "department",
                    url: `/department`,
                    type: "put",
                    data: {
                      id: data.id,
                      code: data.departmentCode,
                      name: data.departmentName,
                    },
                  });
                  break;
                case messages["common.actionDelete"]:
                  setModalDelete({
                    isOpen: true,
                    data: {
                      id: data.id,
                      url: `/department/${data.id}`,
                      calledFrom: "department",
                    },
                  });
                  break;
              }
            }}
          />
        </AppCard>
      )}

      {modalDelete.isOpen ? (
        <Modal
          title="Hapus"
          open={modalDelete.isOpen}
          onOk={() => {
            dispatch(
              deleteMasterData({
                url: modalDelete.data.url,
                calledFrom: modalDelete.data.calledFrom,
              })
            );
          }}
          onCancel={() =>
            setModalDelete({
              isOpen: false,
              data: undefined,
            })
          }
          okText={
            isLoadingDeleteMasterDepartment ? (
              <Spin
                size="small"
                indicator={<LoadingOutlined style={{ color: "white" }} spin />}
              />
            ) : (
              "Ya"
            )
          }
          cancelText="Tidak"
        >
          Apakah anda yakin ingin menghapus data ini ?
        </Modal>
      ) : null}

      {modalData.isOpen ? (
        <AddEditModal
          calledFrom={modalData.calledFrom}
          url={modalData.url}
          type={modalData.type}
          data={modalData.data}
          isLoading={isLoadingSaveData}
          isModalVisible={modalData.isOpen}
          handleCancel={handleCancel}
          headerModalLabel={
            messages["master.addDepartmentTitleModal"] as string
          }
          formProps={{
            label1: messages["master.departmentCodeLabelFormModal"] as string,
            label2: messages["master.departmentNameLabelFormModal"] as string,
            placeholder1: messages[
              "master.addDepartmentPlaceholderCodeModal"
            ] as string,
            placeholder2: messages[
              "master.addDepartmentPlaceholderNameModal"
            ] as string,
          }}
        />
      ) : null}
    </>
  );
};

export default MasterDepartment;
