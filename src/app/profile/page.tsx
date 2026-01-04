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
import type { UserProfile, UpdateProfileRequest, ChangeEmailRequest, ChangePasswordRequest } from "@/lib/api/types/user";
import { User, Mail, Lock, Copy, Check } from "lucide-react";
import { LevelBadgeWithTooltip } from "@/components/ui/level-badge";
import { RoleBadge } from "@/components/ui/role-badge";

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
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    nickname: "",
    avatar: "",
    bio: "",
  });

  // 邮箱修改相关状态
  const [changingEmail, setChangingEmail] = useState(false);
  const [emailFormData, setEmailFormData] = useState<ChangeEmailRequest>({
    newEmail: "",
    password: "",
  });
  const [emailLoading, setEmailLoading] = useState(false);

  // 密码修改相关状态
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState<ChangePasswordRequest>({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

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
        setTimeout(() => setSuccess(""), 1000);
        setEditing(false);
      } else {
        setError(response.message || "更新失败");
        setTimeout(() => setError(""), 1000);
      }
    } catch (err: any) {
      setError(err.message || "更新失败");
      setTimeout(() => setError(""), 1000);
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

  const handleImageSelect = async (file: File) => {
    setUploadingAvatar(true);
    setError("");

    try {
      const response = await userApi.uploadAvatar(file);
      if (response.code === 200 && response.data) {
        setProfile({ ...profile!, avatar: response.data });
        setSuccess("头像更新成功");
        setTimeout(() => setSuccess(""), 1000);
        
        // 触发自定义事件通知其他组件头像已更新
        window.dispatchEvent(new CustomEvent('avatarUpdated', { 
          detail: { avatar: response.data } 
        }));
      } else {
        setError(response.message || "头像更新失败");
        setTimeout(() => setError(""), 1000);
      }
    } catch (err: any) {
      setError(err.message || "头像更新失败");
      setTimeout(() => setError(""), 1000);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setEmailLoading(true);

    try {
      const response = await userApi.changeEmail(emailFormData);
      if (response.code === 200) {
        setSuccess("邮箱修改成功");
        setTimeout(() => setSuccess(""), 1000);
        setChangingEmail(false);
        setEmailFormData({ newEmail: "", password: "" });
        await loadProfile();
      } else {
        setError(response.message || "修改失败");
        setTimeout(() => setError(""), 1000);
      }
    } catch (err: any) {
      setError(err.message || "修改失败");
      setTimeout(() => setError(""), 1000);
    } finally {
      setEmailLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordFormData.newPassword !== confirmPassword) {
      setError("两次输入的新密码不一致");
      setTimeout(() => setError(""), 1000);
      return;
    }

    if (passwordFormData.newPassword.length < 6 || passwordFormData.newPassword.length > 50) {
      setError("新密码长度必须在6-50个字符之间");
      setTimeout(() => setError(""), 1000);
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await userApi.changePassword(passwordFormData);
      if (response.code === 200) {
        setSuccess("密码修改成功");
        setTimeout(() => setSuccess(""), 1000);
        setChangingPassword(false);
        setPasswordFormData({ oldPassword: "", newPassword: "" });
        setConfirmPassword("");
      } else {
        setError(response.message || "修改失败");
        setTimeout(() => setError(""), 1000);
      }
    } catch (err: any) {
      setError(err.message || "修改失败");
      setTimeout(() => setError(""), 1000);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleImageRemove = async () => {
    setUploadingAvatar(true);
    setError("");

    try {
      const response = await userApi.removeAvatar();
      if (response.code === 200) {
        setProfile({ ...profile!, avatar: undefined });
        setSuccess("头像已移除");
        setTimeout(() => setSuccess(""), 1000);
      } else {
        setError(response.message || "头像移除失败");
        setTimeout(() => setError(""), 1000);
      }
    } catch (err: any) {
      setError(err.message || "头像移除失败");
      setTimeout(() => setError(""), 1000);
    } finally {
      setUploadingAvatar(false);
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
      {/* 悬浮提示信息 */}
      {error && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 shadow-lg">
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full mx-4">
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-600 shadow-lg">
            {success}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">个人中心</h1>
        </div>

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
                  editable={true}
                  onImageSelect={handleImageSelect}
                  onImageRemove={handleImageRemove}
                  uploading={uploadingAvatar}
                />
                <div className="text-center">
                  <div className="font-medium">{profile.nickname}</div>
                  <div className="text-sm text-muted-foreground">@{profile.username}</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">等级</span>
                  <LevelBadgeWithTooltip 
                    level={profile.level} 
                    lightning={profile.lightning}
                    size="md"
                    showLabel
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">角色</span>
                  <RoleBadge role={profile.role} showLabel size="md" />
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

                {!changingEmail ? (
                  <Button
                    variant="secondary"
                    onClick={() => setChangingEmail(true)}
                    className="w-full"
                  >
                    修改邮箱
                  </Button>
                ) : (
                  <form onSubmit={handleEmailChange} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">新邮箱</label>
                      <Input
                        type="email"
                        value={emailFormData.newEmail}
                        onChange={(e) => setEmailFormData({ ...emailFormData, newEmail: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">当前密码</label>
                      <Input
                        type="password"
                        value={emailFormData.password}
                        onChange={(e) => setEmailFormData({ ...emailFormData, password: e.target.value })}
                        required
                        placeholder="请输入密码以确认身份"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={emailLoading} className="flex-1">
                        {emailLoading ? "修改中..." : "确认修改"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setChangingEmail(false);
                          setEmailFormData({ newEmail: "", password: "" });
                        }}
                      >
                        取消
                      </Button>
                    </div>
                  </form>
                )}
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

                {!changingPassword ? (
                  <Button
                    variant="secondary"
                    onClick={() => setChangingPassword(true)}
                    className="w-full"
                  >
                    修改密码
                  </Button>
                ) : (
                  <form onSubmit={handlePasswordChange} className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">旧密码</label>
                      <Input
                        type="password"
                        value={passwordFormData.oldPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, oldPassword: e.target.value })}
                        required
                        placeholder="请输入旧密码"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">新密码</label>
                      <Input
                        type="password"
                        value={passwordFormData.newPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
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
                      <Button type="submit" disabled={passwordLoading} className="flex-1">
                        {passwordLoading ? "修改中..." : "确认修改"}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setChangingPassword(false);
                          setPasswordFormData({ oldPassword: "", newPassword: "" });
                          setConfirmPassword("");
                        }}
                      >
                        取消
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
