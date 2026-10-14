import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PricingCards } from "@/components/pricing-cards";
import {
  PricingWaitlistHint,
  WaitlistFormBridge,
} from "@/components/pricing-waitlist-hint";

export const metadata: Metadata = {
  title: "定价（草案）",
  description: "新词雷达草案档位与候补名单。支付已冻结，当前不可购卡。",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-[var(--teal)]">定价（草案）</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          先候补，暂不售卖
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          档位与价格仅作需求验证示意。支付通道已冻结：不会跳转结账，也不会扣款。主操作是加入候补名单。
        </p>
      </div>

      <Suspense fallback={null}>
        <PricingWaitlistHint />
      </Suspense>

      <div className="mt-12">
        <PricingCards />
      </div>

      <section
        id="waitlist"
        className="mt-16 grid gap-8 rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
            留下邮箱，开放时优先通知
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            也可以先看{" "}
            <Link
              href="/report/demo"
              className="font-medium text-[var(--teal)] underline-offset-4 hover:underline"
            >
              示例日报
            </Link>{" "}
            ，确认格式是否对你有用。
          </p>
        </div>
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-md bg-[var(--mist)]" />
          }
        >
          <WaitlistFormBridge />
        </Suspense>
      </section>

      <section className="mt-14 border-t border-[var(--line)] pt-10">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--ink)]">
          常见问题
        </h2>
        <dl className="mt-6 space-y-6">
          <div>
            <dt className="font-medium text-[var(--ink)]">现在能付款吗？</dt>
            <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              不能。支付已冻结，所有按钮只会带你去候补名单，不会发起任何扣款。
            </dd>
          </div>
          <div>
            <dt className="font-medium text-[var(--ink)]">日报从哪来？</dt>
            <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              Demo 使用站内烘焙样本，不接入 live 雷达或付费 AIsa。正式环境可把
              new-term-radar JSON 挂到数据目录（见 README）。
            </dd>
          </div>
          <div>
            <dt className="font-medium text-[var(--ink)]">价格是最终价吗？</dt>
            <dd className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
              否，仅为草案示意，正式开放售卖前可能调整。
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
