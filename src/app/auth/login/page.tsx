"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api/services/auth";
import type { LoginRequest } from "@/lib/api/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    usernameOrEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(formData);
      
      if (response.code === 200 && response.data) {
        authApi.saveAuth(response.data);
        router.push('/');
      } else {
        setError(response.message || '登录失败');
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请稍后重试');
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
            <div className="mt-1 text-sm text-muted-foreground">使用用户名或邮箱登录</div>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <form onSubmit={onLogin} className="space-y-3">
              <div>
                <div className="text-sm font-medium">用户名/邮箱</div>
                <div className="mt-1">
                  <Input 
                    value={formData.usernameOrEmail} 
                    onChange={(e) => setFormData({ ...formData, usernameOrEmail: e.target.value })}
                    required
                    placeholder="请输入用户名或邮箱"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">密码</div>
                <div className="mt-1">
                  <Input 
                    type="password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    placeholder="请输入密码"
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "登录中..." : "登录"}
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              没有账号？ <Link href="/auth/register" className="text-primary underline">注册</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
