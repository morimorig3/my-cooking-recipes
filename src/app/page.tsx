import { LoginAndRegisterForm } from "./components/LoginAndRegisterForm";
import { Card, Flex } from "antd";

export default function Home() {
  return (
    <main>
      <Flex align="center" justify="center" style={{ minHeight: "100dvh" }}>
        <div>
          <Card title="ログイン" style={{ width: 300 }}>
            <LoginAndRegisterForm />
          </Card>
        </div>
      </Flex>
    </main>
  );
}
