import { AppHeader } from "@/components/shell/app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <div>© 2025 Workshop UI Demo</div>
          <div>Mock 数据 · 仅展示 UI</div>
        </div>
      </footer>
    </div>
  );
}
