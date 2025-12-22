"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/lib/api/services/user";
import type { ChangePasswordRequest } from "@/lib/api/types/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { loading: authLoading } = useAuth(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== confirmPassword) {
      setError("两次输入的新密码不一致");
      return;
    }

    if (formData.newPassword.length < 6 || formData.newPassword.length > 50) {
      setError("新密码长度必须在6-50个字符之间");
      return;
    }

    setLoading(true);

    try {
      const response = await userApi.changePassword(formData);
      if (response.code === 200) {
        setSuccess("密码修改成功，3秒后返回个人中心");
        setTimeout(() => {
          router.push("/profile");
        }, 3000);
      } else {
        setError(response.message || "修改失败");
      }
    } catch (err: any) {
      setError(err.message || "修改失败");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-md mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          返回个人中心
        </Link>

        <Card>
          <CardHeader>
            <div className="text-lg font-semibold">修改密码</div>
            <div className="text-sm text-muted-foreground">请输入旧密码和新密码</div>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600 mb-4">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">旧密码</label>
                <Input
                  type="password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  required
                  placeholder="请输入旧密码"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">新密码</label>
                <Input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                  minLength={6}
                  maxLength={50}
                  placeholder="6-50个字符"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">确认新密码</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  maxLength={50}
                  placeholder="再次输入新密码"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "修改中..." : "确认修改"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push("/profile")}
                >
                  取消
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
