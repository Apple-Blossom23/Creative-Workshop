"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { mockApi } from "@/lib/mock/api";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@workshop.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onLogin() {
    setLoading(true);
    setMsg(null);
    try {
      const s = await mockApi.auth.login(email, password);
      setMsg(`已登录：${s.user.name} (@${s.user.handle})`);
    } catch {
      setMsg("登录失败（mock）");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">登录</div>
            <div className="mt-1 text-sm text-muted-foreground">mock 登录，不会真的校验账号。</div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm font-medium">邮箱</div>
              <div className="mt-1"><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            </div>
            <div>
              <div className="text-sm font-medium">密码</div>
              <div className="mt-1"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            </div>
            <Button onClick={onLogin} disabled={loading} className="w-full">{loading ? "登录中" : "登录"}</Button>
            {msg && <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">{msg}</div>}
            <div className="text-sm text-muted-foreground">
              没有账号？ <Link href="/auth/register" className="text-primary underline">注册</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
