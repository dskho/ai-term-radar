# 新词雷达 · AI 新词 SEO 雷达日报

面向 SEO / AI 目录站 / Newsletter 运营者的**可变现 MVP**：在 Google Trends 之前捕获破圈 AI 新词，提供每日「优先布局 / 观察 / 跳过」决策板。

本仓库是可部署的 Next.js Demo：**不依赖 AIsa、GitHub Token 或其它付费 API**。站内烘焙了 11 条虚构示意数据。

## 产品门禁（当前）

- **支付已冻结**：无 Stripe / Lemon 结账 CTA；`/api/checkout` 只返回候补跳转，**不会扣款**。
- **主 CTA** =「加入候补名单」。定价数字仅为草案示意。
- **无 live 雷达 / 付费 AIsa**：仅 Demo 样本数据。

## 功能一览

| 路径 | 说明 |
|------|------|
| `/` | 落地页：价值主张、受众、示例表、草案定价、候补名单 |
| `/report/demo` | 完整示例日报 |
| `/pricing` | 草案定价 + 候补（不可购卡） |
| `POST /api/waitlist` | 将邮箱 POST 到 `WAITLIST_WEBHOOK_URL`（必需；缺失或失败返回非 2xx） |
| `POST /api/checkout` | **冻结**：始终 `charged: false`，引导 `/#waitlist` |

## 本地运行

```bash
npm install
npm run build
npm start -- --port 43123
```

开发模式：

```bash
npm run dev -- --port 43123
```

打开 [http://127.0.0.1:43123](http://127.0.0.1:43123)。

## 环境变量

复制 `.env.example` 为 `.env.local`：

| 变量 | 必需 | 说明 |
|------|------|------|
| `WAITLIST_WEBHOOK_URL` | **是** | Formspree / Make / 自有 CRM 的 webhook URL。未设置或转发失败时 API 返回非 2xx |

候补名单**只**走 webhook。Obsidian 由 Grok Bot 从 Formspree 邮件写入，本应用不写 Google Drive / 不写本地 `waitlist.jsonl`。

`STRIPE_*` / `NEXT_PUBLIC_LEMON_*` 即使配置也会被忽略（支付冻结）。

## 部署到 Vercel

1. 将本仓库推送到 GitHub / Origin，并在 [Vercel](https://vercel.com) Import Project。
2. Framework Preset 选 **Next.js**；Build Command `npm run build`；Output 保持默认。
3. **必须**设置 `WAITLIST_WEBHOOK_URL`（例如 Formspree endpoint），否则候补提交会返回 500。
4. Deploy。

### 一键注意

- 中国大陆访问 Google Fonts 可能偏慢；生产可改为自托管 `Noto Sans SC` / `Space Grotesk`。
- `next.config.ts` 关闭了 `cacheComponents`，以保证候补表单客户端交互可水合。

## 接入真实雷达 JSON（后续）

把你现有的 `new-term-radar` 日产出导出为与 `data/radar.schema.json` 兼容的文件，例如：

```text
data/reports/2026-03-28.json
```

然后任选其一：

1. **静态替换 Demo**：用真实 JSON 覆盖/扩展 `src/data/sample-report.ts` 的导出（适合日更构建）。
2. **运行时读取**：在 `src/app/report/[date]/page.tsx` 中 `fs.readFile` 或 `fetch` 对象存储 URL（Vercel Blob / R2）。
3. **CI 同步**：GitHub Action 每天把雷达产物 commit 或上传到 Blob，再触发 redeploy。

最小字段见 `data/radar.schema.json`；Demo 行结构与 `SAMPLE_REPORT.terms` 一致。

## 支付解冻（仅正式售卖时）

当前刻意不接支付。解冻前需同时：

1. 改 `src/app/api/checkout/route.ts`，去掉 `frozen` 短路并接入 Stripe Checkout Session（或 Lemon URL）。
2. 改 `src/components/pricing-cards.tsx`，恢复付费按钮文案与结账跳转。
3. 更新落地页文案，明确可购卡。

在完成上述三步之前，**任何环境变量都无法让本站点扣款**。

## 技术栈

- Next.js App Router + TypeScript
- Tailwind CSS v4 + shadcn/ui
- 简体中文 UI

## 许可证

Demo 源码可按你的 grokbotSelfEarn 商业化需求自行定许可。示例数据为虚构，勿当作真实市场信号发布。
