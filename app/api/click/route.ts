import { NextResponse } from "next/server";

let count = 0; // 内存计数器（Vercel 可用）

export async function POST() {
  count++;

  return NextResponse.json({
    success: true,
    total: count,
  });
}
