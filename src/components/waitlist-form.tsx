"use client";

import { useId, useRef, useState } from "react";

type Props = {
  source?: string;
  compact?: boolean;
  defaultTierHint?: string;
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * Intentionally not a <form>: computer-use / some browsers were native-GET
 * submitting before React onSubmit could preventDefault (action="#" → /#).
 * Button is type="button" + fetch only.
 */
export function WaitlistForm({
  source = "landing",
  compact = false,
  defaultTierHint,
}: Props) {
  const reactId = useId();
  const emailId = `email-${source}-${reactId}`;
  const roleId = `role-${source}-${reactId}`;
  const emailRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [role, setRole] = useState(defaultTierHint ?? "");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleJoin() {
    if (status === "loading") return;

    const fromDom = emailRef.current?.value ?? "";
    const roleFromDom = roleRef.current?.value ?? "";
    const trimmedEmail = (fromDom || email).trim().toLowerCase();
    const trimmedRole = (roleFromDom || role).trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setMessage("请输入有效的邮箱地址");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          role: trimmedRole,
          source,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error || "提交失败，请稍后重试");
        return;
      }

      setStatus("success");
      setMessage(
        data.message || "已加入候补名单。正式开放时我们会邮件通知你。",
      );
      setEmail("");
      setRole(defaultTierHint ?? "");
      if (emailRef.current) emailRef.current.value = "";
      if (roleRef.current) roleRef.current.value = defaultTierHint ?? "";
    } catch {
      setStatus("error");
      setMessage("网络异常，请稍后重试");
    }
  }

  if (status === "success") {
    return (
      <div
        data-waitlist-state="success"
        role="status"
        aria-live="polite"
        className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-5"
      >
        <p className="font-[family-name:var(--font-display)] text-base font-semibold text-emerald-950">
          已加入候补名单
        </p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-900">{message}</p>
        <button
          type="button"
          className="mt-4 text-sm font-medium text-emerald-950 underline underline-offset-4"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          再填一个邮箱
        </button>
      </div>
    );
  }

  return (
    <div
      data-waitlist-root="v2"
      className={compact ? "space-y-3" : "space-y-4"}
    >
      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        <div className="space-y-2">
          <label
            htmlFor={emailId}
            className="text-sm font-medium leading-none text-[var(--ink)]"
          >
            工作邮箱
          </label>
          <input
            ref={emailRef}
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-sm outline-none focus-visible:border-[var(--teal)] focus-visible:ring-2 focus-visible:ring-[var(--teal)]/30"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor={roleId}
            className="text-sm font-medium leading-none text-[var(--ink)]"
          >
            你是谁（可选）
          </label>
          <input
            ref={roleRef}
            id={roleId}
            name="role"
            type="text"
            placeholder="SEO / 目录站 / Newsletter…"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex h-11 w-full rounded-lg border border-[var(--line)] bg-white px-3 text-sm outline-none focus-visible:border-[var(--teal)] focus-visible:ring-2 focus-visible:ring-[var(--teal)]/30"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          data-waitlist-submit="1"
          disabled={status === "loading"}
          onClick={() => {
            void handleJoin();
          }}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[var(--signal)] px-6 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--signal-soft)] disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "loading" ? "提交中…" : "加入候补名单"}
        </button>
        <p className="text-xs leading-relaxed text-[var(--muted)]">
          提交后经 webhook 转发到候补渠道；正式开放时邮件通知你。
        </p>
      </div>

      {status === "error" && (
        <p
          data-waitlist-state="error"
          role="alert"
          aria-live="assertive"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
        >
          {message}
        </p>
      )}
    </div>
  );
}
