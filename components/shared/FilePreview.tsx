import type { FilePreview as FilePreviewType } from '@/hooks/useFileUpload';
import { FileIcon, RemoveFileIcon } from './Icons';
import Image from 'next/image';

interface FilePreviewProps {
  file: FilePreviewType;
  onRemove: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  return (
    <div className="relative flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.05)] rounded-lg border border-[rgba(255,255,255,0.1)]">
      {file.isImage && file.previewUrl ? (
        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
          <Image
            src={file.previewUrl}
            alt={file.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className="w-12 h-12 flex items-center justify-center bg-[rgba(255,255,255,0.1)] rounded flex-shrink-0">
          <FileIcon width={24} height={24} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{file.name}</p>
        <p className="text-xs text-neutral-400">{file.size}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="flex-shrink-0 p-1 hover:bg-[rgba(255,255,255,0.1)] rounded transition-colors"
        aria-label="Remove file"
      >
        <RemoveFileIcon />
      </button>
    </div>
  );
}
