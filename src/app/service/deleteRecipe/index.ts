import { Recipe } from "@/app/api/recipes/types";
import { QueryResult } from "@vercel/postgres";

export const deleteRecipe = async (name: String, username: string) => {
  try {
    const response = await fetch(`/api/recipes/${username}`, {
      method: "DELETE",
      body: JSON.stringify({ username, name }),
    });

    const data: QueryResult<Recipe> = await response.json();
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
