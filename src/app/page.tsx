import Link from "next/link";
import { ArrowRight, LayoutGrid, Map, Package, Puzzle } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Page() {
  return (
    <AppShell>
      <div className="grid gap-6">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Mock 后端 · 审核/上架/评论完整 UI 流程
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
              一个为地图 / 模组 / 任务包打造的创意工坊 UI
            </h1>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              按类型上传资源，进入审核队列，发布上架；资源支持标签搜索、详情页讨论与创作者体系。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/browse">
                <Button size="lg">
                  立即浏览
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="secondary">
                  上传资源
                </Button>
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <Feature icon={Map} title="地图" desc="关卡 / 生存 / PVP 地图" />
          <Feature icon={Puzzle} title="模组" desc="玩法、系统、平衡改动" />
          <Feature icon={Package} title="任务包" desc="剧情任务链 / 引导" />
          <Feature icon={LayoutGrid} title="插件" desc="服务器工具与监控" />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">推荐你先看</div>
              <div className="mt-1 text-sm text-muted-foreground">浏览页做了：类型筛选、标签筛选、排序、搜索与卡片展示。</div>
            </CardHeader>
            <CardContent>
              <Link href="/browse">
                <Button variant="secondary">打开浏览页</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="text-sm font-semibold">资源详情 + 评论</div>
              <div className="mt-1 text-sm text-muted-foreground">详情页包含信息区、动作按钮、评论发布与列表（mock 异步）。</div>
            </CardHeader>
            <CardContent>
              <Link href="/resource/r_1001">
                <Button variant="secondary">打开示例详情</Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

function Feature({
  icon: Icon,
  title,
  desc
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-3 text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}
