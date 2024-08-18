"use client";

import { addUser } from "@/app/service/addUser";
import { getUsers } from "@/app/service/getUsers";
import { Button, Flex, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
};

export const LoginAndRegisterForm = () => {
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

    const users = await getUsers();
    const isExists = users.some(
      ({ username: _username, password: _password }) =>
        _username === username && _password === password
    );
    if (!isExists) {
      alert(`ユーザー名またはパスワードが異なります`);
      return;
    }

    alert(`ようこそ ${username} さん！`);
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
    router.push("/recipe");
  };
  return (
    <Form action="?" name="basic" autoComplete="off" form={form}>
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
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            ログイン
          </Button>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="default" htmlType="submit" onClick={handleRegister}>
            新規登録
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
