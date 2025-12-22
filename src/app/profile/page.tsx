"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/shell/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/lib/api/services/user";
import type { UserProfile, UpdateProfileRequest } from "@/lib/api/types/user";
import { User, Mail, Lock, Copy, Check } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user: currentUser, loading: authLoading } = useAuth(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    nickname: "",
    avatar: "",
    bio: "",
  });

  useEffect(() => {
    if (!authLoading && currentUser) {
      loadProfile();
    }
  }, [authLoading, currentUser]);

  const loadProfile = async () => {
    try {
      const response = await userApi.getProfile();
      if (response.code === 200 && response.data) {
        setProfile(response.data);
        setFormData({
          nickname: response.data.nickname,
          avatar: response.data.avatar || "",
          bio: response.data.bio || "",
        });
      }
    } catch (err: any) {
      setError(err.message || "加载失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await userApi.updateProfile(formData);
      if (response.code === 200 && response.data) {
        setProfile(response.data);
        setSuccess("资料更新成功");
        setEditing(false);
      } else {
        setError(response.message || "更新失败");
      }
    } catch (err: any) {
      setError(err.message || "更新失败");
    } finally {
      setSaving(false);
    }
  };

  const copyInviteCode = () => {
    if (profile?.inviteCode) {
      navigator.clipboard.writeText(profile.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (authLoading || loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">加载中...</div>
        </div>
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-600">加载失败</div>
        </div>
      </AppShell>
    );
  }

  const getInitial = () => {
    return profile.nickname.charAt(0).toUpperCase();
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">个人中心</h1>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="text-lg font-semibold">用户信息</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center gap-3">
                <Avatar 
                  src={profile.avatar} 
                  fallback={getInitial()} 
                  className="h-20 w-20 text-xl"
                />
                <div className="text-center">
                  <div className="font-medium">{profile.nickname}</div>
                  <div className="text-sm text-muted-foreground">@{profile.username}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">等级</span>
                  <span className="font-medium">Lv.{profile.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">角色</span>
                  <span className="font-medium">{profile.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">闪电</span>
                  <span className="font-medium text-yellow-600">⚡ {profile.lightning}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">水滴</span>
                  <span className="font-medium text-blue-600">💧 {profile.drops}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground mb-2">我的邀请码</div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-muted rounded text-sm font-mono">
                    {profile.inviteCode}
                  </code>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={copyInviteCode}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">个人资料</div>
                {!editing && (
                  <Button onClick={() => setEditing(true)} variant="secondary">
                    编辑资料
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">用户名</label>
                <Input value={profile.username} disabled />
                <div className="text-xs text-muted-foreground mt-1">用户名注册后不可修改</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">昵称</label>
                <Input
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  disabled={!editing}
                  maxLength={50}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">头像URL</label>
                <Input
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  disabled={!editing}
                  placeholder="https://example.com/avatar.jpg"
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">个人简介</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!editing}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-muted disabled:cursor-not-allowed"
                  rows={4}
                  maxLength={500}
                  placeholder="介绍一下自己..."
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {formData.bio?.length || 0} / 500
                </div>
              </div>

              {editing && (
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "保存中..." : "保存"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditing(false);
                      setFormData({
                        nickname: profile.nickname,
                        avatar: profile.avatar || "",
                        bio: profile.bio || "",
                      });
                    }}
                  >
                    取消
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <div className="text-lg font-semibold">邮箱设置</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">当前邮箱</div>
                  <div className="font-medium">{profile.email}</div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/profile/change-email")}
                  className="w-full"
                >
                  修改邮箱
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <div className="text-lg font-semibold">安全设置</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">密码</div>
                  <div className="font-medium">••••••••</div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/profile/change-password")}
                  className="w-full"
                >
                  修改密码
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
