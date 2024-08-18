"use client";

import { useState, useEffect, Fragment } from "react";
import { getRecipes } from "../service/getRecipes";
import { Recipe } from "../api/recipes/types";
import { Button, Card, Flex, Modal, Table, TableProps, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { atom, useAtom } from "jotai";
import { usernameAtom } from "../components/LoginAndRegisterForm";
import { useRouter } from "next/navigation";
import {
  AddRecipeFormModal,
  isRecipeAddModalOpenAtom,
} from "../components/AddRecipeFormModal";

const { Title } = Typography;

export const recipesAtom = atom<Recipe[]>([]);

export default function Recipe() {
  const [recipes, setRecipes] = useAtom(recipesAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [_, setIsRecipeAddModalOpen] = useAtom(isRecipeAddModalOpenAtom);
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
      <AddRecipeFormModal username={username} />
      <Flex vertical gap={16} style={{ padding: 24 }}>
        <Flex align="center" justify="space-between">
          <Title level={1} style={{ margin: 0, fontSize: 20 }}>
            {username}さん のレシピ一覧
          </Title>
          <Flex gap={8}>
            <Button
              type="primary"
              onClick={() => setIsRecipeAddModalOpen(true)}
            >
              追加
            </Button>
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
    render: (count, record) => (
      <Fragment>
        {Array.from({ length: Number(count) }).map((_, index) => (
          <StarFilled
            key={`${record.name}${record.rank}${index}`}
            style={{ color: "#FC0" }}
          />
        ))}
      </Fragment>
    ),
  },
];
