import React from "react";

import { LoadingOutlined } from "@ant-design/icons";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Col, Form, Input, Radio, Row, Select, Space, Spin } from "antd";
import { RiCloseFill } from "react-icons/ri";
import { useAppDispatch } from "toolkit/hooks";
import {
  StyledAddCard,
  StyledAddModal,
  StyledBtn,
  StyledSkeleton,
} from "../index.styled";

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
        {false ? (
          <StyledSkeleton active />
        ) : (
          <Form wrapperCol={{ span: 24 }}>
            <Form.Item label="Pesan" labelCol={{ span: 1 }}>
              <Input.TextArea rows={10} />
            </Form.Item>

            <Row>
              <Col span={1}>To:</Col>
              <Col span={23}>
                <Row>
                  <Col span={24}>
                    <Form.Item>
                      <Radio.Group style={{ width: "100%" }}>
                        <Row style={{ marginBottom: "8px" }}>
                          <Col>
                            <Radio value="user"> All User</Radio>
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
                              defaultValue={[]}
                              onChange={() => {}}
                              options={[]}
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
                              defaultValue={[]}
                              onChange={() => {}}
                              options={[]}
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
                              defaultValue={[]}
                              onChange={() => {}}
                              options={[]}
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
                disabled={false}
                onClick={() => {}}
              >
                {false ? (
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
