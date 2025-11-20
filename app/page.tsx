"use client";

import { useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      // ① 记录点击
      await fetch("/api/click", { method: "POST" });

      // ② 弹一个提示（可以按需删除）
      alert("点击已记录，正在进入测评...");

      // ③ 跳转到真正的测试页
      window.location.href = "/test";

    } catch (err) {
      console.error("点击统计失败:", err);
      alert("网络异常，请稍后重试");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 36, fontWeight: 700 }}>心理需求结构测试</h1>

      <p style={{ fontSize: 20, marginTop: 10, color: "#555" }}>
        基于 9 维度结构模型 · 约 3-5 分钟 · 高可靠性测评
      </p>

      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          marginTop: 60,
          padding: "18px 40px",
          backgroundColor: "#1a73e8",
          border: "none",
          color: "#fff",
          fontSize: 24,
          borderRadius: 12,
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        }}
      >
        {loading ? "进入中..." : "开始测试（免费）"}
      </button>
    </div>
  );
}
