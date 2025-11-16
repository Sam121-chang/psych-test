export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const appid = process.env.NEXT_PUBLIC_PAY_APPID!;
  const secret = process.env.PAY_SECRET!;
  const api = process.env.PAY_API!;

  const trade_order_id = "order_" + Date.now();

  const params: Record<string, string> = {
    version: "11.1",
    appid,
    type: "wechat",
    payment: "wechat",
    type: "NATIVE",
    amount: "0.99",
    title: "精神需求结构测试",
    notify_url: "https://psych-test-ox1s.vercel.app/api/notify",
    return_url: "https://psych-test-ox1s.vercel.app/result",
    nonce_str: Math.random().toString(36).substring(2),
  };

  const signStr = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&") + `&key=${secret}`;

  params["sign"] = crypto.createHash("md5").update(signStr).digest("hex");

  const res = await fetch(api, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
