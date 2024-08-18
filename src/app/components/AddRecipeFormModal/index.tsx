"use client";

import { recipesAtom } from "@/app/jotai";
import { addRecipe } from "@/app/service/addRecipe";
import { Form, Input, Modal } from "antd";
import { atom, useAtom } from "jotai";

type FieldType = {
  name?: string;
  category?: string;
  url?: string;
  rank?: number;
};

interface Props {
  username: string;
}

export const isRecipeAddModalOpenAtom = atom(false);

export const AddRecipeFormModal: React.FC<Props> = ({ username }) => {
  const [form] = Form.useForm<FieldType>();
  const [recipes, setRecipes] = useAtom(recipesAtom);
  const [isRecipeAddModalOpen, setIsRecipeAddModalOpen] = useAtom(
    isRecipeAddModalOpenAtom
  );

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    form.submit();
    const {
      name,
      category = "",
      url = "",
      rank = 0,
    } = await form.validateFields().catch();
    if (!name) return;

    const isExists = recipes.some(
      ({ name: existsRecipeName }) => existsRecipeName === name
    );
    if (isExists) {
      alert(`同名のレシピがすでに登録済みです`);
      return;
    }
    if (rank > 5) {
      alert(`お気に入りは0~5の値を入力してください`);
      return;
    }

    const newRecipes = await addRecipe({
      username,
      name,
      category,
      url,
      rank,
    });
    setRecipes(newRecipes);
    alert(`${name}を登録しました`);
    setIsRecipeAddModalOpen(false);
    form.setFieldsValue({
      name: undefined,
      category: undefined,
      url: undefined,
      rank: undefined,
    });
  };

  return (
    <Modal
      title="レシピを追加する"
      style={{ width: 640 }}
      open={isRecipeAddModalOpen}
      onOk={onSubmit}
      okText="追加する"
      cancelText="戻る"
      onCancel={() => setIsRecipeAddModalOpen(false)}
    >
      <Form name="basic" autoComplete="off" layout="vertical" form={form}>
        <Form.Item<FieldType>
          label="レシピ名"
          name="name"
          rules={[{ required: true, message: "レシピ名を入力してください" }]}
        >
          <Input placeholder="ハンバーグ定食" />
        </Form.Item>
        <Form.Item<FieldType> label="カテゴリ" name="category">
          <Input placeholder="洋食" />
        </Form.Item>
        <Form.Item<FieldType> label="URL" name="url">
          <Input placeholder="http://example.com/" />
        </Form.Item>
        <Form.Item<FieldType> label="お気に入り" name="rank">
          <Input placeholder="5 ※0~5の数値を入力してください" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
