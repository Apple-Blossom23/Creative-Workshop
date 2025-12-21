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
    createdAt: "2025-10-15T10:00:00.000Z",
    updatedAt: "2025-12-10T10:00:00.000Z",
    status: "published",
    version: "1.4.2"
  },
  {
    id: "r_1005",
    type: "map",
    title: "雪线要塞 · Snowline Hold",
    summary: "高地防守地图，强调地形与补给线。适合 2-4 人合作守点。",
    coverUrl: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=60",
    tags: ["合作", "防守", "雪地", "高地"],
    author: users[0],
    downloads: 56210,
    likes: 4820,
    rating: 4.8,
    createdAt: "2025-08-20T08:30:00.000Z",
    updatedAt: "2025-12-17T07:10:00.000Z",
    status: "published",
    version: "2.0.1"
  },
  {
    id: "r_1006",
    type: "map",
    title: "赤潮群岛 · Red Tide Isles",
    summary: "海岛对抗 PVP 地图，多路登陆点与资源争夺，节奏紧凑。",
    coverUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=60",
    tags: ["PVP", "海岛", "对抗", "资源"],
    author: users[1],
    downloads: 93420,
    likes: 9122,
    rating: 4.7,
    createdAt: "2025-09-05T14:20:00.000Z",
    updatedAt: "2025-12-12T13:00:00.000Z",
    status: "published",
    version: "1.1.0"
  },
  {
    id: "r_1007",
    type: "map",
    title: "无电区 · Blackout Zone",
    summary: "夜战地图，视野与侦察更重要。包含可破坏照明与巡逻事件。",
    coverUrl: "https://images.unsplash.com/photo-1520975958225-9c1c5ccdb0e7?auto=format&fit=crop&w=1200&q=60",
    tags: ["夜战", "PVE", "事件", "侦察"],
    author: users[0],
    downloads: 30112,
    likes: 2105,
    rating: 4.5,
    createdAt: "2025-11-01T16:45:00.000Z",
    updatedAt: "2025-12-08T09:40:00.000Z",
    status: "published",
    version: "1.0.3"
  },
  {
    id: "r_1008",
    type: "map",
    title: "荒原长线 · Wasteland Marathon",
    summary: "超长线推进地图，资源分段解锁，适合喜欢运营与推进的玩家。",
    coverUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60",
    tags: ["运营", "推进", "长局", "沙漠"],
    author: users[1],
    downloads: 18990,
    likes: 1330,
    rating: 4.3,
    createdAt: "2025-07-12T11:30:00.000Z",
    updatedAt: "2025-12-03T12:20:00.000Z",
    status: "published",
    version: "0.9.8"
  },
  {
    id: "r_1009",
    type: "map",
    title: "钢雨走廊 · Steel Rain Corridor",
    summary: "经典 1v1/2v2 走廊对抗，开局位对称，强调微操与压制。",
    coverUrl: "https://images.unsplash.com/photo-1558981403-c5f9891b6b4a?auto=format&fit=crop&w=1200&q=60",
    tags: ["PVP", "对称", "走廊", "2v2"],
    author: users[0],
    downloads: 74800,
    likes: 6900,
    rating: 4.9,
    createdAt: "2025-06-18T09:15:00.000Z",
    updatedAt: "2025-12-16T15:30:00.000Z",
    status: "published",
    version: "3.2.0"
  },
  {
    id: "r_1010",
    type: "map",
    title: "裂谷围城 · Rift Siege",
    summary: "多路口围城 PVE 地图，分阶段 BOSS 波次，适合多人协作。",
    coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=60",
    tags: ["合作", "围城", "BOSS", "波次"],
    author: users[1],
    downloads: 41050,
    likes: 3200,
    rating: 4.6,
    createdAt: "2025-10-28T13:20:00.000Z",
    updatedAt: "2025-12-14T06:50:00.000Z",
    status: "published",
    version: "1.2.4"
  },
  {
    id: "r_1011",
    type: "map",
    title: "晨曦补给线 · Dawn Supply Run",
    summary: "轻量级生存地图：资源点轮换，事件频繁，适合 30-45 分钟一局。",
    coverUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&q=60",
    tags: ["生存", "事件", "短局", "合作"],
    author: users[0],
    downloads: 9700,
    likes: 690,
    rating: 4.2,
    createdAt: "2025-12-15T18:30:00.000Z",
    updatedAt: "2025-12-18T02:05:00.000Z",
    status: "published",
    version: "1.0.0"
  },
  {
    id: "r_1012",
    type: "map",
    title: "边境驿站 · Frontier Outpost",
    summary: "新图待审核：强调开局位平衡与资源分布，适合标准对战。",
    coverUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60",
    tags: ["PVP", "平衡", "标准", "对称"],
    author: users[0],
    downloads: 0,
    likes: 0,
    rating: 0,
    createdAt: "2025-12-18T08:00:00.000Z",
    updatedAt: "2025-12-18T09:15:00.000Z",
    status: "pending_review",
    version: "0.1.0"
  },
  
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
