import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">精神需求结构测试</h1>
      <p className="text-gray-600 text-center mb-6">
        解锁完整测试＋深度分析结果
        <br />
        仅需 <span className="text-blue-600 font-bold">0.99 元</span>
      </p>

      <Link
        href="/pay"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        支付 0.99 元（开始测试）
      </Link>

      <p className="text-xs text-gray-400 mt-10">
        本测试仅用于心理结构参考，不构成诊断依据。
      </p>
    </div>
  );
}
