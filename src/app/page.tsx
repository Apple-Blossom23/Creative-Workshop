import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Upload } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { ResourceCard } from "@/components/resource/resource-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { resources } from "@/lib/mock/db";

export default function Page() {
  const maps = resources.filter((r) => r.type === "map" && r.status === "published");
  const hot = [...maps]
    .sort((a, b) => (b.likes + b.downloads / 10) - (a.likes + a.downloads / 10))
    .slice(0, 6);
  const latest = [...maps].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 6);

  const totalDownloads = maps.reduce((sum, r) => sum + r.downloads, 0);
  const authorCount = new Set(maps.map((r) => r.author.id)).size;

  return (
    <AppShell>
      <div className="grid gap-6">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              地图上传 · 下载 · 热门推荐（当前使用 mock 数据）
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
              红警地图工坊
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              为玩家提供一个更好用的地图上传与下载入口：发现热门地图、查看详情与评论、提交地图等待审核上架。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/browse">
                <Button size="lg">
                  浏览地图
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="secondary">
                  上传地图
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "#合作", q: "合作" },
                { label: "#PVP", q: "PVP" },
                { label: "#生存", q: "生存" },
                { label: "#防守", q: "防守" },
                { label: "#海岛", q: "海岛" }
              ].map((t) => (
                <Link key={t.q} href={`/browse?q=${encodeURIComponent(t.q)}`}>
                  <Badge className="hover:bg-muted">{t.label}</Badge>
                </Link>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">已上架地图</div>
              <div className="mt-1 text-sm text-muted-foreground">当前展示 {maps.length} 张地图</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">累计下载</div>
              <div className="mt-1 text-sm text-muted-foreground">{totalDownloads.toLocaleString()} 次（mock）</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">创作者</div>
              <div className="mt-1 text-sm text-muted-foreground">{authorCount} 位活跃作者（mock）</div>
            </CardHeader>
          </Card>
        </section>

        <section className="grid gap-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold">
                <Flame className="h-4 w-4" />
                热门地图
              </div>
              <div className="mt-1 text-sm text-muted-foreground">按热度排序（喜欢 + 下载）</div>
            </div>
            <Link href="/browse"><Button variant="secondary">查看更多</Button></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {hot.map((r) => (
              <ResourceCard key={r.id} r={r} />
            ))}
          </div>
        </section>

        <section className="grid gap-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                最新上架
              </div>
              <div className="mt-1 text-sm text-muted-foreground">最近更新的地图</div>
            </div>
            <Link href="/browse?sort=new"><Button variant="secondary">按最新浏览</Button></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((r) => (
              <ResourceCard key={r.id} r={r} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">快速开始</div>
              <div className="mt-1 text-sm text-muted-foreground">先去浏览页按标签/热度/最新筛选地图。</div>
            </CardHeader>
            <CardContent>
              <Link href="/browse">
                <Button variant="secondary">打开地图列表</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">发布你的地图</div>
              <div className="mt-1 text-sm text-muted-foreground">填写标题、简介、标签并提交审核（mock 流程）。</div>
            </CardHeader>
            <CardContent>
              <Link href="/upload">
                <Button variant="secondary">
                  <Upload className="h-4 w-4" />
                  去上传
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
