"use client";

import { User } from "@/app/api/users/types";
import { getUsers } from "@/app/service/getUsers";
import { useState } from "react";

export const GetUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const call = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const users = await getUsers();
    setUsers(users);
  };

  return (
    <div>
      <button onClick={call}>call</button>
      {users.map((row) => {
        const { name, id, password } = row;
        return (
          <div key={id}>
            <p>{name}</p>
            <p>{id}</p>
            <p>{password}</p>
          </div>
        );
      })}
    </div>
  );
};
