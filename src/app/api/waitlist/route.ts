import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistBody = {
  email?: string;
  role?: string;
  source?: string;
};

/**
 * Waitlist persistence is webhook-only (Formspree / Make / CRM).
 * Obsidian notes are written by Grok Bot from Formspree email — not by this app.
 * No Google Drive service-account writes.
 */
export async function POST(request: Request) {
  let body: WaitlistBody;

  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求体必须是 JSON" },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const role = body.role?.trim() || "未填写";
  const source = body.source?.trim() || "landing";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "请输入有效的邮箱地址" },
      { status: 400 },
    );
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL?.trim();
  if (!webhook) {
    return NextResponse.json(
      {
        ok: false,
        error: "候补名单未配置：缺少 WAITLIST_WEBHOOK_URL",
      },
      { status: 500 },
    );
  }

  const entry = {
    email,
    role,
    source,
    createdAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("waitlist webhook failed", response.status, detail);
      return NextResponse.json(
        { ok: false, error: "候补提交失败，请稍后重试" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("waitlist webhook failed", error);
    return NextResponse.json(
      { ok: false, error: "候补提交失败，请稍后重试" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "已加入候补名单。正式开放时我们会邮件通知你。",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: Boolean(process.env.WAITLIST_WEBHOOK_URL?.trim()),
  });
}
