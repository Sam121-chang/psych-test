import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST() {
  const appid = process.env.NEXT_PUBLIC_PAY_APPID!;
  const appsecret = process.env.PAY_SECRET!;
  const apiUrl = process.env.PAY_API!;

  // 订单号（随机）
  const out_trade_no = "order_" + Date.now();
  
  // 回调地址（记得换成你自己的！）
  const notify_url = "https://psych-test-ox1s.vercel.app/api/notify";

  const params: Record<string, string> = {
    appid,
    type: "wechat",   // 个人微信 H5 必须用 wechat
    total_fee: "1",   // 支付金额（单位：元）
    out_trade_no,
    notify_url,
    redirect_url: "https://psych-test-ox1s.vercel.app/result", 
    nonce_str: Math.random().toString(36).substring(2),
    timestamp: Math.floor(Date.now() / 1000).toString()
  };

  // 签名生成：ASCII排序 → 拼接 → 加 secret → md5
  const signString =
    Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join("&") + `&key=${appsecret}`;

  const sign = crypto.createHash("md5").update(signString).digest("hex").toUpperCase();
  params["sign"] = sign;

  // 发起请求
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });

  const data = await res.json();

  return NextResponse.json(data);
}
