import { Button } from "antd/es/radio";
import { AddUserForm } from "./components/AddUserForm";
import { GetUser } from "./components/GetUser";
import { LoginForm } from "./components/LoginForm";
import { Card, Flex } from "antd";

export default function Home() {
  return (
    <main>
      <Flex align="center" justify="center" style={{ minHeight: "100dvh" }}>
        <div>
          <Card title="ログイン" style={{ width: 300 }}>
            <LoginForm />
          </Card>
        </div>
      </Flex>
      {/* <GetUser />
      <AddUserForm /> */}
    </main>
  );
}
