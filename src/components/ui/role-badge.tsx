"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

export type UserRole = "USER" | "CREATOR" | "ADMIN";

interface RoleBadgeProps {
  /** 用户角色 */
  role: UserRole;
  /** 图标大小 */
  size?: "sm" | "md" | "lg";
  /** 是否显示角色文字 */
  showLabel?: boolean;
  /** 自定义类名 */
  className?: string;
}

const sizeMap = {
  sm: { icon: 16, text: "text-xs" },
  md: { icon: 20, text: "text-sm" },
  lg: { icon: 24, text: "text-base" },
};

const roleConfig = {
  ADMIN: {
    icon: "/img/ic/admin.png",
    label: "管理员",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  CREATOR: {
    icon: "/img/ic/creator.png",
    label: "创作者",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  USER: {
    icon: null,
    label: "普通用户",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
};

/**
 * 用户角色图标组件
 * 显示管理员和创作者的特殊标识，普通用户不显示图标
 */
export function RoleBadge({
  role,
  size = "md",
  showLabel = false,
  className,
}: RoleBadgeProps) {
  const config = roleConfig[role];
  const { icon: iconSize, text: textSize } = sizeMap[size];

  // 普通用户不显示图标（除非明确要求显示标签）
  if (role === "USER" && !showLabel) {
    return null;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        showLabel && `px-1.5 py-0.5 rounded-full border ${config.bgColor} ${config.borderColor}`,
        className
      )}
    >
      {config.icon && (
        <Image
          src={config.icon}
          alt={config.label}
          width={iconSize}
          height={iconSize}
          className="object-contain"
        />
      )}
      
      {showLabel && (
        <span className={cn("font-medium", textSize, config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
}

/**
 * 带悬浮提示的角色图标组件
 */
interface RoleBadgeWithTooltipProps extends RoleBadgeProps {
  showTooltip?: boolean;
}

export function RoleBadgeWithTooltip({
  role,
  showTooltip = true,
  ...props
}: RoleBadgeWithTooltipProps) {
  const config = roleConfig[role];

  // 普通用户不显示
  if (role === "USER") {
    return null;
  }

  if (!showTooltip) {
    return <RoleBadge role={role} {...props} />;
  }

  return (
    <div className="group relative inline-block">
      <RoleBadge role={role} {...props} />
      
      {/* 悬浮提示 */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
        <span className={cn("text-xs font-medium", config.color)}>
          {config.label}
        </span>
        {/* 箭头 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </div>
    </div>
  );
}

/**
 * 用户信息组合组件
 * 同时显示等级和角色标识
 */
interface UserBadgesProps {
  role: UserRole;
  level: number;
  lightning?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserBadges({
  role,
  level,
  lightning = 0,
  size = "md",
  className,
}: UserBadgesProps) {
  // 延迟导入避免循环依赖
  const { LevelBadge } = require("./level-badge");

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <LevelBadge level={level} lightning={lightning} size={size} />
      <RoleBadge role={role} size={size} />
    </div>
  );
}
