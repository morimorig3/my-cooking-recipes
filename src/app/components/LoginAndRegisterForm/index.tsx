"use client";

import { addUser } from "@/app/service/addUser";
import { getUsers } from "@/app/service/getUsers";
import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { usernameAtom } from "@/app/jotai";
import { Fragment, useState } from "react";

const { Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
};

export const LoginAndRegisterForm = () => {
  const [_, setUsername] = useAtom(usernameAtom);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm<FieldType>();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    form.submit();
    const { username, password } = await form.validateFields().catch();
    // どちらかが未入力
    if (!username || !password) return;

    setIsLoading(true);
    const users = await getUsers();
    const isExists = users.some(
      ({ username: _username, password: _password }) =>
        _username === username && _password === password
    );
    if (!isExists) {
      alert(`ユーザー名またはパスワードが異なります`);
      setIsLoading(false);
      return;
    }

    alert(`ようこそ ${username} さん！`);
    setUsername(username);
    router.push("/recipe");
  };
  const handleRegister: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    form.submit();
    const { username, password } = await form.validateFields().catch();
    // どちらかが未入力
    if (!username || !password) return;

    const users = await getUsers();
    const isExists = users.some(
      ({ username: _username }) => _username === username
    );
    if (isExists) {
      alert(`ユーザー名はすでに登録済みです`);
      return;
    }

    // 登録
    await addUser({
      username,
      password,
    });
    alert(`ようこそ ${username} さん！`);
    setUsername(username);
    router.push("/recipe");
  };

  return (
    <Form action="?" name="basic" autoComplete="off" form={form}>
      <Form.Item<FieldType>
        label="ユーザー名"
        name="username"
        rules={[{ required: true, message: "ユーザー名を入力してください" }]}
      >
        <Input placeholder="sampleuser" />
      </Form.Item>
      <Form.Item<FieldType>
        label="パスワード"
        name="password"
        rules={[{ required: true, message: "パスワードを入力してください" }]}
      >
        <Input.Password placeholder="samplepassword" />
      </Form.Item>
      <Flex justify="center" gap={16}>
        <Form.Item>
          <Button
            type="default"
            onClick={() => {
              form.setFieldsValue({
                username: "sampleuser",
                password: "samplepassword",
              });
            }}
          >
            サンプルでログイン
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleLogin}
            loading={isLoading}
          >
            ログイン
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit" onClick={handleRegister}>
            新規登録
          </Button>
        </Form.Item>
      </Flex>
      <Text type="secondary">
        ユーザ名: sampleuser パスワード： samplepassword
        でログインすることができます
      </Text>
    </Form>
  );
};
