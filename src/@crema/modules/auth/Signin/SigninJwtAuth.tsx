import { Form, Input, Spin } from "antd";
import { useIntl } from "react-intl";

import { LoadingOutlined } from "@ant-design/icons";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useAuthMethod, useAuthUser } from "@crema/hooks/AuthHooks";
import {
  SignInButton,
  StyledSign,
  StyledSignContent,
  StyledSignForm,
} from "./index.styled";

const SignInJwtAuth = () => {
  const { signInUser } = useAuthMethod();
  const { isLoading } = useAuthUser();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const { messages } = useIntl();

  return (
    <StyledSign>
      <StyledSignContent>
        <StyledSignForm
          name="basic"
          initialValues={{
            remember: true,
            email: "12345",
            password: "admin",
          }}
          onFinish={signInUser}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            className="form-field"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder={messages["common.email"] as string} />
          </Form.Item>

          <Form.Item
            name="password"
            className="form-field"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              placeholder={messages["common.password"] as string}
            />
          </Form.Item>

          <div className="form-btn-field">
            <SignInButton type="primary" htmlType="submit" disabled={isLoading}>
              {isLoading ? (
                <Spin
                  size="small"
                  indicator={
                    <LoadingOutlined style={{ color: "white" }} spin />
                  }
                />
              ) : (
                <IntlMessages id="common.login" />
              )}
            </SignInButton>
          </div>
        </StyledSignForm>
      </StyledSignContent>
    </StyledSign>
  );
};

export default SignInJwtAuth;
