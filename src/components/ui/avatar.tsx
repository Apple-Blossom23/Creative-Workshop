import { cn } from "@/lib/cn";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  return (
    <div className={cn("relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted", className)}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="text-sm font-medium text-muted-foreground">
          {fallback}
        </span>
      )}
    </div>
  );
}
