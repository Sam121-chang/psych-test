"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PayPage() {
  const router = useRouter();
  const [paid, setPaid] = useState(false);

  // 模拟支付逻辑
  const handlePay = () => {
    setPaid(true);

    // 假设支付成功 → 存储访问凭证
    localStorage.setItem("paid_token", "ALLOW_ACCESS");

    // 1 秒后跳转到测试页面
    setTimeout(() => {
      router.push("/test");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        精神需求结构测试
      </h1>

      <p className="text-gray-600 mb-8 text-center">
        解锁完整测试 + 深度分析结果  
        <br />仅需 <span className="font-bold text-blue-600">0.99 元</span>
      </p>

      {!paid ? (
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={handlePay}
        >
          支付 0.99 元（模拟支付）
        </button>
      ) : (
        <p className="text-green-600 text-lg font-medium">
          支付成功！正在跳转到测试页面...
        </p>
      )}
    </div>
  );
}
