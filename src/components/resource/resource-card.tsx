import Link from "next/link";
import { Download, Heart, Star } from "lucide-react";
import type { Resource } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function typeLabel(t: Resource["type"]) {
  if (t === "map") return "地图";
  return "地图";
}

export function ResourceCard({ r }: { r: Resource }) {
  return (
    <Link href={`/resource/${r.id}`} className="block">
      <Card className="group overflow-hidden transition hover:shadow-md">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={r.coverUrl ?? "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1200&q=60"}
            alt={r.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          
        </div>
        <CardContent className="pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{r.title}</div>
              <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.summary}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="inline-flex items-center gap-1 text-sm font-medium">
                <Star className="h-4 w-4 text-amber-500" />
                {r.rating.toFixed(1)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">v{r.version}</div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {r.tags.slice(0, 3).map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
            {r.tags.length > 3 && <Badge>+{r.tags.length - 3}</Badge>}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <Download className="h-3.5 w-3.5" />
                {r.downloads.toLocaleString()}
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" />
                {r.likes.toLocaleString()}
              </span>
            </div>
            <div className="truncate">@{r.author.handle}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
