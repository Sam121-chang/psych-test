// app/questions.ts

export type Question = {
  id: number;
  text: string;
  dimension: "A" | "B" | "C" | "D" | "E";
};

export const questions: Question[] = [
  // A 维度（安全锚定）
  { id: 1, text: "我需要提前知道事情的大致方向和结果，否则会感到不安。", dimension: "A" },
  { id: 2, text: "当环境变化太快时，我的压力会明显上升。", dimension: "A" },
  { id: 3, text: "我很重视“可控性”，即便代价是减少新鲜感。", dimension: "A" },
  { id: 4, text: "如果他人的情绪不稳定，我会立刻提高警觉。", dimension: "A" },
  { id: 5, text: "我很看重明确的规则和边界。", dimension: "A" },
  { id: 6, text: "不确定时期，我会用大量信息收集来缓解焦虑。", dimension: "A" },
  { id: 7, text: "意外事件会显著影响我的情绪状态。", dimension: "A" },
  { id: 8, text: "当我无法预测未来几周的生活时，会感到不舒服。", dimension: "A" },
  { id: 9, text: "我对“被误解”特别敏感。", dimension: "A" },

  // B 维度（自我主宰）
  { id: 10, text: "我强烈希望由我自己决定人生道路。", dimension: "B" },
  { id: 11, text: "我不喜欢别人替我安排事情。", dimension: "B" },
  { id: 12, text: "当我感到被控制时，会立刻反感。", dimension: "B" },
  { id: 13, text: "我非常需要“主动感”，只有主动选择的事才有意义。", dimension: "B" },
  { id: 14, text: "我不喜欢依赖别人完成重要事情。", dimension: "B" },
  { id: 15, text: "面对限制，我会自动寻找突破或绕开方式。", dimension: "B" },
  { id: 16, text: "我希望在团队中拥有话语权。", dimension: "B" },
  { id: 17, text: "如果我觉得自己无能为力，我会很痛苦。", dimension: "B" },
  { id: 18, text: "“由我亲手塑造人生”对我意义极大。", dimension: "B" },

  // C 维度（情绪滋养）
  { id: 19, text: "我渴望有人真正理解我复杂的情绪。", dimension: "C" },
  { id: 20, text: "当我感到孤立时，会迅速陷入失落。", dimension: "C" },
  { id: 21, text: "我需要自己的情绪被看见、被接纳。", dimension: "C" },
  { id: 22, text: "与亲密的人发生矛盾会强烈影响我的状态。", dimension: "C" },
  { id: 23, text: "我对情感忽视特别敏感。", dimension: "C" },
  { id: 24, text: "如果没有稳定的情感支持，我很难保持安全感。", dimension: "C" },
  { id: 25, text: "当别人轻视我的感受，我会难受很久。", dimension: "C" },
  { id: 26, text: "我在关系中需要“情绪回应”。", dimension: "C" },
  { id: 27, text: "我希望自己在重要关系里是被重视的。", dimension: "C" },

  // D 维度（成就驱动）
  { id: 28, text: "我希望在同龄人中表现优于平均。", dimension: "D" },
  { id: 29, text: "完成困难任务会让我特别有存在感。", dimension: "D" },
  { id: 30, text: "我很难接受自己表现平庸。", dimension: "D" },
  { id: 31, text: "我会主动寻找挑战和竞争。", dimension: "D" },
  { id: 32, text: "我需要“做到更好”来确认自我价值。", dimension: "D" },
  { id: 33, text: "我不喜欢停滞或低效率的状态。", dimension: "D" },
  { id: 34, text: "当我没有明确目标时会不安。", dimension: "D" },
  { id: 35, text: "对我来说，成就感比享受更重要。", dimension: "D" },
  { id: 36, text: "我需要不断突破，才感觉自己活着。", dimension: "D" },

  // E 维度（意义指向）
  { id: 37, text: "我经常思考人生的长期方向与意义。", dimension: "E" },
  { id: 38, text: "如果一件事没有内在意义，我会缺乏动力。", dimension: "E" },
  { id: 39, text: "我希望自己的人生在大的历史或社会背景中有位置。", dimension: "E" },
  { id: 40, text: "当我没有精神目标时，会陷入虚无。", dimension: "E" },
  { id: 41, text: "我需要知道“我为什么在这里、要去哪里”。", dimension: "E" },
  { id: 42, text: "我对存在、价值、未来有深度兴趣。", dimension: "E" },
  { id: 43, text: "我不喜欢只围绕“生存和赚钱”的生活模式。", dimension: "E" },
  { id: 44, text: "我希望自己的行动可以产生长远影响。", dimension: "E" },
  { id: 45, text: "我需要一种足以支撑生命意义的精神框架。", dimension: "E" }
];
