import type { MessageWithFile } from '@/types';
import { isImageFile } from '@/utils/files';
import { Avatar } from '@/components/shared/Avatar';
import { LinkCard } from './LinkCard';
import { FileCard } from './FileCard';

// Check if text contains only emojis (and optional whitespace)
function isEmojiOnly(text: string): boolean {
  // Remove all emojis and whitespace, check if anything remains
  const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
  const withoutEmojis = text.replace(emojiRegex, '').replace(/\s/g, '');
  // Must have at least one emoji and nothing else
  return withoutEmojis.length === 0 && emojiRegex.test(text);
}

// Count emojis in text for sizing
function countEmojis(text: string): number {
  const matches = text.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu);
  return matches ? matches.length : 0;
}

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

  const bubbleColor = isOwn ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)';

  // For link messages, check if the attached file is an image
  const linkImage = hasLink && hasFile && file && isImageFile(file.path) ? file.url : undefined;

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
        {/* Link Card - shown when message has a link */}
        {hasLink ? (
          <LinkCard
            url={message.link!}
            title={message.text || undefined}
            imageUrl={linkImage}
            isOwn={isOwn}
            accentColor={accentColor}
          />
        ) : hasFile && file ? (
          /* File Card - shown when message has a file */
          <FileCard
            fileUrl={file.url}
            filePath={file.path}
            description={message.text || undefined}
            isOwn={isOwn}
          />
        ) : hasText ? (
          /* Text-only message */
          message.text && isEmojiOnly(message.text) ? (
            /* Emoji-only message - no bubble, larger text */
            <p className={`whitespace-pre-wrap ${countEmojis(message.text) <= 3 ? 'text-5xl' : 'text-3xl'}`}>
              {message.text}
            </p>
          ) : (
            /* Regular text message */
            <div
              className="px-4 py-2 rounded-2xl inline-block break-words"
              style={{ backgroundColor: bubbleColor }}
            >
              <p className="text-sm text-white whitespace-pre-wrap">{message.text}</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
