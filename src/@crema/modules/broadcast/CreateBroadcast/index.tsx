import React, { useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Col, Form, Input, Radio, Row, Select, Space, Spin } from "antd";
import { RiCloseFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";
import {
  StyledAddCard,
  StyledAddModal,
  StyledBtn,
  StyledSkeleton,
} from "../index.styled";
import {
  getMasterCategoryList,
  getMasterDepartementList,
} from "toolkit/actions";
import { onGetContacts, onSendBroadcast } from "toolkit/actions/Broadcast";

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

const CreateBroadcastModal: React.FC<AddEditModalProps> = ({
  isModalVisible,
  handleCancel,
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [selectedList, setSelectedList] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const {
    masterCategoryList,
    masterDepartementList,
    isLoadingMasterCategory,
    isLoadingMasterDepartement,
  } = useAppSelector(({ master }) => master);

  const { contacts, isLoadingContact, isLoadingSendBroadcast } = useAppSelector(
    ({ broadcast }) => broadcast
  );

  const handleSubmit = () => {
    const payload = {
      title,
      msg: message,
      type: selectedRadio,
      selected:
        selectedRadio === "all"
          ? contacts.map((contact) => contact.phoneNumber)
          : selectedList,
    };
    dispatch(onSendBroadcast(payload));
  };

  useEffect(() => {
    dispatch(getMasterCategoryList());
    dispatch(getMasterDepartementList());
    dispatch(onGetContacts());
  }, [dispatch]);

  return (
    <StyledAddModal
      destroyOnClose
      title={"Buat Broadcast"}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closeIcon={<RiCloseFill />}
      width={1000}
    >
      <StyledAddCard>
        {isLoadingMasterCategory &&
        isLoadingMasterDepartement &&
        isLoadingContact ? (
          <StyledSkeleton active />
        ) : (
          <Form wrapperCol={{ span: 24 }}>
            <Form.Item label="Judul" labelCol={{ span: 1 }}>
              <Input
                onChange={(value) => {
                  setTitle(value.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Pesan" labelCol={{ span: 1 }}>
              <Input.TextArea
                rows={10}
                onChange={(value) => {
                  setMessage(value.target.value);
                }}
              />
            </Form.Item>

            <Row>
              <Col span={1}>To:</Col>
              <Col span={23}>
                <Row>
                  <Col span={24}>
                    <Form.Item>
                      <Radio.Group
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          setSelectedRadio(value.target.value);
                          setSelectedList([]);
                        }}
                        value={selectedRadio}
                      >
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            <Radio value="all"> All User</Radio>
                          </Col>
                        </Row>

                        <Row style={{ marginBottom: "8px" }}>
                          <Col span={3}>
                            <Radio value="department"> Department</Radio>
                          </Col>
                          <Col span={10}>
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select"
                              value={
                                selectedRadio === "department"
                                  ? selectedList
                                  : []
                              }
                              onChange={(value) => {
                                setSelectedList([...value]);
                              }}
                              options={masterDepartementList.map(
                                (department) => ({
                                  label: department.departmentName,
                                  value: department.id,
                                })
                              )}
                            />
                          </Col>
                        </Row>

                        <Row style={{ marginBottom: "8px" }}>
                          <Col span={3}>
                            <Radio value="category"> Kategori</Radio>
                          </Col>
                          <Col span={10}>
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select"
                              value={
                                selectedRadio === "category" ? selectedList : []
                              }
                              onChange={(value) => {
                                setSelectedList([...value]);
                              }}
                              options={masterCategoryList.map((category) => ({
                                label: category.categoryName,
                                value: category.id,
                              }))}
                            />
                          </Col>
                        </Row>

                        <Row style={{ marginBottom: "8px" }}>
                          <Col span={3}>
                            <Radio value="kontak"> Kontak</Radio>
                          </Col>
                          <Col span={10}>
                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: "100%" }}
                              placeholder="Please select"
                              value={
                                selectedRadio === "kontak" ? selectedList : []
                              }
                              onChange={(value) => {
                                setSelectedList([...value]);
                              }}
                              options={contacts.map((contact) => ({
                                label: contact.phoneNumber,
                                value: contact.phoneNumber,
                              }))}
                            />
                          </Col>
                        </Row>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Form.Item>
              <StyledBtn
                type="primary"
                htmlType="submit"
                disabled={isLoadingSendBroadcast}
                onClick={handleSubmit}
              >
                {isLoadingSendBroadcast ? (
                  <Spin
                    size="small"
                    indicator={
                      <LoadingOutlined style={{ color: "white" }} spin />
                    }
                  />
                ) : (
                  <IntlMessages id="common.sendMessage" />
                )}
              </StyledBtn>
            </Form.Item>
          </Form>
        )}
      </StyledAddCard>
    </StyledAddModal>
  );
};

export default CreateBroadcastModal;
