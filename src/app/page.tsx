import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PricingCards } from "@/components/pricing-cards";
import { ReportTable } from "@/components/report-table";
import { WaitlistForm } from "@/components/waitlist-form";
import { SAMPLE_REPORT } from "@/data/sample-report";
import { cn } from "@/lib/utils";

const AUDIENCE = [
  {
    title: "SEO / 独立站",
    body: "抢占模型名、产品名、仓库名的中英文落地页，比 Trends 更早半步。",
  },
  {
    title: "AI 目录站",
    body: "每日补全词条清单：优先布局、观察、跳过，减少无效上架。",
  },
  {
    title: "Newsletter 运营",
    body: "用可引用的信号源讲「今天该写谁」，降低选题拍脑袋成本。",
  },
] as const;

const VALUE_POINTS = [
  {
    title: "早于 Trends 的专有名词",
    body: "从 GitHub 爆发、HF 趋势与产品上线里抓「还没被搜爆」的名字。",
  },
  {
    title: "可执行决策，不是噪音列表",
    body: "每条标注优先布局 / 观察 / 跳过，并附 SEO 角度与置信度。",
  },
  {
    title: "先候补，验证真实需求",
    body: "当前只收集候补名单，不开放购卡或在线支付。正式推送开放时优先通知。",
  },
] as const;

export default function HomePage() {
  const priorityCount = SAMPLE_REPORT.terms.filter(
    (t) => t.decision === "优先布局",
  ).length;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="hero-radar" aria-hidden>
          <div className="hero-radar__sweep" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-20 lg:pt-20">
          <div>
            <p className="animate-rise font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
              XINCI RADAR
            </p>
            <h1 className="animate-rise-delay mt-4 max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.12] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-[3.4rem]">
              新词雷达
            </h1>
            <p className="animate-rise-delay mt-3 max-w-xl text-xl font-medium text-[var(--ink-soft)] sm:text-2xl">
              AI 新词 SEO 雷达日报
            </p>
            <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              在 Google Trends 之前，捕获正在破圈的模型名、产品名与仓库名。
              给 SEO、AI 目录与 Newsletter 的每日可执行词表。
            </p>
            <div className="animate-rise-delay-2 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#waitlist"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 bg-[var(--ink)] px-6 text-[var(--paper)] hover:bg-[var(--ink-soft)]",
                )}
              >
                加入候补名单
              </Link>
              <Link
                href="/report/demo"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-12 border-[var(--line)] bg-white/70 px-6",
                )}
              >
                打开示例日报
              </Link>
            </div>
          </div>

          <aside className="animate-rise-delay-2 relative rounded-2xl border border-[var(--line)] bg-white/80 p-5 shadow-[0_24px_60px_-40px_rgba(11,42,50,0.45)] backdrop-blur-sm sm:p-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
              <span className="signal-dot inline-block h-2 w-2 rounded-full bg-[var(--teal)]" />
              今日示例快照 · {SAMPLE_REPORT.date}
            </div>
            <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
              {priorityCount} 个优先布局
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {SAMPLE_REPORT.highlight}
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-5 text-center">
              <div>
                <dt className="text-xs text-[var(--muted)]">候选词</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {SAMPLE_REPORT.terms.length}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)]">观察</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {
                    SAMPLE_REPORT.terms.filter((t) => t.decision === "观察")
                      .length
                  }
                </dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--muted)]">跳过</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {
                    SAMPLE_REPORT.terms.filter((t) => t.decision === "跳过")
                      .length
                  }
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section id="audience" className="border-t border-[var(--line)]/80 bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-medium text-[var(--teal)]">适合谁</p>
          <h2 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
            靠「早知道名字」做事的人
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            不是又一份 AI 资讯摘要，而是可抢词、可上架、可选题的专有名词雷达。
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {AUDIENCE.map((item) => (
              <div key={item.title} className="border-l-2 border-[var(--signal)] pl-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--teal)]">示例看板</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
              今天可能会让你抢先布局的词
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--muted)]">
              下列为烘焙进站的虚构示意数据（灵感来自近期破圈命名形态），不依赖 AIsa / GitHub Token。
            </p>
          </div>
          <Link
            href="/report/demo"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-[var(--line)] bg-white",
            )}
          >
            完整日报页
          </Link>
        </div>
        <ReportTable report={SAMPLE_REPORT} compact />
      </section>

      <section className="border-y border-[var(--line)]/80 bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3">
          {VALUE_POINTS.map((item, index) => (
            <div key={item.title}>
              <p className="font-[family-name:var(--font-display)] text-sm text-[var(--signal)]">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-[var(--teal)]">草案定价</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
            先加入候补名单
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
            需求验证阶段：免费看 Demo，留下邮箱。下方价格仅为草案示意，支付已冻结，不会扣款。
          </p>
        </div>
        <PricingCards />
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          需要完整对照？查看{" "}
          <Link href="/pricing" className="font-medium text-[var(--teal)] underline-offset-4 hover:underline">
            定价页
          </Link>
          。
        </p>
      </section>

      <section
        id="waitlist"
        className="border-t border-[var(--line)] bg-white/70"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-[var(--teal)]">候补名单</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
              正式日报开放时，优先通知你
            </h2>
            <p className="mt-3 text-[var(--muted)]">
              留下工作邮箱。Demo 模式写入本仓库{" "}
              <code className="rounded bg-[var(--mist)] px-1.5 py-0.5 text-sm">
                data/waitlist.jsonl
              </code>
              ；上线后可改接 Formspree、Resend 或自有 CRM。
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6">
            <WaitlistForm source="landing" />
          </div>
        </div>
      </section>
    </>
  );
}
