"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../questions";

type Answers = { [key: number]: number };

export default function TestPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(true);

  // 检查支付
  useEffect(() => {
    const token = localStorage.getItem("paid_token");
    if (!token) {
      router.push("/pay");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="p-6">加载中...</div>;

  // 更新答案
  const handleSelect = (qid: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  // 是否全部答完
  const isCompleted = Object.keys(answers).length === questions.length;

  // 提交测试
  const handleSubmit = () => {
    if (!isCompleted) return;

    let scoreA = 0,
      scoreB = 0,
      scoreC = 0,
      scoreD = 0,
      scoreE = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (!selected) return;

      if (q.dimension === "A") scoreA += selected;
      if (q.dimension === "B") scoreB += selected;
      if (q.dimension === "C") scoreC += selected;
      if (q.dimension === "D") scoreD += selected;
      if (q.dimension === "E") scoreE += selected;
    });

    router.push(
      `/result?A=${scoreA}&B=${scoreB}&C=${scoreC}&D=${scoreD}&E=${scoreE}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ⭐⭐⭐ 测试说明提示框（新增） ⭐⭐⭐ */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6 text-sm leading-relaxed">
        <p className="font-medium mb-2">📌 测试说明（作答前请先阅读）</p>
        <p>
          本测试共 45 道题，请根据
          <strong>你真实的、日常的、稳定的感受</strong>
          来评分。每题请选择 1–5 分：
        </p>

        <ul className="list-disc ml-6 mt-2 text-gray-700">
          <li>1 分 = 完全不符合</li>
          <li>2 分 = 不太符合</li>
          <li>3 分 = 一般</li>
          <li>4 分 = 比较符合</li>
          <li>5 分 = 非常符合</li>
        </ul>

        <p className="mt-2">
          请尽量依照<strong>第一反应</strong>作答，不需要反复斟酌或比较。
        </p>
      </div>

      {/* 标题 */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        精神需求结构测试（共 45 题）
      </h1>

      {/* 题目渲染 */}
      {questions.map((q) => (
        <div key={q.id} className="mb-6 border-b pb-4">
          <p className="font-medium mb-2">
            {q.id}. {q.text}
          </p>

          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleSelect(q.id, num)}
                className={`px-4 py-2 rounded-md border ${
                  answers[q.id] === num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 提交按钮 */}
      <button
        disabled={!isCompleted}
        onClick={handleSubmit}
        className={`w-full mt-8 py-3 rounded-lg text-white text-lg font-medium ${
          isCompleted ? "bg-blue-600" : "bg-gray-400"
        }`}
      >
        {isCompleted ? "提交测试" : "请完成全部题目后提交"}
      </button>
    </div>
  );
}
