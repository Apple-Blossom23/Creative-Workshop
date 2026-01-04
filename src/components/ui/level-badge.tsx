"use client";

import Image from "next/image";
import { getLevelIconPath, getLevelFromExperience, getLevelProgress, getNextLevelRequirement } from "@/lib/level";
import { cn } from "@/lib/cn";

interface LevelBadgeProps {
  /** 当前等级 */
  level: number;
  /** 经验值（闪电），用于计算实际显示等级 */
  lightning?: number;
  /** 图标大小 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 是否显示等级文字 */
  showLabel?: boolean;
  /** 是否显示经验值进度条 */
  showProgress?: boolean;
  /** 自定义类名 */
  className?: string;
}

const sizeMap = {
  sm: { icon: 20, text: "text-xs" },
  md: { icon: 28, text: "text-sm" },
  lg: { icon: 36, text: "text-base" },
  xl: { icon: 48, text: "text-lg" },
};

/**
 * 等级图标组件
 * 显示用户等级图标，支持多种尺寸和可选的经验值进度条
 */
export function LevelBadge({
  level,
  lightning = 0,
  size = "md",
  showLabel = false,
  showProgress = false,
  className,
}: LevelBadgeProps) {
  // 计算显示的等级（根据经验值）
  const displayLevel = getLevelFromExperience(lightning, level);
  const iconPath = getLevelIconPath(displayLevel);
  const { icon: iconSize, text: textSize } = sizeMap[size];
  
  // 计算进度
  const progress = showProgress ? getLevelProgress(lightning, displayLevel) : 0;
  const nextRequirement = showProgress ? getNextLevelRequirement(displayLevel) : null;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="relative flex-shrink-0">
        <Image
          src={iconPath}
          alt={`LV${displayLevel}`}
          width={iconSize}
          height={iconSize}
          className="object-contain"
          priority
        />
      </div>
      
      {showLabel && (
        <span className={cn("font-medium", textSize)}>
          LV{displayLevel}
        </span>
      )}
      
      {showProgress && displayLevel < 20 && (
        <div className="flex flex-col gap-0.5 min-w-[80px]">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {nextRequirement !== null && (
            <div className="text-[10px] text-muted-foreground">
              {lightning} / {nextRequirement}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface LevelBadgeWithTooltipProps extends LevelBadgeProps {
  /** 是否显示悬浮提示 */
  showTooltip?: boolean;
}

/**
 * 带悬浮提示的等级图标组件
 */
export function LevelBadgeWithTooltip({
  level,
  lightning = 0,
  showTooltip = true,
  ...props
}: LevelBadgeWithTooltipProps) {
  const displayLevel = getLevelFromExperience(lightning, level);
  const progress = getLevelProgress(lightning, displayLevel);
  const nextRequirement = getNextLevelRequirement(displayLevel);

  if (!showTooltip) {
    return <LevelBadge level={level} lightning={lightning} {...props} />;
  }

  return (
    <div className="group relative inline-block">
      <LevelBadge level={level} lightning={lightning} {...props} />
      
      {/* 悬浮提示 */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-[160px]">
        <div className="text-sm font-medium mb-1">等级 {displayLevel}</div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>经验值: ⚡ {lightning}</div>
          {displayLevel < 20 && nextRequirement !== null && (
            <>
              <div>距下一级: {nextRequirement - lightning}</div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}
          {displayLevel === 20 && (
            <div className="text-yellow-600">已达最高等级!</div>
          )}
        </div>
        {/* 箭头 */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </div>
    </div>
  );
}
