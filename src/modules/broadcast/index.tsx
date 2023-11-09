import { LoadingOutlined } from "@ant-design/icons";
import AppCard from "@crema/components/AppCard";
import AppRowContainer from "@crema/components/AppRowContainer";
import IntlMessages from "@crema/helpers/IntlMessages";
import { StyledBtn } from "@crema/modules/master/index.styled";
import axios from "@crema/services/axios";
import { Col, Form, Input, Radio, Spin } from "antd";
import { useEffect } from "react";
import { onGetContacts } from "toolkit/actions/Broadcast";
import { useAppDispatch, useAppSelector } from "toolkit/hooks";

const Broadcast = () => {
  const dispatch = useAppDispatch();

  const { contacts, isLoadingContact } = useAppSelector(
    ({ broadcast }) => broadcast
  );

  console.log(contacts, isLoadingContact);

  useEffect(() => {
    dispatch(onGetContacts());
  }, []);

  return (
    <AppRowContainer delay={150}>
      <Col span={24}>
        <AppCard>
          <Form wrapperCol={{ span: 24 }}>
            <Form.Item label="Pesan" labelCol={{ span: 1 }}>
              <Input.TextArea rows={10} />
            </Form.Item>
            <Form.Item label="To" labelAlign="left" labelCol={{ span: 1 }}>
              <Radio.Group>
                <Radio value="user"> All User </Radio>
                <Radio value="department"> Department </Radio>
                <Radio value="kategori"> Kategori </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <StyledBtn
                type="primary"
                htmlType="submit"
                disabled={false}
                onClick={() => {
                  const token = localStorage.getItem("token");
                  const contact = contacts.map(
                    (contact) => contact.phoneNumber
                  );
                  axios.post(
                    "/broadcast",
                    {
                      msg: "test",
                      type: "all",
                      selected: contact,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                }}
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
        </AppCard>
      </Col>
    </AppRowContainer>
  );
};

export default Broadcast;
