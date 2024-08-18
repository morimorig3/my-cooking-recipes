import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { User } from "./types";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  try {
    const results = await sql<User>`SELECT * FROM Users;`;
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
