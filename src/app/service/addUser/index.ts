import { User } from "@/app/api/users/types";
import { QueryResult } from "@vercel/postgres";

export const addUser = async (user: User) => {
  try {
    const response = await fetch(`/api/users/${user.username}`, {
      method: "POST",
      body: JSON.stringify(user),
    });

    const data: QueryResult<User> = await response.json();
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
