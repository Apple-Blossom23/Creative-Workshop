"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Search, ShieldCheck, Upload } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/browse", label: "地图", icon: Map },
  { href: "/upload", label: "上传地图", icon: Upload },
  { href: "/moderation", label: "审核", icon: ShieldCheck }
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">W</div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">红警地图工坊</div>
            <div className="text-xs text-muted-foreground">Upload · Download · Hot Maps</div>
          </div>
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = pathname?.startsWith(n.href);
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-muted",
                  active && "bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </div>

        <Link href="/browse" className="ml-auto md:ml-3">
          <Button variant="secondary" className="hidden md:inline-flex">
            <Search className="h-4 w-4" />
            搜索地图
          </Button>
          <Button variant="secondary" className="md:hidden" aria-label="搜索">
            <Search className="h-4 w-4" />
          </Button>
        </Link>

        <Link href="/auth/login" className="hidden sm:block">
          <Button>登录</Button>
        </Link>
      </div>
    </header>
  );
}
