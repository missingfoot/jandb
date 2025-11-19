import type { MessageWithFile } from '@/types';
import { getCleanFileName, isImageFile } from '@/utils/files';
import Image from 'next/image';

interface ImagesViewProps {
  messages: MessageWithFile[];
}

export function ImagesView({ messages }: ImagesViewProps) {
  const imagesMessages = messages.filter(
    (m) => m.$file && isImageFile(m.$file.path)
  );

  if (imagesMessages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <p className="text-neutral-400 text-sm text-center">No images shared yet</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
      <div className="grid grid-cols-2 gap-3">
        {imagesMessages.map((message) => {
          const file = message.$file!;
          return (
            <a
              key={message.id}
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-[rgba(255,255,255,0.05)] hover:ring-2 hover:ring-white/30 transition-all"
            >
              <Image
                src={file.url}
                alt={getCleanFileName(file.path)}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">
                  {getCleanFileName(file.path)}
                </p>
                <p className="text-xs text-neutral-300">
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
