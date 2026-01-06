import type { MessageWithFile } from '@/types';
import { getCleanFileName, isImageFile } from '@/utils/files';
import { downloadFile } from '@/utils/download';
import { FileIcon } from '@/components/shared/Icons';

interface FilesViewProps {
  messages: MessageWithFile[];
  accentColor?: string;
}

export function FilesView({ messages, accentColor = '#0d6efd' }: FilesViewProps) {
  const fileMessages = messages.filter(
    (m) => m.$file && !isImageFile(m.$file.path)
  );

  if (fileMessages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <p className="text-neutral-400 text-sm text-center">No files shared yet</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
      <div className="space-y-3">
        {fileMessages.map((message) => {
          const file = message.$file!;
          const fileName = getCleanFileName(file.path);
          return (
            <a
              key={message.id}
              href={file.url}
              onClick={(e) => {
                e.preventDefault();
                downloadFile(file.url, fileName);
              }}
              className="flex items-center gap-3 p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.08)] transition-colors group cursor-pointer"
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded flex-shrink-0"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <FileIcon style={{ color: accentColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-opacity-90">
                  {fileName}
                </p>
                {message.text && (
                  <p className="text-xs text-neutral-400 truncate mt-0.5">{message.text}</p>
                )}
                <p className="text-xs text-neutral-500 mt-1">
                  {message.sender} • {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
