"use client";

import { useEffect, Fragment } from "react";
import { getRecipes } from "../service/getRecipes";
import type { Recipe } from "../api/recipes/types";
import { Button, Flex, Modal, Table, TableProps, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import {
  AddRecipeFormModal,
  isRecipeAddModalOpenAtom,
} from "../components/AddRecipeFormModal";
import { deleteRecipe } from "../service/deleteRecipe";
import { recipesAtom, usernameAtom } from "../jotai";

const { Title } = Typography;

export default function Recipe() {
  const [modal, contextHolder] = Modal.useModal();
  const [recipes, setRecipes] = useAtom(recipesAtom);
  const [username, setUsername] = useAtom(usernameAtom);
  const [_, setIsRecipeAddModalOpen] = useAtom(isRecipeAddModalOpenAtom);
  const router = useRouter();

  const createDeleteRecipeHandler =
    (name: string): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();
      modal.confirm({
        title: `${name} を削除してもよろしいでしょうか`,
        onOk: async () => {
          const newRecipes = await deleteRecipe(name, username);
          setRecipes(newRecipes);
        },
      });
    };

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
    {
      title: "削除",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Button
          danger
          type="text"
          onClick={createDeleteRecipeHandler(record.name)}
        >
          削除する
        </Button>
      ),
    },
  ];

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
      {contextHolder}
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
