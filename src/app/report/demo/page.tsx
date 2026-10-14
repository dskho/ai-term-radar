import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ReportTable } from "@/components/report-table";
import { WaitlistForm } from "@/components/waitlist-form";
import { SAMPLE_REPORT } from "@/data/sample-report";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "示例日报",
  description: "AI 新词 SEO 雷达示例日报：优先布局、观察、跳过完整清单。",
};

export default function DemoReportPage() {
  const priority = SAMPLE_REPORT.terms.filter((t) => t.decision === "优先布局");
  const watch = SAMPLE_REPORT.terms.filter((t) => t.decision === "观察");
  const skip = SAMPLE_REPORT.terms.filter((t) => t.decision === "跳过");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="flex flex-col gap-6 border-b border-[var(--line)] pb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--teal)]">示例日报</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
            {SAMPLE_REPORT.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">
            报告日 {SAMPLE_REPORT.date} · 生成于 2026-03-28 07:30（UTC+8）。
            数据为虚构示意，用于演示产品形态。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#waitlist"
            className={cn(
              buttonVariants(),
              "bg-[var(--ink)] text-white hover:bg-[var(--ink-soft)]",
            )}
          >
            加入候补
          </Link>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-[var(--line)] bg-white",
            )}
          >
            查看定价
          </Link>
        </div>
      </div>

      <section className="grid gap-6 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--ink)]">
            今日摘要
          </h2>
          <p className="mt-3 leading-relaxed text-[var(--muted)]">
            {SAMPLE_REPORT.summary}
          </p>
          <p className="mt-4 rounded-lg border border-[var(--signal)]/40 bg-[var(--signal)]/15 px-4 py-3 text-sm leading-relaxed text-[var(--ink)]">
            <span className="font-semibold">亮点：</span>
            {SAMPLE_REPORT.highlight}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "优先布局", value: priority.length, hint: "建议抢词" },
            { label: "观察", value: watch.length, hint: "跟踪命名" },
            { label: "跳过", value: skip.length, hint: "暂不投入" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[var(--line)] bg-white p-4 text-center"
            >
              <p className="text-xs text-[var(--muted)]">{stat.label}</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{stat.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <ReportTable report={SAMPLE_REPORT} showWhy />
      </section>

      <section className="grid gap-8 border-t border-[var(--line)] py-12 lg:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--ink)]">
            方法说明
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
            {SAMPLE_REPORT.methodology.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[var(--muted)]">
            正式版将读取你自己的{" "}
            <code className="rounded bg-[var(--mist)] px-1.5 py-0.5">radar.json</code>{" "}
            输出；接入步骤见 README。
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--ink)]">
            想每天收到真实版本？
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            留下邮箱，开放推送时优先邀请。
          </p>
          <div className="mt-5">
            <WaitlistForm source="report-demo" compact />
          </div>
        </div>
      </section>
    </div>
  );
}
