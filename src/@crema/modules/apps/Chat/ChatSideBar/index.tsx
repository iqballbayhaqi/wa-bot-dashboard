import React, { useState } from "react";
import { StyledChatSidebar, StyledChatSidebarTitle } from "./index.styled";
import { Divider, Form, Input, Row, Select, Skeleton, Spin } from "antd";
import { StyledBtn, StyledSkeleton } from "@crema/modules/master/index.styled";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";

import { useIntl } from "react-intl";

const ChatSideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { messages } = useIntl();

  const [selectedQuestion, setSelectedQuestion] = useState("");

  const {
    masterDepartementList,
    masterCategoryList,
    isLoadingMasterCategory,
    isLoadingMasterDepartement,
  } = useAppSelector(({ master }) => master);

  const { isLoadingDetailTicket, detailTicket, questionList } = useAppSelector(
    ({ ticket }) => ticket
  );

  return (
    <StyledChatSidebar>
      {isLoadingDetailTicket ? (
        <StyledSkeleton active />
      ) : (
        <>
          <StyledChatSidebarTitle>Informasi</StyledChatSidebarTitle>
          <Form onValuesChange={(changes) => {}}>
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
                    message: messages[
                      "master.errorNameFormDepartment"
                    ] as string,
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
              >
                <Select
                  options={masterCategoryList?.map((category) => ({
                    label: category.categoryName,
                    value: category.id,
                  }))}
                />
              </Form.Item>
            )}

            <Divider />

            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              name="faq"
              label={"Pertanyaan FAQ"}
            >
              <Select
                onChange={(value) => {
                  setSelectedQuestion(value);
                }}
                options={questionList?.map((question) => ({
                  label: question.question,
                  value: question.question,
                }))}
              />
            </Form.Item>

            <Row justify="center">
              <Form.Item>
                <StyledBtn
                  type="primary"
                  onClick={() => {
                    console.log(selectedQuestion);
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
          </Form>
        </>
      )}
    </StyledChatSidebar>
  );
};

export default ChatSideBar;
