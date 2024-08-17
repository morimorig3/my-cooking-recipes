import { User } from "@/app/api/users/types";
import { QueryResult } from "@vercel/postgres";

export const getUsers = async () => {
  try {
    const response = await fetch("/api/users");
    const data: {
      users: QueryResult<User>;
    } = await response.json();
    return data.users.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
