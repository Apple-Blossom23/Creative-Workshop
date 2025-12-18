"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { ResourceCard } from "@/components/resource/resource-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockApi } from "@/lib/mock/api";

export function BrowseClient() {
  const searchParams = useSearchParams();
  const [q, setQ] = useState<string>("");
  const [sort, setSort] = useState<"trending" | "new" | "top">("trending");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Awaited<ReturnType<typeof mockApi.resources.list>>>([]);

  useEffect(() => {
    const qp = (searchParams?.get("q") ?? "").trim();
    const sp = (searchParams?.get("sort") ?? "").trim();

    setQ(qp);
    if (sp === "trending" || sp === "new" || sp === "top") setSort(sp);
  }, [searchParams]);

  useEffect(() => {
    mockApi.resources.listTags({ type: "map", status: "published" }).then(setAllTags);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    mockApi.resources
      .list({ type: "map", q, tags: selectedTags, sort, status: "published" })
      .then((res) => {
        if (!alive) return;
        setItems(res);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [q, selectedTags, sort]);

  function toggleTag(t: string) {
    setSelectedTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xl font-semibold">浏览地图</div>
            <div className="mt-1 text-sm text-muted-foreground">按标签发现热门地图，点击进入详情页查看与讨论。</div>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[420px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索标题、简介或标签..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant={sort === "trending" ? "primary" : "secondary"} className="flex-1" onClick={() => setSort("trending")}>热度</Button>
              <Button variant={sort === "new" ? "primary" : "secondary"} className="flex-1" onClick={() => setSort("new")}>最新</Button>
              <Button variant={sort === "top" ? "primary" : "secondary"} className="flex-1" onClick={() => setSort("top")}>评分</Button>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Filter className="h-4 w-4" />
              标签筛选
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map((t) => {
                const active = selectedTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={active ? "" : ""}
                  >
                    <Badge className={active ? "border-transparent bg-primary text-primary-foreground" : undefined}>{t}</Badge>
                  </button>
                );
              })}
              {!allTags.length && <div className="text-sm text-muted-foreground">加载标签中...</div>}
            </div>
            {!!selectedTags.length && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">已选择：{selectedTags.join("、")}</div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>清空</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[290px] rounded-lg border border-border bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">共 {items.length} 条</div>
              <div className="text-sm text-muted-foreground">仅展示已上架资源</div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {items.map((r) => (
                <ResourceCard key={r.id} r={r} />
              ))}
            </div>
            {!items.length && <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">没有匹配的资源，试试换个关键词或标签。</div>}
          </>
        )}
      </div>
    </AppShell>
  );
}
