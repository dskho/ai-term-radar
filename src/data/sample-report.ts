export type SignalType =
  | "GitHub 爆发"
  | "HF 趋势"
  | "模型发布"
  | "产品上线"
  | "社区扩散";

export type Decision = "优先布局" | "观察" | "跳过";

export type RadarTerm = {
  id: string;
  term: string;
  aliases: string[];
  signal: SignalType;
  starsPerDay: number;
  momentum: number;
  firstSeen: string;
  sources: string[];
  why: string;
  seoAngle: string;
  decision: Decision;
  confidence: number;
};

export type DailyReport = {
  id: string;
  title: string;
  date: string;
  generatedAt: string;
  summary: string;
  highlight: string;
  terms: RadarTerm[];
  methodology: string[];
};

export const SAMPLE_REPORT: DailyReport = {
  id: "demo-2026-03-28",
  title: "AI 新词 SEO 雷达 · 示例日报",
  date: "2026-03-28",
  generatedAt: "2026-03-28T07:30:00+08:00",
  summary:
    "今日捕获 11 个候选新词：3 个建议优先布局域名/目录词条，5 个进入观察池，3 个信号偏弱建议跳过。优先项集中在创作工具族（*craft）与端侧 agent 硬件叙事。",
  highlight:
    "photocraft / wordcraft / filmcraft 同日同族爆发，适合抢占「AI *craft」矩阵词与中文译名落地页。",
  methodology: [
    "GitHub 24h stars 增速 + 新仓库破圈（排除 fork 噪声）",
    "Hugging Face trending / 新模型卡标题抽取",
    "社区短帖与 changelog 里的专有名词去重",
    "人工规则打分：可检索性、商业意图、重复命名风险",
  ],
  terms: [
    {
      id: "photocraft",
      term: "photocraft",
      aliases: ["PhotoCraft", "照片工艺 AI"],
      signal: "GitHub 爆发",
      starsPerDay: 842,
      momentum: 96,
      firstSeen: "2026-03-27",
      sources: ["github.com/demo/photocraft", "HN Show"],
      why: "图像编辑工作流仓库 24h 星标暴涨，中文圈尚未出现稳定译名落地页。",
      seoAngle: "抢占 photocraft / PhotoCraft AI 编辑器 长尾；可做对比页 vs Midjourney。",
      decision: "优先布局",
      confidence: 0.91,
    },
    {
      id: "wordcraft",
      term: "wordcraft",
      aliases: ["WordCraft", "词匠"],
      signal: "产品上线",
      starsPerDay: 510,
      momentum: 88,
      firstSeen: "2026-03-26",
      sources: ["Product Hunt", "github.com/demo/wordcraft"],
      why: "写作助手新产品与开源同名仓库同步放量，品牌词搜索尚处空白期。",
      seoAngle: "布局 wordcraft AI writing、WordCraft 评测；注意与旧 Google Wordcraft 消歧。",
      decision: "优先布局",
      confidence: 0.86,
    },
    {
      id: "filmcraft",
      term: "filmcraft",
      aliases: ["FilmCraft", "片场 AI"],
      signal: "社区扩散",
      starsPerDay: 376,
      momentum: 84,
      firstSeen: "2026-03-27",
      sources: ["X/Twitter 扩散", "Discord 开源群"],
      why: "与 photocraft/wordcraft 同族命名，短视频创作者圈快速传播。",
      seoAngle: "做 *craft 工具矩阵专题；中文「片场 AI」可抢先定义。",
      decision: "优先布局",
      confidence: 0.83,
    },
    {
      id: "esp32-iphone-agent",
      term: "esp32-iphone-agent",
      aliases: ["ESP32 iPhone Agent", "端侧手机 Agent"],
      signal: "GitHub 爆发",
      starsPerDay: 1204,
      momentum: 94,
      firstSeen: "2026-03-25",
      sources: ["github.com/demo/esp32-iphone-agent", "Hackaday"],
      why: "硬件 + iPhone 端侧 agent 教程仓库破圈，长尾教程流量可观。",
      seoAngle: "教程向 SEO：ESP32 iPhone Agent 搭建、硬件清单、故障排查。",
      decision: "观察",
      confidence: 0.78,
    },
    {
      id: "lfm2.5",
      term: "LFM2.5",
      aliases: ["Liquid LFM 2.5", "LFM-2.5"],
      signal: "模型发布",
      starsPerDay: 290,
      momentum: 81,
      firstSeen: "2026-03-28",
      sources: ["Hugging Face", "官方 blog"],
      why: "新一代小模型发布卡登上 HF 趋势，评测与量化词条尚稀缺。",
      seoAngle: "LFM2.5 评测、与 Qwen/Phi 对比、GGUF 下载指南。",
      decision: "观察",
      confidence: 0.8,
    },
    {
      id: "agentweave",
      term: "AgentWeave",
      aliases: ["agent-weave", "织网 Agent"],
      signal: "GitHub 爆发",
      starsPerDay: 455,
      momentum: 79,
      firstSeen: "2026-03-24",
      sources: ["github.com/demo/agentweave"],
      why: "多 Agent 编排框架星标加速，但命名与现有 weave 工具存在冲突风险。",
      seoAngle: "先观察品牌是否收敛；可占 AgentWeave 中文介绍页。",
      decision: "观察",
      confidence: 0.72,
    },
    {
      id: "tokenlake",
      term: "TokenLake",
      aliases: ["token-lake"],
      signal: "HF 趋势",
      starsPerDay: 188,
      momentum: 70,
      firstSeen: "2026-03-23",
      sources: ["HF Spaces", "Reddit r/LocalLLaMA"],
      why: "上下文缓存/token 池工具在本地部署社区讨论升温。",
      seoAngle: "TokenLake 是什么、本地 LLM 缓存优化；适合目录站词条。",
      decision: "观察",
      confidence: 0.68,
    },
    {
      id: "clipforge",
      term: "ClipForge",
      aliases: ["clip-forge"],
      signal: "产品上线",
      starsPerDay: 220,
      momentum: 66,
      firstSeen: "2026-03-22",
      sources: ["IndieHackers", "PH upcoming"],
      why: "短视频切片 SaaS 预热中，正式域名与中文品牌未定。",
      seoAngle: "ClipForge AI 剪辑；可做竞品页骨架等待上线。",
      decision: "观察",
      confidence: 0.64,
    },
    {
      id: "neuralbrew",
      term: "NeuralBrew",
      aliases: ["neural-brew"],
      signal: "社区扩散",
      starsPerDay: 95,
      momentum: 48,
      firstSeen: "2026-03-20",
      sources: ["小红书笔记", "即刻"],
      why: "营销向昵称扩散，缺少可验证产品实体，检索意图弱。",
      seoAngle: "暂不建议投入；易与饮料/消费品牌混淆。",
      decision: "跳过",
      confidence: 0.55,
    },
    {
      id: "promptvault-lite",
      term: "PromptVault Lite",
      aliases: ["promptvault-lite"],
      signal: "GitHub 爆发",
      starsPerDay: 140,
      momentum: 52,
      firstSeen: "2026-03-21",
      sources: ["github.com/demo/promptvault-lite"],
      why: "Prompt 管理类项目同质化严重，SEO 竞争已红海。",
      seoAngle: "除非有差异化矩阵，否则投入产出比偏低。",
      decision: "跳过",
      confidence: 0.61,
    },
    {
      id: "omni-scribe",
      term: "OmniScribe",
      aliases: ["omni-scribe", "万象速记"],
      signal: "HF 趋势",
      starsPerDay: 112,
      momentum: 45,
      firstSeen: "2026-03-19",
      sources: ["HF model card"],
      why: "语音转写模型小幅升温，名称与多家速记产品撞车。",
      seoAngle: "品牌词难独占，建议跳过纯词条布局。",
      decision: "跳过",
      confidence: 0.58,
    },
  ],
};

export const PRICING_TIERS = [
  {
    id: "free",
    name: "观察席",
    price: "¥0",
    period: "永久",
    blurb: "验证需求：看示例日报，加入候补名单。",
    features: [
      "完整示例日报（本站 Demo）",
      "候补名单优先通知",
      "产品路线图更新邮件",
    ],
    cta: "加入候补名单",
    highlighted: false,
  },
  {
    id: "pro",
    name: "雷达 Pro",
    price: "¥99",
    period: "/月",
    blurb: "给个人 SEO / 独立站运营者的每日早鸟词包（草案价，暂不售卖）。",
    features: [
      "每个工作日早 7:30 推送日报",
      "优先布局 / 观察 / 跳过 决策标注",
      "CSV 导出 + 历史归档 30 天",
      "邮件 + 网页双通道",
    ],
    cta: "加入候补名单",
    highlighted: true,
  },
  {
    id: "team",
    name: "雷达团队",
    price: "¥299",
    period: "/月",
    blurb: "给 AI 目录站、Newsletter 与内容团队（草案价，暂不售卖）。",
    features: [
      "含 Pro 全部能力",
      "最多 5 席座位",
      "Webhook / JSON feed",
      "自定义关注源权重（即将上线）",
    ],
    cta: "加入候补名单",
    highlighted: false,
  },
] as const;

export function decisionTone(decision: Decision): "priority" | "watch" | "skip" {
  switch (decision) {
    case "优先布局":
      return "priority";
    case "观察":
      return "watch";
    case "跳过":
      return "skip";
    default: {
      const _exhaustive: never = decision;
      return _exhaustive;
    }
  }
}
