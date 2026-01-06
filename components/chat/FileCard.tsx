import Image from 'next/image';
import { FileIcon } from '@/components/shared/Icons';
import { getCleanFileName, isImageFile } from '@/utils/files';
import { downloadFile } from '@/utils/download';

interface FileCardProps {
  fileUrl: string;
  filePath: string;
  description?: string;
  isOwn: boolean;
}

export function FileCard({ fileUrl, filePath, description, isOwn }: FileCardProps) {
  const fileName = getCleanFileName(filePath);
  const isImage = isImageFile(filePath);
  const backgroundColor = isOwn ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadFile(fileUrl, fileName);
  };

  return (
    <a
      href={fileUrl}
      onClick={handleClick}
      className="block rounded-2xl overflow-hidden transition-opacity hover:opacity-90 cursor-pointer"
      style={{ backgroundColor }}
    >
      {isImage ? (
        <div className="relative w-full max-w-xs">
          <Image
            src={fileUrl}
            alt={fileName}
            width={300}
            height={200}
            className="w-full object-cover"
            unoptimized
          />
        </div>
      ) : (
        <div className={`flex items-center gap-3 p-3 ${description ? 'border-b border-[rgba(255,255,255,0.1)]' : ''}`}>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] flex-shrink-0">
            <FileIcon width={24} height={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{fileName}</p>
            <p className="text-xs text-white/50">Download</p>
          </div>
        </div>
      )}
      {description && (
        <div className="px-4 py-3">
          <p className="text-sm text-white break-words">{description}</p>
        </div>
      )}
    </a>
  );
}
