"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

interface CheckinDialogProps {
  onClose: () => void;
  onSuccess: (reward: { drops: number }) => void;
}

// 生成正态分布的随机数 (1-15, 中位数概率最大)
function generateNormalDistribution(): number {
  // 使用 Box-Muller 变换生成正态分布
  // 均值为 8 (中位数), 标准差为 2.5
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  
  // 转换到 1-15 范围，均值为 8
  const value = Math.round(8 + z0 * 2.5);
  
  // 确保在 1-15 范围内
  return Math.max(1, Math.min(15, value));
}

export function CheckinDialog({ onClose, onSuccess }: CheckinDialogProps) {
  const [checking, setChecking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reward, setReward] = useState({ drops: 0 });

  const handleCheckin = async () => {
    setChecking(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const dropsReward = generateNormalDistribution();
    
    setReward({ drops: dropsReward });
    setCompleted(true);
    setChecking(false);
    
    setTimeout(() => {
      onSuccess({ drops: dropsReward });
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <Card className="w-full max-w-md p-6 mx-4 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        {!completed ? (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <CalendarCheck className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">每日签到</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                签到可获得水滴奖励
              </p>
            </div>
            <div className="flex justify-center text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <span className="text-2xl">💧</span>
                <span className="font-medium text-blue-600">1-15 水滴</span>
              </div>
            </div>
            <div className="flex gap-3 w-full mt-2">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={onClose}
                disabled={checking}
              >
                取消
              </Button>
              <Button
                className="flex-1"
                onClick={handleCheckin}
                disabled={checking}
              >
                {checking ? "签到中..." : "立即签到"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-in zoom-in-95">
            <div className="rounded-full bg-emerald-500/10 p-4">
              <CalendarCheck className="h-12 w-12 text-emerald-500" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-emerald-500">签到成功！</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                恭喜你获得今日奖励
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-lg">
                <span className="text-3xl">💧</span>
                <span className="text-2xl font-bold text-blue-600">+{reward.drops}</span>
              </div>
            </div>
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-in slide-in-from-left duration-1000" />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
