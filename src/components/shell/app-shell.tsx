import { AppHeader } from "@/components/shell/app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <div>© 2025 红警地图工坊</div>
          <div>地图上传 · 下载 · 热门推荐</div>
        </div>
      </footer>
    </div>
  );
}
