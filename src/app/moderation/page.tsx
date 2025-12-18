"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockApi } from "@/lib/mock/api";
import type { Resource } from "@/lib/types";

function typeLabel(t: Resource["type"]) {
  if (t === "map") return "地图";
  return "地图";
}

export default function ModerationPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Resource[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    mockApi.resources
      .list({ status: "pending_review", type: "map", sort: "new" })
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
  }, []);

  async function approve(id: string) {
    setBusyId(id);
    try {
      await mockApi.resources.approve(id);
      setItems((cur) => cur.filter((x) => x.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  async function reject(id: string) {
    setBusyId(id);
    try {
      await mockApi.resources.reject(id, "格式不规范（mock）");
      setItems((cur) => cur.filter((x) => x.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-xl font-semibold">地图审核</div>
          <div className="mt-1 text-sm text-muted-foreground">仅展示待审核地图（mock）。</div>
        </div>

        {loading ? (
          <div className="h-[240px] rounded-lg border border-border bg-muted animate-pulse" />
        ) : (
          <div className="space-y-3">
            {items.map((r) => (
              <Card key={r.id}>
                <CardContent className="pt-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="border-transparent bg-primary text-primary-foreground">{typeLabel(r.type)}</Badge>
                        <Badge>待审核</Badge>
                        <div className="text-sm font-semibold truncate">{r.title}</div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.summary}</div>
                      <div className="mt-2 text-xs text-muted-foreground">作者：@{r.author.handle} · 更新：{new Date(r.updatedAt).toLocaleDateString("zh-CN")}</div>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <Link href={`/resource/${r.id}`}><Button variant="secondary">查看详情</Button></Link>
                      <Button onClick={() => approve(r.id)} disabled={busyId === r.id}>
                        <CheckCircle2 className="h-4 w-4" /> 通过
                      </Button>
                      <Button variant="danger" onClick={() => reject(r.id)} disabled={busyId === r.id}>
                        <XCircle className="h-4 w-4" /> 拒绝
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {!items.length && (
              <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
                当前没有待审核资源。你可以去「上传」页提交一个资源（mock）。
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
