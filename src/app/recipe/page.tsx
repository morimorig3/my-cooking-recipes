"use client";

import { useState, useEffect } from "react";
import { getRecipes } from "../service/getRecipes";
import { Recipe } from "../api/recipes/types";
import { Button, Flex, Space, Table, TableProps, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";

const { Title } = Typography;

export default function Recipe() {
  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    getRecipes({
      username: "morishita",
      password: "morishita",
    }).then((data) => {
      setRecipes(data);
    });
  }, []);

  return (
    <main>
      <Flex vertical gap={16} style={{ padding: 24 }}>
        <Flex align="center" justify="space-between">
          <Title level={1} style={{ margin: 0, fontSize: 20 }}>
            レシピ一覧
          </Title>
          <Button type="primary">追加</Button>
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
