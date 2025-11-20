"use client";

import { useState } from "react";

export default function PayPage() {
  const [loading, setLoading] = useState(false);

  const createOrder = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/pay", {
        method: "POST",
      });

      const data = await res.json();
      console.log("支付接口返回：", data);

      if (data?.code === 1 && data?.pay_url) {
        // 跳转到支付页
        window.location.href = data.pay_url;
      } else {
        alert("创建支付失败：" + (data?.msg || "未知错误"));
      }
    } catch (err) {
      console.error("调用支付接口失败：", err);
      alert("网络错误");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontSize: 24 }}>
      <div>支付页面</div>
      <div style={{ marginTop: 10 }}>支付金额：1元</div>

      <button
        onClick={createOrder}
        disabled={loading}
        style={{
          marginTop: 40,
          padding: "18px 32px",
          backgroundColor: "blue",
          color: "#fff",
          fontSize: 22,
          borderRadius: 12,
        }}
      >
        {loading ? "创建订单中…" : "立即支付"}
      </button>
    </div>
  );
}
