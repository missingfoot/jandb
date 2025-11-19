import type { MessageWithFile } from '@/types';
import { getCleanFileName, isImageFile } from '@/utils/files';
import { FileIcon } from '@/components/shared/Icons';
import { Avatar } from '@/components/shared/Avatar';
import Image from 'next/image';

interface MessageBubbleProps {
  message: MessageWithFile;
  isOwn: boolean;
  showAvatar: boolean;
  accentColor: string;
}

export function MessageBubble({ message, isOwn, showAvatar, accentColor }: MessageBubbleProps) {
  const file = message.$file;
  const hasFile = Boolean(file);
  const hasText = Boolean(message.text);
  const hasLink = Boolean(message.link);

  const bubbleColor = isOwn ? accentColor : 'rgba(255, 255, 255, 0.1)';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 gap-3 items-end`}>
      {/* Avatar for recipient messages only - shown on last message in group */}
      {!isOwn && (
        <div className="flex-shrink-0 w-9">
          {showAvatar && (
            <Avatar
              name={message.sender}
              size="xs"
              accentColor={accentColor}
            />
          )}
        </div>
      )}

      <div className="max-w-[75%]">
        {/* File attachment */}
        {hasFile && file && (
          <div className="mb-2">
            {isImageFile(file.path) ? (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden"
              >
                <div className="relative w-full max-w-xs">
                  <Image
                    src={file.url}
                    alt={getCleanFileName(file.path)}
                    width={300}
                    height={200}
                    className="rounded-2xl"
                    unoptimized
                  />
                </div>
              </a>
            ) : (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                style={{ backgroundColor: bubbleColor }}
              >
                <FileIcon className="flex-shrink-0" />
                <span className="text-sm truncate">{getCleanFileName(file.path)}</span>
              </a>
            )}
          </div>
        )}

        {/* Text message */}
        {hasText && (
          <div
            className="px-4 py-2 rounded-2xl inline-block break-words"
            style={{ backgroundColor: bubbleColor }}
          >
            <p className="text-sm text-white whitespace-pre-wrap">{message.text}</p>
          </div>
        )}

        {/* Link button */}
        {hasLink && (
          <div className="mt-2">
            <a
              href={message.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                backgroundColor: accentColor,
                color: 'white',
              }}
            >
              Open Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
