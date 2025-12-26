"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, ShieldCheck, Upload } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/shell/user-menu";
import { authApi } from "@/lib/api/services/auth";
import { userApi } from "@/lib/api/services/user";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/lib/api/types/user";
import { CheckinDialog } from "@/components/checkin/checkin-dialog";
import { useToast } from "@/components/ui/toast";

const nav: Array<{ href?: string; label: string; icon: any; adminOnly?: boolean; action?: string }> = [
  { href: "/upload", label: "上传地图", icon: Upload },
  { action: "checkin", label: "每日签到", icon: CalendarCheck },
  { href: "/moderation", label: "审核", icon: ShieldCheck, adminOnly: true }
];

export function AppHeader() {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCheckin, setShowCheckin] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = authApi.getCurrentUser();
      if (currentUser) {
        try {
          const response = await userApi.getProfile();
          if (response.code === 200 && response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [pathname]);

  useEffect(() => {
    // 监听头像更新事件
    const handleAvatarUpdate = (event: CustomEvent) => {
      setUser((prevUser) => {
        if (prevUser) {
          return { ...prevUser, avatar: event.detail.avatar };
        }
        return prevUser;
      });
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate as EventListener);

    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center font-bold">W</div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">红警地图工坊</div>
              <div className="text-xs text-muted-foreground">Upload · Download · Hot Maps</div>
            </div>
          </Link>

          <div className="ml-auto hidden items-center gap-1 md:flex">
            {nav.map((n, idx) => {
              if (n.adminOnly && user?.role !== 'ADMIN') {
                return null;
              }
              const active = n.href && pathname?.startsWith(n.href);
              const Icon = n.icon;
              
              if (n.action === 'checkin') {
                return (
                  <button
                    key={idx}
                    onClick={() => setShowCheckin(true)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {n.label}
                  </button>
                );
              }
              
              return (
                <Link
                  key={n.href}
                  href={n.href!}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition hover:bg-muted",
                    active && "bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </div>


          {!loading && (
            user ? (
              <UserMenu user={user} />
            ) : (
              <Link href="/auth/login" className="hidden sm:block">
                <Button>登录</Button>
              </Link>
            )
          )}
        </div>
      </header>
      {showCheckin && (
        <CheckinDialog
          onClose={() => setShowCheckin(false)}
          onSuccess={(reward) => {
            addToast({
              title: "签到成功！",
              description: `获得 ${reward.drops} 💧 水滴`,
              variant: "success",
              duration: 3000
            });
            setUser(prev => prev ? {
              ...prev,
              drops: prev.drops + reward.drops
            } : null);
          }}
        />
      )}
    </>
  );
}
