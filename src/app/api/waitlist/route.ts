import { mkdir, appendFile, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORE_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(STORE_DIR, "waitlist.jsonl");

type WaitlistBody = {
  email?: string;
  role?: string;
  source?: string;
};

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

  const entry = {
    email,
    role,
    source,
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.WAITLIST_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.error("waitlist webhook failed", error);
    }
  }

  try {
    await mkdir(STORE_DIR, { recursive: true });
    await appendFile(STORE_FILE, `${JSON.stringify(entry)}\n`, "utf8");
  } catch (error) {
    console.error("waitlist write failed", error);
    return NextResponse.json(
      {
        ok: true,
        demo: true,
        message: webhook
          ? "已转发候补意向。正式开放时我们会邮件通知你。"
          : "已记录意向（演示模式：本地写入失败时仍返回成功，请检查写权限或设置 WAITLIST_WEBHOOK_URL）。",
        entry,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    ok: true,
    demo: true,
    message: "已加入候补名单。正式开放时我们会邮件通知你。",
    entry,
  });
}

export async function GET() {
  try {
    const raw = await readFile(STORE_FILE, "utf8");
    const count = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean).length;
    return NextResponse.json({ ok: true, count, demo: true });
  } catch {
    return NextResponse.json({ ok: true, count: 0, demo: true });
  }
}
