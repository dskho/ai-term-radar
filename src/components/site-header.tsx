import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#audience", label: "适合谁" },
  { href: "/report/demo", label: "示例日报" },
  { href: "/pricing", label: "定价" },
  { href: "/#waitlist", label: "候补名单" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)]/70 bg-[var(--paper)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-md bg-[var(--ink)] text-[var(--signal)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
              <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity="0.75" />
              <circle cx="8" cy="8" r="1.2" fill="currentColor" />
              <path d="M8 1.5V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-[family-name:var(--font-display)] text-[15px] font-semibold tracking-tight text-[var(--ink)]">
            新词雷达
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--mist)] hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/report/demo"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            看示例
          </Link>
          <Link
            href="/#waitlist"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--ink-soft)]",
            )}
          >
            加入候补
          </Link>
        </div>
      </div>
    </header>
  );
}
