import type { MessageWithFile } from '@/types';
import { LinkCard } from '@/components/chat/LinkCard';
import { isImageFile } from '@/utils/files';

interface LinksViewProps {
  messages: MessageWithFile[];
  accentColor?: string;
}

export function LinksView({ messages, accentColor = '#0d6efd' }: LinksViewProps) {
  const messagesWithLinks = messages.filter((m) => m.link);

  if (messagesWithLinks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <p className="text-neutral-400 text-sm text-center">No links shared yet</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
      <div className="space-y-4">
        {messagesWithLinks.map((message) => {
          const linkImage =
            message.$file && isImageFile(message.$file.path)
              ? message.$file.url
              : undefined;

          return (
            <div key={message.id}>
              <p className="text-xs text-neutral-400 mb-2">
                Shared by {message.sender} •{' '}
                {new Date(message.createdAt).toLocaleDateString()}
              </p>
              <LinkCard
                url={message.link!}
                title={message.text || undefined}
                imageUrl={linkImage}
                isOwn={false}
                accentColor={accentColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
