import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "antd/dist/antd.css";

import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//importing endpoints
import { signin, authenticate } from "../auth/helper/index";
const SignIn = () => {
  const [status, setStatus] = useState({
    didRedirect: false,
    loading: false,
    error: {
      isError: false,
      message: "",
    },
  });

  const onSubmit = (values) => {
    signin(values)
      .then((data) => {
        if (data.status === 200) {
          authenticate(data.data, () => {
            setStatus({ ...status, didRedirect: true });
          });
        }
        if (data.response) {
          setStatus({
            ...status,
            didRedirect: false,
            error: { isError: true, message: data.response.data.message },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInPage = () => {
    return (
      <div>
        <Form name="login" className="login-form" onFinish={onSubmit}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const performRedirect = () => {
    if (status.didRedirect) {
      return <Redirect to="/main" />;
    }
  };

  const errorMessage = () => {
    if (status.error.isError) {
      return (
        <Alert
          style={{ marginBottom: "5px" }}
          message={status.error.message}
          type="error"
          showIcon
        />
      );
    }
  };
  return (
    <React.Fragment>
      {errorMessage()}
      {performRedirect()}
      {signInPage()}
    </React.Fragment>
  );
};

export default SignIn;
