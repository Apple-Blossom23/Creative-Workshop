"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockApi } from "@/lib/mock/api";

export default function RegisterPage() {
  const [name, setName] = useState("New User");
  const [email, setEmail] = useState("new@workshop.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onRegister() {
    setLoading(true);
    setMsg(null);
    try {
      const s = await mockApi.auth.register(name, email, password);
      setMsg(`注册成功：${s.user.name} (@${s.user.handle})`);
    } catch {
      setMsg("注册失败（mock）");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">注册</div>
            <div className="mt-1 text-sm text-muted-foreground">mock 注册，只用于 UI 展示。</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm font-medium">昵称</div>
              <div className="mt-1"><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            </div>
            <div>
              <div className="text-sm font-medium">邮箱</div>
              <div className="mt-1"><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            </div>
            <div>
              <div className="text-sm font-medium">密码</div>
              <div className="mt-1"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            </div>
            <Button onClick={onRegister} disabled={loading} className="w-full">{loading ? "注册中" : "注册"}</Button>
            {msg && <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">{msg}</div>}
            <div className="text-sm text-muted-foreground">
              已有账号？ <Link href="/auth/login" className="text-primary underline">去登录</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
