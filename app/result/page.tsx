"use client";

import { useSearchParams } from "next/navigation";
import { analyzeScores } from "../analysis";
import { dimensionTexts } from "../dimensionTexts";

function Bar({ label, score }: { label: string; score: number }) {
  const percent = Math.round(((score - 9) / 36) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-blue-600 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const params = useSearchParams();

  const scores = {
    A: Number(params.get("A") || 0),
    B: Number(params.get("B") || 0),
    C: Number(params.get("C") || 0),
    D: Number(params.get("D") || 0),
    E: Number(params.get("E") || 0),
  };

  const result = analyzeScores(scores);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">测试结果报告</h1>

      {/* 主结果 */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          你的心理需求结构类型：
        </h2>

        <p className="text-2xl font-bold text-blue-800 mb-2">
          {result.type}
        </p>

        {result.isBalanced ? (
          <p className="text-blue-700">
            你的五项心理需求整体差异较小，呈现比较均衡的结构，在多数情境下能保持稳定的心理状态。
          </p>
        ) : (
          <p className="text-blue-700">
            你的核心心理需求集中在：
            {result.cores.map((c) => dimensionTexts[c].name).join("、")}
          </p>
        )}
      </div>

      {/* 横条图 */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">五维度得分分布</h2>

        <Bar label="A. 安全锚定" score={scores.A} />
        <Bar label="B. 自我主宰" score={scores.B} />
        <Bar label="C. 情绪滋养" score={scores.C} />
        <Bar label="D. 成就驱动" score={scores.D} />
        <Bar label="E. 意义指向" score={scores.E} />
      </div>

      {/* 维度分析 */}
      <h2 className="text-xl font-semibold mb-4">维度解析</h2>

      {(["A", "B", "C", "D", "E"] as const).map((key) => {
        const dim = dimensionTexts[key];
        const level = result.levels[key];

        return (
          <div key={key} className="mb-10 border-b pb-6">
            <h3 className="text-lg font-semibold mb-2">
              {dim.name}（{level}） 
            </h3>

            <p className="text-gray-700 mb-3">{dim.summary}</p>

            <div className="mb-3">
              <p className="font-medium text-green-700 mb-1">你的优势：</p>
              <ul className="list-disc ml-6 text-gray-700">
                {dim.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <p className="font-medium text-red-700 mb-1">可能的风险点：</p>
              <ul className="list-disc ml-6 text-gray-700">
                {dim.risks.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium text-blue-700 mb-1">建议：</p>
              <ul className="list-disc ml-6 text-gray-700">
                {dim.advice.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      {/* 免责声明 */}
      <div className="text-sm text-gray-600 mt-12 p-4 bg-gray-50 border rounded-lg">
        <p className="font-semibold mb-2">⚠️ 免责声明</p>
        <p>
          本测试基于自我报告问卷，仅用于帮助你理解自己的心理需求结构，
          不构成任何形式的医学诊断、心理治疗或专业心理评估。
        </p>
        <p className="mt-2">
          若你正经历持续的情绪困扰（如严重焦虑、抑郁、自伤念头等），
          请及时寻求专业心理咨询师或精神科医生的帮助。
        </p>
      </div>
    </div>
  );
}
