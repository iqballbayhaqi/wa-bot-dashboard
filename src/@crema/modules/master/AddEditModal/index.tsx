import React from "react";

import IntlMessages from "@crema/helpers/IntlMessages";
import { Form, Input, Row, Select, Spin } from "antd";
import { StyledAddCard, StyledBtn, StyledAddModal } from "../index.styled";
import { useIntl } from "react-intl";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import { saveMasterData } from "toolkit/actions";
import { RiCloseFill } from "react-icons/ri";

type AddEditModalProps = {
  isModalVisible: boolean;
  handleCancel: () => void;
  headerModalLabel: string;
  formProps: {
    label1: string;
    placeholder1: string;
    label2: string;
    placeholder2: string;
  };
  isLoading: boolean;
  url: string;
  type: "post" | "put";
  calledFrom: "department" | "category";
  data: { id: number; name: string; code?: string; departmentCode?: string };
};

const AddEditModal: React.FC<AddEditModalProps> = ({
  isModalVisible,
  handleCancel,
  headerModalLabel,
  formProps,
  isLoading,
  url,
  type,
  calledFrom,
  data,
}) => {
  const dispatch = useAppDispatch();
  const { masterDepartementList } = useAppSelector(({ master }) => master);

  const { messages } = useIntl();

  const handleSubmit = (values) => {
    dispatch(
      saveMasterData({
        url,
        method: type,
        payload: values,
        calledFrom,
      })
    );
  };

  return (
    <StyledAddModal
      destroyOnClose
      title={headerModalLabel}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<RiCloseFill />}
    >
      <StyledAddCard>
        <Form layout="vertical" onFinish={handleSubmit}>
          {calledFrom === "category" ? (
            <Form.Item
              initialValue={
                data
                  ? data.departmentCode
                  : masterDepartementList[0].departmentCode
              }
              name="departmentCode"
              label={formProps.label1}
              rules={[
                {
                  required: true,
                  message: messages["master.errorCodeFormDepartment"] as string,
                },
              ]}
            >
              <Select
                options={masterDepartementList.map((department) => ({
                  label: department.departmentName,
                  value: department.departmentCode,
                }))}
              />
            </Form.Item>
          ) : (
            <Form.Item
              initialValue={data?.code ?? ""}
              name="code"
              label={formProps.label1}
              rules={[
                {
                  required: true,
                  message: messages["master.errorCodeFormDepartment"] as string,
                },
              ]}
            >
              <Input placeholder={formProps.placeholder1} />
            </Form.Item>
          )}

          <Form.Item
            initialValue={data?.name ?? ""}
            name="name"
            label={formProps.label2}
            rules={[
              {
                required: true,
                message: messages["master.errorNameFormDepartment"] as string,
              },
            ]}
          >
            <Input placeholder={formProps.placeholder2} />
          </Form.Item>

          <Row justify="center">
            <Form.Item>
              <StyledBtn type="primary" htmlType="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spin
                    size="small"
                    indicator={
                      <LoadingOutlined style={{ color: "white" }} spin />
                    }
                  />
                ) : (
                  <IntlMessages id="master.addDepartmentButtonModal" />
                )}
              </StyledBtn>
            </Form.Item>
          </Row>
        </Form>
      </StyledAddCard>
    </StyledAddModal>
  );
};

export default AddEditModal;
