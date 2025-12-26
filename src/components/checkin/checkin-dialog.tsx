"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { checkinApi } from "@/lib/api/services/checkin";
import { useToast } from "@/components/ui/toast";

interface CheckinDialogProps {
  onClose: () => void;
  onSuccess: (reward: { drops: number }) => void;
}

export function CheckinDialog({ onClose, onSuccess }: CheckinDialogProps) {
  const [checking, setChecking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reward, setReward] = useState({ drops: 0 });
  const { addToast } = useToast();

  const handleCheckin = async () => {
    setChecking(true);
    
    try {
      const response = await checkinApi.checkin();
      
      if (response.code === 200 && response.data) {
        const dropsReward = response.data.drops;
        setReward({ drops: dropsReward });
        setCompleted(true);
        
        setTimeout(() => {
          onSuccess({ drops: dropsReward });
          onClose();
        }, 2000);
      } else {
        addToast({
          title: "签到失败",
          description: response.message || "请稍后重试",
          variant: "error",
        });
        onClose();
      }
    } catch (error: any) {
      addToast({
        title: "签到失败",
        description: error.message || "今日已签到或网络错误",
        variant: "error",
      });
      onClose();
    } finally {
      setChecking(false);
    }
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
