import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "红警地图工坊",
  description: "红警地图上传与下载：热门地图推荐、标签搜索、详情与评论（UI Demo）"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
