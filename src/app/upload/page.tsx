"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockApi } from "@/lib/mock/api";

const hintText = "地图文件、预览图、开局位说明、版本与更新日志";

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState("合作,生存");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const hint = useMemo(() => hintText, []);

  async function submit() {
    setSubmitting(true);
    setMsg(null);
    try {
      await mockApi.resources.submitForReview("new_resource_id");
      setMsg("已提交审核（mock）。你可以去【审核】页查看队列效果。 ");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AppShell>
      <div className="grid gap-6 md:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">上传地图</div>
            <div className="mt-1 text-sm text-muted-foreground">提交后进入审核队列（mock）。</div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium">建议内容</div>
              <div className="mt-2 text-sm text-muted-foreground">{hint}</div>
            </div>

            <div>
              <div className="text-sm font-medium">标题</div>
              <div className="mt-1"><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例如：雾港 · Fog Harbor" /></div>
            </div>

            <div>
              <div className="text-sm font-medium">简介</div>
              <div className="mt-1"><Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="一句话介绍你的资源..." /></div>
            </div>

            <div>
              <div className="text-sm font-medium">标签（逗号分隔）</div>
              <div className="mt-1"><Input value={tags} onChange={(e) => setTags(e.target.value)} /></div>
            </div>

            <div className="rounded-xl border border-border bg-muted/10 p-4">
              <div className="text-sm font-semibold">文件上传（UI 演示）</div>
              <div className="mt-2 text-sm text-muted-foreground">这里通常会是拖拽上传/版本管理/校验；本 demo 只做外观。</div>
              <div className="mt-3"><Button variant="secondary">选择文件</Button></div>
            </div>

            <Button size="lg" onClick={submit} disabled={submitting}>
              {submitting ? "提交中" : "提交审核"}
            </Button>

            {msg && <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">{msg}</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="text-sm font-semibold">发布规范（建议）</div>
            <div className="mt-1 text-sm text-muted-foreground">让审核与上架更顺滑。</div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start justify-between gap-3"><span>清晰的版本号</span><Badge>必须</Badge></div>
            <div className="flex items-start justify-between gap-3"><span>预览图/截图</span><Badge>推荐</Badge></div>
            <div className="flex items-start justify-between gap-3"><span>依赖与兼容说明</span><Badge>必须</Badge></div>
            <div className="flex items-start justify-between gap-3"><span>更新日志</span><Badge>推荐</Badge></div>
            <div className="mt-4 text-sm text-muted-foreground">你也可以在这里加入「病毒扫描」「自动检查清单」「版权声明」等能力。</div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
