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
