"use client";

import { useRouter } from "next/navigation";
import { User, LogOut, Settings, Heart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { authApi } from "@/lib/api/services/auth";
import type { UserProfile } from "@/lib/api/types/user";

interface UserMenuProps {
  user: UserProfile;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const handleLogout = () => {
    authApi.logout();
    router.push("/auth/login");
    router.refresh();
  };

  const getInitial = () => {
    const displayName = user.nickname || user.username;
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu
      trigger={
        <div className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted transition-colors">
          <Avatar 
            src={user.avatar} 
            fallback={getInitial()} 
            className="h-8 w-8" 
          />
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium">{user.nickname || user.username}</div>
            <div className="text-xs text-muted-foreground">{user.role}</div>
          </div>
        </div>
      }
    >
      <div className="px-4 py-3 border-b border-border">
        <div className="font-medium">{user.nickname || user.username}</div>
        <div className="text-sm text-muted-foreground">@{user.username}</div>
      </div>

      <DropdownMenuItem onClick={() => router.push("/profile")}>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>个人中心</span>
        </div>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => router.push("/favorites")}>
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>我的收藏</span>
        </div>
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => router.push("/settings")}>
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>设置</span>
        </div>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700">
        <div className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          <span>退出登录</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
