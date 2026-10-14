import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
            新词雷达
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
            AI 新词 SEO 雷达日报 — 在 Google Trends 之前，抓住正在破圈的模型名、产品名与仓库名。
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
          <Link href="/report/demo" className="hover:text-white">
            示例日报
          </Link>
          <Link href="/pricing" className="hover:text-white">
            定价
          </Link>
          <Link href="/#waitlist" className="hover:text-white">
            候补名单
          </Link>
          <a
            href="mailto:hello@xinci-radar.demo"
            className="hover:text-white"
          >
            hello@xinci-radar.demo
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/45 sm:px-6">
          © 2026 新词雷达 · Demo 数据为虚构示意，非正式生产信号 · grokbotSelfEarn
        </p>
      </div>
    </footer>
  );
}
