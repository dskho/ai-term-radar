import { NextResponse } from "next/server";

/**
 * Payment freeze (product gate): this route MUST NOT start Stripe / Lemon
 * checkout or charge anyone. Always send callers to the waitlist.
 * Env vars like STRIPE_* / LEMON_* are ignored while frozen.
 */
export async function POST(request: Request) {
  let tier = "pro";

  try {
    const body = (await request.json()) as { tier?: string };
    if (body.tier === "team" || body.tier === "pro") {
      tier = body.tier;
    }
  } catch {
    // empty body is fine
  }

  return NextResponse.json({
    ok: true,
    frozen: true,
    charged: false,
    redirectTo: `/#waitlist`,
    message: "支付已冻结。当前仅开放候补名单，不会发起任何扣款。",
    tier,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    frozen: true,
    charged: false,
    redirectTo: "/#waitlist",
    message: "支付已冻结。当前仅开放候补名单，不会发起任何扣款。",
  });
}
