"use client";

import { useSearchParams } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist-form";

export function PricingWaitlistHint() {
  const params = useSearchParams();
  const showWaitlistHint = params.get("waitlist") === "1";
  const tier = params.get("tier");
  const tierHint =
    tier === "team"
      ? "对雷达团队版感兴趣"
      : tier === "pro"
        ? "对雷达 Pro 感兴趣"
        : undefined;

  if (!showWaitlistHint) {
    return null;
  }

  return (
    <div
      role="status"
      className="mx-auto mt-8 max-w-2xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
    >
      支付已冻结，不会扣款。请加入候补名单
      {tierHint ? `（已预填：${tierHint}）` : ""}，正式开放时优先通知。
    </div>
  );
}

export function WaitlistFormBridge() {
  const params = useSearchParams();
  const tier = params.get("tier");
  const tierHint =
    tier === "team"
      ? "对雷达团队版感兴趣"
      : tier === "pro"
        ? "对雷达 Pro 感兴趣"
        : undefined;

  return <WaitlistForm source="pricing" defaultTierHint={tierHint} />;
}
