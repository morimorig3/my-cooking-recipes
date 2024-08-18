import { Recipe } from "@/app/api/recipes/types";
import { User } from "@/app/api/users/types";
import { QueryResult } from "@vercel/postgres";

export const getRecipes = async (user: User) => {
  try {
    const response = await fetch(`/api/recipes/${user.username}`);

    const data: QueryResult<Recipe> = await response.json();
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
