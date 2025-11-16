import { NextResponse } from "next/server";

const APPID = "201906175210";
const APPSECRET = "ded9fb4f157ce3665cb13cd8fd2f2365";
const API_URL = "https://api.xunhupay.com/payment/do.html";

export async function POST(req: Request) {
  try {
    const { orderId, amount, body } = await req.json();

    const params = {
      appid: APPID,
      appsecret: APPSECRET,
      version: "1.1",
      trade_order_id: orderId,
      total_fee: amount,
      title: body,
      notify_url: `${process.env.NEXT_PUBLIC_DOMAIN}/api/pay/notify`,
      return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/result`,
      type: "wechat",
    };

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
