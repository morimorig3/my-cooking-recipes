import { Recipe } from "@/app/api/recipes/types";
import { QueryResult } from "@vercel/postgres";

export const getRecipes = async (username: string) => {
  try {
    const response = await fetch(`/api/recipes/${username}`);

    const data: QueryResult<Recipe> = await response.json();
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
