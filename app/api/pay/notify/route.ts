import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log("支付回调数据：", data);

    // 虎皮椒要求返回 success
    return new Response("success");
  } catch (err) {
    return new Response("fail");
  }
}
