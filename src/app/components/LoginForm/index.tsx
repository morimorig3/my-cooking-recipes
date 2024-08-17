"use client";

import type { FormProps } from "antd";
import { Button, Flex, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
};

export const LoginForm = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      action="?"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="ユーザー名"
        name="username"
        rules={[{ required: true, message: "ユーザー名を入力してください" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="パスワード"
        name="password"
        rules={[{ required: true, message: "パスワードを入力してください" }]}
      >
        <Input.Password />
      </Form.Item>
      <Flex justify="center" gap={16}>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            ログイン
          </Button>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="default" htmlType="submit">
            新規登録
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
