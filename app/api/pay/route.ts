import { NextResponse } from "next/server";
import crypto from "crypto";

// 创建订单接口
export async function POST() {
  const appid = process.env.NEXT_PUBLIC_PAY_APPID!;
  const appsecret = process.env.PAY_SECRET!;
  const apiUrl = process.env.PAY_API!;

  // 创建订单号
  const out_trade_no = "order_" + Date.now();

  // 回调通知地址
  const notify_url = "https://psych-test-ox1s.vercel.app/api/notify";

  // 请求参数（迅虎支付 官方要求）
  const params: Record<string, string> = {
    version: "1.1",
    appid,
    type: "wechat",        // 你是 H5/扫码，用 wechat
    total_fee: "1",        // 单位：分，1分 = ¥0.01
    out_trade_no,
    notify_url,
    return_url: "https://psych-test-ox1s.vercel.app/result",
    nonce_str: Math.random().toString(36).substring(2),
    timestamp: Math.floor(Date.now() / 1000).toString()
  };

  // 生成签名（官方要求：ASCII 排序 + key=value 拼接 + secret）
  const signString = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&") + `&key=${appsecret}`;

  const sign = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
  params["sign"] = sign;

  // 发起请求
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
