"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Download, Heart, ShieldCheck, Star } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockApi } from "@/lib/mock/api";
import type { Comment, Resource } from "@/lib/types";

function typeLabel(t: Resource["type"]) {
  if (t === "map") return "地图";
  return "地图";
}

export default function ResourceDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [r, setR] = useState<Resource | null>(null);
  const [list, setList] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    let alive = true;
    async function run() {
      setLoading(true);
      const res = await mockApi.resources.getById(id);
      const cs = await mockApi.comments.list(id);
      if (!alive) return;
      setR(res);
      setList(cs);
      setLoading(false);
    }
    run();
    return () => {
      alive = false;
    };
  }, [id]);

  const statusLabel = useMemo(() => {
    if (!r) return "";
    if (r.status === "published") return "已上架";
    if (r.status === "pending_review") return "审核中";
    if (r.status === "draft") return "草稿";
    return "已拒绝";
  }, [r]);

  async function submitComment() {
    if (!text.trim()) return;
    setPosting(true);
    try {
      const c = await mockApi.comments.add(id, text.trim());
      setList((cur) => [...cur, c]);
      setText("");
    } finally {
      setPosting(false);
    }
  }

  return (
    <AppShell>
      {loading ? (
        <div className="h-[480px] rounded-2xl border border-border bg-muted animate-pulse" />
      ) : !r ? (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="text-sm font-semibold">资源不存在</div>
          <div className="mt-2 text-sm text-muted-foreground">可能是 mock 数据里没有这个 id。</div>
          <div className="mt-4">
            <Link href="/browse"><Button variant="secondary">返回浏览</Button></Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          <section className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-transparent bg-primary text-primary-foreground">{typeLabel(r.type)}</Badge>
                  <Badge>{statusLabel}</Badge>
                  <Badge>v{r.version}</Badge>
                </div>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight">{r.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <Link key={t} href={`/browse?q=${encodeURIComponent(t)}`}>
                      <Badge className="hover:bg-muted">#{t}</Badge>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500" /> {r.rating.toFixed(1)}
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <Download className="h-4 w-4" /> {r.downloads.toLocaleString()} 下载
                  </div>
                  <div className="inline-flex items-center gap-1">
                    <Heart className="h-4 w-4" /> {r.likes.toLocaleString()} 喜欢
                  </div>
                  
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  首次创建时间： {new Date(r.createdAt).toLocaleDateString("zh-CN")}&nbsp;&nbsp;
                  最近更新时间： {new Date(r.updatedAt).toLocaleDateString("zh-CN")}
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-muted/20 p-4">
                  <div className="text-sm font-semibold">作者</div>
                  <div className="mt-2 flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.author.avatarUrl} alt={r.author.name} className="h-10 w-10 rounded-full border border-border" />
                    <div>
                      <div className="text-sm font-medium">{r.author.name}</div>
                      <div className="text-xs text-muted-foreground">@{r.author.handle}</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Download className="h-4 w-4" />
                  下载 / 订阅
                </Button>
                <Button className="w-full" size="lg" variant="secondary">
                  <Star className="h-4 w-4" />
                  收藏
                </Button>
                <Button className="w-full" size="lg" variant="ghost">
                  <ShieldCheck className="h-4 w-4" />
                  举报
                </Button>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="text-sm font-semibold">兼容性</div>
                  <div className="mt-2 text-sm text-muted-foreground">游戏版本 1.20+ · 服务器/单机均可</div>
                  <div className="mt-3 text-sm text-muted-foreground">依赖：无（mock）</div>
                </div>
              </div>
            </div>

            <div className="border-t border-border bg-muted/10 p-6">
              <div className="text-sm font-semibold">预览</div>
              <div className="mt-3 overflow-hidden rounded-xl border border-border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.coverUrl ?? "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=60"}
                  alt={r.title}
                  className="h-[320px] w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-[1fr_360px]">
            <Card>
              <CardContent className="pt-5">
                <div className="text-sm font-semibold">评论讨论</div>
                <div className="mt-3 flex gap-2">
                  <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="写下你的想法..." />
                  <Button onClick={submitComment} disabled={posting || !text.trim()}>
                    {posting ? "发布中" : "发布"}
                  </Button>
                </div>

                <div className="mt-5 space-y-3">
                  {list.map((c) => (
                    <div key={c.id} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={c.user.avatarUrl} alt={c.user.name} className="h-7 w-7 rounded-full border border-border" />
                          <div className="text-sm font-medium">{c.user.name}</div>
                          <div className="text-xs text-muted-foreground">@{c.user.handle}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleString("zh-CN")}</div>
                      </div>
                      <div className="mt-2 text-sm text-foreground/90">{c.content}</div>
                    </div>
                  ))}
                  {!list.length && <div className="text-sm text-muted-foreground">暂无评论，来当第一个吧。</div>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-5">
                <div className="text-sm font-semibold">你可能还喜欢</div>
                <div className="mt-2 text-sm text-muted-foreground">回到浏览页用标签继续探索。</div>
                <div className="mt-4">
                  <Link href="/browse"><Button variant="secondary" className="w-full">继续浏览</Button></Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </AppShell>
  );
}
