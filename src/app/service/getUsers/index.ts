import { User } from "@/app/api/users/types";
import { QueryResult } from "@vercel/postgres";

export const getUsers = async () => {
  try {
    const response = await fetch("/api/users", { cache: "no-store" });
    const data: QueryResult<User> = await response.json();
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};
