export type ResourceType = "map" | "mod" | "taskpack" | "plugin";

export type ResourceStatus = "draft" | "pending_review" | "published" | "rejected";

export type User = {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  role: "user" | "moderator" | "admin";
};

export type Comment = {
  id: string;
  resourceId: string;
  user: Pick<User, "id" | "name" | "handle" | "avatarUrl">;
  content: string;
  createdAt: string;
};

export type Resource = {
  id: string;
  type: ResourceType;
  title: string;
  summary: string;
  coverUrl?: string;
  tags: string[];
  author: Pick<User, "id" | "name" | "handle" | "avatarUrl">;
  downloads: number;
  likes: number;
  rating: number;
  updatedAt: string;
  status: ResourceStatus;
  version: string;
};
