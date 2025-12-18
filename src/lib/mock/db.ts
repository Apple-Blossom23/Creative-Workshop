import type { Comment, Resource, User } from "@/lib/types";

export const users: User[] = [
  {
    id: "u_1",
    name: "Lin",
    handle: "lin_dev",
    role: "user",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=Lin"
  },
  {
    id: "u_2",
    name: "Mika",
    handle: "mika_mod",
    role: "moderator",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=Mika"
  },
  {
    id: "u_3",
    name: "Admin",
    handle: "admin",
    role: "admin",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=Admin"
  }
];

export const resources: Resource[] = [
  {
    id: "r_1001",
    type: "map",
    title: "雾港 · Fog Harbor",
    summary: "中等规模港口地图，适合合作生存。包含动态天气与隐藏战利品路线。",
    coverUrl: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=60",
    tags: ["合作", "生存", "港口", "天气"],
    author: users[0],
    downloads: 12840,
    likes: 965,
    rating: 4.6,
    updatedAt: "2025-12-10T10:00:00.000Z",
    status: "published",
    version: "1.4.2"
  },
  {
    id: "r_1002",
    type: "mod",
    title: "武器平衡包 · Weapon Balance",
    summary: "重做后坐力与伤害曲线，让 PVP 更耐玩。支持主流模组兼容补丁。",
    coverUrl: "https://images.unsplash.com/photo-1558981403-c5f9891b6b4a?auto=format&fit=crop&w=1200&q=60",
    tags: ["PVP", "平衡", "武器"],
    author: users[1],
    downloads: 90432,
    likes: 8120,
    rating: 4.8,
    updatedAt: "2025-12-15T08:20:00.000Z",
    status: "published",
    version: "2.1.0"
  },
  {
    id: "r_1003",
    type: "taskpack",
    title: "新手任务包 · Newbie Questline",
    summary: "从零引导到毕业：探索、建造、战斗、贸易全流程任务链。",
    coverUrl: "https://images.unsplash.com/photo-1520975958225-9c1c5ccdb0e7?auto=format&fit=crop&w=1200&q=60",
    tags: ["任务", "引导", "剧情"],
    author: users[0],
    downloads: 22011,
    likes: 1422,
    rating: 4.4,
    updatedAt: "2025-11-30T12:00:00.000Z",
    status: "pending_review",
    version: "0.9.0"
  },
  {
    id: "r_1004",
    type: "plugin",
    title: "服务器监控面板 · Server Insights",
    summary: "实时查看 TPS、内存、玩家行为热力图。内置告警与导出。",
    coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=60",
    tags: ["服务器", "监控", "管理"],
    author: users[1],
    downloads: 5520,
    likes: 530,
    rating: 4.2,
    updatedAt: "2025-12-01T09:00:00.000Z",
    status: "draft",
    version: "0.3.5"
  }
];

export const comments: Comment[] = [
  {
    id: "c_1",
    resourceId: "r_1001",
    user: users[1],
    content: "Fog Harbor 的路线设计很舒服，建议加一个夜间专用事件。",
    createdAt: "2025-12-11T09:00:00.000Z"
  },
  {
    id: "c_2",
    resourceId: "r_1001",
    user: users[0],
    content: "收到！下个版本会加一个夜雾袭击事件，并补充任务提示。",
    createdAt: "2025-12-11T10:10:00.000Z"
  }
];
