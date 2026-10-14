import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  decisionTone,
  type DailyReport,
  type Decision,
  type RadarTerm,
} from "@/data/sample-report";
import { cn } from "@/lib/utils";

function DecisionBadge({ decision }: { decision: Decision }) {
  const tone = decisionTone(decision);
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-md font-medium",
        tone === "priority" &&
          "bg-[var(--signal)]/20 text-[var(--ink)] hover:bg-[var(--signal)]/20",
        tone === "watch" &&
          "bg-sky-100 text-sky-900 hover:bg-sky-100",
        tone === "skip" &&
          "bg-zinc-100 text-zinc-600 hover:bg-zinc-100",
      )}
    >
      {decision}
    </Badge>
  );
}

type Props = {
  report: DailyReport;
  compact?: boolean;
  showWhy?: boolean;
};

export function ReportTable({ report, compact = false, showWhy = false }: Props) {
  const rows: RadarTerm[] = compact
    ? report.terms.slice(0, 6)
    : report.terms;

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-white shadow-[0_1px_0_rgba(10,40,50,0.04)]">
      <div className="flex flex-col gap-1 border-b border-[var(--line)] bg-[var(--mist)]/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--ink)]">
            {report.title}
          </p>
          <p className="text-xs text-[var(--muted)]">
            报告日 {report.date} · 示例数据 · 共 {report.terms.length} 词
          </p>
        </div>
        {compact && (
          <Link
            href="/report/demo"
            className="text-sm font-medium text-[var(--teal)] underline-offset-4 hover:underline"
          >
            查看完整示例日报 →
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-[140px]">新词</TableHead>
              <TableHead>信号</TableHead>
              <TableHead className="text-right">星标/日</TableHead>
              <TableHead className="text-right">动量</TableHead>
              <TableHead>决策</TableHead>
              {!compact && <TableHead className="min-w-[200px]">SEO 角度</TableHead>}
              {showWhy && <TableHead className="min-w-[220px]">为何上榜</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((term) => (
              <TableRow key={term.id}>
                <TableCell>
                  <div className="font-medium text-[var(--ink)]">{term.term}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {term.aliases.slice(0, 2).join(" · ")}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[var(--muted)]">
                  {term.signal}
                </TableCell>
                <TableCell className="text-right font-mono text-sm tabular-nums">
                  {term.starsPerDay.toLocaleString("zh-CN")}
                </TableCell>
                <TableCell className="text-right font-mono text-sm tabular-nums">
                  {term.momentum}
                </TableCell>
                <TableCell>
                  <DecisionBadge decision={term.decision} />
                </TableCell>
                {!compact && (
                  <TableCell className="max-w-xs text-sm leading-relaxed text-[var(--muted)]">
                    {term.seoAngle}
                  </TableCell>
                )}
                {showWhy && (
                  <TableCell className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
                    {term.why}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
