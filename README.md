# Map Workshop Frontend

基于 Next.js 16.1 + Tailwind CSS 的地图工坊前端

## 技术栈

- **React 19** - UI 基础库
- **Next.js 16.1** - 全栈 React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Lucide React** - 图标库

## 前置要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

前端服务默认将在 `http://localhost:3000` 启动。


## 功能页面

访问以下页面体验功能：

- `/` - 首页，展示精选地图资源
- `/browse` - 浏览页面，支持搜索和筛选
- `/resource/r_1001` - 资源详情页面（示例ID）
- `/upload` - 地图上传页面（mock）
- `/moderation` - 审核队列页面（mock）
- `/profile` - 用户中心
  - `/profile/change-password` - 修改密码
  - `/profile/change-email` - 修改邮箱
- `/auth/login` - 用户登录
- `/auth/register` - 用户注册

## 与后端集成

1. 修改 `src/lib/api/client.ts` 中的 API 基础 URL
2. 更新认证 token 处理逻辑

默认后端地址：`http://localhost:8080/api`

## 项目结构

```
src/
├── app/                 # Next.js App Router 页面
│   ├── auth/           # 认证相关页面
│   ├── browse/         # 浏览页面
│   ├── moderation/     # 审核页面
│   ├── profile/        # 用户中心
│   ├── resource/       # 资源详情
│   ├── upload/         # 上传页面
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── components/         # 可复用组件
│   ├── resource/       # 资源相关组件
│   ├── shell/          # 布局组件
│   └── ui/             # UI 基础组件
├── hooks/              # 自定义 Hooks
├── lib/                # 工具库
│   ├── api/           # API 相关
│   │   ├── services/  # API 服务
│   │   ├── types/     # 类型定义
│   │   └── client.ts  # HTTP 客户端
│   ├── mock/          # Mock 数据
│   └── utils.ts       # 工具函数
└── types.ts           # 全局类型定义
```
