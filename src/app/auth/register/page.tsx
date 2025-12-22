"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/api/services/auth";
import type { RegisterRequest } from "@/lib/api/types/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    nickname: "",
    email: "",
    password: "",
    inviteCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.register(formData);
      
      if (response.code === 200 && response.data) {
        authApi.saveAuth(response.data);
        router.push('/');
      } else {
        setError(response.message || '注册失败');
      }
    } catch (err: any) {
      setError(err.message || '注册失败，请稍后重试');
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
            <div className="mt-1 text-sm text-muted-foreground">创建新账号</div>
          </CardHeader>
          <CardContent className="space-y-3">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <form onSubmit={onRegister} className="space-y-3">
              <div>
                <div className="text-sm font-medium">用户名</div>
                <div className="mt-1">
                  <Input 
                    value={formData.username} 
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    minLength={3}
                    maxLength={50}
                    placeholder="3-50个字符"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">昵称</div>
                <div className="mt-1">
                  <Input 
                    value={formData.nickname} 
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    required
                    maxLength={50}
                    placeholder="显示名称"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">邮箱</div>
                <div className="mt-1">
                  <Input 
                    type="email"
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your@email.com"
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
                    minLength={6}
                    maxLength={50}
                    placeholder="6-50个字符"
                  />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">邀请码 (可选)</div>
                <div className="mt-1">
                  <Input 
                    value={formData.inviteCode} 
                    onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
                    maxLength={8}
                    placeholder="8位邀请码"
                  />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "注册中..." : "注册"}
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              已有账号？ <Link href="/auth/login" className="text-primary underline">去登录</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
