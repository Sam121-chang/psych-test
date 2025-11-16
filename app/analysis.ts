export type Scores = {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
};

export type AnalysisResult = {
  type: string;              // 核心结果名称（如：安全–情绪双核心型）
  cores: string[];           // 核心维度数组（如：["A","C"]）
  isBalanced: boolean;       // 是否均衡型
  levels: Record<string, "低" | "中" | "高">; // 各维度强度
};

// 映射维度名称
const dimNames: Record<string, string> = {
  A: "安全锚定",
  B: "自我主宰",
  C: "情绪滋养",
  D: "成就驱动",
  E: "意义指向",
};

// 计算强度等级
function level(score: number) {
  if (score <= 18) return "低";
  if (score <= 30) return "中";
  return "高";
}

// 主要分析逻辑
export function analyzeScores(scores: Scores): AnalysisResult {
  const dims = [
    { key: "A", score: scores.A },
    { key: "B", score: scores.B },
    { key: "C", score: scores.C },
    { key: "D", score: scores.D },
    { key: "E", score: scores.E },
  ].sort((a, b) => b.score - a.score);

  const maxScore = dims[0].score;
  const minScore = dims[4].score;

  const isBalanced = maxScore - minScore <= 8;

  // 均衡型
  if (isBalanced) {
    return {
      type: "均衡型心理需求结构",
      cores: [],
      isBalanced: true,
      levels: {
        A: level(scores.A),
        B: level(scores.B),
        C: level(scores.C),
        D: level(scores.D),
        E: level(scores.E),
      },
    };
  }

  // 找核心维度（score ≥ maxScore - 3）
  const cores = dims
    .filter((d) => d.score >= maxScore - 3)
    .map((d) => d.key);

  // 生成结果名称
  const coreNames = cores.map((c) => dimNames[c]).join("–");
  const typeName = `${coreNames}${cores.length === 1 ? "单核心型" : cores.length === 2 ? "双核心型" : "三核心型"}`;

  return {
    type: typeName,
    cores,
    isBalanced: false,
    levels: {
      A: level(scores.A),
      B: level(scores.B),
      C: level(scores.C),
      D: level(scores.D),
      E: level(scores.E),
    },
  };
}
