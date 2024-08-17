import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { User } from "../types";

export async function GET() {
  try {
    const users = await sql<User>`SELECT * FROM Users;`;
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { username = "", password = "" } = await request.json();
  try {
    if (!username || !password)
      throw new Error("Name and Id and Password required");
    /**
     * VercelはVercel Postgresに送られる全てのクエリを実行前にSanitizeしてくれるため文字列を直接埋め込む
     * https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections
     */
    await sql`INSERT INTO Users (username, password) VALUES (${username}, ${password});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql<User>`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const users = await sql<User>`SELECT * FROM Users;`;
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
