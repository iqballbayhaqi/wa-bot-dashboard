import React, { useEffect } from "react";

import IntlMessages from "@crema/helpers/IntlMessages";
import { Form, Input, Row, Select, Spin } from "antd";
import {
  StyledAddCard,
  StyledBtn,
  StyledAddModal,
  StyledSkeleton,
} from "../index.styled";
import { useIntl } from "react-intl";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import {
  getMasterCategoryList,
  getMasterDepartementList,
  getTicketList,
  moveTicket,
} from "toolkit/actions";
import { RiCloseFill } from "react-icons/ri";

type AddEditModalProps = {
  isModalVisible: boolean;
  handleCancel: () => void;
  data: {
    id: number;
    departmentId: string | number;
    categoryId: string | number;
    issue: string;
    ticketNumber: string;
  };
};

const AddEditModal: React.FC<AddEditModalProps> = ({
  isModalVisible,
  handleCancel,
  data,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const {
    masterDepartementList,
    masterCategoryList,
    isLoadingMasterCategory,
    isLoadingMasterDepartement,
  } = useAppSelector(({ master }) => master);

  const { isLoadingSaveTicket, isSuccessSaveTicket } = useAppSelector(
    ({ ticket }) => ticket
  );

  const { messages } = useIntl();

  const handleSubmit = (values) => {
    dispatch(
      moveTicket({
        id: data.id,
        categoryId: values.categoryId,
        departmentId: values.departmentId,
      })
    );
  };

  const departementValue = Form.useWatch("departmentId", form);

  const filterCategory =
    masterCategoryList?.filter((category) => {
      const getDepartment =
        masterDepartementList?.filter(
          (department) => department.id === departementValue
        ) ?? [];

      return category.departmentCode === getDepartment[0]?.departmentCode;
    }) ?? [];

  useEffect(() => {
    dispatch(getMasterDepartementList());
    dispatch(getMasterCategoryList());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccessSaveTicket) {
      dispatch(getTicketList());
      handleCancel();
    }
  }, [isSuccessSaveTicket, dispatch, handleCancel]);

  return (
    <StyledAddModal
      destroyOnClose
      title={messages["ticket.formHeaderLabel"] as string}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<RiCloseFill />}
    >
      <StyledAddCard>
        {isLoadingMasterCategory || isLoadingMasterDepartement ? (
          <StyledSkeleton active />
        ) : (
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              initialValue={data.ticketNumber ?? ""}
              name="ticketNumber"
              label={messages["ticket.formIssueTicketLabel"] as string}
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              initialValue={data?.issue ?? ""}
              name="issue"
              label={messages["ticket.formIssueLabel"] as string}
            >
              <Input.TextArea rows={4} readOnly />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              initialValue={data?.departmentId ?? ""}
              name="departmentId"
              label={messages["ticket.formDepartmentLabel"] as string}
              rules={[
                {
                  required: true,
                  message: "kolom departemen tidak boleh kosong",
                },
              ]}
            >
              <Select
                options={masterDepartementList?.map((department) => ({
                  label: department.departmentName,
                  value: department.id,
                }))}
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              initialValue={data?.categoryId ?? ""}
              name="categoryId"
              label={messages["ticket.formCategoryLabel"] as string}
              rules={[
                {
                  required: true,
                  message: "Kolom kategori tidak boleh kosong",
                },
              ]}
            >
              <Select
                options={filterCategory?.map((category) => ({
                  label: category.categoryName,
                  value: category.id,
                }))}
              />
            </Form.Item>

            <Row justify="center">
              <Form.Item>
                <StyledBtn
                  type="primary"
                  htmlType="submit"
                  disabled={isLoadingSaveTicket}
                >
                  {isLoadingSaveTicket ? (
                    <Spin
                      size="small"
                      indicator={
                        <LoadingOutlined style={{ color: "white" }} spin />
                      }
                    />
                  ) : (
                    <IntlMessages id="ticket.formSaveButtonLabel" />
                  )}
                </StyledBtn>
              </Form.Item>
            </Row>
          </Form>
        )}
      </StyledAddCard>
    </StyledAddModal>
  );
};

export default AddEditModal;
