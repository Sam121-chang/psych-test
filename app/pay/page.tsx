"use client";

import { useState } from "react";

export default function PayPage() {
  const [payUrl, setPayUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function createOrder() {
    setLoading(true);

    const res = await fetch("/api/pay", {
      method: "POST",
      body: JSON.stringify({
        orderId: "order_" + Date.now(),
        amount: 1,
        body: "心理测试付费",
      }),
    });

    const json = await res.json();
    console.log(json);

    if (json.url) {
      setPayUrl(json.url);
    } else {
      alert("下单失败：" + JSON.stringify(json));
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>支付页面</h1>
      <p>支付金额：1元</p>

      <button
        onClick={createOrder}
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: 8,
        }}
      >
        {loading ? "创建订单中..." : "点击支付"}
      </button>

      {payUrl && (
        <div style={{ marginTop: 30 }}>
          <h2>请使用微信扫码支付</h2>
          <img src={payUrl} width={260} />
        </div>
      )}
    </div>
  );
}
