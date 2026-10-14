import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PRICING_TIERS } from "@/data/sample-report";
import { cn } from "@/lib/utils";

/** All purchase CTAs are frozen → waitlist only. No Stripe / Lemon calls. */
export function PricingCards() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative flex flex-col rounded-2xl border p-6",
              tier.highlighted
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-[0_20px_50px_-28px_rgba(8,36,44,0.55)]"
                : "border-[var(--line)] bg-white text-[var(--ink)]",
            )}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-6 rounded-md bg-[var(--signal)] px-2.5 py-1 text-xs font-semibold text-[var(--ink)]">
                草案价 · 最受关注
              </span>
            )}
            <p
              className={cn(
                "font-[family-name:var(--font-display)] text-lg font-semibold",
                tier.highlighted ? "text-white" : "text-[var(--ink)]",
              )}
            >
              {tier.name}
            </p>
            <p
              className={cn(
                "mt-1 text-sm leading-relaxed",
                tier.highlighted ? "text-white/70" : "text-[var(--muted)]",
              )}
            >
              {tier.blurb}
            </p>
            <p className="mt-5 flex items-baseline gap-1">
              <span className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
                {tier.price}
              </span>
              <span
                className={cn(
                  "text-sm",
                  tier.highlighted ? "text-white/60" : "text-[var(--muted)]",
                )}
              >
                {tier.period}
                <span className="ml-1 opacity-80">（草案）</span>
              </span>
            </p>
            <ul
              className={cn(
                "mt-6 flex-1 space-y-2.5 text-sm",
                tier.highlighted ? "text-white/80" : "text-[var(--muted)]",
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                      tier.highlighted ? "bg-[var(--signal)]" : "bg-[var(--teal)]",
                    )}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/#waitlist"
                className={cn(
                  buttonVariants(),
                  "w-full",
                  tier.highlighted
                    ? "bg-[var(--signal)] text-[var(--ink)] hover:bg-[var(--signal-soft)]"
                    : "bg-[var(--ink)] text-white hover:bg-[var(--ink-soft)]",
                )}
              >
                加入候补名单
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-[var(--muted)]">
        支付已冻结：不会跳转 Stripe / Lemon Squeezy，也不会扣款。主 CTA 仅为加入候补名单。
      </p>
    </div>
  );
}
