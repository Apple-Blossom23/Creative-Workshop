import type { Comment, Resource, ResourceStatus, ResourceType, User } from "@/lib/types";
import { comments, resources, users } from "@/lib/mock/db";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export type ResourceQuery = {
  type?: ResourceType | "all";
  q?: string;
  tags?: string[];
  status?: ResourceStatus | "all";
  sort?: "trending" | "new" | "top";
};

function matchQuery(r: Resource, query: ResourceQuery) {
  if (query.type && query.type !== "all" && r.type !== query.type) return false;
  if (query.status && query.status !== "all" && r.status !== query.status) return false;

  const q = (query.q ?? "").trim().toLowerCase();
  if (q) {
    const hay = `${r.title} ${r.summary} ${r.tags.join(" ")}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }

  if (query.tags && query.tags.length) {
    const set = new Set(r.tags);
    for (const t of query.tags) if (!set.has(t)) return false;
  }

  return true;
}

function sortResources(list: Resource[], sort: ResourceQuery["sort"]) {
  if (sort === "new") return [...list].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  if (sort === "top") return [...list].sort((a, b) => b.rating - a.rating);
  return [...list].sort((a, b) => (b.likes + b.downloads / 10) - (a.likes + a.downloads / 10));
}

export const mockApi = {
  auth: {
    async getSession(): Promise<{ user: User | null }> {
      await sleep(250);
      return { user: users[0] };
    },
    async login(_email: string, _password: string): Promise<{ user: User }> {
      await sleep(450);
      return { user: users[0] };
    },
    async register(_name: string, _email: string, _password: string): Promise<{ user: User }> {
      await sleep(650);
      return { user: users[0] };
    }
  },

  resources: {
    async list(query: ResourceQuery): Promise<Resource[]> {
      await sleep(300);
      const filtered = resources.filter((r) => matchQuery(r, query));
      return sortResources(filtered, query.sort);
    },
    async getById(id: string): Promise<Resource | null> {
      await sleep(240);
      return resources.find((r) => r.id === id) ?? null;
    },
    async listTags(): Promise<string[]> {
      await sleep(150);
      const set = new Set<string>();
      for (const r of resources) for (const t of r.tags) set.add(t);
      return [...set].sort((a, b) => a.localeCompare(b, "zh"));
    },
    async submitForReview(_id: string): Promise<{ ok: true }> {
      await sleep(350);
      return { ok: true };
    },
    async approve(_id: string): Promise<{ ok: true }> {
      await sleep(350);
      return { ok: true };
    },
    async reject(_id: string, _reason: string): Promise<{ ok: true }> {
      await sleep(350);
      return { ok: true };
    }
  },

  comments: {
    async list(resourceId: string): Promise<Comment[]> {
      await sleep(220);
      return comments
        .filter((c) => c.resourceId === resourceId)
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
    },
    async add(resourceId: string, content: string): Promise<Comment> {
      await sleep(420);
      const c: Comment = {
        id: `c_${Math.floor(Math.random() * 1_000_000)}`,
        resourceId,
        user: users[0],
        content,
        createdAt: new Date().toISOString()
      };
      comments.push(c);
      return c;
    }
  }
};
