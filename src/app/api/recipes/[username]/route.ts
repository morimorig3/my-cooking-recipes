import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";
import { Recipe } from "../types";
import { unstable_noStore as noStore } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  noStore();
  try {
    const result =
      await sql<Recipe>`SELECT * FROM Recipes WHERE username = ${params.username};`;
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const {
    username = "",
    name = "",
    category = "",
    url = "",
    rank = 0,
  } = await request.json();
  try {
    if (!username || !name) throw new Error("username and name required");
    /**
     * VercelはVercel Postgresに送られる全てのクエリを実行前にSanitizeしてくれるため文字列を直接埋め込む
     * https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections
     */
    await sql`INSERT INTO Recipes (username, name, category, url, rank) VALUES (${username}, ${name}, ${category}, ${url}, ${rank});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const results =
    await sql<Recipe>`SELECT * FROM Recipes WHERE username = ${username};`;
  return NextResponse.json(results, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { username = "", name = "" } = await request.json();
  try {
    if (!username || !name) throw new Error("username and name required");
    /**
     * VercelはVercel Postgresに送られる全てのクエリを実行前にSanitizeしてくれるため文字列を直接埋め込む
     * https://vercel.com/docs/storage/vercel-postgres/sdk#preventing-sql-injections
     */
    await sql`DELETE from Recipes WHERE username = ${username} AND name = ${name};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const results =
    await sql<Recipe>`SELECT * FROM Recipes WHERE username = ${username};`;
  return NextResponse.json(results, { status: 200 });
}
