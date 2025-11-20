"use client";

import { useState } from "react";

export default function PayPage() {
  const [loading, setLoading] = useState(false);

  // ⭐ 新增：点击统计函数
  async function recordClick() {
    try {
      await fetch("/api/click", { method: "POST" });
      // 不需要处理返回数据，只是记录次数
    } catch (e) {
      console.error("记录点击失败：", e);
    }
  }

  // ⭐ 你的创建订单函数（保留）
  const createOrder = async () => {
    setLoading(true);

    // 第一步：记录点击
    await recordClick();

    // 第二步：执行原来的内容（不会跳转付款，因为你取消收费制了）
    alert("已记录点击，这里本来是创建订单逻辑，现在已取消收费功能。");

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
        {loading ? "创建订单中…" : "立即测试（记录点击）"}
      </button>
    </div>
  );
}
