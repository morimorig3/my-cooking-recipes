"use client";

import { useState, useEffect } from "react";
import { getRecipes } from "../service/getRecipes";
import { Recipe } from "../api/recipes/types";
import { Button, Flex, Modal, Table, TableProps, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useAtom } from "jotai";
import { usernameAtom } from "../components/LoginAndRegisterForm";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function Recipe() {
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [username, setUsername] = useAtom(usernameAtom);
  const router = useRouter();

  const handleLogout = () => {
    setUsername("");
    router.push("/");
  };

  useEffect(() => {
    if (username) {
      getRecipes(username).then((data) => {
        setRecipes(data);
      });
    }
  }, [username]);

  useEffect(() => {
    if (!username) {
      router.push("/");
    }
  }, []);

  return (
    <main>
      <Flex vertical gap={16} style={{ padding: 24 }}>
        <Flex align="center" justify="space-between">
          <Title level={1} style={{ margin: 0, fontSize: 20 }}>
            {username}さん のレシピ一覧
          </Title>
          <Flex gap={8}>
            <Button type="primary">追加</Button>
            <Button type="default" onClick={handleLogout}>
              ログアウト
            </Button>
          </Flex>
        </Flex>
        <Table
          bordered
          columns={columns}
          dataSource={recipes}
          pagination={false}
        />
      </Flex>
    </main>
  );
}

const columns: TableProps<Recipe>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "URL",
    dataIndex: "url",
    key: "url",
    render: (url) => (
      <a target="_blank" rel="noopener">
        {url}
      </a>
    ),
  },
  {
    title: "Rank",
    key: "rank",
    dataIndex: "rank",
    render: (count) => (
      <>
        {Array.from({ length: Number(count) }).map(() => (
          <StarFilled style={{ color: "#FC0" }} />
        ))}
      </>
    ),
  },
];
