import type { Metadata } from "next";
import { Noto_Sans_SC, Space_Grotesk, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Noto_Sans_SC({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "新词雷达 · AI 新词 SEO 雷达日报",
    template: "%s · 新词雷达",
  },
  description:
    "在 Google Trends 之前捕获破圈 AI 新词。面向 SEO、AI 目录站与 Newsletter 运营者的日报雷达。",
  openGraph: {
    title: "新词雷达 · AI 新词 SEO 雷达日报",
    description:
      "GitHub 爆发、HF 趋势、产品上线 — 每日优先布局 / 观察 / 跳过决策。",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
