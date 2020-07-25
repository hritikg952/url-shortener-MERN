import React, { useState } from "react";
import "antd/dist/antd.css";

import { Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//importing endpoints
import { signup } from "../auth/helper/index";
const SignOut = () => {
  const [status, setStatus] = useState({
    success: false,
    error: {
      isError: false,
      message: "",
    },
  });
  const onSubmit = (values) => {
    signup(values)
      .then((data) => {
        if (data.status === 200) {
          setStatus({ ...status, success: true });
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

  const signupPage = () => {
    return (
      <div>
        <Form name="signup" className="login-form" onFinish={onSubmit}>
          <Form.Item name="name">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item name="lastname">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
            />
          </Form.Item>
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
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

  const successMessage = () => {
    if (status.success) {
      return (
        <Alert
          style={{ marginTop: "5px" }}
          message="Registered"
          type="success"
          showIcon
        />
      );
    }
  };

  return (
    <React.Fragment>
      {errorMessage()}
      {signupPage()}
      {successMessage()}
    </React.Fragment>
  );
};

export default SignOut;
