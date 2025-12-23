import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface AvatarUploadProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  editable?: boolean;
  onImageSelect?: (file: File) => void;
  onImageRemove?: () => void;
  uploading?: boolean;
}

export function Avatar({ 
  src, 
  alt, 
  fallback, 
  className,
  editable = false,
  onImageSelect,
  onImageRemove,
  uploading = false 
}: AvatarUploadProps) {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    if (editable && !uploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        alert('请选择有效的图片文件 (JPG, PNG, GIF, WebP)');
        return;
      }
      
      if (file.size > maxSize) {
        alert('图片文件大小不能超过 5MB');
        return;
      }
      
      onImageSelect?.(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageRemove?.();
  };

  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted",
        "transition-all duration-200",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 头像图片/文字 */}
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover" 
        />
      ) : (
        <span className="text-sm font-medium text-muted-foreground">
          {fallback}
        </span>
      )}

      {/* 编辑指示器 */}
      {editable && isHovered && !uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-all duration-200">
          <Camera className="h-4 w-4 text-white" />
        </div>
      )}

      {/* 上传中的加载状态 */}
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
        </div>
      )}

      {/* 点击区域 */}
      {editable && (
        <button
          onClick={handleEditClick}
          className="absolute inset-0 z-10"
          aria-label="编辑头像"
          disabled={uploading}
        />
      )}

      {/* 移除按钮 */}
      {editable && src && !uploading && (
        <button
          onClick={handleRemove}
          className="absolute -top-1 -right-1 z-20 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 flex items-center justify-center"
          aria-label="移除头像"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      )}

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        aria-label="选择头像文件"
      />
    </div>
  );
}
