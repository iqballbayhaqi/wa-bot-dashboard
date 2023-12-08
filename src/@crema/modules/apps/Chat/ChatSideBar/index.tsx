import React, { useEffect, useState } from "react";
import { StyledChatSidebar, StyledChatSidebarTitle } from "./index.styled";
import { Divider, Form, Input, Row, Select, Skeleton, Spin } from "antd";
import { StyledBtn, StyledSkeleton } from "@crema/modules/master/index.styled";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";

import { useIntl } from "react-intl";
import { getNewTicketDetail, moveTicket } from "toolkit/actions";
import { LoadingOutlined } from "@ant-design/icons";
import { useInfoViewActionsContext } from "@crema/context/AppContextProvider/InfoViewContextProvider";

const ChatSideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { messages } = useIntl();
  const [form] = Form.useForm();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [selectedQuestion, setSelectedQuestion] = useState("");

  const {
    masterDepartementList,
    masterCategoryList,
    branchList,
    isLoadingMasterCategory,
    isLoadingMasterDepartement,
    isLoadingMasterBranch,
  } = useAppSelector(({ master }) => master);

  const {
    isLoadingDetailTicket,
    isLoadingNewDetailTicket,
    detailTicket,
    questionList,
    isLoadingSaveTicket,
    isSuccessSaveTicket,
  } = useAppSelector(({ ticket }) => ticket);

  const departementValue = Form.useWatch("departmentId", form);

  const filterCategory =
    masterCategoryList?.filter((category) => {
      const getDepartment =
        masterDepartementList?.filter(
          (department) => department.id === departementValue
        ) ?? [];

      return category.departmentCode === getDepartment[0]?.departmentCode;
    }) ?? [];

  const filterQuestionList =
    questionList?.map((question: any, index) => {
      if (index === 1 && !detailTicket?.department && !detailTicket?.category) {
        return {
          label: question?.label,
          value: question?.value,
          disabled: true,
        };
      } else {
        return question;
      }
    }) ?? [];

  useEffect(() => {
    if (isSuccessSaveTicket) {
      dispatch(getNewTicketDetail(detailTicket.id.toString()));
      infoViewActionsContext.showMessage("Data telah tersimpan");
    }
    dispatch({
      type: "RESET_SUCCESS_SAVE",
    });
  }, [isSuccessSaveTicket]);

  return (
    <StyledChatSidebar>
      {isLoadingDetailTicket || isLoadingNewDetailTicket ? (
        <StyledSkeleton active />
      ) : (
        <>
          <StyledChatSidebarTitle>Informasi</StyledChatSidebarTitle>
          <Form
            form={form}
            onFinish={(payload) => {
              dispatch(
                moveTicket({
                  id: detailTicket.id,
                  categoryId: payload.categoryId,
                  departmentId: payload.departmentId,
                })
              );
            }}
          >
            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              initialValue={detailTicket?.ticketNumber ?? ""}
              name="ticketNumber"
              label={messages["ticket.formIssueTicketLabel"] as string}
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 12 }}
              initialValue={detailTicket?.status ?? ""}
              name="status"
              label={"Status"}
            >
              <Input readOnly />
            </Form.Item>

            {isLoadingMasterDepartement ? (
              <Skeleton.Input active />
            ) : (
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValue={detailTicket?.department ?? ""}
                name="departmentId"
                label={messages["ticket.formDepartmentLabel"] as string}
                rules={[
                  {
                    required: true,
                    message: "Kolom Departement Tidak Boleh Kosong",
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
            )}

            {isLoadingMasterCategory ? (
              <Skeleton.Input active />
            ) : (
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValue={detailTicket?.category ?? ""}
                name="categoryId"
                label={messages["ticket.formCategoryLabel"] as string}
                rules={[
                  {
                    required: true,
                    message: "Kolom Departement Tidak Boleh Kosong",
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
            )}

            {isLoadingMasterBranch ? (
              <Skeleton.Input active />
            ) : (
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                initialValue={detailTicket?.branch ?? ""}
                name="branchId"
                label={"PT"}
                rules={[
                  {
                    required: true,
                    message: "Kolom PT Tidak Boleh Kosong",
                  },
                ]}
              >
                <Select
                  options={branchList?.map((category) => ({
                    label: category.branchName,
                    value: category.id,
                  }))}
                />
              </Form.Item>
            )}

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
                    "Simpan"
                  )}
                </StyledBtn>
              </Form.Item>
            </Row>
          </Form>

          <Divider />

          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label={"Pertanyaan FAQ"}
          >
            <Select
              onChange={(value) => {
                setSelectedQuestion(value);
              }}
              options={filterQuestionList}
            />
          </Form.Item>

          <Row justify="center">
            <Form.Item>
              <StyledBtn
                type="primary"
                onClick={() => {
                  dispatch({
                    type: "COPY_MESSAGE",
                    payload: selectedQuestion,
                  });
                }}
              >
                Upload
              </StyledBtn>
            </Form.Item>
          </Row>
        </>
      )}
    </StyledChatSidebar>
  );
};

export default ChatSideBar;
