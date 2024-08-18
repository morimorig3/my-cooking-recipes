import { Recipe } from "@/app/api/recipes/types";
import { QueryResult } from "@vercel/postgres";

export const addRecipe = async (recipe: Recipe) => {
  try {
    const response = await fetch(`/api/recipes/${recipe.username}`, {
      method: "POST",
      body: JSON.stringify(recipe),
    });

    const data: QueryResult<Recipe> = await response.json();
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
