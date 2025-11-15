"use client";

import { useEffect, useState } from "react";
import { analyzeScores } from "../analysis";
import { dimensionTexts } from "../dimensionTexts";

export default function ResultPage() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("test_result");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        没有找到测试结果，请先完成测试。
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        你的精神需求结构分析结果
      </h1>

      {/* 核心需求 */}
      <div className="p-4 bg-blue-50 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2">核心心理需求</h2>
        {result.cores.length > 0 ? (
          <p className="text-blue-700">
            你的核心心理需求集中在：
            {result.cores
              .map(
                (c: string) =>
                  dimensionTexts[c as keyof typeof dimensionTexts].name
              )
              .join("、")}
          </p>
        ) : (
          <p className="text-gray-600">未检测到明显的核心需求。</p>
        )}
      </div>

      {/* 次级需求 */}
      {result.secondary.length > 0 && (
        <div className="p-4 bg-green-50 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-2">次级心理需求</h2>
          <p className="text-green-700">
            次级需求包括：
            {result.secondary
              .map(
                (p: string) =>
                  dimensionTexts[p as keyof typeof dimensionTexts].name
              )
              .join("、")}
          </p>
        </div>
      )}

      {/* 均衡者 */}
      {result.cores.length === 0 && result.secondary.length === 0 && (
        <div className="p-4 bg-purple-50 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-2">均衡型人格</h2>
          <p className="text-purple-700">
            你在五个维度上的得分较为均匀，是典型的「多中心均衡型」。你具有多元心理需求，不容易被单一价值体系限制。
          </p>
        </div>
      )}

      {/* 图表（横向柱状图） */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">各维度得分</h2>
        {Object.entries(result.dimensionScores).map(([dim, score]) => (
          <div key={dim} className="mb-3">
            <p className="font-medium mb-1">{dim}</p>
            <div className="w-full bg-gray-200 h-3 rounded">
              <div
                className="bg-blue-500 h-3 rounded"
                style={{ width: `${(score / 45) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">得分：{score}</p>
          </div>
        ))}
      </div>

      {/* 各维度详细解读 */}
      <div>
        <h2 className="text-xl font-bold mb-4">详细解读</h2>

        {Object.keys(dimensionTexts).map((key) => {
          const dim = key as keyof typeof dimensionTexts;
          const info = dimensionTexts[dim];
          const score = result.dimensionScores[dim];

          return (
            <div key={dim} className="p-4 bg-gray-50 rounded-lg mb-6">
              <h3 className="text-lg font-bold mb-2">
                {info.name}（得分：{score}）
              </h3>

              <p className="text-gray-700 mb-3">{info.summary}</p>

              <div className="mb-2">
                <p className="font-semibold">优势：</p>
                <ul className="list-disc pl-6 text-gray-700">
                  {info.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-2">
                <p className="font-semibold">潜在风险：</p>
                <ul className="list-disc pl-6 text-gray-700">
                  {info.risks.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold">建议：</p>
                <ul className="list-disc pl-6 text-gray-700">
                  {info.advice.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-gray-500 text-sm mt-10">
        * 免责声明：本测试仅用于自我探索，不构成任何专业心理诊断。请根据自身情况理性解读。
      </p>
    </div>
  );
}
